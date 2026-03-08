// lib/auth-client.ts
import { createAuthClient } from "better-auth/react"; // <--- This sub-path is built into 'better-auth'
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { authOptions } from "./auth";

export const authClient = createAuthClient({
    baseURL: typeof window !== "undefined" ? window.location.origin : process.env.NEXT_PUBLIC_APP_URL || "https://authenticationapp-vert.vercel.app",
    plugins: [
        inferAdditionalFields<typeof authOptions>()
    ]
});

export const { useSession, signIn, signUp, signOut, getSession } = authClient;
