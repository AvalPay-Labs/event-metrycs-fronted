// Tipos base existentes
export interface WalletInfo {
  address: string;
  balance: WalletBalance;
  portfolio: TokenPortfolio;
  transactions: AnalyzedTransaction[];
  contractInteractions: ContractInteraction[];
  defiActivity: DeFiActivity;
  nftActivity: NFTActivity;
  eventTransactions: EventTransactionGroup[];
  userInfo?: UserInfo;
  events: WalletEventParticipation[];
  metrics: AdvancedWalletMetrics;
  behaviorAnalysis: BehaviorAnalysis;
  riskProfile: RiskProfile;
  socialProfile: SocialProfile;
}

// Balance expandido con múltiples tokens
export interface WalletBalance {
  native: {
    avax: number;
    usd: number;
  };
  tokens: TokenBalance[];
  totalUsdValue: number;
  lastUpdated: string;
}

export interface TokenBalance {
  contractAddress: string;
  symbol: string;
  name: string;
  decimals: number;
  balance: string;
  balanceFormatted: number;
  usdValue: number;
  priceUsd: number;
  percentage: number;
}

// Portfolio completo
export interface TokenPortfolio {
  diversityScore: number; // 0-100
  topHoldings: TokenBalance[];
  tokenTypes: {
    stablecoins: number;
    governance: number;
    defi: number;
    gaming: number;
    memecoins: number;
    others: number;
  };
  riskDistribution: {
    low: number;
    medium: number;
    high: number;
  };
}

// Transacciones analizadas
export interface AnalyzedTransaction {
  hash: string;
  blockNumber: number;
  timestamp: number;
  from: string;
  to: string;
  value: string;
  gasPrice: string;
  gasUsed: string;
  status: number;
  network: 'avalanche' | 'fuji';
  
  // Análisis avanzado
  type: TransactionType;
  category: TransactionCategory;
  methodName?: string;
  decodedInput?: any;
  tokenTransfers: TokenTransfer[];
  usdValueAtTime: number;
  profitLoss?: ProfitLossData;
  tags: string[];
  relatedContract?: ContractInfo;
}

export enum TransactionType {
  SIMPLE_TRANSFER = 'simple_transfer',
  CONTRACT_DEPLOYMENT = 'contract_deployment',
  CONTRACT_INTERACTION = 'contract_interaction',
  TOKEN_TRANSFER = 'token_transfer',
  MULTI_TOKEN_TRANSFER = 'multi_token_transfer',
  SWAP = 'swap',
  LIQUIDITY_ADD = 'liquidity_add',
  LIQUIDITY_REMOVE = 'liquidity_remove',
  STAKE = 'stake',
  UNSTAKE = 'unstake',
  CLAIM = 'claim',
  BRIDGE = 'bridge',
  NFT_MINT = 'nft_mint',
  NFT_TRANSFER = 'nft_transfer',
  UNKNOWN = 'unknown'
}

export enum TransactionCategory {
  TRANSFER = 'transfer',
  DEFI = 'defi',
  NFT = 'nft',
  GAMING = 'gaming',
  GOVERNANCE = 'governance',
  BRIDGE = 'bridge',
  CONTRACT = 'contract',
  OTHER = 'other'
}

export interface TokenTransfer {
  contractAddress: string;
  symbol: string;
  from: string;
  to: string;
  value: string;
  valueFormatted: number;
  usdValue: number;
  type: 'in' | 'out';
}

export interface ProfitLossData {
  realized: number;
  unrealized: number;
  percentage: number;
  breakEvenPrice: number;
}

// Interacciones con contratos
export interface ContractInteraction {
  contractAddress: string;
  contractInfo: ContractInfo;
  firstInteraction: number;
  lastInteraction: number;
  totalInteractions: number;
  totalValueTransferred: number;
  methods: MethodUsage[];
  relationship: ContractRelationship;
}

export interface ContractInfo {
  address: string;
  name?: string;
  verified: boolean;
  type: ContractType;
  protocol?: string;
  tags: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'unknown';
}

export enum ContractType {
  TOKEN = 'token',
  DEX = 'dex',
  LENDING = 'lending',
  STAKING = 'staking',
  BRIDGE = 'bridge',
  NFT_MARKETPLACE = 'nft_marketplace',
  GAMING = 'gaming',
  GOVERNANCE = 'governance',
  MULTISIG = 'multisig',
  PROXY = 'proxy',
  UNKNOWN = 'unknown'
}

