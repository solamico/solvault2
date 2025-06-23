import { useState } from 'react';

export interface GeneratedWallet {
  id: string;
  publicKey: string;
  balance: number;
  label: string;
}

export const useWalletGeneration = () => {
  const [wallets, setWallets] = useState<GeneratedWallet[]>([
    { id: '1', publicKey: 'ABC...123', balance: 1.25, label: 'Main Wallet' },
    { id: '2', publicKey: 'DEF...456', balance: 0.85, label: 'Trading Wallet' },
    { id: '3', publicKey: 'GHI...789', balance: 2.10, label: 'Storage Wallet' },
  ]);

  return {
    wallets,
    setWallets,
  };
};