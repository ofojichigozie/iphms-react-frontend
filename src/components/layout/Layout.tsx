import React, { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary-50 flex flex-col">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex-grow">
        {children}
      </main>
      <footer className="bg-gradient-to-r from-primary-700 to-primary-900 py-8 shadow-inner w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center">
            <p className="text-center text-lg font-semibold text-white mb-2">
              IPHMS - Intelligent Patient Health Monitoring System
            </p>
            <p className="text-center text-sm text-primary-100">
              &copy; {new Date().getFullYear()} All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
