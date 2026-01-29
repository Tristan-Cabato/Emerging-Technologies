"use client";

import "../globals.css";
import { useState, useEffect } from "react";
import { Character, chars } from "./characters";

interface CharacterDisplay extends Character {
    id: string;
    x: number;
    y: number;
}

function CharacterSelection() {
    const [displayedChars, setDisplayedChars] = useState<CharacterDisplay[]>(() => {
        const count = Math.floor(Math.random() * chars.length) + 1;
        const availableChars = [...chars];
        const selected: CharacterDisplay[] = [];

        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * availableChars.length);
            const char = availableChars.splice(randomIndex, 1)[0];

            // Random position in a circular area (400x400 radius from center)
            const angle = Math.random() * 2 * Math.PI;
            const radius = Math.random() * 400;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            selected.push({
                ...char,
                id: `${char.name}-${Date.now()}-${i}`,
                x,
                y
            });
        }

        return selected;
    });

    const randomizeCharacters = () => {
        const count = Math.floor(Math.random() * chars.length) + 1;
        const availableChars = [...chars];
        const selected: CharacterDisplay[] = [];

        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * availableChars.length);
            const char = availableChars.splice(randomIndex, 1)[0];

            // Random position in a circular area (400x400 radius from center)
            const angle = Math.random() * 2 * Math.PI;
            const radius = Math.random() * 400;
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
    };

    const moveCharacters = () => {
        setDisplayedChars(prevChars =>
            prevChars.map(char => {
                // Random movement between -300 and +300 pixels
                const deltaX = (Math.random() - 0.5) * 600;
                const deltaY = (Math.random() - 0.5) * 600;

                // Keep characters within bounds (±300px from center)
                const newX = Math.max(-300, Math.min(300, char.x + deltaX));
                const newY = Math.max(-300, Math.min(300, char.y + deltaY));

                return {
                    ...char,
                    x: newX,
                    y: newY
                };
            })
        );
    };

    useEffect(() => {
        setTimeout(() => {
            randomizeCharacters();
        }, 100);
    }, []);

    useEffect(() => {
        const interval = setInterval(moveCharacters, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-10">
            <div className="relative w-[800px] h-[800px]">
                {displayedChars.map((char) => (
                    <div suppressHydrationWarning
                        key={char.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out"
                        style={{
                            left: `${400 + char.x}px`,
                            top: `${400 + char.y}px`,
                        }}
                    >
                        {/* Stars on the left */}
                        <div className="absolute -left-8 top-1/2 -translate-y-1/2 text-yellow-400 text-sm font-bold whitespace-nowrap" suppressHydrationWarning>
                            {char.rarity} ⭐
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

function Screen() {
    return (
        <div className="fixed inset-0 bg-black opacity-60 z-0 retro-tv-filter">
            <CharacterSelection />
            <div className="absolute inset-0 retro-tv-filter z-[-1]"></div>
        </div>
    );
}

export default Screen;