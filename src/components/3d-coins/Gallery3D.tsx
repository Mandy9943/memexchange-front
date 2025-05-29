'use client';
import { useEffect, useRef, useState } from 'react';
import Sidebar from './Sidebar';
import useStore from './store';

import { EyeIcon, ListIcon } from 'lucide-react';
import { setXRayMode, toggleSidebar } from './actions';
import './index.css';
import PhotoViz from './PhotoViz';

const searchPresets = [
  'winter',
  'mathematical concepts',
  'underwater animals',
  'circular shapes'
];

export default function Gallery3D() {
  const layout = useStore.use.layout();
  const isFetching = useStore.use.isFetching();
  const xRayMode = useStore.use.xRayMode();
  const caption = useStore.use.caption();
  const isSidebarOpen = useStore.use.isSidebarOpen();
  const highlightNodes = useStore.use.highlightNodes();
  const [value, setValue] = useState('');
  const [searchPresetIdx, setSearchPresetIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setSearchPresetIdx((n) => (n === searchPresets.length - 1 ? 0 : n + 1)),
      5000
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='h-full w-full fixed top-0 left-0 '>
      <PhotoViz />
      <Sidebar />

      <div className='absolute top-0 right-0 p-4 flex gap-2'>
        <label>
          <input
            type='checkbox'
            checked={xRayMode}
            onChange={() => setXRayMode(!xRayMode)}
            className='hidden'
          />
          <EyeIcon className='w-4 h-4' />
        </label>
        <button
          onClick={toggleSidebar}
          aria-label='Toggle photo list'
          title='Toggle photo list'
        >
          <span className='icon'>
            <ListIcon />
          </span>
        </button>
      </div>
    </div>
  );
}
