"use client";

import { Header, Footer } from "./headerfooter";
import Screen from "./game_logic/wallpaper_container";
import MobileScreen from "./mobile_view";
import { useState, useEffect } from "react";
import { InfoPopup } from "./mobile_view";

export default function Home() {
  const [redrawKey, setRedrawKey] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleRedraw = () => {
    setRedrawKey(prev => prev + 1);
  };

  const handleCharacterCountChange = (count: number) => {
    setCharacterCount(count);
  };

  const handleInfoClick = () => {
    setIsInfoOpen(true);
  };

  const handleInfoClose = () => {
    setIsInfoOpen(false);
  };

  return (
    <>
      <Header onRedraw={handleRedraw} onInfoClick={handleInfoClick} />
      {isMobile ? (
        <MobileScreen key={redrawKey} onCharacterCountChange={handleCharacterCountChange} />
      ) : (
        <Screen key={redrawKey} onCharacterCountChange={handleCharacterCountChange} />
      )}
      <Footer characterCount={characterCount} />
      <InfoPopup isOpen={isInfoOpen} onClose={handleInfoClose} />
    </>
  );
}
