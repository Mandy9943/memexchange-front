const LoadingSkeleton = () => {
  return (
    <div className='container mx-auto p-4 animate-pulse'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Left column with chart */}
        <div className='lg:col-span-2 bg-gray-800 rounded-lg p-4'>
          <div className='w-full h-[400px] bg-gray-700 rounded'></div>
        </div>

        {/* Right column with details */}
        <div className='space-y-4'>
          {/* Token Info Card */}
          <div className='bg-gray-800 rounded-lg p-4 space-y-3'>
            <div className='h-8 bg-gray-700 rounded w-1/3'></div>
            <div className='h-6 bg-gray-700 rounded w-2/3'></div>
            <div className='h-6 bg-gray-700 rounded w-full'></div>
            <div className='h-4 bg-gray-700 rounded w-3/4'></div>
          </div>

          {/* Trading Card */}
          <div className='bg-gray-800 rounded-lg p-4 space-y-4'>
            <div className='flex gap-2'>
              <div className='flex-1 h-10 bg-gray-700 rounded'></div>
              <div className='flex-1 h-10 bg-gray-700 rounded'></div>
            </div>
            <div className='h-12 bg-gray-700 rounded'></div>
            <div className='h-10 bg-gray-700 rounded'></div>
          </div>

          {/* Launch App Button */}
          <div className='h-12 bg-gray-700 rounded'></div>

          {/* Holders Info */}
          <div className='bg-gray-800 rounded-lg p-4'>
            <div className='h-6 bg-gray-700 rounded w-1/2 mb-3'></div>
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <div className='h-4 bg-gray-700 rounded w-1/3'></div>
                <div className='h-4 bg-gray-700 rounded w-1/4'></div>
              </div>
              <div className='flex justify-between'>
                <div className='h-4 bg-gray-700 rounded w-1/3'></div>
                <div className='h-4 bg-gray-700 rounded w-1/4'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
