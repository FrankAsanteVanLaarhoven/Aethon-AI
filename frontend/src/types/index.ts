// Strategic AI Platform - TypeScript Type Definitions

export interface Company {
  id: string;
  name: string;
  position: { x: number; y: number };
  marketCap: number;
  marketShare: number;
  competitiveStrength: number;
  recentMoves: string[];
  predictedMoves: string[];
  color: string;
  threatLevel: 'low' | 'medium' | 'high';
  lastUpdated: string;
}

export interface Agent {
  id: string;
  name: string;
  status: 'active' | 'processing' | 'idle' | 'error';
  currentTask: string;
  successRate: number;
  lastUpdate: string;
  capabilities: string[];
  recentActivity: string[];
  performance: {
    tasksCompleted: number;
    averageResponseTime: number;
    uptime: number;
  };
}

export interface IntelligenceItem {
  id: string;
  timestamp: string;
  source: string;
  company: string;
  type: 'Financial' | 'Personnel' | 'IP' | 'News' | 'Strategic';
  content: string;
  confidence: number;
  legalCompliance: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  probability: number;
  outcome: string;
  risks: string[];
  opportunities: string[];
  timeHorizon: string;
  investment: number;
}

export interface RevolutionaryFeature {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'development' | 'testing' | 'deployed';
  phase: number;
  testFunction: () => Promise<any>;
  metrics: {
    accuracy: number;
    performance: number;
    reliability: number;
  };
  lastTested: string;
}

export interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  lastUpdated: string;
}

export interface ThreatAlert {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  domain: string;
  description: string;
  confidence: number;
  timestamp: string;
  source: string;
  mitigation: string;
}

export interface PerformanceMetrics {
  apiResponseTime: number;
  throughput: number;
  websocketLatency: number;
  uptime: number;
  errorRate: number;
  lastUpdated: string;
}

export interface WebSocketMessage {
  type: 'market_data' | 'intelligence' | 'agent_update' | 'threat_alert' | 'performance';
  data: any;
  timestamp: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  timestamp: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterParams {
  search?: string;
  status?: string;
  type?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface DashboardState {
  companies: Company[];
  agents: Agent[];
  intelligenceFeed: IntelligenceItem[];
  scenarios: Scenario[];
  revolutionaryFeatures: RevolutionaryFeature[];
  marketData: MarketData[];
  threatAlerts: ThreatAlert[];
  performanceMetrics: PerformanceMetrics;
  isLoading: boolean;
  error: string | null;
  lastUpdated: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  badge?: string;
  children?: NavigationItem[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'analyst' | 'viewer';
  securityClearance: 'public' | 'confidential' | 'secret' | 'top-secret';
  lastLogin: string;
  permissions: string[];
}

export interface Theme {
  mode: 'light' | 'dark' | 'system';
  primaryColor: string;
  accentColor: string;
}

export interface AppConfig {
  apiBaseUrl: string;
  wsUrl: string;
  enableQuantumFeatures: boolean;
  enableSovereignFeatures: boolean;
  enableRealTimeUpdates: boolean;
  requireAuthentication: boolean;
  enableSecurityClearance: boolean;
  debugMode: boolean;
}

// Component Props Types
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface CardProps extends ComponentProps {
  title?: string;
  description?: string;
  icon?: string;
  variant?: 'default' | 'outline' | 'ghost';
}

export interface ButtonProps extends ComponentProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export interface InputProps extends ComponentProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'search';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
}

export interface SelectProps extends ComponentProps {
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export interface ModalProps extends ComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface TableProps<T = any> extends ComponentProps {
  data: T[];
  columns: {
    key: keyof T;
    label: string;
    render?: (value: any, row: T) => React.ReactNode;
  }[];
  pagination?: PaginationParams;
  onPaginationChange?: (params: PaginationParams) => void;
  loading?: boolean;
}

export interface ChartProps extends ComponentProps {
  data: any[];
  type: 'line' | 'bar' | 'pie' | 'area' | 'scatter';
  width?: number;
  height?: number;
  options?: any;
}

// API Types
export interface ApiEndpoints {
  companies: string;
  agents: string;
  intelligence: string;
  scenarios: string;
  revolutionaryFeatures: string;
  marketData: string;
  threatAlerts: string;
  performance: string;
  simulations: string;
  websocket: string;
}

// Hook Types
export interface UseApiOptions {
  enabled?: boolean;
  refetchInterval?: number;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export interface UseWebSocketOptions {
  autoConnect?: boolean;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  onMessage?: (message: WebSocketMessage) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Event) => void;
}
