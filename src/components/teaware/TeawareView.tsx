import React, { useState } from 'react';
import {
  ChevronRight,
  Wrench,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';
import {
  TEAWARE_ITEMS,
  TEAWARE_PAIRINGS,
  TEAWARE_MAINTENANCE
} from '../../data/teawareData';
import { TeawareItem } from '../../types';
import {
  triggerHaptic,
  toggleBookmark,
  isItemBookmarked,
  addHistoryRecord
} from '../../utils/storage';

export const TeawareView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'pairing' | 'maintenance'>('catalog');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'main' | 'secondary' | 'storage' | 'craft'>('all');
  const [selectedTeawareModal, setSelectedTeawareModal] = useState<TeawareItem | null>(null);
  const [teawareBookmarked, setTeawareBookmarked] = useState<boolean>(false);

  const openTeawareDetail = (ware: TeawareItem) => {
    triggerHaptic(15);
    setSelectedTeawareModal(ware);
    setTeawareBookmarked(isItemBookmarked(ware.id, 'teaware'));
    addHistoryRecord({
      title: ware.name,
      type: 'teaware',
      targetId: ware.id
    });
  };

  const handleToggleBookmark = () => {
    if (!selectedTeawareModal) return;
    triggerHaptic(15);
    toggleBookmark({
      targetId: selectedTeawareModal.id,
      type: 'teaware',
      title: selectedTeawareModal.name,
      categoryLabel: '器物鉴赏'
    });
    setTeawareBookmarked((prev) => !prev);
  };

  const filteredWares =
    selectedCategory === 'all'
      ? TEAWARE_ITEMS
      : TEAWARE_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <div className="pb-28 pt-3 px-4 sm:px-5 max-w-md sm:max-w-lg mx-auto space-y-4 font-serif-sc text-[#E2E9E5]">
      {/* Page Header */}
      <div>
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-4 bg-[#F4A261] rounded-full inline-block" />
          <h1 className="text-lg font-bold text-white tracking-tight">
            茶具图鉴与鉴赏
          </h1>
          <span className="text-[10px] text-[#F4A261] bg-[#F4A261]/20 border border-[#F4A261]/40 px-2 py-0.5 rounded-full font-bold">
            器为茶之父
          </span>
        </div>
        <p className="text-[11px] text-[#AEC0B7] font-serif-sc italic mt-0.5">
          水为茶之母，器为茶之父 · 全品类茶器图鉴与适配养护
        </p>
      </div>

      {/* 3 Main View Tabs */}
      <div className="flex bg-[#1A2E26] p-1 rounded-2xl border border-[#2B4438] shadow-2xs text-xs">
        {[
          { id: 'catalog', label: '茶具图鉴' },
          { id: 'pairing', label: '茶器适配' },
          { id: 'maintenance', label: '开壶与养护' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              triggerHaptic(15);
              setActiveTab(tab.id as typeof activeTab);
            }}
            className={`flex-1 py-1.5 rounded-xl font-bold transition ${
              activeTab === tab.id
                ? 'bg-[#2E5B4B] text-white shadow-2xs border border-[#52C997]'
                : 'text-[#AEC0B7] hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* --- TAB 1: TEAWARE CATALOG --- */}
      {activeTab === 'catalog' && (
        <div className="space-y-3.5">
          {/* Category filter pills */}
          <div className="flex space-x-1.5 overflow-x-auto pb-0.5 no-scrollbar">
            {[
              { id: 'all', label: '全部器具' },
              { id: 'main', label: '主茶具' },
              { id: 'secondary', label: '辅茶具（六君子）' },
              { id: 'storage', label: '储茶器具' },
              { id: 'craft', label: '名窑名器' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  triggerHaptic(15);
                  setSelectedCategory(cat.id as typeof selectedCategory);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition font-serif-sc ${
                  selectedCategory === cat.id
                    ? 'bg-[#2E5B4B] text-white font-bold shadow-2xs border border-[#52C997]'
                    : 'bg-[#1A2E26] text-[#CBE0D6] border border-[#2B4438] hover:border-[#3E6654]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Teaware Cards List */}
          <div className="space-y-2.5">
            {filteredWares.map((ware) => (
              <div
                key={ware.id}
                onClick={() => openTeawareDetail(ware)}
                className="bg-[#1A2E26] p-4 rounded-2xl border border-[#2B4438] hover:border-[#3E6654] shadow-2xs transition active:scale-[0.99] cursor-pointer space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#F4A261]/20 text-[#F4A261] border border-[#F4A261]/40 font-bold">
                          {ware.categoryLabel}
                        </span>
                        <h3 className="text-base font-bold font-serif-sc text-white">
                          {ware.name}
                        </h3>
                      </div>
                      <div className="text-[11px] text-[#AEC0B7] font-serif-sc mt-0.5">
                        材质：{ware.material}
                      </div>
                    </div>

                    <div className="w-6 h-6 rounded-full border border-[#2B4438] flex items-center justify-center text-[#AEC0B7]">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <p className="text-xs text-[#E2E9E5] font-serif-sc line-clamp-2 leading-relaxed mt-1.5">
                    {ware.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#273F33] flex flex-wrap gap-1 font-serif-sc">
                  {ware.features.slice(0, 3).map((f, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-[#13221C] text-[#CBE0D6] border border-[#273F33]"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 2: TEA TO WARE PAIRING GUIDE --- */}
      {activeTab === 'pairing' && (
        <div className="space-y-3">
          <div className="text-xs text-[#AEC0B7] font-serif-sc italic">
            茶器相宜，如良马配金鞍。了解不同茶类为何要搭配特定器具：
          </div>

          <div className="space-y-3">
            {TEAWARE_PAIRINGS.map((pair, idx) => (
              <div
                key={idx}
                className="bg-[#1A2E26] p-4 rounded-2xl border border-[#2B4438] shadow-2xs space-y-2.5"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-lg bg-[#2E5B4B] text-white flex items-center justify-center font-bold text-xs font-mono border border-[#3E7461]">
                    {idx + 1}
                  </div>
                  <h3 className="text-sm font-bold font-serif-sc text-white">
                    {pair.teaCategory}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-serif-sc">
                  <div className="bg-[#162A22] p-2.5 rounded-xl border border-[#2D4D3E]">
                    <div className="text-[10px] text-[#52C997] font-bold mb-0.5">
                      ★ 首选适配茶器
                    </div>
                    <div className="font-bold text-white">
                      {pair.recommendedWare}
                    </div>
                  </div>

                  <div className="bg-[#13221C] p-2.5 rounded-xl border border-[#273F33]">
                    <div className="text-[10px] text-[#AEC0B7] font-bold mb-0.5">
                      备选茶器
                    </div>
                    <div className="text-[#CBE0D6]">
                      {pair.alternativeWare}
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs font-serif-sc">
                  <div className="p-2.5 rounded-xl bg-[#13221C] border border-[#273F33] text-[#E2E9E5] leading-relaxed">
                    <span className="font-bold text-[#F4A261]">【搭配原理】：</span>
                    {pair.why}
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#162A22] border border-[#2D4D3E] text-[#E2E9E5] leading-relaxed">
                    <span className="font-bold text-[#52C997]">【口感影响】：</span>
                    {pair.flavorImpact}
                  </div>
                  <div className="text-[11px] text-[#F4A261] bg-[#2A231C] p-2 rounded-xl border border-[#483727]">
                    <span className="font-bold">避坑禁忌：</span> {pair.caution}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 3: MAINTENANCE & CARE GUIDE --- */}
      {activeTab === 'maintenance' && (
        <div className="space-y-3">
          <div className="text-xs text-[#AEC0B7] font-serif-sc italic">
            养器如养心。正确的开壶、包浆养护与清洁技巧：
          </div>

          <div className="space-y-3">
            {TEAWARE_MAINTENANCE.map((maint) => (
              <div
                key={maint.id}
                className="bg-[#1A2E26] p-4 rounded-2xl border border-[#2B4438] shadow-2xs space-y-3"
              >
                <div className="flex items-center space-x-2 border-b border-[#273F33] pb-2.5">
                  <Wrench className="w-4 h-4 text-[#F4A261]" />
                  <h3 className="text-sm font-bold font-serif-sc text-white">
                    {maint.title}
                  </h3>
                </div>

                <div className="space-y-2 font-serif-sc">
                  {maint.steps.map((st, i) => (
                    <div
                      key={i}
                      className="bg-[#13221C] p-2.5 rounded-xl border border-[#273F33] space-y-1"
                    >
                      <div className="text-xs font-bold text-[#52C997] flex items-center font-serif-sc">
                        <span className="w-4 h-4 rounded-full bg-[#2E5B4B] text-white text-[10px] flex items-center justify-center mr-1.5 font-mono border border-[#3E7461]">
                          {i + 1}
                        </span>
                        {st.title}
                      </div>
                      <p className="text-xs text-[#E2E9E5] leading-relaxed">
                        {st.description}
                      </p>
                      {st.tips && (
                        <div className="text-[11px] text-[#F4A261] bg-[#2A231C] p-1.5 rounded-lg mt-0.5 border border-[#483727]">
                          💡 提示：{st.tips}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="bg-[#2C1C19] p-2.5 rounded-xl border border-[#502820] text-xs font-serif-sc space-y-1">
                  <div className="font-bold text-[#FF8577]">
                    养护绝对禁忌：
                  </div>
                  <ul className="space-y-0.5 text-[#FFB2A8] text-[11px]">
                    {maint.taboos.map((t, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-1 text-red-400 font-bold">✕</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Teaware Detail Modal */}
      {selectedTeawareModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 font-serif-sc">
          <div className="w-full max-w-md bg-[#16251F] rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-[#2B4438] max-h-[85vh] overflow-y-auto no-scrollbar space-y-3.5">
            <div className="flex items-start justify-between border-b border-[#273F33] pb-2.5">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#F4A261]/20 text-[#F4A261] border border-[#F4A261]/40 font-serif-sc font-bold">
                  {selectedTeawareModal.categoryLabel}
                </span>
                <h3 className="text-lg font-bold font-serif-sc text-white mt-1">
                  {selectedTeawareModal.name}
                </h3>
              </div>
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={handleToggleBookmark}
                  className="p-1.5 rounded-full border border-[#2B4438] text-[#F4A261] hover:border-[#F4A261] transition"
                  title={teawareBookmarked ? '取消收藏' : '收藏此器'}
                >
                  {teawareBookmarked ? (
                    <BookmarkCheck className="w-4 h-4" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => setSelectedTeawareModal(null)}
                  className="text-[#AEC0B7] hover:text-white text-sm p-1"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="bg-[#13221C] p-3 rounded-xl border border-[#273F33] text-xs font-serif-sc space-y-1">
              <div>
                <span className="font-bold text-white">材质构成：</span>
                <span className="text-[#AEC0B7]">{selectedTeawareModal.material}</span>
              </div>
              {selectedTeawareModal.capacity && (
                <div>
                  <span className="font-bold text-white">常用容量：</span>
                  <span className="text-[#AEC0B7]">{selectedTeawareModal.capacity}</span>
                </div>
              )}
            </div>

            <p className="text-xs text-[#E2E9E5] leading-relaxed font-serif-sc">
              {selectedTeawareModal.description}
            </p>

            <div className="bg-[#162A22] p-3 rounded-xl border border-[#2D4D3E] text-xs font-serif-sc">
              <div className="font-bold text-[#52C997] mb-1">
                最佳适配茶类：
              </div>
              <div className="text-white">
                {selectedTeawareModal.bestMatchedTeas.join('、')}
              </div>
            </div>

            <div className="bg-[#13221C] p-3 rounded-xl border border-[#273F33] text-xs font-serif-sc space-y-1">
              <div className="font-bold text-white">
                日常保养要点：
              </div>
              <ul className="space-y-1 text-[#AEC0B7]">
                {selectedTeawareModal.careTips.map((tip, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-[#F4A261] mr-1.5">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => {
                triggerHaptic(15);
                setSelectedTeawareModal(null);
              }}
              className="w-full py-2.5 rounded-full bg-[#2E5B4B] text-white font-bold font-serif-sc shadow-xs text-xs hover:bg-[#3B725E] border border-[#3E7461]"
            >
              了解完毕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
