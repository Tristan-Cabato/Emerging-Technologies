"use client";

import Image from 'next/image'
import { ChevronLeft, ChevronRight, X, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { info } from "./game_logic/infoscreen";
import "./globals.css";
import { Character, chars } from "./game_logic/characters";

interface InfoPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export function InfoPopup({ isOpen, onClose }: InfoPopupProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? info.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === info.length - 1 ? 0 : prev + 1));
    };

    if (!isOpen) return null;

    const currentInfo = info[currentIndex];

    return (
        <>
            {/* Full-screen overlay for outside clicks */}
            <div 
                className="fixed inset-0 z-40"
                onClick={onClose}
            />
            
            {/* Popup content */}
            <div 
                className="w-[90vw] h-[90vh] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur flex items-center justify-center z-50 border-2 border-solid rounded-3xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative text-white max-w-4xl mx-4">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-red-500 transition-all"
                    >
                        <X size={20} />
                    </button>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">{currentInfo.title}</h2>

                {/* Image */}
                <div className="flex justify-center mb-6 md:mb-8">
                    <Image
                        src={currentInfo.image}
                        alt={currentInfo.title}
                        width={600}
                        height={500}
                        className="max-w-full h-auto rounded-lg"
                    />
                </div>

                {/* Description */}
                <div className="text-center mb-6 md:mb-8 max-w-2xl">
                    <p className="whitespace-pre-line text-sm md:text-lg">{currentInfo.description}</p>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={goToPrevious}
                        className="p-2 md:p-3 rounded-full hover:bg-green-200 hover:text-black transition-all"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    
                    <div className="flex space-x-2">
                        {info.map((_, index) => (
                            <div
                                key={index}
                                className={`w-3 h-3 rounded-full transition-colors ${
                                    index === currentIndex ? "bg-white" : "bg-white bg-opacity-50"
                                }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={goToNext}
                        className="p-2 md:p-3 rounded-full hover:bg-green-200 hover:text-black transition-all"
                    >
                        <ChevronRight size={24} />
                    </button>
                    <span className="hidden md:inline"> Click the 'x' button or outside the popup to close screen</span>
                </div>
            </div>
        </div>
        </>
    );
}

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
    const [containerSize, setContainerSize] = useState({ width: 800, height: 800 });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsClient(true);
        
        // Detect mobile and set container size
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            
            if (mobile) {
                const padding = 40;
                const size = Math.min(window.innerWidth - padding, window.innerHeight - 200);
                setContainerSize({ width: size, height: size });
            } else {
                setContainerSize({ width: 800, height: 800 });
            }
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
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

    const handleTouchStart = (e: React.TouchEvent, charId: string) => {
        const char = displayedChars.find(c => c.id === charId);
        if (!char) return;

        const touch = e.touches[0];
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        setDragOffset({
            x: touch.clientX - centerX,
            y: touch.clientY - centerY
        });
        setDraggedChar(charId);

        e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!draggedChar) return;

        const headerHeight = isMobile ? 100 : 150;
        const footerHeight = isMobile ? 100 : 150;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if (e.clientY <= headerHeight || e.clientY >= viewportHeight - footerHeight) {
            return;
        }

        const containerSelector = isMobile ? '.relative.w-\\[90vw\\]' : '.relative.w-\\[800px\\]';
        const containerRect = document.querySelector(containerSelector)?.getBoundingClientRect();
        if (!containerRect) return;

        const centerX = containerRect.left + containerRect.width / 2;
        const centerY = containerRect.top + containerRect.height / 2;

        const newX = e.clientX - centerX - dragOffset.x;
        const newY = e.clientY - centerY - dragOffset.y;

        // Constrain to container bounds
        const maxX = isMobile ? containerSize.width / 2 - 50 : 500;
        const maxY = isMobile ? containerSize.height / 2 - 50 : 400;
        const constrainedX = Math.max(-maxX, Math.min(maxX, newX));
        const constrainedY = Math.max(-maxY, Math.min(maxY, newY));

        setDisplayedChars(prevChars =>
            prevChars.map(char =>
                char.id === draggedChar
                    ? { ...char, x: constrainedX, y: constrainedY, isDragging: true }
                    : char
            )
        );
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (!draggedChar) return;

        const touch = e.touches[0];
        const headerHeight = isMobile ? 100 : 150;
        const footerHeight = isMobile ? 100 : 150;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if (touch.clientY <= headerHeight || touch.clientY >= viewportHeight - footerHeight) {
            return;
        }

        const containerSelector = isMobile ? '.relative.w-\\[90vw\\]' : '.relative.w-\\[800px\\]';
        const containerRect = document.querySelector(containerSelector)?.getBoundingClientRect();
        if (!containerRect) return;

        const centerX = containerRect.left + containerRect.width / 2;
        const centerY = containerRect.top + containerRect.height / 2;

        const newX = touch.clientX - centerX - dragOffset.x;
        const newY = touch.clientY - centerY - dragOffset.y;

        // Constrain to container bounds
        const maxX = isMobile ? containerSize.width / 2 - 50 : 500;
        const maxY = isMobile ? containerSize.height / 2 - 50 : 400;
        const constrainedX = Math.max(-maxX, Math.min(maxX, newX));
        const constrainedY = Math.max(-maxY, Math.min(maxY, newY));

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
            document.addEventListener('touchmove', handleTouchMove, { passive: false });
            document.addEventListener('touchend', handleMouseUp);
            
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                document.removeEventListener('touchmove', handleTouchMove);
                document.removeEventListener('touchend', handleMouseUp);
            };
        }
    }, [draggedChar, dragOffset, isMobile, containerSize]);

    const randomizeCharacters = () => {
        const count = Math.floor(Math.random() * Math.min(20, chars.length)) + 1;
        const availableChars = [...chars];
        const selected: CharacterDisplay[] = [];

        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * availableChars.length);
            const char = availableChars.splice(randomIndex, 1)[0];

            // Random position in a circular area (adjust radius for mobile)
            const angle = Math.random() * 2 * Math.PI;
            const radius = Math.random() * (isMobile ? containerSize.width / 3 : 250);
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
                
                const deltaX = (Math.random() - 0.5) * (isMobile ? containerSize.width / 2 : 600);
                const deltaY = (Math.random() - 0.5) * (isMobile ? containerSize.height / 2 : 600);

                const maxX = isMobile ? containerSize.width / 2 - 50 : 180;
                const maxY = isMobile ? containerSize.height / 2 - 50 : 180;
                const newX = Math.max(-maxX, Math.min(maxX, char.x + deltaX));
                const newY = Math.max(-maxY, Math.min(maxY, char.y + deltaY));

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
                
                const deltaX = (Math.random() - 0.5) * (isMobile ? containerSize.width / 2 : 600);
                const deltaY = (Math.random() - 0.5) * (isMobile ? containerSize.height / 2 : 600);

                const maxX = isMobile ? containerSize.width / 2 - 50 : 180;
                const maxY = isMobile ? containerSize.height / 2 - 50 : 180;
                const newX = Math.max(-maxX, Math.min(maxX, char.x + deltaX));
                const newY = Math.max(-maxY, Math.min(maxY, char.y + deltaY));

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
            {/* Restriction zone indicators - hide on mobile */}
            {!isMobile && (
                <>
                    <div className="fixed top-0 bottom-0 left-0 safi-color pointer-events-none z-5" style={{ width: '200px', filter: 'blur(8px)' }} />
                    <div className="fixed top-0 bottom-0 right-0 safi-color pointer-events-none z-5" style={{ width: '200px', filter: 'blur(8px)' }} />
                </>
            )}
            
            <div 
                className={`relative ${isMobile ? 'w-[90vw] h-[90vw] max-w-[500px] max-h-[500px]' : 'w-[800px] h-[800px]'}`}
                style={{ width: isMobile ? containerSize.width : undefined, height: isMobile ? containerSize.height : undefined }}
            >
                {isClient && displayedChars.map((char) => (
                    <div
                        key={char.id}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${char.isDragging ? 'cursor-grabbing transition-none' : 'cursor-grab transition-all duration-1000 ease-in-out'}`}
                        style={{
                            left: `${(isMobile ? containerSize.width / 2 : 400) + char.x}px`,
                            top: `${(isMobile ? containerSize.height / 2 : 400) + char.y}px`,
                        }}
                        onMouseDown={(e) => handleMouseDown(e, char.id)}
                        onTouchStart={(e) => handleTouchStart(e, char.id)}
                    >
                        {/* Stars on the left */}
                        <div className={`absolute ${isMobile ? '-left-8' : '-left-10'} top-1/2 -translate-y-1/2 ${getStarColor(char.rarity)} ${isMobile ? 'text-xs' : 'text-sm'} font-bold whitespace-nowrap flex gap-1 items-center`}>
                            {char.rarity}
                            <Star size={isMobile ? 12 : 16} /> 
                        </div>

                        {/* Character circle */}
                        <div className={`relative ${isMobile ? 'w-16 h-16' : 'w-22 h-22'} rounded-full border-2 border-white overflow-hidden`}>
                            <img
                                src={char.image}
                                alt={char.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Name on top */}
                        <div className={`absolute ${isMobile ? '-top-5' : '-top-6'} left-1/2 -translate-x-1/2 text-white ${isMobile ? 'text-[10px]' : 'text-xs'} font-semibold whitespace-nowrap text-center`}>
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