export interface MethodUsage {
  methodName: string;
  signature: string;
  callCount: number;
  totalGasUsed: number;
  averageGasUsed: number;
  totalValueTransferred: number;
}

export enum ContractRelationship {
  FREQUENT_USER = 'frequent_user',
  OCCASIONAL_USER = 'occasional_user',
  ONE_TIME_USER = 'one_time_user',
  POWER_USER = 'power_user'
}

// Actividad DeFi
export interface DeFiActivity {
  protocols: ProtocolUsage[];
  totalValueLocked: number;
  liquidityPositions: LiquidityPosition[];
  yieldFarming: YieldPosition[];
  lending: LendingPosition[];
  governanceParticipation: GovernanceActivity[];
  defiScore: number; // 0-100
}

export interface ProtocolUsage {
  protocol: string;
  category: DeFiCategory;
  firstUse: number;
  lastUse: number;
  totalTransactions: number;
  totalVolume: number;
  currentPositionValue: number;
  profitLoss: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export enum DeFiCategory {
  DEX = 'dex',
  LENDING = 'lending',
  YIELD_FARMING = 'yield_farming',
  STAKING = 'staking',
  DERIVATIVES = 'derivatives',
  INSURANCE = 'insurance',
  BRIDGE = 'bridge'
}

export interface LiquidityPosition {
  protocol: string;
  pool: string;
  tokens: string[];
  currentValue: number;
  profitLoss: number;
  impermanentLoss: number;
  apr: number;
  timeInPosition: number; // días
}

export interface YieldPosition {
  protocol: string;
  strategy: string;
  stakedAmount: number;
  currentValue: number;
  earnedRewards: number;
  apr: number;
  timeInPosition: number;
}

export interface LendingPosition {
  protocol: string;
  type: 'lend' | 'borrow';
  asset: string;
  amount: number;
  currentValue: number;
  interest: number;
  healthFactor?: number;
}

export interface GovernanceActivity {
  protocol: string;
  proposalsVoted: number;
  votingPower: number;
  lastVote: number;
  participationRate: number;
}

// Actividad NFT
export interface NFTActivity {
  collections: NFTCollection[];
  totalVolume: number;
  profitLoss: number;
  nftScore: number; // 0-100
}

export interface NFTCollection {
  contractAddress: string;
  name: string;
  owned: number;
  totalBought: number;
  totalSold: number;
  profitLoss: number;
  floorPrice: number;
  estimatedValue: number;
}

// Métricas avanzadas
export interface AdvancedWalletMetrics {
  // Métricas básicas existentes
  totalTransactions: number;
  totalValueTransferred: number;
  eventsParticipated: number;
  transactionsDuringEvents: number;
  transactionsAfterEvents: number;
  averageTransactionValue: number;
  mostActiveEvent: string | null;
  walletAge: number;
  activityScore: number;

  // Nuevas métricas avanzadas
  profitLoss: {
    total: number;
    realized: number;
    unrealized: number;
    percentage: number;
  };
  
  tradingMetrics: {
    totalTrades: number;
    successfulTrades: number;
    successRate: number;
    averageHoldTime: number; // horas
    maxDrawdown: number;
    sharpeRatio: number;
  };

  gasMetrics: {
    totalGasUsed: number;
    totalGasCostUsd: number;
    averageGasPrice: number;
    gasEfficiency: number; // score 0-100
  };

  diversificationMetrics: {
    uniqueTokens: number;
    uniqueProtocols: number;
    concentrationRisk: number; // 0-100, higher = more concentrated
    diversityScore: number; // 0-100
  };

