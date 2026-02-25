import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig, Pool } from "@neondatabase/serverless";

// Use HTTP fetch instead of WebSocket — works on Cloudflare Workers
// without any Node.js native modules (ws, net, tls, etc.)
neonConfig.poolQueryViaFetch = true;

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
