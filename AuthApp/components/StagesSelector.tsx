"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";

interface Stage {
  id: string;
  name: string;
  description: string;
}

interface UserBubble {
  id: string;
  email: string;
  initials: string;
  stageId: string;
  position: { x: number; y: number };
  color: string;
}

const PRESET_STAGES: Stage[] = [
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

export default function StagesSelector() {
  const { data: session } = useSession();
  const [selectedStage, setSelectedStage] = useState<string>("");
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

  // Save bubbles to localStorage whenever they change
  useEffect(() => {
    if (userBubbles.length > 0) {
      localStorage.setItem("userBubbles", JSON.stringify(userBubbles));
    }
  }, [userBubbles]);

  const handleStageSelect = (stageId: string) => {
    setSelectedStage(stageId);
  };

  const handleStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedStage || !session?.user?.email) return;

    const rect = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    
    // Boundary constraints - keep bubble within stage container
    const bubbleSize = 40; // w-10 h-10 = 40px
    const padding = 10; // Small padding from edges
    
    x = Math.max(padding + bubbleSize/2, Math.min(x, rect.width - padding - bubbleSize/2));
    y = Math.max(padding + bubbleSize/2, Math.min(y, rect.height - padding - bubbleSize/2));

    const userEmail = session.user.email;
    const initials = userEmail
      .split("@")[0]
      .split(".")
      .map((part: string) => part[0]?.toUpperCase() || "")
      .join("")
      .slice(0, 2);

    // Check if user already has a bubble in this stage
    const existingBubble = userBubbles.find(
      bubble => bubble.email === userEmail && bubble.stageId === selectedStage
    );

    if (existingBubble) {
      // Update existing bubble position
      setUserBubbles(prev => prev.map(bubble => 
        bubble.id === existingBubble.id 
          ? { ...bubble, position: { x, y } }
          : bubble
      ));
    } else {
      // Create new bubble
      const newBubble: UserBubble = {
        id: Date.now().toString(),
        email: userEmail,
        initials,
        stageId: selectedStage,
        position: { x, y },
        color: getUserColor(userEmail),
      };

      setUserBubbles(prev => [...prev, newBubble]);
    }
  };

  const getBubblesForStage = (stageId: string): UserBubble[] => {
    return userBubbles.filter(bubble => bubble.stageId === stageId);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Project Stages</h2>
        {session?.user?.email && (
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 ${getUserColor(session.user.email)} text-white rounded-full flex items-center justify-center text-xs font-bold`}>
              {session.user.email
                .split("@")[0]
                .split(".")
                .map((part: string) => part[0]?.toUpperCase() || "")
                .join("")
                .slice(0, 2)}
            </div>
            <span className="text-sm text-white">{session.user.email}</span>
          </div>
        )}
      </div>
      
      {/* Stage Selector */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-white">Select a Stage:</h3>
        <div className="flex flex-wrap gap-3">
          {PRESET_STAGES.map(stage => (
            <button
              key={stage.id}
              onClick={() => handleStageSelect(stage.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedStage === stage.id
                  ? "bg-zinc-600 text-white shadow-lg"
                  : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"
              }`}
              title={stage.description}
            >
              {stage.name}
            </button>
          ))}
        </div>
      </div>

      {/* Stages Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRESET_STAGES.map(stage => (
          <div
            key={stage.id}
            className={`relative bg-white border-2 rounded-xl p-4 min-h-[200px] cursor-crosshair transition-all ${
              selectedStage === stage.id
                ? "border-zinc-500 shadow-lg"
                : "border-zinc-300 hover:border-zinc-400"
            }`}
            onClick={handleStageClick}
          >
            <h4 className="font-semibold text-zinc-800 mb-2">{stage.name}</h4>
            <p className="text-sm text-zinc-600 mb-4">{stage.description}</p>
            
            {/* User Bubbles */}
            <div className="relative">
              {getBubblesForStage(stage.id).map((bubble: UserBubble) => (
                <div
                  key={bubble.id}
                  className={`absolute w-10 h-10 ${bubble.color} text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md hover:scale-110 transition-transform cursor-pointer`}
                  style={{
                    left: `${bubble.position.x - 20}px`,
                    top: `${bubble.position.y - 20}px`,
                  }}
                  title={bubble.email}
                >
                  {bubble.initials}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedStage && (
        <div className="mt-4 p-3 bg-zinc-50 border border-zinc-200 rounded-lg">
          <p className="text-sm text-zinc-700">
            Click anywhere in the "{PRESET_STAGES.find(s => s.id === selectedStage)?.name}" stage to place your bubble there
          </p>
        </div>
      )}
    </div>
  );
}
