'use client';

import { useDropzone } from '@uploadthing/react';
import { useCallback, useEffect, useState } from 'react';
import {
  generateClientDropzoneAccept,
  generatePermittedFileTypes
} from 'uploadthing/client';

import { useUploadThing } from '@/utils/uploadthing';
import Image from 'next/image';
interface CoinUploaderProps {
  onUploadComplete: (url: string) => void;
  initialPreview?: string;
}
function CoinUploader({ onUploadComplete, initialPreview }: CoinUploaderProps) {
  const [preview, setPreview] = useState<string | null>(initialPreview || null);
  const [isLoading, setIsLoading] = useState(false);

  const { startUpload, routeConfig } = useUploadThing('imageUploader', {
    onClientUploadComplete: (res) => {
      if (res && res[0]) {
        onUploadComplete(res[0].url);
      }
      setIsLoading(false);
    },
    onUploadError: () => {
      alert('error occurred while uploading');
      setPreview(null);
      setIsLoading(false);
    },
    onUploadBegin: () => {
      setIsLoading(true);
    }
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setPreview(URL.createObjectURL(acceptedFiles[0]));
      setIsLoading(true);
      startUpload(acceptedFiles);
    },
    [startUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(
      generatePermittedFileTypes(routeConfig).fileTypes
    )
  });

  useEffect(() => {
    if (initialPreview) {
      setPreview(initialPreview);
    }
  }, [initialPreview]);

  return (
    <div
      {...getRootProps()}
      className='border-2 border-dashed rounded-full w-[200px] h-[200px] flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors'
    >
      <input {...getInputProps()} />
      {preview ? (
        <div className='relative w-full h-full'>
          <Image
            src={preview}
            width={200}
            height={200}
            alt='Preview'
            className='w-full h-full rounded-full object-cover'
          />
          {isLoading && (
            <div className='absolute inset-0 flex items-center justify-center bg-black/60 rounded-full backdrop-blur-sm'>
              <div className='relative w-16 h-16'>
                <div className='absolute w-16 h-16 border-4 border-white/20 rounded-full'></div>
                <div className='absolute w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-[spin_1s_linear_infinite]'></div>
                <div className='absolute w-16 h-16 border-4 border-white/10 border-t-transparent rounded-full animate-[spin_2s_linear_infinite]'></div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <svg
            className='w-8 h-8 mb-2 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
            />
          </svg>
          <p className='text-sm text-gray-500'>Upload Image</p>
        </>
      )}
    </div>
  );
}

export default CoinUploader;
