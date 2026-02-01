import "./globals.css"
import { RefreshCcw, Info, Triangle, Github } from "lucide-react";

interface HeaderProps {
    onRedraw: () => void;
    onInfoClick: () => void;
}

interface FooterProps {
    characterCount: number;
}

function Header({ onRedraw, onInfoClick }: HeaderProps) {
    return (
        <header className="fixed top-0 flex items-center justify-between w-full safi-color p-10 z-3">
            <h1 className="left-0 text-2xl">Character Homescreen Simulator</h1>
            <div className="flex items-center space-x-8">
                <button
                    className="flex items-center gap-1 rounded hover:scale-120 hover:text-blue-400 transition-all"
                    onClick={onRedraw}
                >
                    <RefreshCcw size={16} />
                    <span>Redraw</span>
                </button>
                <button 
                    className="flex items-center gap-1 rounded hover:scale-120 hover:text-gray-400 transition-all"
                    onClick={onInfoClick}
                >
                    <Info size={16} />
                    <span>Info</span>
                </button>
            </div>
        </header>
    );
}

function Footer({ characterCount }: FooterProps) {
    return (
        <footer className="fixed bottom-0 flex items-center justify-between w-full safi-color p-10 z-3">
            <div> Characters on screen: <span id="charCount">{characterCount}</span> </div>
            <a href="https://vercel.com/safirezs-projects/emerging-technologies" target="_blank" rel="noopener noreferrer" className="hover:scale-110 hover:font-bold hover:text-purple-500 transition-all flex items-center gap-1">
                <Triangle size={16} />
                Vercel Repository
            </a>
            <a href="https://github.com/Tristan-Cabato/Emerging-Technologies/tree/main/charsimulation" target="_blank" rel="noopener noreferrer" className="hover:scale-110 hover:font-bold hover:text-blue-500 transition-all flex items-center gap-1">
                <Github size={16} />
                Github Repository
            </a>
        </footer>
    );
}

export { Header, Footer };