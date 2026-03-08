// lib/auth-client.ts
import { createAuthClient } from "better-auth/react"; // <--- This sub-path is built into 'better-auth'
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { AuthOptions } from "./auth";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_APP_URL || "https://authenticationapp-vert.vercel.app",
    plugins: [
        inferAdditionalFields<AuthOptions>()
    ]
});

export const { useSession, signIn, signUp, signOut, getSession } = authClient;
