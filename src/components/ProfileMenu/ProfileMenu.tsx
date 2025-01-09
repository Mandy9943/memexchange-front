import { removeSession } from '@/actions/cookies';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { logout } from '@/helpers';
import useGetUserInfo from '@/hooks/useGetUserInfo';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { CircleUser, Coins, LogOut, Medal, Shield } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

export const ProfileMenu = () => {
  const { address } = useGetAccountInfo();
  const { data } = useGetUserInfo();

  const handleDisconnect = () => {
    logout();
    removeSession();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='rounded-full bg-blue-600 hover:bg-blue-700'>
          Profile <CircleUser className='h-5 w-5' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-56'>
        <DropdownMenuItem className='text-xs'>
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href='/profile/achievements'
            className='flex items-center gap-2'
          >
            <Medal className='h-4 w-4' />
            <span>Achievements</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href='/profile/tokens' className='flex items-center gap-2'>
            <Coins className='h-4 w-4' />
            <span>My Tokens</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {data?.isAdmin && (
          <>
            <DropdownMenuItem asChild>
              <Link href='/admin' className='flex items-center gap-2'>
                <Shield className='h-4 w-4' />
                <span>Admin Panel</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem
          className='text-red-500 focus:text-red-500 cursor-pointer'
          onClick={handleDisconnect}
        >
          <LogOut className='h-4 w-4 mr-2' />
          <span>Disconnect</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
