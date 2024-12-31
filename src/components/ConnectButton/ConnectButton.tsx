import { removeSession } from '@/actions/cookies';
import { Button } from '@/components/ui/button';
import { logout } from '@/helpers';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { Wallet } from 'lucide-react';
import { useState } from 'react';
import { ConnectDialog } from './ConnectDialog';

export const ConnectButton = () => {
  const isLoggedIn = useGetIsLoggedIn();
  const [open, setOpen] = useState(false);

  const handleDisconnect = () => {
    logout();
    removeSession();
    setOpen(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <Button
          className='text-white mt-5 mr-5 rounded-full bg-[#0098EA] hover:bg-[#0098EA]/80'
          onClick={handleDisconnect}
        >
          <Wallet size={'16px'} /> Disconnect
        </Button>
      ) : (
        <Button
          className='text-white mt-5 mr-5 rounded-full bg-[#0098EA] hover:bg-[#0098EA]/80'
          onClick={() => setOpen(true)}
        >
          <Wallet size={'16px'} /> Connect Wallet
        </Button>
      )}
      <ConnectDialog
        open={open}
        onOpenChange={setOpen}
        onLoginRedirect={() => setOpen(false)}
      />
    </>
  );
};
