import React from 'react';
import { Navigation } from '~/components/Navigation';

interface IMainLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: IMainLayoutProps) => {
  return (
    <div className="flex h-[100vh] w-[100vw]">
      <Navigation />
      <main className="flex-1">
        <div className="w-full h-16" />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
