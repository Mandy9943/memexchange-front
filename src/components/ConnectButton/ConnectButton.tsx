import { Button } from '@/components/ui/button';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { Wallet } from 'lucide-react';
import { useState } from 'react';
import { ConnectDialog } from './ConnectDialog';

export const ConnectButton = () => {
  const isLoggedIn = useGetIsLoggedIn();
  const [open, setOpen] = useState(false);

  if (isLoggedIn) {
    return null;
  }

  return (
    <>
      <Button
        className='text-white mt-5 mr-5 rounded-full bg-[#0098EA] hover:bg-[#0098EA]/80'
        onClick={() => setOpen(true)}
      >
        <Wallet size={'16px'} /> Connect Wallet
      </Button>
      <ConnectDialog
        open={open}
        onOpenChange={setOpen}
        onLoginRedirect={() => setOpen(false)}
      />
    </>
  );
};
