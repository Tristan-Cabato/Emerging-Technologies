import "./globals.css";
import Header, { Footer, IncrementButton } from "./headerfooter";

export default function Home() {
  return (
    <>
      <Header />
      <IncrementButton />
      <div className="min-h-screen flex flex-col items-center justify-center">
        
        <h1 className="text-center text-4xl font-ubuntu">Home Page</h1>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="block p-8 w-96 h-96 rounded-full animate-fading shadow-lg"
          src="https://pbs.twimg.com/media/G-gaGUoXcAIcFwd?format=jpg&name=large"
          alt="Sparxie Situation is crazy"
        />
      </div>
      <Footer />
    </>
  );
}
