import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { useJitoBundles } from '../hooks/useJitoBundles';
import { Package, Zap, Clock, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface JitoBundleManagerProps {
  onBundleSettingsChange: (settings: BundleSettings) => void;
}

export interface BundleSettings {
  bundleSize: number;
  intervalMs: number;
  maxRetries: number;
  enabled: boolean;
}

const JitoBundleManager: React.FC<JitoBundleManagerProps> = ({ onBundleSettingsChange }) => {
  const [settings, setSettings] = useState<BundleSettings>({
    bundleSize: 5,
    intervalMs: 200,
    maxRetries: 3,
    enabled: true,
  });

  const { isProcessing, bundleResults, getBundleStats } = useJitoBundles();
  const stats = getBundleStats();

  const handleSettingsChange = (newSettings: Partial<BundleSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    onBundleSettingsChange(updated);
  };

  return (
    <div className="space-y-6">
      {/* Bundle Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Jito Bundle Configuration
          </CardTitle>
          <CardDescription>
            Configure bundle settings for optimal MEV protection and execution
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bundleSize">Bundle Size</Label>
              <Input
                id="bundleSize"
                type="number"
                min="1"
                max="5"
                value={settings.bundleSize}
                onChange={(e) => handleSettingsChange({ bundleSize: parseInt(e.target.value) || 5 })}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">Max transactions per bundle (1-5)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="interval">Interval (ms)</Label>
              <Input
                id="interval"
                type="number"
                min="100"
                max="1000"
                value={settings.intervalMs}
                onChange={(e) => handleSettingsChange({ intervalMs: parseInt(e.target.value) || 200 })}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">Delay between bundles (100-1000ms)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxRetries">Max Retries</Label>
              <Input
                id="maxRetries"
                type="number"
                min="0"
                max="10"
                value={settings.maxRetries}
                onChange={(e) => handleSettingsChange({ maxRetries: parseInt(e.target.value) || 3 })}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">Retry failed bundles (0-10)</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label htmlFor="enabled">Enable Jito Bundles</Label>
              <Badge variant={settings.enabled ? "default" : "secondary"}>
                {settings.enabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>
            <Button
              variant={settings.enabled ? "destructive" : "default"}
              size="sm"
              onClick={() => handleSettingsChange({ enabled: !settings.enabled })}
            >
              {settings.enabled ? "Disable" : "Enable"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bundle Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Bundle Statistics
          </CardTitle>
          <CardDescription>
            Real-time statistics for bundle execution performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Bundles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">{stats.successful}</div>
              <div className="text-sm text-muted-foreground">Successful</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">{stats.failed}</div>
              <div className="text-sm text-muted-foreground">Failed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">{stats.successRate}%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>

          {stats.total > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Success Rate</span>
                <span>{stats.successRate}%</span>
              </div>
              <Progress value={stats.successRate} className="w-full" />
            </div>
          )}

          {isProcessing && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <Zap className="h-4 w-4 animate-pulse" />
                <span className="font-medium">Processing bundles...</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Bundle Results */}
      {bundleResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-500" />
              Recent Bundle Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {bundleResults.slice(-10).reverse().map((result, index) => (
                <div key={result.bundleId} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    {result.success ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                    <div>
                      <div className="font-medium text-sm">{result.bundleId}</div>
                      <div className="text-xs text-muted-foreground">
                        {result.transactions.length} transactions
                      </div>
                    </div>
                  </div>
                  <Badge variant={result.success ? "default" : "destructive"}>
                    {result.success ? "Success" : "Failed"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bundle Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Jito Bundle Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">MEV Protection</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Protect your transactions from front-running and sandwich attacks
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-blue-500" />
                <span className="font-medium">Atomic Execution</span>
              </div>
              <p className="text-sm text-muted-foreground">
                All transactions in a bundle succeed or fail together
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="font-medium">Higher Success Rate</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Reduced chance of transaction failures and reverts
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-500" />
                <span className="font-medium">Predictable Timing</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Guaranteed execution order within the same block
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JitoBundleManager;