'use client';
import { PropsWithChildren } from 'react';
import { Header } from './Header';
import { Nav } from './Nav';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex flex-col min-h-screen mb-20'>
      <main className='flex flex-grow items-stretch justify-center px-4 sm:px-8 py-14 flex-1'>
        <Header />

        {children}
      </main>

      <Nav />
    </div>
  );
};
