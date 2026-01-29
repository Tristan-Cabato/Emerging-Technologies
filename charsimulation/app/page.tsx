"use client";

import { Header, Footer } from "./headerfooter";
import Screen from "./game_logic/wallpaper_container";
import { useState } from "react";

export default function Home() {
  const [redrawKey, setRedrawKey] = useState(0);

  const handleRedraw = () => {
    setRedrawKey(prev => prev + 1);
  };

  return (
    <>
      <Header onRedraw={handleRedraw} />
      <Screen key={redrawKey} />
      <Footer />
    </>
  );
}
