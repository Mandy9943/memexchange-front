import { routes } from '@/routes';
import Link from 'next/link';
export const Nav = () => {
  return (
    <div className='w-full fixed bottom-0 left-0 right-0 bg-[#2c2e33] py-2.5 sm:py-4 text-xs sm:text-sm'>
      <div className='flex w-full justify-around max-w-2xl mx-auto px-2'>
        {routes.map((route) => (
          <Link href={route.path} key={route.path} className='no-underline'>
            <div className='flex flex-col items-center gap-1'>
              <div className='w-5 h-5 sm:w-6 sm:h-6'>
                <route.icon className='w-full h-full' />
              </div>
              <span className='text-[11px] sm:text-sm'>{route.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
