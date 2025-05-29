'use client';

import dynamic from 'next/dynamic';

const Gallery3D = dynamic(() => import('@/components/3d-coins/Gallery3D'), {
  ssr: false
});

const MemeCoinsPage = () => {
  return <Gallery3D />;
};

export default MemeCoinsPage;
