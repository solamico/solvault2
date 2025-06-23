import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import WalletConnection from '../components/WalletConnection';
import WalletManager from '../components/WalletManager';
import TokenCreator from '../components/TokenCreator';
import TokenTrading from '../components/TokenTrading';
import JitoBundleManager, { BundleSettings } from '../components/JitoBundleManager';
import LiquidityPoolManager from '../components/LiquidityPoolManager';
import JitoBundleAutomationDashboard from '../components/JitoBundleAutomationDashboard';
import { useWalletGeneration, GeneratedWallet } from '../hooks/useWalletGeneration';

const Index: React.FC = () => {
  const [selectedWallets, setSelectedWallets] = useState<Set<string>>(new Set());
  const [bundleSettings, setBundleSettings] = useState<BundleSettings>({
    bundleSize: 5,
    intervalMs: 200,
    maxRetries: 3,
    enabled: true,
  });
  
  const { wallets } = useWalletGeneration();

  // Stats for dashboard
  const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);
  const activeWallets = wallets.filter(wallet => wallet.balance > 0).length;
  const selectedCount = selectedWallets.size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">⚡</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Solana DeFi Suite</h1>
                <p className="text-sm text-slate-400">Professional token creation & multi-wallet management</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                Pro Edition
              </Badge>
              <WalletConnection />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Total Wallets</p>
                  <p className="text-2xl font-bold text-white">{wallets.length}</p>
                </div>
                <span className="text-purple-400 text-2xl">👛</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Active Wallets</p>
                  <p className="text-2xl font-bold text-white">{activeWallets}</p>
                </div>
                <span className="text-green-400 text-2xl">📈</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Selected</p>
                  <p className="text-2xl font-bold text-white">{selectedCount}</p>
                </div>
                <span className="text-blue-400 text-2xl">📦</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Total Balance</p>
                  <p className="text-2xl font-bold text-white">{totalBalance.toFixed(2)} SOL</p>
                </div>
                <span className="text-yellow-400 text-2xl">🪙</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Interface */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-0">
            <Tabs defaultValue="dashboard" className="w-full">
              <div className="border-b border-slate-700 px-6">
                <TabsList className="grid w-full grid-cols-7 bg-transparent h-14">
                  <TabsTrigger 
                    value="dashboard" 
                    className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white"
                  >
                    <span>🏠</span>
                    Dashboard
                  </TabsTrigger>
                  <TabsTrigger 
                    value="wallets" 
                    className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white"
                  >
                    <span>👛</span>
                    Wallets
                  </TabsTrigger>
                  <TabsTrigger 
                    value="create-token" 
                    className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white"
                  >
                    <span>➕</span>
                    Create Token
                  </TabsTrigger>
                  <TabsTrigger 
                    value="trading" 
                    className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white"
                  >
                    <span>📊</span>
                    Trading
                  </TabsTrigger>
                  <TabsTrigger 
                    value="liquidity" 
                    className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white"
                  >
                    <span>💧</span>
                    Liquidity
                  </TabsTrigger>
                  <TabsTrigger 
                    value="bundles" 
                    className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white"
                  >
                    <span>📦</span>
                    Jito Bundles
                  </TabsTrigger>
                  <TabsTrigger 
                    value="automation" 
                    className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white"
                  >
                    <span>🤖</span>
                    Automation
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6">
                <TabsContent value="dashboard" className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-4">Welcome to Solana DeFi Suite</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 border-0">
                        <CardHeader>
                          <CardTitle className="text-white">Token Creation</CardTitle>
                          <CardDescription className="text-purple-100">
                            Create SPL tokens with custom parameters and metadata
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button variant="secondary" className="w-full">
                            Get Started
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-r from-green-600 to-blue-600 border-0">
                        <CardHeader>
                          <CardTitle className="text-white">Multi-Wallet Trading</CardTitle>
                          <CardDescription className="text-green-100">
                            Execute trades across up to 50 wallets simultaneously
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button variant="secondary" className="w-full">
                            Start Trading
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-r from-orange-600 to-red-600 border-0">
                        <CardHeader>
                          <CardTitle className="text-white">Liquidity Management</CardTitle>
                          <CardDescription className="text-orange-100">
                            Add and remove liquidity from DEX pools
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button variant="secondary" className="w-full">
                            Manage Pools
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-r from-cyan-600 to-blue-600 border-0">
                        <CardHeader>
                          <CardTitle className="text-white">Jito Bundles</CardTitle>
                          <CardDescription className="text-cyan-100">
                            MEV protection with atomic transaction execution
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button variant="secondary" className="w-full">
                            Configure Bundles
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="wallets" className="space-y-6">
                  <WalletManager 
                    selectedWallets={selectedWallets}
                    onWalletSelectionChange={setSelectedWallets}
                  />
                </TabsContent>

                <TabsContent value="create-token" className="space-y-6">
                  <TokenCreator />
                </TabsContent>

                <TabsContent value="trading" className="space-y-6">
                  <TokenTrading 
                    selectedWallets={selectedWallets}
                    wallets={wallets}
                  />
                </TabsContent>

                <TabsContent value="liquidity" className="space-y-6">
                  <LiquidityPoolManager 
                    selectedWallets={selectedWallets}
                  />
                </TabsContent>

                <TabsContent value="bundles" className="space-y-6">
                  <JitoBundleManager 
                    onBundleSettingsChange={setBundleSettings}
                  />
                </TabsContent>

                <TabsContent value="automation" className="space-y-6">
                  <JitoBundleAutomationDashboard 
                    selectedWallets={selectedWallets}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;