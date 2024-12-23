import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { nativeAuth } from '@/config';
import { logout } from '@/helpers';
import { useGetIsLoggedIn } from '@/hooks';
import { RouteNamesEnum } from '@/localConstants';
import {
  useExtensionLogin,
  useWalletConnectV2Login,
  useWebWalletLogin
} from '@multiversx/sdk-dapp/hooks';
import { Wallet } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  DefiWalletIcon,
  WalletConnectIcon,
  XPortalIcon
} from '../Icons/customIcons';

export const ConnectButton = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const isLoggedIn = useGetIsLoggedIn();

  const commonProps = {
    callbackRoute: RouteNamesEnum.home,
    nativeAuth,
    onLoginRedirect: () => {
      router.push(RouteNamesEnum.home);
      setOpen(false);
    }
  };

  const [extensionLogin] = useExtensionLogin(commonProps);
  const [webWalletLogin] = useWebWalletLogin(commonProps);
  const [walletConnectLogin] = useWalletConnectV2Login(commonProps);

  const handleDisconnect = () => {
    logout();
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-md bg-black'>
          <DialogHeader>
            <DialogTitle className='text-center '>Connect Wallet</DialogTitle>
          </DialogHeader>

          <p className='text-center text-gray-400 text-sm'>Available Wallets</p>

          <div className='flex justify-center gap-5 '>
            <div
              onClick={() => extensionLogin()}
              className='cursor-pointer flex flex-col items-center gap-2'
            >
              <DefiWalletIcon height={25} />

              <p className='text-sm'> Defi Wallet</p>
            </div>
            <div
              onClick={() => webWalletLogin()}
              className='cursor-pointer flex flex-col items-center gap-2'
            >
              <WalletConnectIcon height={25} />

              <p className='text-sm'> Wallet Connect</p>
            </div>
            <div
              onClick={() => walletConnectLogin()}
              className='cursor-pointer flex flex-col items-center gap-2'
            >
              <XPortalIcon height={25} />

              <p className='text-sm'> xPortal App</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
