
import React, { useState, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import WalletConnection from '../components/WalletConnection';
import TokenCreator from '../components/TokenCreator';
import WalletManager from '../components/WalletManager';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';

const Index = () => {
  const [activeTab, setActiveTab] = useState('token-creator');
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number>(0);
  const [networkStatus, setNetworkStatus] = useState<'mainnet' | 'testnet' | 'devnet'>('devnet');

  useEffect(() => {
    if (connected && publicKey) {
      // Fetch real balance
      connection.getBalance(publicKey).then((balance) => {
        setBalance(balance / LAMPORTS_PER_SOL);
      }).catch(console.error);

      // Check network
      connection.getGenesisHash().then((genesisHash) => {
        // Devnet genesis hash check
        if (genesisHash === 'EtWTRABZaYq6iMfeYKouRu166VU2xqa1wcaWoxPkrZBG') {
          setNetworkStatus('devnet');
        } else if (genesisHash === '4uhcVJyU9pJkvQyS88uRDiswHXSCkY3zQawwpjk2NsNY') {
          setNetworkStatus('testnet');
        } else {
          setNetworkStatus('mainnet');
        }
      }).catch(() => {
        setNetworkStatus('devnet'); // fallback
      });
    }
  }, [connected, publicKey, connection]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-green-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">
                  Solana Pro Suite
                </h1>
                <p className="text-slate-400 text-sm">Token Creator & Wallet Manager</p>
              </div>
            </div>
            <WalletConnection />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Network</p>
                    <p className="text-white font-semibold capitalize">{networkStatus}</p>
                  </div>
                  <Badge variant="secondary" className={`${
                    connected ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                  }`}>
                    {connected ? 'Connected' : 'Disconnected'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4">
                <div>
                  <p className="text-slate-400 text-sm">SOL Balance</p>
                  <p className="text-white font-semibold">
                    {connected ? `${balance.toFixed(4)} SOL` : '0.00 SOL'}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4">
                <div>
                  <p className="text-slate-400 text-sm">Managed Wallets</p>
                  <p className="text-white font-semibold">0</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4">
                <div>
                  <p className="text-slate-400 text-sm">Tokens Created</p>
                  <p className="text-white font-semibold">0</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {!connected && (
            <Card className="bg-amber-500/10 border-amber-500/20 mb-6">
              <CardContent className="p-4">
                <p className="text-amber-400 text-center">
                  Please connect your wallet to access token creation and wallet management features.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Main Interface */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 border border-slate-700">
              <TabsTrigger 
                value="token-creator" 
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                SPL Token Creator
              </TabsTrigger>
              <TabsTrigger 
                value="wallet-manager"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Multi-Wallet Manager
              </TabsTrigger>
            </TabsList>

            <TabsContent value="token-creator" className="space-y-6">
              <TokenCreator />
            </TabsContent>

            <TabsContent value="wallet-manager" className="space-y-6">
              <WalletManager />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;
