
import React from 'react';
import ConverterCard from './components/ConverterCard';
import { Phone, Instagram, ShieldCheck, Globe, CreditCard } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-card border-b border-white/5 px-4 sm:px-6 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
              <span className="text-white font-black text-lg sm:text-xl italic">A</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tighter text-white">Alpha Pay</h1>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#" className="hover:text-white transition-colors">Transfer</a>
            <a href="#" className="hover:text-white transition-colors">Business</a>
            <a href="#" className="hover:text-white transition-colors">Help</a>
            <button className="bg-white text-slate-900 px-5 py-2 rounded-full hover:bg-slate-200 transition-colors">Get Started</button>
          </div>
          <button className="md:hidden bg-indigo-600 text-white px-4 py-1.5 rounded-full text-xs font-bold active:scale-95 transition-transform">
            App
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 container mx-auto flex flex-col items-center justify-center py-8 sm:py-12 relative overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-indigo-500/10 blur-[100px] sm:blur-[120px] rounded-full -z-10"></div>
        
        <div className="text-center mb-8 sm:mb-10 max-w-2xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 leading-tight">
            Financial Freedom <span className="gradient-text">Powered by Alpha Pay</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base md:text-lg px-2">
            Instant transfers from Tanzania to India with professional market rates and direct delivery.
          </p>
        </div>

        <ConverterCard />

        {/* Feature Grid */}
        <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-6 mt-12 sm:mt-16 mb-16 sm:mb-20">
          <div className="glass-card p-5 sm:p-6 rounded-3xl border-white/5 hover:border-white/10 transition-all">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4">
              <ShieldCheck className="text-emerald-500 size-5 sm:size-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-2 text-white">Secure Transfers</h3>
            <p className="text-slate-400 text-xs sm:text-sm">Industry-standard encryption for all your cross-border transactions.</p>
          </div>
          <div className="glass-card p-5 sm:p-6 rounded-3xl border-white/5 hover:border-white/10 transition-all">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-500/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4">
              <Globe className="text-indigo-500 size-5 sm:size-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-2 text-white">Live Google Rates</h3>
            <p className="text-slate-400 text-xs sm:text-sm">Get accurate market rates updated every minute via AI-powered search grounding.</p>
          </div>
          <div className="glass-card p-5 sm:p-6 rounded-3xl border-white/5 hover:border-white/10 transition-all sm:col-span-2 md:col-span-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4">
              <CreditCard className="text-orange-500 size-5 sm:size-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-2 text-white">Direct Delivery</h3>
            <p className="text-slate-400 text-xs sm:text-sm">Funds delivered straight to bank accounts or mobile wallets without delay.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/50 border-t border-white/5 pt-12 sm:pt-16 pb-6 sm:pb-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-10 sm:mb-12">
            <div className="col-span-1 sm:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-sm italic">A</span>
                </div>
                <h2 className="text-xl font-black text-white">Alpha Pay</h2>
              </div>
              <p className="text-slate-400 text-sm max-w-sm mb-6 leading-relaxed">
                Redefining the way you move money across borders. Faster, cheaper, and more reliable than traditional banking.
              </p>
              <div className="flex gap-4">
                <a href="https://instagram.com/AlphaTZ" target="_blank" className="p-2.5 bg-slate-800 rounded-full hover:bg-slate-700 text-slate-300 transition-all active:scale-90">
                  <Instagram size={18} />
                </a>
                <a href="tel:+255765323288" className="p-2.5 bg-slate-800 rounded-full hover:bg-slate-700 text-slate-300 transition-all active:scale-90">
                  <Phone size={18} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 sm:mb-6 text-sm uppercase tracking-widest">Support</h4>
              <ul className="space-y-3 sm:space-y-4 text-slate-400 text-xs sm:text-sm">
                <li className="flex items-center gap-2">
                  <Phone size={14} className="text-indigo-400" />
                  +255 765 323 288
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={14} className="text-indigo-400" />
                  +255 686 219 486
                </li>
                <li className="flex items-center gap-2">
                  <Instagram size={14} className="text-indigo-400" />
                  @AlphaTZ
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 sm:mb-6 text-sm uppercase tracking-widest">Legal</h4>
              <ul className="space-y-3 sm:space-y-4 text-slate-400 text-xs sm:text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AML Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-[10px] sm:text-xs">
            <p>© 2025 Alpha Pay. Secure Remittance.</p>
            <p className="italic font-medium">Uhuru wa Kifedha Unaowezeshwa na Alpha Pay</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
