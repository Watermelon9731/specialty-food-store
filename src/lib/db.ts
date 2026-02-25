import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig, Pool } from "@neondatabase/serverless";

// Required for the Neon serverless driver in edge environments
// (no-op in Node, but needed for Cloudflare Workers)
if (typeof WebSocket === "undefined") {
  // In Node.js (local dev), the WebSocket polyfill is handled automatically
} else {
  neonConfig.webSocketConstructor = WebSocket;
}

function createPrismaClient() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
  const adapter = new PrismaNeon(pool as any); // eslint-disable-line @typescript-eslint/no-explicit-any
  return new PrismaClient({ adapter } as any); // eslint-disable-line @typescript-eslint/no-explicit-any
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
