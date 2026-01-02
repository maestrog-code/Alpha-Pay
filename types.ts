
export type Direction = 'TZ_TO_IN' | 'IN_TO_TZ';

export interface FeeTier {
  min: number;
  max: number;
  fee: number; // in INR
}

export interface ExchangeRateData {
  rate: number;
  lastUpdated: string;
  sources: { title: string; uri: string }[];
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

export const CURRENCIES: Record<string, Currency> = {
  TZS: { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TZS', flag: '🇹🇿' },
  INR: { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
};
