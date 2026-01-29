import "./globals.css"
import { RefreshCcw, Info } from "lucide-react";

function Header() {
    return (
        <header className="fixed top-0 flex items-center justify-between w-full safi-color bg-opacity-90 p-10 z-3">
            <h1 className="left-0 text-2xl">Pet Simulator</h1>
            <div className="flex items-center space-x-8">   
                <button className="flex items-center gap-1 rounded hover:scale-120 hover:text-blue-400 transition-all">
                    <RefreshCcw size={16} />
                    <span>Redraw</span>
                </button>
                <button className="flex items-center gap-1 rounded hover:scale-120 hover:text-gray-400 transition-all">
                    <Info size={16} />
                    <span>Info</span>
                </button>
            </div>
        </header>
    );
}

function Footer() {
    return (
        <footer className="fixed bottom-0 flex items-center justify-center w-full safi-color bg-opacity-90 p-10 z-3">
            <h1>Footer</h1>
        </footer>
    );
}

export {Header, Footer};