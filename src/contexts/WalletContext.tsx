import React, { ReactNode } from 'react';

interface WalletContextProviderProps {
  children: ReactNode;
}

const WalletContextProvider: React.FC<WalletContextProviderProps> = ({ children }) => {
  return <>{children}</>;
};

export default WalletContextProvider;