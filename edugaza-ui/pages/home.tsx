import { useEffect } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { useOfflineStatus } from '../hooks/useOfflineStatus';
import { LoadingSpinner } from '../components/LoadingSpinner';


interface HomePageProps {
  buildTime: string;
}

export default function HomePage({ buildTime }: HomePageProps) {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const isOffline = useOfflineStatus();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <Layout title="Home - Next.js PWA App">
        <div className="flex justify-center items-center min-h-64">
          <LoadingSpinner />
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <Layout title="Home - Next.js PWA App">
      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back!
            </h1>
            <p className="text-gray-600 mt-2">
              Hello, {user?.email}
            </p>
          </div>
          <Button onClick={handleLogout} variant="secondary">
            Logout
          </Button>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Fast</h3>
          <p className="text-gray-600">Lightning-fast performance with optimized loading and caching.</p>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Reliable</h3>
          <p className="text-gray-600">Works seamlessly even with poor network conditions.</p>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Engaging</h3>
          <p className="text-gray-600">App-like experience that keeps users engaged and productive.</p>
        </div>
        
        <p className="text-sm text-gray-500 mt-8">
          Built at: {buildTime}
        </p>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      buildTime: new Date().toISOString(),
    },
  };
};
