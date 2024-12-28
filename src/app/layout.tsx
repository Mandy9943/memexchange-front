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
  title: 'Template dApp Next.js',
  description:
    'A basic implementation of MultiversX dApp providing the basics for MultiversX authentication and TX signing.',
  viewport: {
    width: 'device-width',
    initialScale: 1
  },
  icons: {
    icon: '/favicon.ico'
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
