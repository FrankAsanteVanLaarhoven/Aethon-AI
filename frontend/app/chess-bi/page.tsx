"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Shield, 
  Zap, 
  Users, 
  BarChart3,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Info,
  Cpu,
  Network,
  Atom,
  Rocket
} from 'lucide-react';

interface MarketData {
  conditions: Record<string, number>;
  landscape: Record<string, any>;
  competitors: Array<Record<string, any>>;
  market_segments: string[];
  geographic_regions: string[];
}

interface MoveAnalysis {
  piece: string;
  from_position: { x: number; y: number };
  to_position: { x: number; y: number };
  strategic_value: number;
  risk_score: number;
  expected_return: number;
  confidence: number;
}

interface CompetitiveAnalysis {
  best_move: MoveAnalysis;
  top_moves: MoveAnalysis[];
  position_evaluation: number;
  market_control: number;
  competitive_position: number;
  total_moves_available: number;
  analysis_timestamp: string;
  recommendations: string[];
}

interface GameState {
  board: Array<Array<any>>;
  pieces: Array<{
    piece_type: string;
    player: string;
    position: { x: number; y: number };
    value: number;
    influence_radius: number;
    strategic_weight: number;
  }>;
  current_player: string;
  move_count: number;
  market_conditions: Record<string, number>;
  competitive_landscape: Record<string, any>;
}

