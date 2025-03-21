'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';

interface IMainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: IMainLayoutProps) => {
  const { data: session } = useSession();

  if (session && session.user) {
    return redirect('/dashboard');
  }

  return (
    <div className="h-full dark:bg-[#1F1F1F]">
      <header className="flex gap-4 p-4 bg-gradient-to-b from-white to-gray-200">
        <p>Main Layout</p>
      </header>
      <main className="h-full">{children}</main>
    </div>
  );
};

export default MainLayout;
