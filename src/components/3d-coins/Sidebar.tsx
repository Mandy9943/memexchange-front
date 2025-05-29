/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import c from 'clsx';
import { XIcon } from 'lucide-react';
import Image from 'next/image';
import { setSidebarOpen, setTargetImage } from './actions';
import useStore from './store';

interface IImage {
  id: string;
  description: string;
  url: string;
}

const truncateDescription = (description: string, wordLimit = 7) => {
  if (!description) {
    return '';
  }
  const words = description.split(' ');
  if (words.length <= wordLimit) {
    return description;
  }
  return words.slice(0, wordLimit).join(' ') + ' ...';
};

const Sidebar = () => {
  const images = useStore.use.images() as IImage[] | null;
  const isSidebarOpen = useStore.use.isSidebarOpen();

  return (
    <aside className={c('sidebar', { open: isSidebarOpen })}>
      <button
        className='closeButton'
        onClick={() => setSidebarOpen(false)}
        aria-label='Close sidebar'
      >
        <XIcon className='w-4 h-4' />
      </button>

      <ul>
        {images?.map((image) => (
          <li key={image.id} onClick={() => setTargetImage(image.id)}>
            <Image
              src={image.url}
              alt={truncateDescription(image.description, 3)}
              className='thumbnail'
              width={50}
              height={50}
            />
            <p>{image.description}</p>
          </li>
        ))}
        {(!images || images.length === 0) && <li>No images available.</li>}
      </ul>
    </aside>
  );
};

export default Sidebar;
