import { useGetIsLoggedIn } from '@/hooks';
import React from 'react';

interface AuthContentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const AuthContent = ({ children, fallback }: AuthContentProps) => {
  const isLoggedIn = useGetIsLoggedIn();
  return <div>{isLoggedIn ? children : fallback}</div>;
};
