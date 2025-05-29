'use client';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { Header } from './Header';
import { MemeCoinNavSidebar } from './MemeCoinNavSidebar';
import { Nav } from './Nav';

export const Layout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  if (pathname === '/meme-coins') {
    return (
      <>
        <MemeCoinNavSidebar />
        {children}
      </>
    );
  }

  return (
    <div className='flex flex-col min-h-screen mb-20'>
      <main className='flex flex-grow items-stretch justify-center px-4 sm:px-8 py-14 flex-1'>
        <Header />

        {children}
      </main>

      {pathname !== '/meme-coins' && <Nav />}
    </div>
  );
};
