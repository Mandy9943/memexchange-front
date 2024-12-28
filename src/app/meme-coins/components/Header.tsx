import { RouteNamesEnum } from '@/localConstants';
import Link from 'next/link';

const Header = () => {
  return (
    <>
      <div className='flex items-center mb-4'>
        <h2 className='text-2xl text-white font-semibold text-center w-full'>
          Meme Coins
        </h2>
      </div>

      <Link href={RouteNamesEnum.createCoin} className='hover:underline'>
        <p className='text-blue-400 mb-4 text-center'>
          Create your meme coin just for 0.1 EGLD
        </p>
      </Link>
    </>
  );
};

export default Header;
