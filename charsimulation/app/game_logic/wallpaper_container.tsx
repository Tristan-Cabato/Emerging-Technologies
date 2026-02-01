"use client";

import "../globals.css";
import { Star } from 'lucide-react';
import { useState, useEffect } from "react";
import { Character, chars } from "./characters";

interface CharacterDisplay extends Character {
    id: string;
    x: number;
    y: number;
    isDragging?: boolean;
}

const getStarColor = (rarity: number): string => {
    switch (rarity) {
        case 7: return 'text-pink-400';
        case 6: return 'text-red-500';
        case 5: return 'text-yellow-400';
        case 4: return 'text-purple-500';
        case 3: return 'text-violet-400';
        case 2: return 'text-blue-500';
        case 1: return 'text-gray-400';
        default: return 'text-yellow-400';
    }
};

function CharacterSelection({ onCharacterCountChange }: { onCharacterCountChange?: (count: number) => void }) {
    const [isClient, setIsClient] = useState(false);
    const [displayedChars, setDisplayedChars] = useState<CharacterDisplay[]>([]);
    const [draggedChar, setDraggedChar] = useState<string | null>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        randomizeCharacters();
    }, []);

    const handleMouseDown = (e: React.MouseEvent, charId: string) => {
        const char = displayedChars.find(c => c.id === charId);
        if (!char) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        setDragOffset({
            x: e.clientX - centerX,
            y: e.clientY - centerY
        });
        setDraggedChar(charId);

        e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!draggedChar) return;

        const headerHeight = 150; // Padding Approximate
        const footerHeight = 150;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if (e.clientY <= headerHeight || e.clientY >= viewportHeight - footerHeight) {
            return;
        }

        const containerRect = document.querySelector('.relative.w-\\[800px\\]')?.getBoundingClientRect();
        if (!containerRect) return;

        const centerX = containerRect.left + containerRect.width / 2;
        const centerY = containerRect.top + containerRect.height / 2;

        const newX = e.clientX - centerX - dragOffset.x;
        const newY = e.clientY - centerY - dragOffset.y;

        // Constrain to container bounds
        const constrainedX = Math.max(-500, Math.min(500, newX));
        const constrainedY = Math.max(-400, Math.min(400, newY));

        setDisplayedChars(prevChars =>
            prevChars.map(char =>
                char.id === draggedChar
                    ? { ...char, x: constrainedX, y: constrainedY, isDragging: true }
                    : char
            )
        );
    };

    const handleMouseUp = () => {
        if (draggedChar) {
            setDisplayedChars(prevChars =>
                prevChars.map(char =>
                    char.id === draggedChar
                        ? { ...char, isDragging: false }
                        : char
                )
            );
            setDraggedChar(null);
        }
    };

    useEffect(() => {
        if (draggedChar) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [draggedChar, dragOffset]);

    const randomizeCharacters = () => {
        const count = Math.floor(Math.random() * Math.min(11, chars.length)) + 1;
        const availableChars = [...chars];
        const selected: CharacterDisplay[] = [];

        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * availableChars.length);
            const char = availableChars.splice(randomIndex, 1)[0];

            // Random position in a circular area (300x300 radius from center)
            const angle = Math.random() * 2 * Math.PI;
            const radius = Math.random() * 250;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            selected.push({
                ...char,
                id: `${char.name}-${Date.now()}-${i}`,
                x,
                y
            });
        }

        setDisplayedChars(selected);
        
        // Notify parent of character count
        if (onCharacterCountChange) {
            onCharacterCountChange(count);
        }
    };

    const moveCharacters = () => {
        
        setDisplayedChars(prevChars =>
            prevChars.map(char => {
                if (char.isDragging) return char;
                
                const deltaX = (Math.random() - 0.5) * 600;
                const deltaY = (Math.random() - 0.5) * 600;

                const newX = Math.max(-180, Math.min(180, char.x + deltaX));
                const newY = Math.max(-180, Math.min(180, char.y + deltaY));

                return {
                    ...char,
                    x: newX,
                    y: newY
                };
            })
        );
    };

    const moveCharacter = (charId: string) => {
        setDisplayedChars(prevChars =>
            prevChars.map(char => {
                if (char.id !== charId || char.isDragging) return char;
                
                const deltaX = (Math.random() - 0.5) * 600;
                const deltaY = (Math.random() - 0.5) * 600;

                const newX = Math.max(-180, Math.min(180, char.x + deltaX));
                const newY = Math.max(-180, Math.min(180, char.y + deltaY));

                return {
                    ...char,
                    x: newX,
                    y: newY
                };
            })
        );
    };

    useEffect(() => {
        const intervals: NodeJS.Timeout[] = [];
        
        displayedChars.forEach((char) => {
            // (800ms - 2000ms)
            const interval = Math.random() * 1200 + 800;
            
            const timer = setInterval(() => {
                moveCharacter(char.id);
            }, interval);
            
            intervals.push(timer);
        });
        
        return () => intervals.forEach(clearInterval);
    }, [displayedChars.length]);

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            {/* Restriction zone indicators */}
                <div className="fixed top-0 bottom-0 left-0 safi-color pointer-events-none z-5" style={{ width: '200px', filter: 'blur(8px)' }} />
                <div className="fixed top-0 bottom-0 right-0 safi-color pointer-events-none z-5" style={{ width: '200px', filter: 'blur(8px)' }} />
            
            <div className="relative w-[800px] h-[800px]">
                {isClient && displayedChars.map((char) => (
                    <div
                        key={char.id}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${char.isDragging ? 'cursor-grabbing transition-none' : 'cursor-grab transition-all duration-1000 ease-in-out'}`}
                        style={{
                            left: `${400 + char.x}px`,
                            top: `${400 + char.y}px`,
                        }}
                        onMouseDown={(e) => handleMouseDown(e, char.id)}
                    >
                        {/* Stars on the left */}
                        <div className={`absolute -left-10 top-1/2 -translate-y-1/2 ${getStarColor(char.rarity)} text-sm font-bold whitespace-nowrap flex gap-1 items-center`}>
                            {char.rarity}
                            <Star /> 
                        </div>

                        {/* Character circle */}
                        <div className="relative w-22 h-22 rounded-full border-2 border-white overflow-hidden">
                            <img
                                src={char.image}
                                alt={char.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Name on top */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-white text-xs font-semibold whitespace-nowrap text-center">
                            {char.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

interface ScreenProps {
    onCharacterCountChange?: (count: number) => void;
}

function Screen({ onCharacterCountChange }: ScreenProps) {
    const [showSwipe, setShowSwipe] = useState(true);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const swipeTimer = setTimeout(() => {
            setShowSwipe(false);
        }, 500);

        const contentTimer = setTimeout(() => {
            setShowContent(true);
        }, 100);

        return () => {
            clearTimeout(swipeTimer);
            clearTimeout(contentTimer);
        };
    }, []);

    return (
        <>
            {/* Swipe Transition */}
            <div className={`fixed inset-0 saf-color z-1 size-[300vw] ${showSwipe ? 'animate-swipe' : 'opacity-0 pointer-events-none'}`}></div>

            {showContent && (
                <div className="fixed inset-0 bg-[url('https://64.media.tumblr.com/bb47dd29dd10a70938b643bcc5c4871d/4a9c6d7d6c7c8f52-7c/s540x810/31e928185ff935bd3d778ffe0af01fb4ca4d9a6c.png')] bg-cover opacity-60 z-0 transition-all duration-300">
                    <div className="absolute inset-0 retro-tv-filter z-[-1]"></div>
                    <CharacterSelection onCharacterCountChange={onCharacterCountChange} />
                </div>
            )}
        </>
    );
}

export default Screen;