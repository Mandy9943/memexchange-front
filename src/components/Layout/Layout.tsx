'use client';
import { PropsWithChildren } from 'react';
import { Header } from './Header';
import { Nav } from './Nav';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <main className='flex flex-grow items-stretch justify-center p-8 flex-1'>
        <Header />

        {children}
      </main>

      <Nav />
    </div>
  );
};
