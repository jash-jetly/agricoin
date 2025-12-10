import React from 'react';
import BottomNavigation from './BottomNavigation';
import TopNavigation from './TopNavigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen relative">
      <TopNavigation />
      <main className="pb-20 px-4 pt-16">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Layout;