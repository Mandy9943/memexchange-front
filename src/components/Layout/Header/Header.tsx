import { ConnectButton } from '@/components/ConnectButton';

export const Header = () => {
  return (
    <div className='absolute top-0 left-0 flex justify-end w-full'>
      <ConnectButton />
    </div>
  );
};
