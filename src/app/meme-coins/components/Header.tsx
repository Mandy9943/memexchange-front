import { Skeleton } from '@/components/ui/skeleton';
import useNewTokenFee from '@/hooks/useNewTokenFee';
import { RouteNamesEnum } from '@/localConstants';
import Link from 'next/link';

const Header = () => {
  const { newTokenFeeString, isLoading } = useNewTokenFee();

  return (
    <>
      <div className='flex items-center mb-4'>
        <h2 className='text-2xl text-white font-semibold text-center w-full'>
          Meme Coins
        </h2>
      </div>

      {isLoading ? (
        <Skeleton className='w-full h-5 bg-gray-700 max-w-[350px] mx-auto' />
      ) : (
        <Link href={RouteNamesEnum.createCoin} className='hover:underline'>
          <p className='text-green-400 mb-4 text-center'>
            Create your meme coin just for {newTokenFeeString} EGLD
          </p>
        </Link>
      )}
    </>
  );
};

export default Header;
