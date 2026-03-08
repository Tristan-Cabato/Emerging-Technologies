import { betterAuth, BetterAuthOptions } from "better-auth";
import { bearer } from "better-auth/plugins";
import { pool } from "./db";

export const authOptions = {
    database: pool,
    user: { 
        modelName: "users",
        additionalFields: {
            active: {
                type: "boolean",
            },
        },
    },
    session: { modelName: "sessions" },
    account: { modelName: "accounts" },
    verification: { modelName: "verifications" },

    emailAndPassword: {
        enabled: true,
    },
    
    plugins: [
        bearer()
    ],
                   
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL || process.env.VERCEL_URL
} satisfies BetterAuthOptions;

export const auth = betterAuth(authOptions);

export type Auth = typeof auth;