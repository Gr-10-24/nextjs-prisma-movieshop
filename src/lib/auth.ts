import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { myPlugin } from "@/lib/plugin";

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    admin({
      defaultRole: "CUSTOMER",
      adminRole: "ADMIN",
    }),
    nextCookies(),
    myPlugin(),
  ],
});
