import '../styles/globals.css';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => console.log('SW registered:', reg.scope))
        .catch((err) => console.error('SW registration failed:', err));

      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data?.type === 'NEW_SW_AVAILABLE') {
          window.location.reload();
        }
      });
    }
  }, []);

  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
