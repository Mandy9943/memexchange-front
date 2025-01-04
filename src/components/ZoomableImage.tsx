'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ZoomableImageProps {
  src: string;
  alt: string;
}

export const ZoomableImage = ({ src, alt }: ZoomableImageProps) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  if (isZoomed) {
    return (
      <div
        className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 cursor-pointer'
        onClick={toggleZoom}
      >
        <div className='relative w-[80vw] h-[80vh]'>
          <Image src={src} alt={alt} fill className='object-contain' priority />
        </div>
      </div>
    );
  }

  return (
    <div
      className='relative w-full h-full rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105'
      onClick={toggleZoom}
    >
      <Image src={src} alt={alt} fill className='object-cover' />
    </div>
  );
};
