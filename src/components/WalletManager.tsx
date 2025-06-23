import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface WalletManagerProps {
  selectedWallets: Set<string>;
  onWalletSelectionChange: (wallets: Set<string>) => void;
}

const WalletManager: React.FC<WalletManagerProps> = ({ 
  selectedWallets, 
  onWalletSelectionChange 
}) => {
  const [wallets, setWallets] = useState([
    { id: '1', publicKey: 'ABC...123', balance: 1.25, label: 'Main Wallet' },
    { id: '2', publicKey: 'DEF...456', balance: 0.85, label: 'Trading Wallet' },
    { id: '3', publicKey: 'GHI...789', balance: 2.10, label: 'Storage Wallet' },
  ]);

  const generateWallets = (count: number) => {
    const newWallets = Array.from({ length: count }, (_, i) => ({
      id: `new-${Date.now()}-${i}`,
      publicKey: `NEW...${Math.random().toString(36).substr(2, 3).toUpperCase()}`,
      balance: Math.random() * 2,
      label: `Wallet ${wallets.length + i + 1}`
    }));
    setWallets(prev => [...prev, ...newWallets]);
  };

  const toggleWalletSelection = (walletId: string) => {
    const newSelection = new Set(selectedWallets);
    if (newSelection.has(walletId)) {
      newSelection.delete(walletId);
    } else {
      newSelection.add(walletId);
    }
    onWalletSelectionChange(newSelection);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Wallet Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button onClick={() => generateWallets(1)}>
                Generate 1 Wallet
              </Button>
              <Button onClick={() => generateWallets(5)}>
                Generate 5 Wallets
              </Button>
              <Button onClick={() => generateWallets(10)}>
                Generate 10 Wallets
              </Button>
            </div>
            
            <div className="space-y-2">
              {wallets.map((wallet) => (
                <div
                  key={wallet.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedWallets.has(wallet.id)
                      ? 'bg-purple-50 border-purple-200 dark:bg-purple-950 dark:border-purple-800'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => toggleWalletSelection(wallet.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{wallet.label}</div>
                      <div className="text-sm text-gray-500">{wallet.publicKey}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{wallet.balance.toFixed(2)} SOL</div>
                      {selectedWallets.has(wallet.id) && (
                        <Badge variant="default" className="mt-1">Selected</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletManager;