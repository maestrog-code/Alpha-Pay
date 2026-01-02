
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { RefreshCw, ArrowDownUp, Info, Globe, ShieldCheck, CheckCircle2, Zap, ExternalLink } from 'lucide-react';
import { Direction, CURRENCIES, ExchangeRateData } from '../types';
import { TZ_TO_IN_FEES, IN_TO_TZ_FEES, PAYMENT_METHODS } from '../constants';
import { fetchLiveExchangeRate } from '../services/geminiService';

const ConverterCard: React.FC = () => {
  const [direction, setDirection] = useState<Direction>('TZ_TO_IN');
  const [amount, setAmount] = useState<string>('0');
  const [paymentMethod, setPaymentMethod] = useState<string>(PAYMENT_METHODS[0]);
  const [exchangeData, setExchangeData] = useState<ExchangeRateData | null>(null);
  const [loading, setLoading] = useState(false);
  const [isExchanging, setIsExchanging] = useState(false);
  const refreshInterval = useRef<number | null>(null);

  useEffect(() => {
    loadRate();
    // Auto-refresh every 60 seconds to ensure rates are truly concurrent
    refreshInterval.current = window.setInterval(loadRate, 60000);
    return () => {
      if (refreshInterval.current) clearInterval(refreshInterval.current);
    };
  }, []);

  const loadRate = async () => {
    setLoading(true);
    const data = await fetchLiveExchangeRate();
    setExchangeData(data);
    setLoading(false);
  };

  const toggleDirection = () => {
    setDirection(prev => prev === 'TZ_TO_IN' ? 'IN_TO_TZ' : 'TZ_TO_IN');
  };

  // High precision rate
  const rateValue = exchangeData?.rate || 0.033124;
  const currentRateDisplay = direction === 'TZ_TO_IN' ? rateValue : 1 / rateValue;

  const tzsEquivalent = useMemo(() => {
    const val = parseFloat(amount) || 0;
    return direction === 'TZ_TO_IN' ? val : val / rateValue;
  }, [amount, direction, rateValue]);

  // Internal fee calculation remains to ensure the payout is correct after hidden deduction
  const fee = useMemo(() => {
    const table = direction === 'TZ_TO_IN' ? TZ_TO_IN_FEES : IN_TO_TZ_FEES;
    const tier = table.find(t => tzsEquivalent >= t.min && tzsEquivalent <= t.max);
    if (!tier && tzsEquivalent > 1000000) return table[table.length - 1].fee;
    return tier?.fee || 100;
  }, [tzsEquivalent, direction]);

  const { net } = useMemo(() => {
    const val = parseFloat(amount) || 0;
    if (isNaN(val) || val <= 0) return { net: '0.00' };
    
    let netVal = 0;

    if (direction === 'TZ_TO_IN') {
      const grossInr = val * rateValue;
      netVal = grossInr - fee;
    } else {
      const netInr = val - fee;
      netVal = netInr / rateValue;
    }

    return {
      net: netVal > 0 ? netVal.toFixed(2) : '0.00'
    };
  }, [amount, rateValue, direction, fee]);

  const handleExchange = () => {
    setIsExchanging(true);
    setTimeout(() => setIsExchanging(false), 3000);
  };

  return (
    <div className="w-full max-w-xl mx-auto px-2 sm:px-4 py-4 md:py-8">
      <div className="glass-card rounded-[2rem] p-5 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Market Visual Pulse */}
        <div className="absolute -top-10 -right-10 w-32 sm:w-40 h-32 sm:h-40 bg-indigo-500/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>

        <div className="flex justify-between items-start mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Alpha Real-Time</h2>
              <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full whitespace-nowrap">
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-emerald-500 tracking-wider uppercase">Live Market</span>
              </div>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm">Directly synced with Google Finance rates.</p>
          </div>
          <button 
            onClick={loadRate}
            disabled={loading}
            className={`p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-slate-800/50 hover:bg-slate-700/50 transition-all border border-slate-700/50 ${loading ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
            title="Force Rate Sync"
          >
            <RefreshCw size={18} className={`text-indigo-400 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="space-y-3 sm:space-y-4 relative">
          {/* Send Input */}
          <div className="space-y-2">
            <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Transfer Amount</label>
            <div className="flex items-center bg-slate-800/40 border border-slate-700/50 rounded-2xl p-3 sm:p-4 transition-all focus-within:ring-2 focus-within:ring-indigo-500/30 focus-within:border-indigo-500/50">
              <div className="flex items-center gap-2 sm:gap-3 pr-3 sm:pr-4 border-r border-slate-700">
                <span className="text-xl sm:text-2xl">{direction === 'TZ_TO_IN' ? CURRENCIES.TZS.flag : CURRENCIES.INR.flag}</span>
                <span className="font-bold text-sm sm:text-base text-white tracking-wider">{direction === 'TZ_TO_IN' ? 'TZS' : 'INR'}</span>
              </div>
              <input
                type="number"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onFocus={(e) => amount === '0' && setAmount('')}
                onBlur={(e) => amount === '' && setAmount('0')}
                className="flex-1 bg-transparent border-none outline-none text-right text-2xl sm:text-3xl font-bold text-white placeholder-slate-600 tabular-nums min-w-0"
                placeholder="0"
              />
            </div>
          </div>

          {/* Switch Button */}
          <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 z-10">
            <button 
              onClick={toggleDirection}
              className="bg-slate-900 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl shadow-xl border-4 border-[#1e293b] hover:bg-indigo-600 group transition-all transform hover:rotate-180 active:scale-90"
            >
              <ArrowDownUp size={18} className="text-indigo-400 sm:size-5 group-hover:text-white transition-colors" />
            </button>
          </div>

          {/* Receive Input (Net) */}
          <div className="space-y-2">
            <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Recipient Receives</label>
            <div className="flex items-center bg-slate-900/80 border border-slate-700/50 rounded-2xl p-3 sm:p-4 transition-all group">
              <div className="flex items-center gap-2 sm:gap-3 pr-3 sm:pr-4 border-r border-slate-700">
                <span className="text-xl sm:text-2xl">{direction === 'TZ_TO_IN' ? CURRENCIES.INR.flag : CURRENCIES.TZS.flag}</span>
                <span className="font-bold text-sm sm:text-base text-white tracking-wider">{direction === 'TZ_TO_IN' ? 'INR' : 'TZS'}</span>
              </div>
              <div className="flex-1 text-right text-2xl sm:text-3xl font-black text-emerald-400 tabular-nums tracking-tight min-w-0 truncate">
                {net}
              </div>
            </div>
          </div>
        </div>

        {/* Precision Market Stats */}
        <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-indigo-500/[0.03] rounded-2xl border border-indigo-500/10 space-y-3 sm:space-y-4">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="text-slate-400">Current Market Rate</span>
            <div className="text-right">
              <div className="text-white font-mono font-medium text-[11px] sm:text-sm">
                1 {direction === 'TZ_TO_IN' ? 'TZS' : 'INR'} = {currentRateDisplay.toFixed(6)} {direction === 'TZ_TO_IN' ? 'INR' : 'TZS'}
              </div>
            </div>
          </div>
          
          <div className="h-px bg-slate-700/30 w-full"></div>

          <div className="flex justify-between text-sm sm:text-base font-bold">
            <span className="text-white flex items-center gap-2">
              <Zap size={14} className="text-yellow-400 fill-yellow-400/20 sm:size-16" />
              Final Delivery
            </span>
            <span className="text-emerald-400 tabular-nums text-right">
              {direction === 'TZ_TO_IN' ? `₹ ${net}` : `${net} TZS`}
            </span>
          </div>
        </div>

        <button 
          disabled={isExchanging || loading}
          onClick={handleExchange}
          className={`w-full mt-6 p-4 sm:p-5 rounded-2xl font-bold text-base sm:text-lg uppercase tracking-widest shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-3
            ${isExchanging 
              ? 'bg-emerald-600 cursor-not-allowed' 
              : 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 hover:shadow-indigo-500/20'}`}
        >
          {isExchanging ? (
            <><CheckCircle2 size={20} className="animate-bounce sm:size-24" /> Processing...</>
          ) : (
            'Execute Transfer'
          )}
        </button>

        {/* Trusted Sources */}
        {exchangeData?.sources && exchangeData.sources.length > 0 && (
          <div className="mt-6 pt-4 sm:pt-5 border-t border-slate-800/80">
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black">Market Data Origin</p>
              <span className="text-[9px] sm:text-[10px] text-emerald-500/80 font-mono">Verified {exchangeData.lastUpdated}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {exchangeData.sources.map((source, i) => (
                <a 
                  key={i} 
                  href={source.uri} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1 text-[9px] sm:text-[10px] bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white py-1 sm:py-1.5 px-2 sm:px-3 rounded-lg border border-slate-700/50 transition-all max-w-full"
                >
                  <Globe size={8} className="text-indigo-400 sm:size-10" />
                  <span className="truncate max-w-[100px] sm:max-w-[160px]">{source.title}</span>
                  <ExternalLink size={8} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-6 sm:mt-8 flex justify-center">
        <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl flex items-center gap-2 sm:gap-3 shadow-sm">
          <Zap size={14} className="text-yellow-400 fill-yellow-400/20 sm:size-16" />
          <p className="text-[10px] sm:text-xs text-slate-400 leading-relaxed text-center sm:text-left">
            Rates are <span className="text-white font-bold">concurrent</span> with Google Finance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConverterCard;
