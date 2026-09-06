import React from 'react';
import { Sparkles, Compass, Sun, Leaf } from 'lucide-react';
import { triggerHaptic } from '../../utils/storage';

interface HeaderProps {
  onOpenDailyQuote: () => void;
  onOpenIdentify: () => void;
  onOpenSolarTerm: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDailyQuote,
  onOpenIdentify,
  onOpenSolarTerm
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#13221C]/95 backdrop-blur-md border-b border-[#23382F] transition-colors">
      <div className="w-full px-4 pt-3 pb-3 flex items-center justify-between">
        {/* App Logo & Title */}
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2E5B4B] to-[#1A342B] flex items-center justify-center shadow-xs shrink-0 border border-[#447C68]">
            <Leaf className="w-5 h-5 text-[#52C997] fill-[#52C997]/25" />
          </div>
          <h1 className="font-serif-sc font-bold text-white text-lg tracking-tight">
            知茗茶道
          </h1>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => {
              triggerHaptic(15);
              onOpenDailyQuote();
            }}
            title="今日茶语"
            className="w-8 h-8 rounded-full bg-[#1C2F27] border border-[#2D453C] text-[#F4A261] hover:bg-[#253D33] active:scale-95 transition flex items-center justify-center shadow-2xs"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              triggerHaptic(15);
              onOpenSolarTerm();
            }}
            title="时令节气"
            className="w-8 h-8 rounded-full bg-[#1C2F27] border border-[#2D453C] text-[#E9C46A] hover:bg-[#253D33] active:scale-95 transition flex items-center justify-center shadow-2xs"
          >
            <Sun className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              triggerHaptic(15);
              onOpenIdentify();
            }}
            title="辨茶指南"
            className="w-8 h-8 rounded-full bg-[#1C2F27] border border-[#2D453C] text-[#52C997] hover:bg-[#253D33] active:scale-95 transition flex items-center justify-center shadow-2xs"
          >
            <Compass className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
