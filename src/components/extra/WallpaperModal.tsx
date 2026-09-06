import React, { useState } from 'react';
import { X, Palette } from 'lucide-react';
import { WALLPAPERS } from '../../data/extraFeaturesData';
import { getCustomAppBg, setCustomAppBg, triggerHaptic } from '../../utils/storage';

interface WallpaperModalProps {
  onClose: () => void;
  onApplyBackground: (gradientOrPattern: string | null) => void;
}

export const WallpaperModal: React.FC<WallpaperModalProps> = ({
  onClose,
  onApplyBackground
}) => {
  const [currentSelected, setCurrentSelected] = useState<string | null>(getCustomAppBg());

  const handleSelectWallpaper = (gradient: string) => {
    triggerHaptic(25);
    setCurrentSelected(gradient);
    setCustomAppBg(gradient);
    onApplyBackground(gradient);
  };

  const handleResetDefault = () => {
    triggerHaptic(20);
    setCurrentSelected(null);
    setCustomAppBg(null);
    onApplyBackground(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs font-serif-sc p-0 sm:p-4">
      <div className="w-full max-w-md bg-[#FBF9F5] dark:bg-stone-900 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-[#EDE8DF] max-h-[88vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#EDE8DF] shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-xl bg-[#EFF6F1] text-[#254B3E] flex items-center justify-center">
              <Palette className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-[#1C2420]">
              中式茶席意境背景
            </h2>
          </div>
          <button
            onClick={() => {
              triggerHaptic(15);
              onClose();
            }}
            className="text-[#849188] hover:text-[#1C2420] p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between my-2.5 text-xs shrink-0 font-serif-sc">
          <span className="text-[#849188]">
            选择契合心境的素雅意境底色
          </span>
          <button
            onClick={handleResetDefault}
            className="text-[#254B3E] underline font-bold"
          >
            恢复默认素雅
          </button>
        </div>

        {/* Wallpaper Grid */}
        <div className="overflow-y-auto grid grid-cols-2 gap-2.5 flex-1 no-scrollbar">
          {WALLPAPERS.map((wp) => {
            const isSelected = currentSelected === wp.bg;

            return (
              <div
                key={wp.id}
                onClick={() => handleSelectWallpaper(wp.bg)}
                className={`p-3 rounded-2xl border transition cursor-pointer relative flex flex-col justify-between shadow-2xs active:scale-98 min-h-[110px] text-white ${
                  isSelected
                    ? 'border-[#9A5832] ring-2 ring-[#9A5832]/60'
                    : 'border-white/20 hover:border-white/50'
                }`}
                style={{
                  background: wp.bg
                }}
              >
                <div>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-black/25 backdrop-blur-xs font-serif-sc font-medium">
                    #{wp.tags[0]}
                  </span>
                  <div className="text-xs font-bold font-serif-sc mt-1.5 drop-shadow-xs">
                    {wp.title}
                  </div>
                </div>

                <div className="text-[10px] text-white/90 font-serif-sc line-clamp-1 drop-shadow-xs italic">
                  {wp.poem}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
