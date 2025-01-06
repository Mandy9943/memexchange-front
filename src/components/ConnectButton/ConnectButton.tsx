import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/hooks/useRedux';
import { setShard, setUserAddress } from '@/redux/dapp/dapp-slice';
import {
  useGetAccountInfo,
  useGetIsLoggedIn
} from '@multiversx/sdk-dapp/hooks';
import { Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ConnectDialog } from './ConnectDialog';

export const ConnectButton = () => {
  const isLoggedIn = useGetIsLoggedIn();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { address, shard } = useGetAccountInfo();

  useEffect(() => {
    dispatch(setUserAddress(address));
    dispatch(setShard(shard ?? 1));
  }, [address, dispatch, shard]);

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
