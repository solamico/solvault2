import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';

interface BundleTransaction {
  id: string;
  type: 'buy' | 'sell' | 'swap' | 'transfer';
  tokenAddress: string;
  amount: string;
  walletId: string;
  status: 'pending' | 'included' | 'failed' | 'landed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimatedFee: number;
}

interface BundleJob {
  id: string;
  name: string;
  type: 'snipe' | 'bulk_buy' | 'bulk_sell' | 'arbitrage' | 'custom';
  status: 'active' | 'paused' | 'completed' | 'failed';
  bundleSize: number;
  intervalMs: number;
  maxRetries: number;
  successRate: number;
  totalBundles: number;
  landedBundles: number;
  failedBundles: number;
  transactions: BundleTransaction[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: Date;
  lastExecuted?: Date;
}

interface AutomationRule {
  id: string;
  name: string;
  trigger: 'price_change' | 'time_based' | 'token_launch' | 'liquidity_threshold';
  condition: string;
  action: 'bundle_buy' | 'bundle_sell' | 'stop_loss' | 'take_profit';
  enabled: boolean;
  bundleSettings: {
    bundleSize: number;
    slippage: number;
    gasPrice: number;
    maxRetries: number;
  };
}

interface JitoBundleAutomationDashboardProps {
  selectedWallets: Set<string>;
}

const JitoBundleAutomationDashboard: React.FC<JitoBundleAutomationDashboardProps> = ({ 
  selectedWallets 
}) => {
  const [bundleJobs, setBundleJobs] = useState<BundleJob[]>([
    {
      id: '1',
      name: 'Token Snipe Campaign',
      type: 'snipe',
      status: 'active',
      bundleSize: 5,
      intervalMs: 200,
      maxRetries: 3,
      successRate: 87.5,
      totalBundles: 24,
      landedBundles: 21,
      failedBundles: 3,
      transactions: [],
      priority: 'urgent',
      createdAt: new Date(),
      lastExecuted: new Date()
    },
    {
      id: '2',
      name: 'Bulk Purchase SOL->USDC',
      type: 'bulk_buy',
      status: 'paused',
      bundleSize: 10,
      intervalMs: 500,
      maxRetries: 2,
      successRate: 92.3,
      totalBundles: 12,
      landedBundles: 11,
      failedBundles: 1,
      transactions: [],
      priority: 'high',
      createdAt: new Date()
    }
  ]);

  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([
    {
      id: '1',
      name: 'Token Launch Sniper',
      trigger: 'token_launch',
      condition: 'New token with >$10k liquidity',
      action: 'bundle_buy',
      enabled: true,
      bundleSettings: {
        bundleSize: 8,
        slippage: 15,
        gasPrice: 50,
        maxRetries: 5
      }
    },
    {
      id: '2',
      name: 'Stop Loss Protection',
      trigger: 'price_change',
      condition: 'Price drops >20%',
      action: 'stop_loss',
      enabled: true,
      bundleSettings: {
        bundleSize: 12,
        slippage: 25,
        gasPrice: 100,
        maxRetries: 3
      }
    }
  ]);

  const [newJobForm, setNewJobForm] = useState({
    name: '',
    type: 'bulk_buy',
    bundleSize: 5,
    intervalMs: 300,
    maxRetries: 3,
    priority: 'medium'
  });

  const [newRuleForm, setNewRuleForm] = useState({
    name: '',
    trigger: 'price_change',
    condition: '',
    action: 'bundle_buy',
    bundleSize: 5,
    slippage: 10,
    gasPrice: 50,
    maxRetries: 3
  });

  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [isCreatingRule, setIsCreatingRule] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'completed': return 'bg-blue-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-500 bg-red-50 dark:bg-red-950';
      case 'high': return 'text-orange-500 bg-orange-50 dark:bg-orange-950';
      case 'medium': return 'text-blue-500 bg-blue-50 dark:bg-blue-950';
      case 'low': return 'text-gray-500 bg-gray-50 dark:bg-gray-950';
      default: return 'text-gray-500 bg-gray-50 dark:bg-gray-950';
    }
  };

  const createBundleJob = async () => {
    setIsCreatingJob(true);
    
    const newJob: BundleJob = {
      id: Date.now().toString(),
      name: newJobForm.name,
      type: newJobForm.type as any,
      status: 'active',
      bundleSize: newJobForm.bundleSize,
      intervalMs: newJobForm.intervalMs,
      maxRetries: newJobForm.maxRetries,
      successRate: 0,
      totalBundles: 0,
      landedBundles: 0,
      failedBundles: 0,
      transactions: [],
      priority: newJobForm.priority as any,
      createdAt: new Date()
    };

    await new Promise(resolve => setTimeout(resolve, 1500));
    setBundleJobs(prev => [...prev, newJob]);
    setNewJobForm({
      name: '',
      type: 'bulk_buy',
      bundleSize: 5,
      intervalMs: 300,
      maxRetries: 3,
      priority: 'medium'
    });
    setIsCreatingJob(false);
  };

  const createAutomationRule = async () => {
    setIsCreatingRule(true);
    
    const newRule: AutomationRule = {
      id: Date.now().toString(),
      name: newRuleForm.name,
      trigger: newRuleForm.trigger as any,
      condition: newRuleForm.condition,
      action: newRuleForm.action as any,
      enabled: true,
      bundleSettings: {
        bundleSize: newRuleForm.bundleSize,
        slippage: newRuleForm.slippage,
        gasPrice: newRuleForm.gasPrice,
        maxRetries: newRuleForm.maxRetries
      }
    };

    await new Promise(resolve => setTimeout(resolve, 1500));
    setAutomationRules(prev => [...prev, newRule]);
    setNewRuleForm({
      name: '',
      trigger: 'price_change',
      condition: '',
      action: 'bundle_buy',
      bundleSize: 5,
      slippage: 10,
      gasPrice: 50,
      maxRetries: 3
    });
    setIsCreatingRule(false);
  };

  const toggleJobStatus = (jobId: string) => {
    setBundleJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, status: job.status === 'active' ? 'paused' : 'active' }
        : job
    ));
  };

  const toggleRuleStatus = (ruleId: string) => {
    setAutomationRules(prev => prev.map(rule => 
      rule.id === ruleId 
        ? { ...rule, enabled: !rule.enabled }
        : rule
    ));
  };

  const deleteJob = (jobId: string) => {
    setBundleJobs(prev => prev.filter(job => job.id !== jobId));
  };

  const deleteRule = (ruleId: string) => {
    setAutomationRules(prev => prev.filter(rule => rule.id !== ruleId));
  };

  const totalActiveJobs = bundleJobs.filter(job => job.status === 'active').length;
  const totalBundlesLanded = bundleJobs.reduce((sum, job) => sum + job.landedBundles, 0);
  const totalBundlesFailed = bundleJobs.reduce((sum, job) => sum + job.failedBundles, 0);
  const overallSuccessRate = totalBundlesLanded + totalBundlesFailed > 0 
    ? (totalBundlesLanded / (totalBundlesLanded + totalBundlesFailed)) * 100 
    : 0;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active Jobs</p>
                <p className="text-2xl font-bold text-white">{totalActiveJobs}</p>
              </div>
              <span className="text-green-400 text-2xl">⚡</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Success Rate</p>
                <p className="text-2xl font-bold text-white">{overallSuccessRate.toFixed(1)}%</p>
              </div>
              <span className="text-blue-400 text-2xl">📊</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Bundles Landed</p>
                <p className="text-2xl font-bold text-white">{totalBundlesLanded}</p>
              </div>
              <span className="text-green-400 text-2xl">✅</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active Rules</p>
                <p className="text-2xl font-bold text-white">{automationRules.filter(r => r.enabled).length}</p>
              </div>
              <span className="text-purple-400 text-2xl">🤖</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Jito Bundle Automation Dashboard</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{selectedWallets.size} wallets selected</Badge>
            <Badge variant="outline">MEV Protection Active</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="jobs" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="jobs">Bundle Jobs</TabsTrigger>
              <TabsTrigger value="automation">Automation Rules</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Bundle Jobs Tab */}
            <TabsContent value="jobs" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Active Bundle Jobs</h3>
                <Button onClick={() => setIsCreatingJob(!isCreatingJob)}>
                  {isCreatingJob ? 'Cancel' : 'Create New Job'}
                </Button>
              </div>

              {isCreatingJob && (
                <Card className="border-purple-200 dark:border-purple-800">
                  <CardHeader>
                    <CardTitle className="text-lg">Create Bundle Job</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Job Name</Label>
                        <Input
                          placeholder="e.g., Token Snipe Campaign"
                          value={newJobForm.name}
                          onChange={(e) => setNewJobForm(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Job Type</Label>
                        <Select value={newJobForm.type} onValueChange={(value) => setNewJobForm(prev => ({ ...prev, type: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="snipe">Token Snipe</SelectItem>
                            <SelectItem value="bulk_buy">Bulk Buy</SelectItem>
                            <SelectItem value="bulk_sell">Bulk Sell</SelectItem>
                            <SelectItem value="arbitrage">Arbitrage</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Bundle Size</Label>
                        <Input
                          type="number"
                          min="1"
                          max="25"
                          value={newJobForm.bundleSize}
                          onChange={(e) => setNewJobForm(prev => ({ ...prev, bundleSize: parseInt(e.target.value) }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Interval (ms)</Label>
                        <Input
                          type="number"
                          min="100"
                          max="5000"
                          value={newJobForm.intervalMs}
                          onChange={(e) => setNewJobForm(prev => ({ ...prev, intervalMs: parseInt(e.target.value) }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Max Retries</Label>
                        <Input
                          type="number"
                          min="1"
                          max="10"
                          value={newJobForm.maxRetries}
                          onChange={(e) => setNewJobForm(prev => ({ ...prev, maxRetries: parseInt(e.target.value) }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Priority</Label>
                        <Select value={newJobForm.priority} onValueChange={(value) => setNewJobForm(prev => ({ ...prev, priority: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button 
                      onClick={createBundleJob}
                      disabled={!newJobForm.name || isCreatingJob}
                      className="w-full"
                    >
                      {isCreatingJob ? 'Creating Job...' : 'Create Bundle Job'}
                    </Button>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-3">
                {bundleJobs.map(job => (
                  <Card key={job.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(job.status)}`} />
                          <div>
                            <h4 className="font-medium">{job.name}</h4>
                            <p className="text-sm text-gray-500 capitalize">{job.type.replace('_', ' ')}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className={getPriorityColor(job.priority)}>
                            {job.priority}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleJobStatus(job.id)}
                          >
                            {job.status === 'active' ? 'Pause' : 'Resume'}
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteJob(job.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Bundle Size</p>
                          <p className="font-medium">{job.bundleSize}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Success Rate</p>
                          <p className="font-medium">{job.successRate.toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Total Bundles</p>
                          <p className="font-medium">{job.totalBundles}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Landed</p>
                          <p className="font-medium text-green-600">{job.landedBundles}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Failed</p>
                          <p className="font-medium text-red-600">{job.failedBundles}</p>
                        </div>
                      </div>

                      {job.successRate > 0 && (
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Success Rate</span>
                            <span>{job.successRate.toFixed(1)}%</span>
                          </div>
                          <Progress value={job.successRate} className="h-2" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Automation Rules Tab */}
            <TabsContent value="automation" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Automation Rules</h3>
                <Button onClick={() => setIsCreatingRule(!isCreatingRule)}>
                  {isCreatingRule ? 'Cancel' : 'Create New Rule'}
                </Button>
              </div>

              {isCreatingRule && (
                <Card className="border-green-200 dark:border-green-800">
                  <CardHeader>
                    <CardTitle className="text-lg">Create Automation Rule</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Rule Name</Label>
                        <Input
                          placeholder="e.g., Stop Loss Protection"
                          value={newRuleForm.name}
                          onChange={(e) => setNewRuleForm(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Trigger</Label>
                        <Select value={newRuleForm.trigger} onValueChange={(value) => setNewRuleForm(prev => ({ ...prev, trigger: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="price_change">Price Change</SelectItem>
                            <SelectItem value="time_based">Time Based</SelectItem>
                            <SelectItem value="token_launch">Token Launch</SelectItem>
                            <SelectItem value="liquidity_threshold">Liquidity Threshold</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Condition</Label>
                        <Input
                          placeholder="e.g., Price drops >20%"
                          value={newRuleForm.condition}
                          onChange={(e) => setNewRuleForm(prev => ({ ...prev, condition: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Action</Label>
                        <Select value={newRuleForm.action} onValueChange={(value) => setNewRuleForm(prev => ({ ...prev, action: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bundle_buy">Bundle Buy</SelectItem>
                            <SelectItem value="bundle_sell">Bundle Sell</SelectItem>
                            <SelectItem value="stop_loss">Stop Loss</SelectItem>
                            <SelectItem value="take_profit">Take Profit</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Bundle Size</Label>
                        <Input
                          type="number"
                          min="1"
                          max="25"
                          value={newRuleForm.bundleSize}
                          onChange={(e) => setNewRuleForm(prev => ({ ...prev, bundleSize: parseInt(e.target.value) }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Slippage (%)</Label>
                        <Input
                          type="number"
                          min="0.1"
                          max="50"
                          step="0.1"
                          value={newRuleForm.slippage}
                          onChange={(e) => setNewRuleForm(prev => ({ ...prev, slippage: parseFloat(e.target.value) }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Gas Price</Label>
                        <Input
                          type="number"
                          min="1"
                          max="1000"
                          value={newRuleForm.gasPrice}
                          onChange={(e) => setNewRuleForm(prev => ({ ...prev, gasPrice: parseInt(e.target.value) }))}
                        />
                      </div>
                    </div>
                    <Button 
                      onClick={createAutomationRule}
                      disabled={!newRuleForm.name || !newRuleForm.condition || isCreatingRule}
                      className="w-full"
                    >
                      {isCreatingRule ? 'Creating Rule...' : 'Create Automation Rule'}
                    </Button>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-3">
                {automationRules.map(rule => (
                  <Card key={rule.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Switch
                            checked={rule.enabled}
                            onCheckedChange={() => toggleRuleStatus(rule.id)}
                          />
                          <div>
                            <h4 className="font-medium">{rule.name}</h4>
                            <p className="text-sm text-gray-500">{rule.condition}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="capitalize">
                            {rule.trigger.replace('_', ' ')}
                          </Badge>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteRule(rule.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Action</p>
                          <p className="font-medium capitalize">{rule.action.replace('_', ' ')}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Bundle Size</p>
                          <p className="font-medium">{rule.bundleSettings.bundleSize}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Slippage</p>
                          <p className="font-medium">{rule.bundleSettings.slippage}%</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Gas Price</p>
                          <p className="font-medium">{rule.bundleSettings.gasPrice}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Bundle Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Overall Success Rate</span>
                        <span className="font-bold">{overallSuccessRate.toFixed(1)}%</span>
                      </div>
                      <Progress value={overallSuccessRate} className="h-3" />
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Total Bundles</span>
                          <span className="text-sm font-medium">{totalBundlesLanded + totalBundlesFailed}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Landed</span>
                          <span className="text-sm font-medium text-green-600">{totalBundlesLanded}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Failed</span>
                          <span className="text-sm font-medium text-red-600">{totalBundlesFailed}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Job Type Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['snipe', 'bulk_buy', 'bulk_sell', 'arbitrage'].map(type => {
                        const count = bundleJobs.filter(job => job.type === type).length;
                        const percentage = bundleJobs.length > 0 ? (count / bundleJobs.length) * 100 : 0;
                        return (
                          <div key={type}>
                            <div className="flex justify-between text-sm">
                              <span className="capitalize">{type.replace('_', ' ')}</span>
                              <span>{count} ({percentage.toFixed(0)}%)</span>
                            </div>
                            <Progress value={percentage} className="h-2" />
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {bundleJobs
                      .filter(job => job.lastExecuted)
                      .sort((a, b) => (b.lastExecuted?.getTime() || 0) - (a.lastExecuted?.getTime() || 0))
                      .slice(0, 5)
                      .map(job => (
                        <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded">
                          <div>
                            <p className="font-medium">{job.name}</p>
                            <p className="text-sm text-gray-500">
                              Last executed: {job.lastExecuted?.toLocaleTimeString()}
                            </p>
                          </div>
                          <Badge variant="secondary" className={getPriorityColor(job.priority)}>
                            {job.priority}
                          </Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default JitoBundleAutomationDashboard;