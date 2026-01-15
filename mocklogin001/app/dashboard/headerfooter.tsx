// app/dashboard/headerfooter.tsx - Header and Footer
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';


export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
     router.push('/');   //Reroute to Login Page
  };

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-saf-color shadow flex items-center justify-between px-6 z-50">
      {/* Left - Logo */}
      <div className="text-xl font-semibold">
        Dashboard
      </div>

      {/* Right - Nav */}
      <nav className="flex items-center space-x-6">
        <Link
          href="/dashboard"
          className="text-white-700 p-1.5 hover:bg-blue-500 rounded hover:scale-110 transition duration-200"
        >
          Home
        </Link>

        <Link
          href="/dashboard/contact"
          className="text-white-700 p-1.5 hover:bg-blue-500 rounded hover:scale-110 transition duration-200"
        >
          Contact
        </Link>

        <button
          onClick={handleLogout}
          className="text-white-700 hover:text-red-500 hover:scale-150 transition-colors duration-200"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-saf-color text-white py-4 text-center shadow">
      This is the Footer
    </footer>
  );
}
