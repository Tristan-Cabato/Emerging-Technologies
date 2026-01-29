import Image from "next/image";
import {Header, Footer} from "./headerfooter";
import Screen from "./game_logic/wallpaper_container";

export default function Home() {
  return (
    <>
    <Header />
      <Screen />
    <Footer />
    </>
  );
}
