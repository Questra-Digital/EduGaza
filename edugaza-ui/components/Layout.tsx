import React from 'react';
import Head from 'next/head';
import { useOfflineStatus } from '../hooks/useOfflineStatus';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'Next.js PWA App',
  description = 'A Progressive Web App built with Next.js'
}) => {
  const isOffline = useOfflineStatus();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        {isOffline && (
          <div className="bg-yellow-500 text-white text-center py-2 px-4 text-sm">
            You are currently offline. Some features may not be available.
          </div>
        )}
        
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </>
  );
};