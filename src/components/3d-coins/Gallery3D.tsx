'use client';
import SearchBar from './SearchBar';
import Sidebar from './Sidebar';

import { ListIcon } from 'lucide-react';
import { toggleSidebar } from './actions';
import './index.css';
import PhotoViz from './PhotoViz';

export default function Gallery3D() {
  return (
    <div className='h-full w-full fixed top-0 left-0 '>
      <PhotoViz />
      <Sidebar />

      {/* Search Bar - positioned at the top center */}
      <div className='absolute top-6 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4 z-[1652835100]'>
        <SearchBar />
      </div>

      <div className='absolute top-0 right-0 p-4 flex gap-2'>
        <button
          onClick={toggleSidebar}
          aria-label='Toggle coin list'
          title='Toggle coin list'
        >
          <span className='icon'>
            <ListIcon />
          </span>
        </button>
      </div>
    </div>
  );
}
