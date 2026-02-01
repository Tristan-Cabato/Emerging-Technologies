"use client";

import { Header, Footer } from "./headerfooter";
import Screen from "./game_logic/wallpaper_container";
import { useState } from "react";
import InfoPopup from "./game_logic/InfoPopup";

export default function Home() {
  const [redrawKey, setRedrawKey] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

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
      <Screen key={redrawKey} onCharacterCountChange={handleCharacterCountChange} />
      <Footer characterCount={characterCount} />
      <InfoPopup isOpen={isInfoOpen} onClose={handleInfoClose} />
    </>
  );
}
