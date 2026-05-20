import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CyberBackground } from '../common/CyberBackground';
import { Toaster } from 'react-hot-toast';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Cybersecurity animated background */}
      <CyberBackground />
      
      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(15, 23, 42, 0.95)',
            color: '#f1f5f9',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            backdropFilter: 'blur(10px)',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#f1f5f9',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#f1f5f9',
            },
          },
        }}
      />
      
      {/* Header */}
      <Header />
      
      {/* Main content */}
      <main className="relative z-10 flex-1 pt-24 pb-8">
        <div className="container mx-auto px-4">
          {children}
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

// Made with Bob
