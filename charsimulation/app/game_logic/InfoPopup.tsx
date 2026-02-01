"use client";

import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { info } from "./infoscreen";

interface InfoPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function InfoPopup({ isOpen, onClose }: InfoPopupProps) {
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
        <div className="w-[90vw] h-[90vh] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur flex items-center justify-center z-50 border-2 border-solid rounded-3xl">
            <div className="relative text-white max-w-4xl mx-4">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-red-500 transition-all"
                >
                    <X size={20} />
                </button>

                {/* Title */}
                <h2 className="text-3xl font-bold text-center mb-8">{currentInfo.title}</h2>

                {/* Image */}
                <div className="flex justify-center mb-8">
                    <Image
                        src={currentInfo.image}
                        alt={currentInfo.title}
                        width={600}
                        height={500}
                        className="max-w-full h-auto rounded-lg"
                    />
                </div>

                {/* Description */}
                <div className="text-center mb-8 max-w-2xl">
                    <p className="whitespace-pre-line text-lg">{currentInfo.description}</p>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={goToPrevious}
                        className="p-3 rounded-full hover:bg-green-200 hover:text-black transition-all"
                    >
                        <ChevronLeft size={32} />
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
                        className="p-3 rounded-full hover:bg-green-200 hover:text-black transition-all"
                    >
                        <ChevronRight size={32} />
                    </button>
                </div>
            </div>
        </div>
    );
}
