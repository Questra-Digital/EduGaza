import { useEffect, useState } from 'react';
import { useAuth } from '../components/Auth/AuthProvider';
import { useRouter } from 'next/router';

export default function HomePage() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(true);

  // Handle authentication state
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              isOnline ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {isOnline ? 'Online' : 'Offline'}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Sign out
            </button>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900">Welcome to your offline-capable PWA!</h2>
          <p className="mt-4 text-gray-600">
            This page is available offline once loaded. Try turning off your internet connection and refreshing the page.
          </p>
          
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-50 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}