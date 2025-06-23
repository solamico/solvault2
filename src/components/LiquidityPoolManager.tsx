import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '../hooks/use-toast';
import { 
  Droplets, 
  Plus, 
  Minus, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

interface LiquidityPool {
  id: string;
  tokenA: string;
  tokenB: string;
  reserveA: number;
  reserveB: number;
  liquidity: number;
  apr: number;
  fees24h: number;
  volume24h: number;
  userLiquidity?: number;
  userShare?: number;
}

interface LiquidityPoolManagerProps {
  selectedWallets: Set<string>;
}

const LiquidityPoolManager: React.FC<LiquidityPoolManagerProps> = ({ selectedWallets }) => {
  const [pools, setPools] = useState<LiquidityPool[]>([]);
  const [selectedPool, setSelectedPool] = useState<string>('');
  const [addLiquidityAmount, setAddLiquidityAmount] = useState<{ tokenA: string; tokenB: string }>({
    tokenA: '',
    tokenB: ''
  });
  const [removeLiquidityPercent, setRemoveLiquidityPercent] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock data for demonstration
  useEffect(() => {
    const mockPools: LiquidityPool[] = [
      {
        id: 'sol-usdc',
        tokenA: 'SOL',
        tokenB: 'USDC',
        reserveA: 125000,
        reserveB: 15000000,
        liquidity: 2500000,
        apr: 24.5,
        fees24h: 12500,
        volume24h: 2500000,
        userLiquidity: 5000,
        userShare: 0.2
      },
      {
        id: 'ray-sol',
        tokenA: 'RAY',
        tokenB: 'SOL',
        reserveA: 850000,
        reserveB: 12500,
        liquidity: 1800000,
        apr: 18.2,
        fees24h: 8200,
        volume24h: 1650000,
        userLiquidity: 2500,
        userShare: 0.14
      },
      {
        id: 'msol-sol',
        tokenA: 'mSOL',
        tokenB: 'SOL',
        reserveA: 95000,
        reserveB: 98500,
        liquidity: 1200000,
        apr: 12.8,
        fees24h: 4800,
        volume24h: 980000,
        userLiquidity: 1200,
        userShare: 0.1
      }
    ];
    setPools(mockPools);
  }, []);

  const handleAddLiquidity = async () => {
    if (!selectedPool || !addLiquidityAmount.tokenA || !addLiquidityAmount.tokenB) {
      toast({
        title: "Invalid Input",
        description: "Please select a pool and enter both token amounts",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Liquidity Added",
        description: `Successfully added ${addLiquidityAmount.tokenA} + ${addLiquidityAmount.tokenB} to ${selectedPool.toUpperCase()} pool`,
      });
      
      setAddLiquidityAmount({ tokenA: '', tokenB: '' });
    } catch (error) {
      toast({
        title: "Transaction Failed",
        description: "Failed to add liquidity. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveLiquidity = async () => {
    if (!selectedPool || removeLiquidityPercent === 0) {
      toast({
        title: "Invalid Input",
        description: "Please select a pool and specify removal percentage",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Liquidity Removed",
        description: `Successfully removed ${removeLiquidityPercent}% liquidity from ${selectedPool.toUpperCase()} pool`,
      });
      
      setRemoveLiquidityPercent(0);
    } catch (error) {
      toast({
        title: "Transaction Failed",
        description: "Failed to remove liquidity. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedPoolData = pools.find(pool => pool.id === selectedPool);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="space-y-6">
      {/* Pool Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-blue-500" />
            Liquidity Pools Overview
          </CardTitle>
          <CardDescription>
            Manage liquidity positions across multiple pools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pools.map((pool) => (
              <div key={pool.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {pool.tokenA.charAt(0)}
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {pool.tokenB.charAt(0)}
                    </div>
                    <span className="font-medium">{pool.tokenA}/{pool.tokenB}</span>
                  </div>
                  <Badge variant={pool.apr > 20 ? "default" : "secondary"}>
                    {pool.apr}% APR
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">TVL:</span>
                    <span className="font-medium">{formatCurrency(pool.liquidity)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">24h Volume:</span>
                    <span className="font-medium">{formatCurrency(pool.volume24h)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">24h Fees:</span>
                    <span className="font-medium text-green-600">{formatCurrency(pool.fees24h)}</span>
                  </div>
                  {pool.userLiquidity && (
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-muted-foreground">Your Position:</span>
                      <span className="font-medium text-blue-600">{formatCurrency(pool.userLiquidity)}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Liquidity Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-green-500" />
            Liquidity Management
          </CardTitle>
          <CardDescription>
            Add or remove liquidity from pools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="add" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="add" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Liquidity
              </TabsTrigger>
              <TabsTrigger value="remove" className="flex items-center gap-2">
                <Minus className="h-4 w-4" />
                Remove Liquidity
              </TabsTrigger>
            </TabsList>

            <TabsContent value="add" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pool-select">Select Pool</Label>
                  <Select value={selectedPool} onValueChange={setSelectedPool}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a liquidity pool" />
                    </SelectTrigger>
                    <SelectContent>
                      {pools.map((pool) => (
                        <SelectItem key={pool.id} value={pool.id}>
                          {pool.tokenA}/{pool.tokenB} - {pool.apr}% APR
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedPoolData && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tokenA-amount">{selectedPoolData.tokenA} Amount</Label>
                      <Input
                        id="tokenA-amount"
                        type="number"
                        placeholder="0.0"
                        value={addLiquidityAmount.tokenA}
                        onChange={(e) => setAddLiquidityAmount(prev => ({ ...prev, tokenA: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tokenB-amount">{selectedPoolData.tokenB} Amount</Label>
                      <Input
                        id="tokenB-amount"
                        type="number"
                        placeholder="0.0"
                        value={addLiquidityAmount.tokenB}
                        onChange={(e) => setAddLiquidityAmount(prev => ({ ...prev, tokenB: e.target.value }))}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-blue-600" />
                  <div className="text-sm text-blue-600 dark:text-blue-400">
                    <span className="font-medium">Selected Wallets: {selectedWallets.size}</span>
                    <p className="text-xs">Liquidity will be added from all selected wallets proportionally</p>
                  </div>
                </div>

                <Button 
                  onClick={handleAddLiquidity} 
                  disabled={isLoading || !selectedPool}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Adding Liquidity...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Liquidity
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="remove" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="remove-pool-select">Select Pool</Label>
                  <Select value={selectedPool} onValueChange={setSelectedPool}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a liquidity pool" />
                    </SelectTrigger>
                    <SelectContent>
                      {pools.filter(pool => pool.userLiquidity && pool.userLiquidity > 0).map((pool) => (
                        <SelectItem key={pool.id} value={pool.id}>
                          {pool.tokenA}/{pool.tokenB} - {formatCurrency(pool.userLiquidity!)} position
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedPoolData && selectedPoolData.userLiquidity && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="remove-percent">Remove Percentage: {removeLiquidityPercent}%</Label>
                      <div className="px-3">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={removeLiquidityPercent}
                          onChange={(e) => setRemoveLiquidityPercent(parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>0%</span>
                        <span>25%</span>
                        <span>50%</span>
                        <span>75%</span>
                        <span>100%</span>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Current Position:</span>
                        <span className="font-medium">{formatCurrency(selectedPoolData.userLiquidity)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Amount to Remove:</span>
                        <span className="font-medium text-red-600">
                          {formatCurrency((selectedPoolData.userLiquidity * removeLiquidityPercent) / 100)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Remaining Position:</span>
                        <span className="font-medium">
                          {formatCurrency(selectedPoolData.userLiquidity * (100 - removeLiquidityPercent) / 100)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={handleRemoveLiquidity} 
                  disabled={isLoading || !selectedPool || removeLiquidityPercent === 0}
                  variant="destructive"
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Removing Liquidity...
                    </>
                  ) : (
                    <>
                      <Minus className="h-4 w-4 mr-2" />
                      Remove Liquidity
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                {formatCurrency(pools.reduce((sum, pool) => sum + (pool.userLiquidity || 0), 0))}
              </div>
              <div className="text-sm text-muted-foreground">Total Liquidity</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">
                {((pools.reduce((sum, pool) => sum + (pool.apr * (pool.userLiquidity || 0)), 0)) / 
                  pools.reduce((sum, pool) => sum + (pool.userLiquidity || 0), 0) || 0).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Avg APR</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500">
                {formatCurrency(pools.reduce((sum, pool) => sum + pool.fees24h * ((pool.userLiquidity || 0) / pool.liquidity), 0))}
              </div>
              <div className="text-sm text-muted-foreground">24h Earnings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">
                {pools.filter(pool => pool.userLiquidity && pool.userLiquidity > 0).length}
              </div>
              <div className="text-sm text-muted-foreground">Active Positions</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiquidityPoolManager;