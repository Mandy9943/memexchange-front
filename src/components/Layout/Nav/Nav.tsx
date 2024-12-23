import { routes } from '@/routes';
import Link from 'next/link';
export const Nav = () => {
  return (
    <div className='w-full fixed bottom-0 left-0 right-0 bg-[#2c2e33] py-5 text-sm'>
      <div className='flex w-full justify-around'>
        {routes.map((route) => (
          <Link href={route.path} key={route.path} className='no-underline'>
            <div className='flex flex-col items-center '>
              <route.icon />
              {route.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
