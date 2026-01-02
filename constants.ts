
import { FeeTier } from './types';

/**
 * Fees for sending money from Tanzania to India.
 * Data extracted from image: "TRANSACTION FEE FROM TANZANIA TO INDIA"
 * Tiers are in TSHS, Fee is in INR.
 */
export const TZ_TO_IN_FEES: FeeTier[] = [
  { min: 1, max: 29999, fee: 100 },
  { min: 30000, max: 99999, fee: 150 },
  { min: 100000, max: 299999, fee: 200 },
  { min: 300000, max: 499999, fee: 350 },
  { min: 500000, max: 699999, fee: 450 },
  { min: 700000, max: 799999, fee: 550 },
  { min: 800000, max: 899999, fee: 750 },
  { min: 900000, max: 1000000, fee: 950 },
];

/**
 * Fees for sending money from India to Tanzania.
 * Data extracted from image: "TRANSACTION FEE FROM INDIA TO TANZANIA"
 * Tiers are in TSHS, Fee is in INR.
 */
export const IN_TO_TZ_FEES: FeeTier[] = [
  { min: 1, max: 29999, fee: 100 },
  { min: 30000, max: 99999, fee: 150 },
  { min: 100000, max: 149999, fee: 250 },
  { min: 150000, max: 249999, fee: 350 },
  { min: 250000, max: 349999, fee: 450 },
  { min: 350000, max: 449999, fee: 550 },
  { min: 450000, max: 549999, fee: 750 },
  { min: 550000, max: 699999, fee: 950 },
  { min: 700000, max: 799999, fee: 1250 },
  { min: 800000, max: 899999, fee: 1550 },
  { min: 900000, max: 1000000, fee: 1650 },
];

export const PAYMENT_METHODS = [
  "NBC BANK",
  "CRDB BANK",
  "NMB BANK",
  "M-PESA",
  "TIGO PESA",
  "AIRTEL MONEY",
  "HALOPESA",
];
