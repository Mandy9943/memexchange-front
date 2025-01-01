import { ConnectButton } from '@/components/ConnectButton';
import { ProfileMenu } from '@/components/ProfileMenu/ProfileMenu';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';

export const Header = () => {
  const isLoggedIn = useGetIsLoggedIn();

  return (
    <div className='absolute top-0 left-0 flex justify-between items-center w-full px-5 py-2'>
      <div className='flex-1'>{/* Logo can go here */}</div>
      <div className='flex items-center gap-4'>
        {isLoggedIn && <ProfileMenu />}
        <ConnectButton />
      </div>
    </div>
  );
};
