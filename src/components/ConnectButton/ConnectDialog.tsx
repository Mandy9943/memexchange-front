import { createAuthTokenCookie } from '@/actions/cookies';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { nativeAuth } from '@/config';
import { RouteNamesEnum } from '@/localConstants';
import { rewardService } from '@/services/rest/backendApi/reward';
import {
  useExtensionLogin,
  useGetLoginInfo,
  useWebWalletLogin
} from '@multiversx/sdk-dapp/hooks';
import { useEffect, useRef } from 'react';
import {
  DefiWalletIcon,
  WalletConnectIcon,
  XPortalIcon
} from '../Icons/customIcons';
import { WalletConnectLoginButton } from '../sdkDappComponents';

interface NavigatorWithUserAgentData extends Navigator {
  userAgentData?: {
    platform: string;
  };
}

interface ConnectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginRedirect?: () => void;
}

export const ConnectDialog = ({
  open,
  onOpenChange,
  onLoginRedirect
}: ConnectDialogProps) => {
  const commonProps = {
    callbackRoute: RouteNamesEnum.home,
    nativeAuth,
    onLoginRedirect: onLoginRedirect
  };

  const { tokenLogin } = useGetLoginInfo();
  const [extensionLogin] = useExtensionLogin(commonProps);
  const [webWalletLogin] = useWebWalletLogin(commonProps);

  // Improved OS detection with modern API and fallbacks
  const isMacOS = () => {
    if (typeof window === 'undefined') {
      return false;
    }
    if (
      typeof (navigator as NavigatorWithUserAgentData)?.userAgentData !==
      'undefined'
    ) {
      return (
        (
          navigator as NavigatorWithUserAgentData
        ).userAgentData?.platform.toLowerCase() === 'macos'
      );
    }
    return /mac/i.test(navigator.userAgent);
  };

  useEffect(() => {
    if (tokenLogin?.nativeAuthToken) {
      createAuthTokenCookie(tokenLogin.nativeAuthToken);
    }
  }, [tokenLogin?.nativeAuthToken]);

  const countRef = useRef(0);
  useEffect(() => {
    if (tokenLogin?.nativeAuthToken) {
      if (countRef.current === 0) {
        rewardService.completeConnectWallet(tokenLogin.nativeAuthToken);
        countRef.current++;
      }
    }
  }, [tokenLogin?.nativeAuthToken]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md bg-black'>
        <DialogHeader>
          <DialogTitle className='text-center'>Connect Wallet</DialogTitle>
        </DialogHeader>

        <p className='text-center text-gray-400 text-sm'>Available Wallets</p>

        <div className='flex justify-center gap-5'>
          {!isMacOS() && (
            <div
              onClick={() => extensionLogin()}
              className='cursor-pointer flex flex-col items-center gap-2'
            >
              <DefiWalletIcon height={25} />
              <p className='text-sm'> Defi Wallet</p>
            </div>
          )}
          <div
            onClick={() => webWalletLogin()}
            className='cursor-pointer flex flex-col items-center gap-2'
          >
            <WalletConnectIcon height={25} />
            <p className='text-sm'> Wallet Connect</p>
          </div>
          <WalletConnectLoginButton
            loginButtonText='xPortal App'
            {...commonProps}
            className='!bg-transparent !border-none !shadow-none !flex !flex-col !items-center !gap-2 !p-0 !m-0'
          >
            <XPortalIcon height={25} />
            <p className='text-sm'> xPortal App</p>
          </WalletConnectLoginButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};
