import React, { useState } from 'react';
import { X, Sun, Sparkles, AlertTriangle } from 'lucide-react';
import { SOLAR_TERM_TEAS } from '../../data/extraFeaturesData';
import { triggerHaptic } from '../../utils/storage';

interface SolarTermModalProps {
  onClose: () => void;
}

type SeasonId = 'spring' | 'summer' | 'autumn' | 'winter';

// 按公历月份推算当前季节（春2-4月、夏5-7月、秋8-10月、冬11-1月）
function getCurrentSeason(): SeasonId {
  const m = new Date().getMonth() + 1;
  if (m >= 2 && m <= 4) return 'spring';
  if (m >= 5 && m <= 7) return 'summer';
  if (m >= 8 && m <= 10) return 'autumn';
  return 'winter';
}

export const SolarTermModal: React.FC<SolarTermModalProps> = ({ onClose }) => {
  const currentSeason = getCurrentSeason();
  const [selectedSeason, setSelectedSeason] = useState<SeasonId>(currentSeason);

  const seasons: { id: SeasonId; name: string; label: string }[] = [
    { id: 'spring', name: '春生', label: '春季 · 萌发生机' },
    { id: 'summer', name: '夏长', label: '夏季 · 消暑清热' },
    { id: 'autumn', name: '秋收', label: '秋季 · 润燥生津' },
    { id: 'winter', name: '冬藏', label: '冬季 · 暖胃御寒' }
  ];

  const currentTermGroup = SOLAR_TERM_TEAS.find((st) => st.season === selectedSeason);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs font-serif-sc p-0 sm:p-4 text-[#E2E9E5]">
      <div className="w-full max-w-md bg-[#16251F] rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-[#2B4438] max-h-[88vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#273F33] shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-xl bg-[#2A231C] text-[#F4A261] border border-[#483727] flex items-center justify-center">
              <Sun className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-white">
              廿四节气时令饮茶指南
            </h2>
          </div>
          <button
            onClick={() => {
              triggerHaptic(15);
              onClose();
            }}
            className="text-[#AEC0B7] hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Season Selector Tabs */}
        <div className="grid grid-cols-4 gap-1.5 my-3 shrink-0">
          {seasons.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                triggerHaptic(15);
                setSelectedSeason(s.id as typeof selectedSeason);
              }}
              className={`py-1.5 rounded-xl text-center transition relative ${
                selectedSeason === s.id
                  ? 'bg-[#2E5B4B] text-white font-bold shadow-2xs border border-[#52C997]'
                  : 'bg-[#13221C] text-[#CBE0D6] border border-[#273F33]'
              }`}
            >
              <div className="text-xs font-serif-sc">{s.name}</div>
              {s.id === currentSeason && (
                <div className="text-[9px] text-[#F4A261] font-bold mt-0.5">当季</div>
              )}
            </button>
          ))}
        </div>

        {/* Term Details Container */}
        {currentTermGroup && (
          <div className="overflow-y-auto space-y-3 flex-1 no-scrollbar">
            {/* Header info */}
            <div className="bg-[#1A2E26] p-4 rounded-2xl border border-[#2B4438] shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">
                  {currentTermGroup.name}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#243F34] text-[#52C997] border border-[#3E6654] font-serif-sc">
                  {currentTermGroup.dateRange}
                </span>
              </div>
              <div className="text-xs font-serif-sc text-[#AEC0B7]">
                涵盖节气：{currentTermGroup.solarTerm}
              </div>
              <p className="text-xs text-[#E2E9E5] bg-[#13221C] p-2.5 rounded-xl border border-[#273F33] leading-relaxed">
                {currentTermGroup.healthConcept}
              </p>
            </div>

            {/* Recommended Teas Card */}
            <div className="bg-[#1A2E26] p-4 rounded-2xl border border-[#2B4438] shadow-2xs space-y-2">
              <div className="text-xs font-bold text-[#F4A261] flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                时令推荐茶品
              </div>
              <div className="text-sm font-bold text-white">
                {currentTermGroup.recommendedTea}
              </div>
              <div className="text-xs text-[#E2E9E5] leading-relaxed bg-[#13221C] p-2.5 rounded-xl border border-[#273F33]">
                <span className="font-bold text-[#F4A261]">
                  【推荐缘由】：
                </span>
                {currentTermGroup.reason}
              </div>
              <div className="text-xs leading-relaxed bg-[#2C1C19] p-2.5 rounded-xl border border-[#502820]">
                <span className="font-bold text-[#FF8577] flex items-center">
                  <AlertTriangle className="w-3.5 h-3.5 mr-1 shrink-0" />
                  时令禁忌：
                </span>
                <span className="text-[#FFB2A8]">{currentTermGroup.taboo}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
