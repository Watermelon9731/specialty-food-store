import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";
import { PATH } from "@/constants/path";
import { TOKEN } from "@/constants/token";

const BLOG_RATE_WINDOW_MS = 60_000;
const BLOG_RATE_MAX_REQUESTS = 120;
const BLOG_BURST_WINDOW_MS = 10_000;
const BLOG_BURST_MAX_REQUESTS = 30;
const BLOG_BLOCK_MS = 60_000;
const BLOG_CACHE_HEADER = "public, s-maxage=300, stale-while-revalidate=3600";
const RATE_LIMIT_TTL_MS = 10 * 60_000;
const RATE_LIMIT_MAX_ENTRIES = 5_000;
const TRUSTED_CRAWLER_PATTERN =
  /(googlebot|bingbot|duckduckbot|yandexbot|baiduspider|slurp|applebot)/i;

type BlogRateLimitState = {
  windowStart: number;
  requestCount: number;
  burstStart: number;
  burstCount: number;
  blockedUntil: number;
  lastSeen: number;
};

const rateLimitGlobal = globalThis as typeof globalThis & {
  __blogRateLimiter?: Map<string, BlogRateLimitState>;
};

const blogRateLimiter =
  rateLimitGlobal.__blogRateLimiter ?? new Map<string, BlogRateLimitState>();

if (!rateLimitGlobal.__blogRateLimiter) {
  rateLimitGlobal.__blogRateLimiter = blogRateLimiter;
}

function isBlogPath(pathname: string) {
  return (
    pathname === PATH.BLOG.ALL ||
    pathname.startsWith(`${PATH.BLOG.ALL}/`) ||
    pathname === "/blog" ||
    pathname.startsWith("/blog/")
  );
}

function getClientFingerprint(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const ipFromForwarded = forwardedFor?.split(",")[0]?.trim();
  const ip = ipFromForwarded || req.headers.get("x-real-ip") || "unknown-ip";
  const userAgent = (req.headers.get("user-agent") || "unknown-ua")
    .toLowerCase()
    .slice(0, 120);
  return `${ip}:${userAgent}`;
}

function pruneRateLimiter(now: number) {
  for (const [fingerprint, state] of blogRateLimiter) {
    if (now - state.lastSeen > RATE_LIMIT_TTL_MS) {
      blogRateLimiter.delete(fingerprint);
    }
  }

  if (blogRateLimiter.size <= RATE_LIMIT_MAX_ENTRIES) {
    return;
  }

  let overflow = blogRateLimiter.size - RATE_LIMIT_MAX_ENTRIES;
  for (const key of blogRateLimiter.keys()) {
    blogRateLimiter.delete(key);
    overflow -= 1;
    if (overflow <= 0) {
      break;
    }
  }
}

function evaluateBlogRateLimit(fingerprint: string, now: number) {
  const state = blogRateLimiter.get(fingerprint) ?? {
    windowStart: now,
    requestCount: 0,
    burstStart: now,
    burstCount: 0,
    blockedUntil: 0,
    lastSeen: now,
  };

  if (state.blockedUntil > now) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((state.blockedUntil - now) / 1000),
      remaining: 0,
    };
  }

  if (now - state.windowStart >= BLOG_RATE_WINDOW_MS) {
    state.windowStart = now;
    state.requestCount = 0;
  }

  if (now - state.burstStart >= BLOG_BURST_WINDOW_MS) {
    state.burstStart = now;
    state.burstCount = 0;
  }

  state.requestCount += 1;
  state.burstCount += 1;
  state.lastSeen = now;

  if (
    state.requestCount > BLOG_RATE_MAX_REQUESTS ||
    state.burstCount > BLOG_BURST_MAX_REQUESTS
  ) {
    state.blockedUntil = now + BLOG_BLOCK_MS;
    blogRateLimiter.set(fingerprint, state);

    return {
      allowed: false,
      retryAfterSeconds: Math.ceil(BLOG_BLOCK_MS / 1000),
      remaining: 0,
    };
  }

  blogRateLimiter.set(fingerprint, state);

  return {
    allowed: true,
    retryAfterSeconds: 0,
    remaining: Math.max(BLOG_RATE_MAX_REQUESTS - state.requestCount, 0),
  };
}

export async function middleware(req: NextRequest) {
  const adminToken = req.cookies.get(TOKEN.ADMIN)?.value;

  const url = req.nextUrl.clone();
  const isAdminPath = url.pathname.startsWith(PATH.ADMIN.DASHBOARD);
  const isLoginPath = url.pathname === PATH.ADMIN.LOGIN;
  const isPublicBlogPath = isBlogPath(url.pathname);

  // Protect all /admin routes except the login page
  if (isAdminPath && !isLoginPath) {
    if (!adminToken) {
      url.pathname = PATH.ADMIN.LOGIN;
      return NextResponse.redirect(url);
    }

    try {
      const payload = await verifyToken(adminToken);
      if (!payload || !payload.admin) {
        url.pathname = PATH.ADMIN.LOGIN;
        return NextResponse.redirect(url);
      }
    } catch {
      url.pathname = PATH.ADMIN.LOGIN;
      return NextResponse.redirect(url);
    }
  }

  // Redirect away from login page if already authenticated
  if (isLoginPath && adminToken) {
    try {
      const payload = await verifyToken(adminToken);
      if (payload && payload.admin) {
        url.pathname = PATH.ADMIN.DASHBOARD;
        return NextResponse.redirect(url);
      }
    } catch {
      // Token invalid, let them through to login
    }
  }

  if (
    isPublicBlogPath &&
    (req.method === "GET" || req.method === "HEAD") &&
    !TRUSTED_CRAWLER_PATTERN.test(req.headers.get("user-agent") || "")
  ) {
    const now = Date.now();
    pruneRateLimiter(now);

    const fingerprint = getClientFingerprint(req);
    const result = evaluateBlogRateLimit(fingerprint, now);

    if (!result.allowed) {
      return new NextResponse(
        "Bạn đang truy cập quá nhanh, hãy chậm lại và thử lại sau ít phút.",
        {
          status: 429,
          headers: {
            "Retry-After": String(result.retryAfterSeconds),
            "Cache-Control": "public, max-age=0, must-revalidate",
            "Content-Type": "text/plain; charset=utf-8",
          },
        },
      );
    }

    const response = NextResponse.next();
    response.headers.set("Cache-Control", BLOG_CACHE_HEADER);
    response.headers.set("X-RateLimit-Limit", String(BLOG_RATE_MAX_REQUESTS));
    response.headers.set("X-RateLimit-Remaining", String(result.remaining));
    return response;
  }

  if (isPublicBlogPath) {
    const response = NextResponse.next();
    response.headers.set("Cache-Control", BLOG_CACHE_HEADER);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/tin-tuc/:path*", "/blog/:path*"],
};
