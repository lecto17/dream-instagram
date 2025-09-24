'use client';

import { SessionProvider } from 'next-auth/react';

interface Props {
  children: React.ReactNode;
}

const AuthContext = ({ children }: Props) => {
  return (
    <SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>
  );
};

export default AuthContext;