  temporalMetrics: {
    dailyTransactions: TemporalData[];
    hourlyPattern: number[]; // 24 números para cada hora
    weeklyPattern: number[]; // 7 números para cada día
    monthlyVolume: TemporalData[];
    activityStreaks: ActivityStreak[];
  };
}

export interface TemporalData {
  timestamp: number;
  value: number;
  volume?: number;
  transactions?: number;
}

export interface ActivityStreak {
  startDate: number;
  endDate: number;
  duration: number; // días
  avgDailyTx: number;
  avgDailyVolume: number;
}

// Análisis de comportamiento
export interface BehaviorAnalysis {
  userType: UserType;
  experienceLevel: ExperienceLevel;
  tradingBehavior: TradingBehavior;
  preferredProtocols: string[];
  activityPatterns: ActivityPattern[];
  riskTolerance: RiskTolerance;
  motivations: UserMotivation[];
}

export enum UserType {
  HODLER = 'hodler',
  TRADER = 'trader',
  DEFI_USER = 'defi_user',
  NFT_COLLECTOR = 'nft_collector',
  YIELD_FARMER = 'yield_farmer',
  WHALE = 'whale',
  BOT = 'bot',
  BRIDGE_USER = 'bridge_user',
  CASUAL = 'casual'
}

export enum ExperienceLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

export interface TradingBehavior {
  frequency: 'low' | 'medium' | 'high';
  timing: 'market_hours' | 'off_hours' | 'mixed';
  strategy: TradingStrategy[];
  riskAppetite: 'conservative' | 'moderate' | 'aggressive';
  averagePositionSize: number;
  averageHoldTime: number;
}

export enum TradingStrategy {
  SWING_TRADING = 'swing_trading',
  DAY_TRADING = 'day_trading',
  SCALPING = 'scalping',
  HODLING = 'hodling',
  ARBITRAGE = 'arbitrage',
  YIELD_FARMING = 'yield_farming',
  LIQUIDITY_MINING = 'liquidity_mining'
}

export interface ActivityPattern {
  type: 'daily' | 'weekly' | 'monthly' | 'seasonal';
  pattern: number[];
  strength: number; // 0-1
  description: string;
}

export enum RiskTolerance {
  VERY_LOW = 'very_low',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VERY_HIGH = 'very_high'
}

export enum UserMotivation {
  PROFIT = 'profit',
  EXPERIMENTATION = 'experimentation',
  GAMING = 'gaming',
  SOCIAL = 'social',
  UTILITY = 'utility',
  SPECULATION = 'speculation',
  LONG_TERM_INVESTMENT = 'long_term_investment'
}

// Perfil de riesgo
export interface RiskProfile {
  overallRisk: RiskLevel;
  riskFactors: RiskFactor[];
  protocolRisks: ProtocolRisk[];
  concentrationRisk: number;
  liquidityRisk: number;
  recommendations: RiskRecommendation[];
}

export enum RiskLevel {
  VERY_LOW = 'very_low',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VERY_HIGH = 'very_high',
  EXTREME = 'extreme'
}

export interface RiskFactor {
  type: RiskFactorType;
  level: RiskLevel;
  description: string;
  impact: number; // 0-100
  recommendation: string;
}

export enum RiskFactorType {
  PROTOCOL_CONCENTRATION = 'protocol_concentration',
  TOKEN_CONCENTRATION = 'token_concentration',
  UNVERIFIED_CONTRACTS = 'unverified_contracts',
  HIGH_RISK_PROTOCOLS = 'high_risk_protocols',
  LEVERAGE_EXPOSURE = 'leverage_exposure',
  SMART_CONTRACT_RISK = 'smart_contract_risk',
  LIQUIDITY_RISK = 'liquidity_risk'
}

export interface ProtocolRisk {
  protocol: string;
  riskLevel: RiskLevel;
  exposure: number; // USD value
  riskFactors: string[];
  timeAtRisk: number; // días
}

export interface RiskRecommendation {
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  title: string;
  description: string;
  action: string;
}

// Perfil social
export interface SocialProfile {
  isInfluencer: boolean;
  followerWallets: string[];
  followingWallets: string[];
  copiedTransactions: CopiedTransaction[];
  influenceScore: number; // 0-100
  communityParticipation: CommunityActivity[];
}

export interface CopiedTransaction {
  originalWallet: string;
  originalTx: string;
  copyTx: string;
  timeDifference: number; // segundos
  similarity: number; // 0-1
}

export interface CommunityActivity {
  type: 'governance' | 'staking' | 'liquidity' | 'event';
  protocol: string;
  participation: number;
  influence: number;
}

// Búsqueda expandida
export interface WalletSearchResult {
  address: string;
  found: boolean;
  userInfo?: {
    name: string;
    email: string;
  };
  eventsCount: number;
  quickStats: {
    balance: number;
    transactionCount: number;
    userType: UserType;
    riskLevel: RiskLevel;
    lastActivity: number;
  };
}

// Otros tipos existentes mantienen su estructura
export interface EventTransactionGroup {
  eventId: string;
  eventName: string;
  eventDate: string;
  duringEvent: AnalyzedTransaction[];
  afterEvent: AnalyzedTransaction[];
}

export interface WalletEventParticipation {
  eventId: string;
  eventName: string;
  eventDate: string;
  registeredDate: string;
  attended: boolean;
  walletCreatedDuringEvent: boolean;
}

export interface UserInfo {
  name: string;
  email: string;
  userId: string;
} 