import { Layout } from '@/components/Layout';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { Suspense } from 'react';
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
        <App>
          <Suspense>
            <Layout>{children}</Layout>
          </Suspense>
        </App>
      </body>
    </html>
  );
}
