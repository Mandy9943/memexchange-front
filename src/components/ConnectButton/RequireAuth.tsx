import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import React, { useState } from 'react';
import { ConnectDialog } from './ConnectDialog';

interface RequireAuthProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const RequireAuth = ({ children, onClick }: RequireAuthProps) => {
  const [showConnect, setShowConnect] = useState(false);
  const isLoggedIn = useGetIsLoggedIn();

  const handleClick = () => {
    if (!isLoggedIn) {
      setShowConnect(true);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <>
      {/* Clone the child element and add the new onClick handler */}
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            onClick: handleClick
          } as React.HTMLAttributes<HTMLElement>);
        }
        return child;
      })}

      <ConnectDialog open={showConnect} onOpenChange={setShowConnect} />
    </>
  );
};
