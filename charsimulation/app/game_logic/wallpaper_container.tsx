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
    const [displayedChars, setDisplayedChars] = useState<CharacterDisplay[]>([]);

    const randomizeCharacters = () => {
        const count = Math.floor(Math.random() * chars.length) + 1;
        const availableChars = [...chars];
        const selected: CharacterDisplay[] = [];

        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * availableChars.length);
            const char = availableChars.splice(randomIndex, 1)[0];
            
            // Random position in a circular area (100x100 radius from center)
            const angle = Math.random() * 2 * Math.PI;
            const radius = Math.random() * 100;
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
                // Random movement between -20 and +20 pixels
                const deltaX = (Math.random() - 0.5) * 40;
                const deltaY = (Math.random() - 0.5) * 40;
                
                // Keep characters within bounds (±100px from center)
                const newX = Math.max(-100, Math.min(100, char.x + deltaX));
                const newY = Math.max(-100, Math.min(100, char.y + deltaY));
                
                return {
                    ...char,
                    x: newX,
                    y: newY
                };
            })
        );
    };

    useEffect(() => {
        randomizeCharacters();
    }, []);

    useEffect(() => {
        const interval = setInterval(moveCharacters, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-10">
            <div className="relative w-[200px] h-[200px]">
                {displayedChars.map((char) => (
                    <div
                        key={char.id}
                        className="absolute w-12 h-12 rounded-full border-2 border-white overflow-hidden transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out"
                        style={{
                            left: `${100 + char.x}px`,
                            top: `${100 + char.y}px`,
                        }}
                    >
                        <img 
                            src={char.image} 
                            alt={char.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

function Screen() {
    return (
        <div className="fixed inset-0 bg-black opacity-80 z-0 relative">
            <div className="absolute inset-0 retro-tv-filter"></div>
            <CharacterSelection />
        </div>
    );
}

export default Screen;