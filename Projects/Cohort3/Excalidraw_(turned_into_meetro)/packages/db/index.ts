import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { client: PrismaClient };

const client = globalForPrisma.client || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.client = client;
export default client;
