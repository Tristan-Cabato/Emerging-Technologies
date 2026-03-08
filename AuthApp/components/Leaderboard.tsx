"use client";

import { useState, useEffect } from "react";
import { Trophy, Users, Trash2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";

interface UserBubble {
  id: string;
  email: string;
  initials: string;
  stageId: string;
  position: { x: number; y: number };
  color: string;
}

const PRESET_STAGES = [
  { id: "stage1", name: "Planning", description: "Initial planning phase" },
  { id: "stage2", name: "Development", description: "Development phase" },
  { id: "stage3", name: "Testing", description: "Testing and QA phase" },
  { id: "stage4", name: "Deployment", description: "Deployment phase" },
  { id: "stage5", name: "Maintenance", description: "Maintenance phase" },
];

// Generate consistent color for each user based on their email
const getUserColor = (email: string): string => {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-orange-500',
    'bg-teal-500',
    'bg-cyan-500',
  ];
  
  // Create a hash from email to select consistent color
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export default function Leaderboard() {
  const { data: session } = useSession();
  const [userBubbles, setUserBubbles] = useState<UserBubble[]>([]);

  // Load bubbles from localStorage on mount
  useEffect(() => {
    const storedBubbles = localStorage.getItem("userBubbles");
    if (storedBubbles) {
      const parsedBubbles = JSON.parse(storedBubbles);
      // Migrate existing bubbles to include colors
      const migratedBubbles = parsedBubbles.map((bubble: any) => ({
        ...bubble,
        color: bubble.color || getUserColor(bubble.email)
      }));
      setUserBubbles(migratedBubbles);
    }
  }, []);

  const clearAllBubbles = () => {
    if (confirm("Are you sure you want to clear all bubbles? This action cannot be undone.")) {
      setUserBubbles([]);
      localStorage.removeItem("userBubbles");
    }
  };

  // Group bubbles by user email
  const usersWithStages = userBubbles.reduce((acc, bubble) => {
    if (!acc[bubble.email]) {
      acc[bubble.email] = {
        email: bubble.email,
        initials: bubble.initials,
        color: bubble.color,
        stages: [],
      };
    }
    const stageName = PRESET_STAGES.find(s => s.id === bubble.stageId)?.name || bubble.stageId;
    if (!acc[bubble.email].stages.includes(stageName)) {
      acc[bubble.email].stages.push(stageName);
    }
    return acc;
  }, {} as Record<string, any>);

  const usersList = Object.values(usersWithStages);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-200 border-solid rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <h2 className="text-2xl font-bold text-gray-800">Leaderboard</h2>
        </div>
        
        <button
          onClick={clearAllBubbles}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <Trash2 size={16} />
          Clear All Bubbles
        </button>
      </div>

      <div className="bg-zinc-400 rounded-xl shadow-lg border border-zinc-200 overflow-hidden text-white">
        <div className="bg-gradient-to-r from-zinc-600 to-zinc-700 text-white p-4">
          <div className="flex items-center gap-2">
            <Users size={20} />
            <h3 className="text-lg font-semibold">User Progress Overview</h3>
          </div>
          <p className="text-sm text-zinc-100 mt-1">
            {usersList.length} user{usersList.length !== 1 ? 's' : ''} across {PRESET_STAGES.length} stages
          </p>
        </div>

        {usersList.length === 0 ? (
          <div className="p-8 text-center text-white">
            <Users className="w-16 h-16 mx-auto mb-4 text-zinc-300" />
            <p className="text-lg">No users have placed bubbles yet</p>
            <p className="text-sm mt-2">Start by placing bubbles in different stages!</p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-200">
            {usersList.map((user: any, index: number) => (
              <div key={user.email} className="p-4 hover:bg-zinc-500 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${user.color} text-white rounded-full flex items-center justify-center text-sm font-bold`}>
                        {user.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{user.email}</p>
                        <p className="text-sm text-zinc-200">
                          {user.stages.length} stage{user.stages.length !== 1 ? 's' : ''} completed
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="flex flex-wrap gap-1 justify-end">
                        {user.stages.map((stage: string) => (
                          <span
                            key={stage}
                            className="px-2 py-1 bg-zinc-100 text-zinc-700 text-xs rounded-full font-medium"
                          >
                            {stage}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stage Summary */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {PRESET_STAGES.map(stage => {
          const userCount = userBubbles.filter(bubble => bubble.stageId === stage.id).length;
          return (
            <div key={stage.id} className="bg-zinc-400 rounded-lg border border-zinc-200 p-3 text-center text-white">
              <h4 className="font-semibold text-white text-sm">{stage.name}</h4>
              <p className="text-2xl font-bold text-white mt-1">{userCount}</p>
              <p className="text-xs text-zinc-200">user{userCount !== 1 ? 's' : ''}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
