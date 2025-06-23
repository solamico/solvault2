import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface GeneratedWallet {
  id: string;
  publicKey: string;
  balance: number;
  label: string;
}

interface TokenTradingProps {
  selectedWallets: Set<string>;
  wallets: GeneratedWallet[];
}

const TokenTrading: React.FC<TokenTradingProps> = ({ selectedWallets, wallets }) => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [buyAmount, setBuyAmount] = useState('');
  const [sellPercentage, setSellPercentage] = useState('100');
  const [isTrading, setIsTrading] = useState(false);

  const selectedWalletsList = wallets.filter(wallet => selectedWallets.has(wallet.id));

  const handleBuyTokens = async () => {
    if (!tokenAddress || !buyAmount || selectedWallets.size === 0) {
      return;
    }

    setIsTrading(true);
    // Simulate trading
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsTrading(false);
  };

  const handleSellTokens = async () => {
    if (!tokenAddress || selectedWallets.size === 0) {
      return;
    }

    setIsTrading(true);
    // Simulate trading
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsTrading(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Multi-Wallet Token Trading</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {selectedWallets.size} wallets selected
            </Badge>
            <Badge variant="outline">
              Jupiter DEX Integration
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="buy" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="buy">Buy Tokens</TabsTrigger>
              <TabsTrigger value="sell">Sell Tokens</TabsTrigger>
            </TabsList>

            <TabsContent value="buy" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="token-address">Token Address</Label>
                  <Input
                    id="token-address"
                    placeholder="Enter token mint address..."
                    value={tokenAddress}
                    onChange={(e) => setTokenAddress(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="buy-amount">SOL Amount per Wallet</Label>
                  <Input
                    id="buy-amount"
                    type="number"
                    placeholder="0.1"
                    value={buyAmount}
                    onChange={(e) => setBuyAmount(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Selected Wallets</Label>
                  <div className="max-h-40 overflow-y-auto space-y-1">
                    {selectedWalletsList.map((wallet) => (
                      <div key={wallet.id} className="text-sm p-2 bg-gray-50 dark:bg-gray-900 rounded">
                        {wallet.label} - {wallet.balance.toFixed(2)} SOL
                      </div>
                    ))}
                    {selectedWallets.size === 0 && (
                      <div className="text-sm text-gray-500 p-2">
                        No wallets selected. Go to Wallets tab to select wallets.
                      </div>
                    )}
                  </div>
                </div>

                <Button 
                  onClick={handleBuyTokens}
                  disabled={isTrading || !tokenAddress || !buyAmount || selectedWallets.size === 0}
                  className="w-full"
                >
                  {isTrading ? 'Executing Trades...' : `Buy Tokens (${selectedWallets.size} wallets)`}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="sell" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sell-token-address">Token Address</Label>
                  <Input
                    id="sell-token-address"
                    placeholder="Enter token mint address..."
                    value={tokenAddress}
                    onChange={(e) => setTokenAddress(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sell-percentage">Sell Percentage</Label>
                  <Select value={sellPercentage} onValueChange={setSellPercentage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="25">25%</SelectItem>
                      <SelectItem value="50">50%</SelectItem>
                      <SelectItem value="75">75%</SelectItem>
                      <SelectItem value="100">100%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleSellTokens}
                  disabled={isTrading || !tokenAddress || selectedWallets.size === 0}
                  variant="destructive"
                  className="w-full"
                >
                  {isTrading ? 'Executing Trades...' : `Sell ${sellPercentage}% (${selectedWallets.size} wallets)`}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TokenTrading;