export type TeaCategory = 'green' | 'black' | 'oolong' | 'white' | 'yellow' | 'dark';

export interface TastingDimension {
  shape: string;       // 外形
  liquorColor: string; // 汤色
  aroma: string;       // 香气
  taste: string;       // 滋味
  leafBottom: string;  // 叶底
}

export interface TeaItem {
  id: string;
  name: string;
  pinyin: string;
  category: TeaCategory;
  categoryName: string;
  aliases: string[];
  origin: string;           // 产地，如“浙江杭州西湖”
  fermentation: string;     // 发酵度
  pickingSeason: string;    // 采摘季节
  grade: string;            // 等级划分
  coreFeatures: string[];   // 核心特点标签
  tasting: TastingDimension;// 五大品鉴维度
  efficacy: string[];       // 养生功效
  suitableFor: string[];    // 适宜人群
  notSuitableFor: string[]; // 禁忌人群
  notes: string;            // 饮用注意事项
  history: {
    originStory: string;    // 起源与历史
    legend: string;         // 文化典故与故事
  };
  storage: {
    method: string;         // 存储方式
    shelfLife: string;      // 保质期
    tips: string[];         // 防潮防氧化要点
  };
  brewSummary: {
    temp: number;           // 水温 ℃
    ratio: string;          // 茶水比 如 1:50
    vessel: string;         // 推荐器具
    time: string;           // 冲泡时间
  };
  colorHex: string;         // 主题色
}

export interface CultureTopic {
  id: string;
  type: 'history' | 'etiquette' | 'literature' | 'customs';
  title: string;
  subtitle: string;
  eraOrRegion?: string;
  summary: string;
  content: {
    sectionTitle: string;
    text: string;
    quote?: string;
    details?: string[];
  }[];
  tags: string[];
}

export interface TeaSpiritItem {
  character: string;        // 和 / 敬 / 清 / 寂
  pinyin: string;
  title: string;
  meaning: string;
  modernInterpretation: string;
  dailyPractice: string;
  quote: string;
}

export interface BrewStepAnimation {
  stepNumber: number;
  title: string;
  subTitle: string;
  actionName: string; // '温具' | '投茶' | '润茶/洗茶' | '注水' | '出汤' | '分茶品茗'
  durationSec: number;
  temperature: number;
  technique: string;
  keyPoints: string[];
}

export type BrewStep = BrewStepAnimation;

export interface TeaBrewGuide {
  id: string;
  teaName: string;
  category: TeaCategory;
  recommendedVessel: string;
  waterType: string;
  teaWeightGrams: number;
  waterVolumeMl: number;
  waterTemp: number;
  washTea: boolean;
  washRounds: number; // 醒茶/洗茶道数（0 = 免洗）
  washTeaTip: string;
  infusionTimesSec: number[]; // e.g. [15, 20, 25, 30, 40, 50]
  tips: string[];
  steps: BrewStepAnimation[];
}

export interface TeawareItem {
  id: string;
  name: string;
  category: 'main' | 'secondary' | 'storage' | 'craft';
  categoryLabel: string;
  material: string;
  capacity?: string;
  description: string;
  bestMatchedTeas: string[];
  features: string[];
  careTips: string[];
  imageUrl?: string;
}

export interface TeawarePairingRule {
  teaCategory: string;
  recommendedWare: string;
  alternativeWare: string;
  why: string;
  flavorImpact: string;
  caution: string;
}

export interface TeawareMaintenance {
  id: string;
  title: string;
  wareType: string;
  steps: {
    title: string;
    description: string;
    tips?: string;
  }[];
  frequency: string;
  taboos: string[];
}

export interface BrewTroubleItem {
  id: string;
  problem: string;
  cause: string;
  solution: string;
  relatedTeas: string[];
  tag: string;
}

export interface DailyQuote {
  id: string;
  dateStr: string;
  poem: string;
  author: string;
  dynasty: string;
  explanation: string;
  modernReflection: string;
  bgStyle: string;
}

export interface SolarTermTea {
  name: string;
  solarTerm: string;
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  dateRange: string;
  healthConcept: string;
  recommendedTea: string;
  reason: string;
  taboo: string;
}

export interface TeaComparison {
  id: string;
  teaA: string;
  teaB: string;
  title: string;
  dimensions: {
    feature: string;
    aValue: string;
    bValue: string;
  }[];
  distinguishTip: string;
}

export interface BrewNote {
  id: string;
  teaName: string;
  teaCategory: TeaCategory;
  date: string;
  vessel: string;
  waterTemp: number;
  infusions: number;
  rating: number; // 1-5
  notes: string;
  flavorTags: string[];
}

export interface UserHistoryItem {
  id: string;
  title: string;
  type: 'tea' | 'brew' | 'teaware' | 'culture';
  targetId: string;
  timestamp: number;
}

export interface UserBookmark {
  id: string;
  targetId: string;
  type: 'tea' | 'brew' | 'teaware' | 'culture';
  title: string;
  categoryLabel: string;
  timestamp: number;
}

export interface AppSettings {
  fontSize: 'normal' | 'large' | 'huge';
  soundEnabled: boolean;   // 冲泡完成梵钟提示音
  enableVibration: boolean; // 触感震动反馈
}
