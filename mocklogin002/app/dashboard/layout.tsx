// app/dashboard/layout.tsx
import Header, { Footer } from './headerfooter';

import React from 'react';
import LoginPageGuard from '@/components/LoginPageGuard';
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <LoginPageGuard>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-16 pb-16">
          {children}
        </main>
        <Footer />
      </div>
      </LoginPageGuard>
  );
}
