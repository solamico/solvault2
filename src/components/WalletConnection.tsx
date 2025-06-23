import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const WalletConnection = () => {
  const [connected, setConnected] = useState(false);
  const [publicKey] = useState('ABC123...DEF456');
  const [balance] = useState(1.25);

  const connectWallet = () => {
    setConnected(true);
  };

  const disconnectWallet = () => {
    setConnected(false);
  };

  if (!connected) {
    return (
      <Button 
        onClick={connectWallet}
        className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
      >
        Connect Wallet
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="text-right">
        <div className="text-sm font-medium text-white">{balance.toFixed(2)} SOL</div>
        <div className="text-xs text-slate-400">{publicKey}</div>
      </div>
      <Button 
        onClick={disconnectWallet}
        variant="outline"
        size="sm"
        className="border-slate-600 text-slate-300 hover:bg-slate-800"
      >
        Disconnect
      </Button>
    </div>
  );
};

export default WalletConnection;