// app/dashboard/layout.tsx - dashboard layout
import Header, { Footer } from './headerfooter';
import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 pb-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
