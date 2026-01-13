"use client";

import { useState } from 'react';
import Link from 'next/link';
import "./globals.css"

export default function Header() {

 return (
    <>
        <div className="sticky top-0 bg-gray-800 text-white p-4 font-sans ml-24">
            <div className="flex container mx-auto justify-between">

                <div className="flex items-center space-x-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:enklsfmeecrbb4ied4ondsvm/bafkreia3ofv2q64p5fvb5pgxlytspcpbh7suqmuughjxvbbxut4rdeyalq@jpeg" alt="Safire Zikaly" className="w-10 h-10 rounded-full" />
                    <span > Safire Zikaly </span>
                </div>

                <nav className="flex items-center space-x-4">
                    <Link href="/" className="transition duration-300 ease-in-out hover:text-blue-400 hover:scale-135">Home</Link>
                    <Link href="/about" className="transition duration-300 ease-in-out hover:text-blue-400 hover:scale-135">About</Link>
                    <Link href="/contact" className="transition duration-300 ease-in-out hover:text-blue-400 hover:scale-135">Contact</Link>
                </nav>

            </div>
        </div>
    </>
);

}

export function Footer() {
  return (
    <footer className="sticky bottom-0 bg-gray-800 text-white p-4 justify-* text-center ml-24">
      This is the Footer
    </footer>
  );
}

export function IncrementButton() {
  const [count, setCount] = useState(63);

  return (
    <div className="fixed left-0 top-0 h-screen w-24 flex flex-col items-center justify-center">
      <button 
        onClick={() => setCount(c => c + 1)}
        className="w-full h-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all duration-200 hover:w-28 group relative"
      >
        <div className="flex flex-col items-center">
          <span className="[writing-mode:vertical-rl] transform rotate-180 mb-2 group-hover:mb-4 transition-all duration-200">
            Increment
          </span>
          <span className="text-2xl font-bold">{count}</span>
        </div>
        {count === 67 && (
          <div className="absolute -right-40 top-1/2 transform -translate-y-1/2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://media1.tenor.com/m/_i3CPf0XlJYAAAAC/nub-nub-cat.gif"
              alt="Special 67!"
              className="w-32 h-32 rounded-full animate-bounce"
            />
          </div>
        )}
      </button>
    </div>
  );
}