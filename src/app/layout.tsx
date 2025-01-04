import { ourFileRouter } from '@/app/api/uploadthing/core';
import { Layout } from '@/components/Layout';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { extractRouterConfig } from 'uploadthing/server';
import '../styles/globals.css';
import App from './index';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MemExchange | MultiversX Meme Coin Trading Platform',
  description:
    'Trade meme coins on MultiversX with MemExchange - the ultimate platform featuring bonding curve mechanics, automated liquidity growth, and seamless DEX integration. Buy, sell, and watch your meme coins moon! 🚀',
  keywords:
    'memexchange, multiversx, meme coins, cryptocurrency trading, bonding curve, DEX, blockchain, crypto trading platform, liquidity pool, egld, meme tokens',
  authors: [{ name: 'MemExchange Team' }],
  creator: 'MemExchange',
  publisher: 'MemExchange',
  robots: 'index, follow',
  viewport: {
    width: 'device-width',
    initialScale: 1
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/mxc-logo.webp',
    shortcut: '/mxc-logo.webp'
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://memexchange.fun',
    siteName: 'MemExchange',
    title: 'MemExchange - Trade Meme Coins on MultiversX',
    description:
      'Trade meme coins on MultiversX with MemExchange - featuring bonding curve mechanics, automated liquidity growth, and seamless DEX integration.',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'MemExchange - MultiversX Meme Coin Trading Platform'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MemExchange',
    creator: '@MemExchange',
    title: 'MemExchange - Trade Meme Coins on MultiversX',
    description:
      'Trade meme coins on MultiversX with MemExchange - featuring bonding curve mechanics, automated liquidity growth, and seamless DEX integration.',
    images: ['/og-image.webp']
  },
  other: {
    'msapplication-TileColor': '#000000',
    'theme-color': '#000000',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black',
    'mobile-web-app-capable': 'yes'
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={inter.className}>
      <body className={`${inter.className} bg-neutral-900 text-white`}>
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <App>
          <Suspense>
            <Layout>{children}</Layout>
            <Toaster position='top-right' />
          </Suspense>
        </App>
      </body>
    </html>
  );
}
