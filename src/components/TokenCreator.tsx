import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

const TokenCreator = () => {
  const [tokenData, setTokenData] = useState({
    name: '',
    symbol: '',
    decimals: 9,
    totalSupply: '',
    description: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setTokenData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateToken = async () => {
    setIsCreating(true);
    // Simulate token creation
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsCreating(false);
    setCurrentStep(4);
  };

  const resetForm = () => {
    setTokenData({
      name: '',
      symbol: '',
      decimals: 9,
      totalSupply: '',
      description: '',
    });
    setCurrentStep(1);
  };

  const progress = (currentStep / 4) * 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>SPL Token Creator</CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{currentStep}/4</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Token Name</Label>
                  <Input
                    id="name"
                    placeholder="My Awesome Token"
                    value={tokenData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="symbol">Token Symbol</Label>
                  <Input
                    id="symbol"
                    placeholder="MAT"
                    value={tokenData.symbol}
                    onChange={(e) => handleInputChange('symbol', e.target.value.toUpperCase())}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="decimals">Decimals</Label>
                  <Input
                    id="decimals"
                    type="number"
                    min="0"
                    max="18"
                    value={tokenData.decimals}
                    onChange={(e) => handleInputChange('decimals', parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supply">Total Supply</Label>
                  <Input
                    id="supply"
                    placeholder="1000000"
                    value={tokenData.totalSupply}
                    onChange={(e) => handleInputChange('totalSupply', e.target.value)}
                  />
                </div>
              </div>
              <Button 
                onClick={() => setCurrentStep(2)}
                disabled={!tokenData.name || !tokenData.symbol}
                className="w-full"
              >
                Next: Metadata
              </Button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Token Metadata</h3>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your token..."
                  value={tokenData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  Back
                </Button>
                <Button onClick={() => setCurrentStep(3)} className="flex-1">
                  Next: Review
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Review & Create</h3>
              <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="flex justify-between">
                  <span className="font-medium">Name:</span>
                  <span>{tokenData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Symbol:</span>
                  <span>{tokenData.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Decimals:</span>
                  <span>{tokenData.decimals}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Total Supply:</span>
                  <span>{tokenData.totalSupply}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setCurrentStep(2)}>
                  Back
                </Button>
                <Button 
                  onClick={handleCreateToken}
                  disabled={isCreating}
                  className="flex-1"
                >
                  {isCreating ? 'Creating Token...' : 'Create Token'}
                </Button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4 text-center">
              <div className="text-green-600 text-6xl">✓</div>
              <h3 className="text-lg font-medium">Token Created Successfully!</h3>
              <Badge variant="default" className="text-sm">
                Token Address: ABC123...DEF456
              </Badge>
              <Button onClick={resetForm} className="w-full">
                Create Another Token
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TokenCreator;