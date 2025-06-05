
import type { User as FirebaseUser } from 'firebase/auth';

export interface User extends FirebaseUser {
  // Add any custom user properties if needed
  // e.g. subscriptionStatus?: string;
}

export interface Stock {
  id: string;
  ticker: string;
  name: string;
  price?: number;
  change?: number;
  changePercent?: number;
  // other relevant stock data
}

export interface FilterCriteria {
  marketCapRange?: [number, number];
  peRatioRange?: [number, number];
  sector?: string;
  // other filter fields
}

export interface DrawnPatternData {
  points: Array<{ x: number; y: number }>;
  // other pattern metadata
}
