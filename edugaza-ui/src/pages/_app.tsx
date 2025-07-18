import type { AppProps } from 'next/app';
import { AuthProvider } from '../components/Auth/AuthProvider';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563EB" />
        <link rel="manifest" href="/manifest.json" />
        <title>Next.js PWA</title>
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;