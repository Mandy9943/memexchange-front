'use client';

import {
  DappProvider,
  // uncomment this to use the custom transaction tracker
  // TransactionsTracker
  NotificationModal,
  SignTransactionsModals,
  TransactionsToastList
} from '@/components';
import {
  apiTimeout,
  environment,
  sampleAuthenticatedDomains,
  walletConnectV2ProjectId
} from '@/config';
import { RouteNamesEnum } from '@/localConstants';
import store from '@/redux/store';
import { AxiosInterceptorContext } from '@multiversx/sdk-dapp/wrappers/AxiosInterceptorContext';
import type { PropsWithChildren, ReactNode } from 'react';
import { Provider } from 'react-redux';

const AppContent = ({ children }: PropsWithChildren) => {
  return (
    <DappProvider
      environment={environment}
      customNetworkConfig={{
        name: 'customConfig',
        apiTimeout,
        walletConnectV2ProjectId
      }}
      dappConfig={{
        isSSR: true,
        shouldUseWebViewProvider: true,
        logoutRoute: RouteNamesEnum.home
      }}
      customComponents={{
        transactionTracker: {
          // uncomment this to use the custom transaction tracker
          // component: TransactionsTracker,
          props: {
            onSuccess: (sessionId: string) => {
              console.log(`Session ${sessionId} successfully completed`);
            },
            onFail: (sessionId: string, errorMessage: string) => {
              console.log(`Session ${sessionId} failed. ${errorMessage ?? ''}`);
            }
          }
        }
      }}
    >
      <AxiosInterceptorContext.Listener>
        <TransactionsToastList />
        <NotificationModal />
        <SignTransactionsModals />
        {children}
      </AxiosInterceptorContext.Listener>
    </DappProvider>
  );
};

export default function App({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <AxiosInterceptorContext.Provider>
        <AxiosInterceptorContext.Interceptor
          authenticatedDomains={sampleAuthenticatedDomains}
        >
          <AppContent>{children}</AppContent>
        </AxiosInterceptorContext.Interceptor>
      </AxiosInterceptorContext.Provider>
    </Provider>
  );
}
