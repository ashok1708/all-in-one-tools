'use client';

import { useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Any client-side-only attributes will be handled here after hydration
  }, []);

  return (
    <>
      <Sidebar />
      <main className="p-4 sm:p-6 lg:p-8 min-h-screen bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200 ease-in-out lg:ml-64">
        {children}
      </main>
    </>
  );
}