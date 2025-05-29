/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import c from 'clsx';
import { setSidebarOpen, setTargetImage } from './actions';
import useStore from './store';

interface Image {
  id: string;
  description: string;
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
  const images = useStore.use.images() as Image[] | null;
  const isSidebarOpen = useStore.use.isSidebarOpen();
  console.log(isSidebarOpen);

  return (
    <aside className={c('sidebar', { open: isSidebarOpen })}>
      <button
        className='closeButton'
        onClick={() => setSidebarOpen(false)}
        aria-label='Close sidebar'
      >
        <span className='icon'>close</span>
      </button>

      <ul>
        {images?.map((image) => (
          <li key={image.id} onClick={() => setTargetImage(image.id)}>
            <img
              src={`https://www.gstatic.com/aistudio/starter-apps/photosphere/${image.id}`}
              alt={truncateDescription(image.description, 3)}
              className='thumbnail'
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