const ChessBIPage: React.FC = () => {
  const [analysis, setAnalysis] = useState<CompetitiveAnalysis | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedMove, setSelectedMove] = useState<MoveAnalysis | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['Minimax Algorithm']);
  const [showConfigPanel, setShowConfigPanel] = useState<string | null>(null);
  const [productionConfigs, setProductionConfigs] = useState<Record<string, any>>({
    'Minimax Algorithm': {
      depth: 6,
      evaluationFunction: 'advanced',
      pruningEnabled: true,
      timeLimit: 5.0,
      parallelThreads: 4
    },
    'Alpha-Beta Pruning': {
      enabled: true,
      aspirationWindows: true,
      killerMoves: true,
      historyHeuristic: true,
      transpositionTable: true
    },
    'Position Evaluation': {
      materialWeight: 1.0,
      positionWeight: 0.8,
      mobilityWeight: 0.6,
      kingSafetyWeight: 1.2,
      pawnStructureWeight: 0.7
    },
    'Strategic Planning': {
      horizonDepth: 8,
      tacticalDepth: 4,
      endgameDepth: 12,
      openingBook: true,
      endgameTablebase: true
    }
  });
  const [marketData, setMarketData] = useState<MarketData>({
    conditions: {
      market_volatility: 0.3,
      growth_rate: 0.15,
      competition_intensity: 0.7,
      regulatory_pressure: 0.4
    },
    landscape: {
      total_market_size: 1000000000,
      market_maturity: 0.6,
      technology_adoption: 0.8
    },
    competitors: [
      { name: "Competitor A", market_share: 0.25, strength: 0.8 },
      { name: "Competitor B", market_share: 0.20, strength: 0.7 },
      { name: "Competitor C", market_share: 0.15, strength: 0.6 }
    ],
    market_segments: ["Enterprise", "SMB", "Consumer"],
    geographic_regions: ["North America", "Europe", "Asia-Pacific"]
  });

  // Revolutionary Chess BI Features
  const revolutionaryFeatures = [
    {
      id: 'Minimax Algorithm',
      name: 'Minimax Algorithm',
      icon: Brain,
      description: 'Advanced minimax algorithm with deep strategic analysis',
      benefits: ['Optimal move selection', 'Strategic depth', 'Competitive advantage'],
      status: 'active',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      id: 'Alpha-Beta Pruning',
      name: 'Alpha-Beta Pruning',
      icon: Cpu,
      description: 'Intelligent pruning for faster and more efficient analysis',
      benefits: ['Faster computation', 'Reduced search space', 'Better performance'],
      status: 'active',
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      id: 'Position Evaluation',
      name: 'Position Evaluation',
      icon: Target,
      description: 'Sophisticated position evaluation with multiple factors',
      benefits: ['Accurate assessment', 'Multi-factor analysis', 'Strategic insight'],
      status: 'active',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    },
    {
      id: 'Strategic Planning',
      name: 'Strategic Planning',
      icon: Network,
      description: 'Long-term strategic planning with horizon extension',
      benefits: ['Long-term thinking', 'Strategic foresight', 'Competitive positioning'],
      status: 'active',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20'
    }
  ];

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const updateProductionConfig = (featureId: string, configKey: string, value: any) => {
    setProductionConfigs(prev => ({
      ...prev,
      [featureId]: {
        ...prev[featureId],
        [configKey]: value
      }
    }));
  };

  const validateConfiguration = (featureId: string) => {
    const config = productionConfigs[featureId];
    const warnings: string[] = [];
    const errors: string[] = [];

    switch (featureId) {
      case 'Minimax Algorithm':
        if (config.depth > 8) warnings.push('High depth may impact performance');
        if (config.depth < 3) errors.push('Depth too low for effective analysis');
        if (config.timeLimit > 10) warnings.push('Long time limit may cause delays');
        break;
      case 'Alpha-Beta Pruning':
        if (!config.enabled) errors.push('Pruning should be enabled for optimal performance');
        break;
      case 'Position Evaluation':
        if (config.materialWeight < 0.5) warnings.push('Low material weight may affect accuracy');
        if (config.kingSafetyWeight < 1.0) warnings.push('King safety is critical for strategic analysis');
        break;
      case 'Strategic Planning':
        if (config.horizonDepth < 6) errors.push('Horizon depth too low for strategic planning');
        if (!config.openingBook) warnings.push('Opening book recommended for better performance');
        break;
    }

    return {
      valid: errors.length === 0,
      warnings,
      errors
    };
  };

  const saveProductionConfig = async (featureId: string) => {
    try {
      const response = await fetch(`http://localhost:8002/api/v1/chess-bi/configure-feature/${encodeURIComponent(featureId)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feature_id: featureId,
          configuration: productionConfigs[featureId],
          environment: 'production'
        }),
      });

      if (!response.ok) {
        throw new Error('Configuration save failed');
      }

      const result = await response.json();
      console.log('Configuration saved:', result);
      setShowConfigPanel(null);
    } catch (error) {
      console.error('Error saving configuration:', error);
    }
  };

  const analyzeCompetitiveLandscape = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('http://localhost:8002/api/v1/chess-bi/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...marketData,
          selected_features: selectedFeatures,
          feature_configurations: productionConfigs
        }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const result = await response.json();
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing competitive landscape:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getGameState = async () => {
    try {
      const response = await fetch('http://localhost:8001/api/v1/chess-bi/game-state', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(marketData),
      });

      if (!response.ok) {
        throw new Error('Failed to get game state');
      }

      const result = await response.json();
      setGameState(result);
    } catch (error) {
      console.error('Error getting game state:', error);
    }
  };

  useEffect(() => {
    getGameState();
  }, []);

  const getPieceIcon = (pieceType: string) => {
    switch (pieceType) {
      case 'CEO': return '👑';
      case 'CFO': return '💰';
      case 'CTO': return '⚙️';
      case 'CMO': return '📈';
      case 'VP': return '🎯';
      case 'MANAGER': return '👤';
      default: return '❓';
    }
  };

  const getPlayerColor = (player: string) => {
    switch (player) {
      case 'COMPANY': return 'bg-foreground';
      case 'COMPETITOR': return 'bg-muted-foreground';
      case 'MARKET': return 'bg-muted';
      case 'REGULATOR': return 'bg-secondary';
      default: return 'bg-muted-foreground';
    }
  };

  const getRiskColor = (risk: number) => {
    if (risk < 0.3) return 'text-foreground';
    if (risk < 0.7) return 'text-muted-foreground';
    return 'text-destructive';
  };

  const getValueColor = (value: number) => {
    if (value > 0.7) return 'text-foreground';
    if (value > 0.4) return 'text-muted-foreground';
    return 'text-destructive';
  };

  return (
    <div className="min-h-screen bg-black dark:bg-black bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/10 dark:bg-white/10 bg-black/10 rounded-xl">
              <Brain className="h-8 w-8 text-white dark:text-white text-black" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white dark:text-white text-black">Chess Business Intelligence</h1>
              <p className="text-white dark:text-white text-black">Strategic decision making using chess-like minimax algorithms</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button 
              onClick={analyzeCompetitiveLandscape}
              disabled={isAnalyzing}
              className="bg-white dark:bg-white bg-black text-black dark:text-black text-white hover:bg-white/90 dark:hover:bg-white/90 hover:bg-black/90"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Analyze Competitive Landscape
                </>
              )}
            </Button>
            
            <Button 
              onClick={getGameState}
              variant="outline"
              className="border-slate-600 text-white hover:bg-slate-800"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Refresh Game State
            </Button>
          </div>
        </div>

        {/* Revolutionary Features */}
        <Card className="bg-black/50 dark:bg-black/50 bg-white/50 border-white/20 dark:border-white/20 border-black/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Rocket className="h-5 w-5 text-white" />
              Revolutionary Chess BI Features
            </CardTitle>
            <CardDescription className="text-white">
              Select and configure advanced chess algorithms for enhanced strategic analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {revolutionaryFeatures.map((feature) => {
                const IconComponent = feature.icon;
                const isSelected = selectedFeatures.includes(feature.id);
                
                return (
                  <div
                    key={feature.id}
                    onClick={() => toggleFeature(feature.id)}
                    className={`
                      p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                      ${isSelected 
                        ? 'border-white bg-white/10 shadow-lg shadow-white/20' 
                        : 'border-white/30 bg-black/50 hover:border-white/50'
                      }
                      ${isSelected ? 'animate-pulse' : ''}
                    `}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${feature.bgColor}`}>
                        <IconComponent className={`h-5 w-5 ${feature.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm">{feature.name}</h3>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${isSelected ? 'border-white text-white' : 'border-white/50 text-white/70'}`}
                        >
                          {isSelected ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-white mb-2">{feature.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {feature.benefits.slice(0, 2).map((benefit, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Selected Features Details */}
            {selectedFeatures.length > 0 && (
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold text-white">Selected Features Configuration</h3>
                {selectedFeatures.map((featureId) => {
                  const feature = revolutionaryFeatures.find(f => f.id === featureId);
                  if (!feature) return null;
                  
                  return (
                    <Card key={featureId} className="bg-slate-700 border-slate-600">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <feature.icon className={`h-4 w-4 ${feature.color}`} />
                            <CardTitle className="text-white text-sm">{feature.name}</CardTitle>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowConfigPanel(showConfigPanel === featureId ? null : featureId)}
                            className="border-slate-500 text-white hover:bg-slate-600"
                          >
                            <Settings className="h-3 w-3 mr-1" />
                            Configure
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-xs text-white mb-2">{feature.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {feature.benefits.map((benefit, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Production Configuration Panel */}
        {showConfigPanel && (
          <Card className="bg-black/50 dark:bg-black/50 bg-white/50 border-white/20 dark:border-white/20 border-black/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-muted-foreground" />
                Production Configuration - {showConfigPanel}
              </CardTitle>
              <CardDescription className="text-white">
                Configure advanced parameters for production deployment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {showConfigPanel === 'Minimax Algorithm' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">Search Depth</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={productionConfigs['Minimax Algorithm'].depth}
                      onChange={(e) => updateProductionConfig('Minimax Algorithm', 'depth', parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">Time Limit (seconds)</label>
                    <input
                      type="number"
                      min="0.1"
                      max="30"
                      step="0.1"
                      value={productionConfigs['Minimax Algorithm'].timeLimit}
                      onChange={(e) => updateProductionConfig('Minimax Algorithm', 'timeLimit', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">Parallel Threads</label>
                    <input
                      type="number"
                      min="1"
                      max="16"
                      value={productionConfigs['Minimax Algorithm'].parallelThreads}
                      onChange={(e) => updateProductionConfig('Minimax Algorithm', 'parallelThreads', parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">Evaluation Function</label>
                    <select
                      value={productionConfigs['Minimax Algorithm'].evaluationFunction}
                      onChange={(e) => updateProductionConfig('Minimax Algorithm', 'evaluationFunction', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                    >
                      <option value="basic">Basic</option>
                      <option value="advanced">Advanced</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>
                </div>
              )}

              {showConfigPanel === 'Alpha-Beta Pruning' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={productionConfigs['Alpha-Beta Pruning'].enabled}
                      onChange={(e) => updateProductionConfig('Alpha-Beta Pruning', 'enabled', e.target.checked)}
                      className="rounded"
                    />
                    <label className="text-sm font-medium text-white">Enable Pruning</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={productionConfigs['Alpha-Beta Pruning'].aspirationWindows}
                      onChange={(e) => updateProductionConfig('Alpha-Beta Pruning', 'aspirationWindows', e.target.checked)}
                      className="rounded"
                    />
                    <label className="text-sm font-medium text-white">Aspiration Windows</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={productionConfigs['Alpha-Beta Pruning'].killerMoves}
                      onChange={(e) => updateProductionConfig('Alpha-Beta Pruning', 'killerMoves', e.target.checked)}
                      className="rounded"
                    />
                    <label className="text-sm font-medium text-white">Killer Moves</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={productionConfigs['Alpha-Beta Pruning'].transpositionTable}
                      onChange={(e) => updateProductionConfig('Alpha-Beta Pruning', 'transpositionTable', e.target.checked)}
                      className="rounded"
                    />
                    <label className="text-sm font-medium text-white">Transposition Table</label>
                  </div>
                </div>
              )}

              {showConfigPanel === 'Position Evaluation' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">Material Weight</label>
                    <input
                      type="number"
                      min="0"
                      max="2"
                      step="0.1"
                      value={productionConfigs['Position Evaluation'].materialWeight}
                      onChange={(e) => updateProductionConfig('Position Evaluation', 'materialWeight', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">Position Weight</label>
                    <input
                      type="number"
                      min="0"
                      max="2"
                      step="0.1"
                      value={productionConfigs['Position Evaluation'].positionWeight}
                      onChange={(e) => updateProductionConfig('Position Evaluation', 'positionWeight', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">King Safety Weight</label>
                    <input
                      type="number"
                      min="0"
                      max="2"
                      step="0.1"
                      value={productionConfigs['Position Evaluation'].kingSafetyWeight}
                      onChange={(e) => updateProductionConfig('Position Evaluation', 'kingSafetyWeight', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">Mobility Weight</label>
                    <input
                      type="number"
                      min="0"
                      max="2"
                      step="0.1"
                      value={productionConfigs['Position Evaluation'].mobilityWeight}
                      onChange={(e) => updateProductionConfig('Position Evaluation', 'mobilityWeight', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                    />
                  </div>
                </div>
              )}

              {showConfigPanel === 'Strategic Planning' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">Horizon Depth</label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={productionConfigs['Strategic Planning'].horizonDepth}
                      onChange={(e) => updateProductionConfig('Strategic Planning', 'horizonDepth', parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">Tactical Depth</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={productionConfigs['Strategic Planning'].tacticalDepth}
                      onChange={(e) => updateProductionConfig('Strategic Planning', 'tacticalDepth', parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">Endgame Depth</label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={productionConfigs['Strategic Planning'].endgameDepth}
                      onChange={(e) => updateProductionConfig('Strategic Planning', 'endgameDepth', parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={productionConfigs['Strategic Planning'].openingBook}
                        onChange={(e) => updateProductionConfig('Strategic Planning', 'openingBook', e.target.checked)}
                        className="rounded"
                      />
                      <label className="text-sm font-medium text-white">Opening Book</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={productionConfigs['Strategic Planning'].endgameTablebase}
                        onChange={(e) => updateProductionConfig('Strategic Planning', 'endgameTablebase', e.target.checked)}
                        className="rounded"
                      />
                      <label className="text-sm font-medium text-white">Endgame Tablebase</label>
                    </div>
                  </div>
                </div>
              )}

              {/* Configuration Validation */}
              <div className="mt-6">
                <h4 className="text-sm font-medium text-white mb-3">Configuration Validation</h4>
                {(() => {
                  const validation = validateConfiguration(showConfigPanel);
                  return (
                    <div className="space-y-2">
                      {validation.errors.length > 0 && (
                        <Alert className="bg-red-500/20 border-red-500">
                          <AlertDescription className="text-red-300">
                            <strong>Errors:</strong> {validation.errors.join(', ')}
                          </AlertDescription>
                        </Alert>
                      )}
                      {validation.warnings.length > 0 && (
                        <Alert className="bg-yellow-500/20 border-yellow-500">
                          <AlertDescription className="text-yellow-300">
                            <strong>Warnings:</strong> {validation.warnings.join(', ')}
                          </AlertDescription>
                        </Alert>
                      )}
                      {validation.valid && validation.warnings.length === 0 && (
                        <Alert className="bg-green-500/20 border-green-500">
                          <AlertDescription className="text-green-300">
                            Configuration is valid and ready for production deployment.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => saveProductionConfig(showConfigPanel)}
                  disabled={!validateConfiguration(showConfigPanel).valid}
                  className="bg-white dark:bg-white bg-black text-black dark:text-black text-white hover:bg-white/90 dark:hover:bg-white/90 hover:bg-black/90"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Save Production Configuration
                </Button>
                <Button
                  onClick={() => setShowConfigPanel(null)}
                  variant="outline"
                  className="border-slate-600 text-white hover:bg-slate-800"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="analysis" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800 border-slate-700">
            <TabsTrigger value="analysis" className="data-[state=active]:bg-slate-700">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analysis
            </TabsTrigger>
            <TabsTrigger value="board" className="data-[state=active]:bg-slate-700">
              <Target className="h-4 w-4 mr-2" />
              Game Board
            </TabsTrigger>
            <TabsTrigger value="moves" className="data-[state=active]:bg-slate-700">
              <TrendingUp className="h-4 w-4 mr-2" />
              Strategic Moves
            </TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-slate-700">
              <Info className="h-4 w-4 mr-2" />
              Insights
            </TabsTrigger>
          </TabsList>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            {analysis && (
              <>
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="bg-black/50 dark:bg-black/50 bg-white/50 border-white/20 dark:border-white/20 border-black/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-white">Position Evaluation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{analysis.position_evaluation.toFixed(1)}</div>
                      <p className="text-xs text-white">
                        {analysis.position_evaluation > 0 ? 'Advantage' : 'Disadvantage'}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-black/50 dark:bg-black/50 bg-white/50 border-white/20 dark:border-white/20 border-black/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-white">Market Control</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{analysis.market_control.toFixed(1)}</div>
                      <Progress value={analysis.market_control * 20} className="mt-2" />
                    </CardContent>
                  </Card>

                  <Card className="bg-black/50 dark:bg-black/50 bg-white/50 border-white/20 dark:border-white/20 border-black/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-white">Competitive Position</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{analysis.competitive_position.toFixed(1)}</div>
                      <p className="text-xs text-white">
                        {analysis.competitive_position > 1 ? 'Strong' : 'Needs Improvement'}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-black/50 dark:bg-black/50 bg-white/50 border-white/20 dark:border-white/20 border-black/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-white">Available Moves</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{analysis.total_moves_available}</div>
                      <p className="text-xs text-white">Strategic options</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Best Move */}
                <Card className="bg-black/50 dark:bg-black/50 bg-white/50 border-white/20 dark:border-white/20 border-black/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Zap className="h-5 w-5 text-muted-foreground" />
                      Best Strategic Move
                    </CardTitle>
                    <CardDescription className="text-white">
                      Optimal move calculated using minimax algorithm
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold text-white mb-2">Move Details</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-white">Piece:</span>
                            <span className="text-white">{getPieceIcon(analysis.best_move.piece)} {analysis.best_move.piece}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white">From:</span>
                            <span className="text-white">({analysis.best_move.from_position.x}, {analysis.best_move.from_position.y})</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white">To:</span>
                            <span className="text-white">({analysis.best_move.to_position.x}, {analysis.best_move.to_position.y})</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-white mb-2">Strategic Value</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-white">Value:</span>
                            <span className={getValueColor(analysis.best_move.strategic_value)}>
                              {analysis.best_move.strategic_value.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white">Risk:</span>
                            <span className={getRiskColor(analysis.best_move.risk_score)}>
                              {analysis.best_move.risk_score.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white">Return:</span>
                            <span className="text-foreground">
                              {analysis.best_move.expected_return.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-white mb-2">Confidence</h4>
                        <div className="space-y-2">
                          <Progress value={analysis.best_move.confidence * 100} className="mb-2" />
                          <p className="text-sm text-white">
                            {(analysis.best_move.confidence * 100).toFixed(1)}% confidence
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="bg-black/50 dark:bg-black/50 bg-white/50 border-white/20 dark:border-white/20 border-black/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Shield className="h-5 w-5 text-foreground" />
                      Strategic Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysis.recommendations.map((recommendation, index) => (
                        <Alert key={index} className="bg-slate-700 border-slate-600">
                          <AlertDescription className="text-white">
                            {recommendation}
                          </AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          {/* Game Board Tab */}
          <TabsContent value="board" className="space-y-6">
            {gameState && (
              <Card className="bg-black/50 dark:bg-black/50 bg-white/50 border-white/20 dark:border-white/20 border-black/20">
                <CardHeader>
                  <CardTitle className="text-white">Strategic Game Board</CardTitle>
                  <CardDescription className="text-white">
                    Current market positioning and competitive landscape
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-8 gap-1 max-w-2xl mx-auto">
                    {gameState.board.map((row, y) =>
                      row.map((cell, x) => (
                        <div
                          key={`${x}-${y}`}
                          className={`
                            aspect-square border border-slate-600 flex items-center justify-center text-2xl
                            ${(x + y) % 2 === 0 ? 'bg-slate-700' : 'bg-slate-600'}
                            hover:bg-slate-500 transition-colors cursor-pointer
                          `}
                        >
                          {cell && (
                            <div className="relative">
                              <span className="text-2xl">
                                {getPieceIcon(cell.piece_type)}
                              </span>
                              <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getPlayerColor(cell.player)}`}></div>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                  
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl mb-1">👑</div>
                      <div className="text-sm text-white">CEO</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">💰</div>
                      <div className="text-sm text-white">CFO</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">⚙️</div>
                      <div className="text-sm text-white">CTO</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">📈</div>
                      <div className="text-sm text-white">CMO</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Strategic Moves Tab */}
          <TabsContent value="moves" className="space-y-6">
            {analysis && (
              <Card className="bg-black/50 dark:bg-black/50 bg-white/50 border-white/20 dark:border-white/20 border-black/20">
                <CardHeader>
                  <CardTitle className="text-white">Top Strategic Moves</CardTitle>
                  <CardDescription className="text-white">
                    Ranked by strategic value and expected return
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysis.top_moves.map((move, index) => (
                      <div
                        key={index}
                        className={`
                          p-4 rounded-lg border transition-all cursor-pointer
                          ${selectedMove === move 
                            ? 'bg-foreground/10 border-foreground' 
                            : 'bg-slate-700 border-slate-600 hover:bg-slate-600'
                          }
                        `}
                        onClick={() => setSelectedMove(move)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="text-muted-foreground border-muted-foreground">
                              #{index + 1}
                            </Badge>
                            <span className="text-xl">{getPieceIcon(move.piece)}</span>
                            <span className="font-semibold text-white">{move.piece}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-white">
                              {move.strategic_value.toFixed(2)}
                            </div>
                            <div className="text-sm text-white">Strategic Value</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-white">From</div>
                            <div className="text-white">({move.from_position.x}, {move.from_position.y})</div>
                          </div>
                          <div>
                            <div className="text-white">To</div>
                            <div className="text-white">({move.to_position.x}, {move.to_position.y})</div>
                          </div>
                          <div>
                            <div className="text-white">Expected Return</div>
                            <div className="text-foreground">{move.expected_return.toFixed(2)}</div>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <span className="text-white">Risk:</span>
                            <span className={getRiskColor(move.risk_score)}>
                              {move.risk_score.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-white">Confidence:</span>
                            <Progress value={move.confidence * 100} className="w-20 h-2" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-black/50 dark:bg-black/50 bg-white/50 border-white/20 dark:border-white/20 border-black/20">
                <CardHeader>
                  <CardTitle className="text-white">Chess Principles</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-white">
                    <li>• Control the center of the market</li>
                    <li>• Develop your pieces (resources) before attacking</li>
                    <li>• Protect your king (CEO) at all costs</li>
                    <li>• Use tactical combinations to gain advantage</li>
                    <li>• Think multiple moves ahead</li>
                    <li>• Sacrifice material for positional advantage</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-black/50 dark:bg-black/50 bg-white/50 border-white/20 dark:border-white/20 border-black/20">
                <CardHeader>
                  <CardTitle className="text-white">Business Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-white">
                    <li>• Market positioning is like controlling key squares</li>
                    <li>• Resource allocation is like piece development</li>
                    <li>• Risk management is like king safety</li>
                    <li>• Strategic partnerships are tactical combinations</li>
                    <li>• Long-term planning is thinking ahead</li>
                    <li>• Strategic investments are positional sacrifices</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-black/50 dark:bg-black/50 bg-white/50 border-white/20 dark:border-white/20 border-black/20">
                <CardHeader>
                  <CardTitle className="text-white">Competitive Advantages</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-white">
                    <li>• First-mover advantage in new markets</li>
                    <li>• Superior resource positioning</li>
                    <li>• Better risk management</li>
                    <li>• More effective strategic partnerships</li>
                    <li>• Longer-term strategic thinking</li>
                    <li>• Willingness to make strategic investments</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-black/50 dark:bg-black/50 bg-white/50 border-white/20 dark:border-white/20 border-black/20">
                <CardHeader>
                  <CardTitle className="text-white">Risk Factors</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-white">
                    <li>• Overextending in multiple markets</li>
                    <li>• Leaving key positions undefended</li>
                    <li>• Failing to anticipate competitor moves</li>
                    <li>• Poor resource allocation</li>
                    <li>• Inadequate risk management</li>
                    <li>• Short-term thinking over long-term strategy</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ChessBIPage;
