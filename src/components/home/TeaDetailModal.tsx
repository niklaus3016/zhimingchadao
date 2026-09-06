import React, { useState, useEffect } from 'react';
import {
  X,
  Bookmark,
  BookmarkCheck,
  Share2,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  History,
  Archive,
  Thermometer,
  Clock,
  CheckCircle2,
  Flame,
  Type
} from 'lucide-react';
import { TeaItem } from '../../types';
import { toggleBookmark, isItemBookmarked, triggerHaptic } from '../../utils/storage';

interface TeaDetailModalProps {
  tea: TeaItem | null;
  onClose: () => void;
  onStartBrewing: (tea: TeaItem) => void;
}

export const TeaDetailModal: React.FC<TeaDetailModalProps> = ({
  tea,
  onClose,
  onStartBrewing
}) => {
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'huge'>('normal');
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [activeTab, setActiveTab] = useState<'tasting' | 'efficacy' | 'history' | 'storage'>('tasting');
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  useEffect(() => {
    if (tea) setBookmarked(isItemBookmarked(tea.id, 'tea'));
  }, [tea]);

  if (!tea) return null;

  const handleToggleBookmark = () => {
    toggleBookmark({
      targetId: tea.id,
      type: 'tea',
      title: tea.name,
      categoryLabel: tea.categoryName
    });
    setBookmarked((prev) => !prev);
  };

  const handleShare = () => {
    triggerHaptic(20);
    const text = `【知茗茶道 · ${tea.name}】\n类别：${tea.categoryName} | 产地：${tea.origin}\n特点：${tea.coreFeatures.join('、')}\n水温：${tea.brewSummary.temp}℃ | 器具：${tea.brewSummary.vessel}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2200);
  };

  const getTextClass = () => {
    if (fontSizeLevel === 'huge') return 'text-base leading-relaxed';
    if (fontSizeLevel === 'large') return 'text-sm leading-relaxed';
    return 'text-xs leading-relaxed';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in p-0 sm:p-4 text-[#E2E9E5]">
      <div className="w-full max-w-md bg-[#16251F] rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-[#2B4438]">
        {/* Top Header Banner */}
        <div
          className="relative px-5 pt-5 pb-4 text-white shrink-0 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${tea.colorHex}dd 0%, #1A352B 100%)`
          }}
        >
          {/* Action Row */}
          <div className="flex items-center justify-between mb-2.5">
            <span className="px-2.5 py-0.5 rounded-full bg-black/30 border border-white/20 text-white text-[11px] backdrop-blur-md font-bold font-serif-sc">
              {tea.categoryName} · {tea.fermentation}
            </span>

            <div className="flex items-center space-x-1">
              {/* Font Size Selector */}
              <button
                onClick={() => {
                  triggerHaptic(15);
                  setFontSizeLevel((prev) =>
                    prev === 'normal' ? 'large' : prev === 'large' ? 'huge' : 'normal'
                  );
                }}
                className="w-7 h-7 rounded-full bg-black/30 hover:bg-black/50 border border-white/20 active:scale-95 transition text-white flex items-center justify-center"
                title="调节文字字号"
              >
                <Type className="w-3.5 h-3.5" />
              </button>

              {/* Bookmark Button */}
              <button
                onClick={handleToggleBookmark}
                className="w-7 h-7 rounded-full bg-black/30 hover:bg-black/50 border border-white/20 active:scale-95 transition text-white flex items-center justify-center"
                title={bookmarked ? '已收藏' : '加入收藏'}
              >
                {bookmarked ? (
                  <BookmarkCheck className="w-3.5 h-3.5 text-amber-300 fill-current" />
                ) : (
                  <Bookmark className="w-3.5 h-3.5" />
                )}
              </button>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="w-7 h-7 rounded-full bg-black/30 hover:bg-black/50 border border-white/20 active:scale-95 transition text-white flex items-center justify-center"
                title="分享名茶简报"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>

              {/* Close Button */}
              <button
                onClick={() => {
                  triggerHaptic(15);
                  onClose();
                }}
                className="w-7 h-7 rounded-full bg-black/30 hover:bg-black/50 border border-white/20 active:scale-95 transition text-white flex items-center justify-center ml-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Tea Title & Pinyin */}
          <div className="flex items-end justify-between">
            <div>
              <div className="text-white/80 text-[11px] font-serif-sc tracking-widest uppercase">
                {tea.pinyin}
              </div>
              <h2 className="text-xl font-bold font-serif-sc tracking-wide mt-0.5 text-white">
                {tea.name}
              </h2>
              {tea.aliases.length > 0 && (
                <div className="text-white/90 text-[11px] font-serif-sc mt-0.5">
                  别称：{tea.aliases.join(' · ')}
                </div>
              )}
            </div>

            <div className="text-right text-xs text-white">
              <div className="font-serif-sc text-[#F4A261] font-bold text-[11px]">{tea.grade}</div>
              <div className="text-[10px] mt-0.5 font-serif-sc text-white/80">{tea.pickingSeason}</div>
            </div>
          </div>

          {/* Origin */}
          <div className="mt-2 text-[11px] text-white bg-black/40 border border-white/20 px-2.5 py-1 rounded-full backdrop-blur-xs flex items-center inline-flex font-serif-sc">
            <span className="font-bold mr-1 text-[#F4A261]">产地:</span> {tea.origin}
          </div>
        </div>

        {/* Floating Copied Toast */}
        {copiedNotification && (
          <div className="bg-[#F4A261] text-black font-bold text-xs px-3 py-1.5 text-center transition animate-in fade-in flex items-center justify-center space-x-1 font-serif-sc">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>名茶信息已复制，可分享给茶友！</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="px-4 pt-2.5 pb-1 bg-[#16251F] shrink-0">
          <div className="flex bg-[#13221C] p-1 rounded-xl border border-[#273F33] shadow-2xs text-xs">
            {[
              { id: 'tasting', label: '五度品鉴' },
              { id: 'efficacy', label: '功效禁忌' },
              { id: 'history', label: '文化典故' },
              { id: 'storage', label: '存储技巧' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  triggerHaptic(15);
                  setActiveTab(tab.id as typeof activeTab);
                }}
                className={`flex-1 py-1 rounded-lg font-bold font-serif-sc transition text-center ${
                  activeTab === tab.id
                    ? 'bg-[#2E5B4B] text-white shadow-2xs border border-[#52C997]'
                    : 'text-[#AEC0B7] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto px-4 py-3 space-y-3 flex-1 no-scrollbar">
          {/* Core Feature Tags */}
          <div className="flex flex-wrap gap-1">
            {tea.coreFeatures.map((f, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded-md bg-[#13221C] text-[#52C997] border border-[#273F33] font-medium font-serif-sc"
              >
                #{f}
              </span>
            ))}
          </div>

          {/* TAB 1: 5-DIMENSIONAL TASTING */}
          {activeTab === 'tasting' && (
            <div className="space-y-2.5">
              <div className="text-[11px] font-bold font-serif-sc text-[#F4A261] flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1 text-[#F4A261]" />
                五大品鉴维度拆解
              </div>

              <div className="space-y-2">
                {[
                  { title: '外形', value: tea.tasting.shape, border: 'border-l-[#52C997]' },
                  { title: '汤色', value: tea.tasting.liquorColor, border: 'border-l-[#F4A261]' },
                  { title: '香气', value: tea.tasting.aroma, border: 'border-l-[#FBBF24]' },
                  { title: '滋味', value: tea.tasting.taste, border: 'border-l-[#52C997]' },
                  { title: '叶底', value: tea.tasting.leafBottom, border: 'border-l-[#AEC0B7]' }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`bg-[#1A2E26] p-3 rounded-xl border border-[#2B4438] shadow-2xs border-l-4 ${item.border} font-serif-sc`}
                  >
                    <div className="text-xs font-bold text-white mb-0.5">
                      【{item.title}】
                    </div>
                    <p className={`text-[#E2E9E5] ${getTextClass()}`}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Quick Brew Bar Preview */}
              <div className="mt-3 p-3.5 rounded-2xl bg-[#1A2E26] border border-[#2B4438]">
                <div className="text-xs font-bold font-serif-sc text-[#F4A261] mb-2 flex items-center justify-between">
                  <span>冲泡速览建议</span>
                  <span className="text-[10px] font-normal text-[#AEC0B7]">
                    {tea.brewSummary.vessel}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 text-center text-xs font-serif-sc">
                  <div className="bg-[#13221C] p-2 rounded-xl border border-[#273F33]">
                    <Thermometer className="w-3.5 h-3.5 mx-auto text-[#F4A261] mb-0.5" />
                    <div className="text-[#AEC0B7] text-[10px]">最佳水温</div>
                    <div className="font-bold text-white">
                      {tea.brewSummary.temp}℃
                    </div>
                  </div>
                  <div className="bg-[#13221C] p-2 rounded-xl border border-[#273F33]">
                    <Clock className="w-3.5 h-3.5 mx-auto text-[#52C997] mb-0.5" />
                    <div className="text-[#AEC0B7] text-[10px]">冲泡比例</div>
                    <div className="font-bold text-white">
                      {tea.brewSummary.ratio}
                    </div>
                  </div>
                  <div className="bg-[#13221C] p-2 rounded-xl border border-[#273F33]">
                    <Flame className="w-3.5 h-3.5 mx-auto text-[#F4A261] mb-0.5" />
                    <div className="text-[#AEC0B7] text-[10px]">出汤节奏</div>
                    <div className="font-bold text-white truncate">
                      {tea.brewSummary.time}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EFFICACY & TABOOS */}
          {activeTab === 'efficacy' && (
            <div className="space-y-3 font-serif-sc">
              <div className="bg-[#1A2E26] p-3.5 rounded-2xl border border-[#2B4438] shadow-2xs">
                <div className="text-xs font-bold text-[#52C997] flex items-center mb-2">
                  <ShieldCheck className="w-4 h-4 mr-1 text-[#52C997]" />
                  主要养生功效
                </div>
                <div className="flex flex-wrap gap-1">
                  {tea.efficacy.map((eff, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#162A22] text-[#52C997] border border-[#2D4D3E] font-medium"
                    >
                      ✓ {eff}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[#1A2E26] p-3.5 rounded-2xl border border-[#2B4438] shadow-2xs">
                <div className="text-xs font-bold text-white mb-1.5">
                  适宜人群
                </div>
                <ul className="text-[#E2E9E5] space-y-1">
                  {tea.suitableFor.map((item, i) => (
                    <li key={i} className={`flex items-start ${getTextClass()}`}>
                      <span className="text-[#52C997] mr-1.5 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#2C1C19] p-3.5 rounded-2xl border border-[#502820] shadow-2xs">
                <div className="text-xs font-bold text-[#FF8577] flex items-center mb-1.5">
                  <AlertTriangle className="w-4 h-4 mr-1 text-[#FF8577]" />
                  禁忌人群与饮用提醒
                </div>
                <ul className="text-[#FFB2A8] space-y-1 mb-2">
                  {tea.notSuitableFor.map((item, i) => (
                    <li key={i} className={`flex items-start ${getTextClass()}`}>
                      <span className="text-red-400 mr-1.5 font-bold">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] text-[#E2E9E5] bg-[#16251F] p-2.5 rounded-xl border border-[#3E231E]">
                  <span className="font-bold text-[#FF8577]">注意事项：</span>
                  {tea.notes}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: HISTORY & LEGENDS */}
          {activeTab === 'history' && (
            <div className="space-y-3 font-serif-sc">
              <div className="bg-[#1A2E26] p-4 rounded-2xl border border-[#2B4438] shadow-2xs">
                <div className="text-xs font-bold text-[#52C997] flex items-center mb-1.5">
                  <History className="w-4 h-4 mr-1 text-[#52C997]" />
                  起源与历史沿革
                </div>
                <p className={`text-[#E2E9E5] ${getTextClass()}`}>
                  {tea.history.originStory}
                </p>
              </div>

              <div className="bg-[#1A2E26] p-4 rounded-2xl border border-[#2B4438] shadow-2xs">
                <div className="text-xs font-bold text-[#F4A261] mb-1.5">
                  名茶典故与传说
                </div>
                <p className={`text-[#E2E9E5] ${getTextClass()}`}>
                  {tea.history.legend}
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: STORAGE & PRESERVATION */}
          {activeTab === 'storage' && (
            <div className="space-y-3 font-serif-sc">
              <div className="bg-[#1A2E26] p-4 rounded-2xl border border-[#2B4438] shadow-2xs">
                <div className="text-xs font-bold text-[#52C997] flex items-center mb-1.5">
                  <Archive className="w-4 h-4 mr-1 text-[#52C997]" />
                  专业储藏方法
                </div>
                <div className="text-[11px] font-medium text-white mb-1">
                  保质期：{tea.storage.shelfLife}
                </div>
                <p className={`text-[#E2E9E5] mb-2.5 ${getTextClass()}`}>
                  {tea.storage.method}
                </p>

                <div className="text-[11px] font-bold text-[#F4A261] mb-1">
                  防潮防氧化关键要点：
                </div>
                <ul className="space-y-1">
                  {tea.storage.tips.map((tip, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-[#E2E9E5] flex items-start"
                    >
                      <span className="text-[#F4A261] mr-1.5 font-bold">◆</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer Action Button */}
        <div className="p-3.5 bg-[#16251F] border-t border-[#273F33] flex items-center space-x-2 shrink-0">
          <button
            onClick={() => {
              triggerHaptic(25);
              onStartBrewing(tea);
            }}
            className="flex-1 py-2.5 px-4 rounded-full bg-[#2E5B4B] hover:bg-[#3B725E] text-white font-serif-sc font-bold flex items-center justify-center space-x-1.5 shadow-xs active:scale-98 transition text-xs border border-[#3E7461]"
          >
            <Flame className="w-4 h-4 text-[#F4A261]" />
            <span>按此茶开启冲泡实操</span>
          </button>
        </div>
      </div>
    </div>
  );
};
