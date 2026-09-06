import React, { useState } from 'react';
import { X, Sparkles, Share2, RefreshCw, CheckCircle2 } from 'lucide-react';
import { DAILY_QUOTES } from '../../data/extraFeaturesData';
import { triggerHaptic, performDailyCheckIn } from '../../utils/storage';

interface DailyQuoteModalProps {
  onClose: () => void;
}

export const DailyQuoteModal: React.FC<DailyQuoteModalProps> = ({ onClose }) => {
  const [quoteIndex, setQuoteIndex] = useState(() => {
    const day = new Date().getDate();
    return day % DAILY_QUOTES.length;
  });
  const [copied, setCopied] = useState(false);
  const [checkInMsg, setCheckInMsg] = useState<string | null>(null);

  const quote = DAILY_QUOTES[quoteIndex];

  const handleNextQuote = () => {
    triggerHaptic(15);
    setQuoteIndex((prev) => (prev + 1) % DAILY_QUOTES.length);
  };

  const handleShare = () => {
    triggerHaptic(20);
    const text = `【知茗茶道 · 每日茶语】\n「${quote.poem}」\n—— [${quote.dynasty}] ${quote.author}\n\n【意境】: ${quote.explanation}\n【茶心】: ${quote.modernReflection}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleCheckIn = () => {
    triggerHaptic(25);
    const res = performDailyCheckIn();
    setCheckInMsg(res.message);
    setTimeout(() => setCheckInMsg(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in font-serif-sc">
      <div className="w-full max-w-sm bg-[#16251F] rounded-3xl p-5 shadow-2xl border border-[#2B4438] relative text-[#E2E9E5]">
        {/* Close */}
        <button
          onClick={() => {
            triggerHaptic(15);
            onClose();
          }}
          className="absolute top-4 right-4 text-[#AEC0B7] hover:text-white p-1.5 rounded-full hover:bg-white/10 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Tag */}
        <div className="flex items-center space-x-2.5 mb-3.5">
          <span className="w-8 h-8 rounded-full bg-[#2E5B4B] text-white flex items-center justify-center font-bold text-xs font-serif-sc shadow-2xs border border-[#3E7461]">
            茗
          </span>
          <div>
            <div className="text-xs font-bold text-[#52C997]">
              {quote.dateStr}
            </div>
            <div className="text-[10px] text-[#AEC0B7] font-serif-sc italic">
              以茶会心 · 静品岁月
            </div>
          </div>
        </div>

        {/* Scroll Quote Card */}
        <div className="bg-[#13221C] rounded-2xl p-4 border border-[#273F33] shadow-2xs space-y-2.5 relative overflow-hidden">
          <div className="text-sm font-bold text-white leading-relaxed tracking-wide">
            「{quote.poem}」
          </div>

          <div className="text-xs text-right text-[#F4A261] font-serif-sc">
            —— [{quote.dynasty}] {quote.author}
          </div>

          <div className="pt-2.5 border-t border-[#273F33] space-y-2 text-xs font-serif-sc">
            <p className="text-[#E2E9E5] leading-relaxed">
              <span className="font-bold text-[#F4A261]">【意境】：</span>
              {quote.explanation}
            </p>
            <div className="text-[11px] text-[#E2E9E5] bg-[#162A22] p-2.5 rounded-xl font-serif-sc border border-[#2D4D3E]">
              <span className="font-bold text-[#52C997]">【茶心】：</span>
              {quote.modernReflection}
            </div>
          </div>
        </div>

        {/* Check in toast */}
        {checkInMsg && (
          <div className="mt-2.5 p-2 text-center text-xs bg-[#2E5B4B] text-white rounded-xl flex items-center justify-center space-x-1 font-serif-sc border border-[#52C997]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{checkInMsg}</span>
          </div>
        )}

        {/* Copied notification */}
        {copied && (
          <div className="mt-2 p-2 text-center text-xs bg-[#F4A261] text-black font-bold rounded-xl flex items-center justify-center space-x-1 font-serif-sc">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>茶语文字已复制，可分享至备忘录！</span>
          </div>
        )}

        {/* Actions Row */}
        <div className="mt-4 flex items-center space-x-2">
          <button
            onClick={handleNextQuote}
            className="p-2.5 rounded-full border border-[#273F33] text-[#AEC0B7] hover:text-white hover:bg-[#13221C] flex items-center justify-center transition"
            title="换一句茶语"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={handleShare}
            className="flex-1 py-2.5 px-3 rounded-full border border-[#2B4438] bg-[#13221C] text-[#E2E9E5] text-xs font-bold flex items-center justify-center space-x-1 hover:text-white hover:border-[#3E6654] transition font-serif-sc"
          >
            <Share2 className="w-3.5 h-3.5 text-[#AEC0B7]" />
            <span>复制茶语</span>
          </button>

          <button
            onClick={handleCheckIn}
            className="flex-1 py-2.5 px-3 rounded-full bg-[#2E5B4B] hover:bg-[#3B725E] text-white text-xs font-bold flex items-center justify-center space-x-1 shadow-2xs active:scale-95 transition font-serif-sc border border-[#3E7461]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F4A261]" />
            <span>今日打卡</span>
          </button>
        </div>
      </div>
    </div>
  );
};
