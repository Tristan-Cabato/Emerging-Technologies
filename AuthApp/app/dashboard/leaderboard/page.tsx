import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Leaderboard from "@/components/Leaderboard";

export default async function LeaderboardPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/");
    }

    return (
        <div className="min-h-screen p-8">
            <Leaderboard />
        </div>
    );
}
