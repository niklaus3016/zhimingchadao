import React, { useState } from 'react';
import { X, Compass } from 'lucide-react';
import { TEA_COMPARISONS } from '../../data/extraFeaturesData';
import { triggerHaptic } from '../../utils/storage';

interface TeaIdentifyModalProps {
  onClose: () => void;
}

export const TeaIdentifyModal: React.FC<TeaIdentifyModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'matrix'>('comparison');
  const [selectedCompId, setSelectedCompId] = useState<string>(TEA_COMPARISONS[0].id);

  const activeComparison =
    TEA_COMPARISONS.find((c) => c.id === selectedCompId) || TEA_COMPARISONS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs font-serif-sc p-0 sm:p-4 text-[#E2E9E5]">
      <div className="w-full max-w-md bg-[#16251F] rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-[#2B4438] max-h-[88vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#273F33] shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-xl bg-[#243F34] text-[#52C997] border border-[#3E6654] flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-white">
              名茶辨识与对比指南
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

        {/* Tab Toggle */}
        <div className="flex bg-[#13221C] p-1 rounded-xl text-xs my-3 shrink-0 border border-[#273F33]">
          <button
            onClick={() => {
              triggerHaptic(10);
              setActiveTab('comparison');
            }}
            className={`flex-1 py-1.5 rounded-lg font-bold transition ${
              activeTab === 'comparison'
                ? 'bg-[#2E5B4B] text-white shadow-2xs border border-[#52C997]'
                : 'text-[#AEC0B7] hover:text-white'
            }`}
          >
            易混名茶对比
          </button>
          <button
            onClick={() => {
              triggerHaptic(10);
              setActiveTab('matrix');
            }}
            className={`flex-1 py-1.5 rounded-lg font-bold transition ${
              activeTab === 'matrix'
                ? 'bg-[#2E5B4B] text-white shadow-2xs border border-[#52C997]'
                : 'text-[#AEC0B7] hover:text-white'
            }`}
          >
            六大茶类特征速查
          </button>
        </div>

        {/* Content Container */}
        <div className="overflow-y-auto space-y-3 flex-1 no-scrollbar">
          {/* TAB 1: COMPARISONS */}
          {activeTab === 'comparison' && (
            <div className="space-y-3">
              {/* Selector Pills */}
              <div className="flex space-x-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
                {TEA_COMPARISONS.map((comp) => (
                  <button
                    key={comp.id}
                    onClick={() => {
                      triggerHaptic(15);
                      setSelectedCompId(comp.id);
                    }}
                    className={`px-3 py-1 rounded-xl whitespace-nowrap transition font-serif-sc ${
                      selectedCompId === comp.id
                        ? 'bg-[#2E5B4B] text-white font-bold shadow-2xs border border-[#52C997]'
                        : 'bg-[#1A2E26] text-[#CBE0D6] border border-[#2B4438]'
                    }`}
                  >
                    {comp.teaA} VS {comp.teaB}
                  </button>
                ))}
              </div>

              {/* Head-to-Head Card */}
              <div className="bg-[#1A2E26] p-4 rounded-2xl border border-[#2B4438] shadow-2xs space-y-3">
                <div className="text-sm font-bold text-white">
                  {activeComparison.title}
                </div>

                {/* 2 Tea Columns Header */}
                <div className="grid grid-cols-2 gap-2 text-center text-xs font-bold font-serif-sc">
                  <div className="p-2 rounded-xl bg-[#162A22] text-[#52C997] border border-[#2D4D3E]">
                    {activeComparison.teaA}
                  </div>
                  <div className="p-2 rounded-xl bg-[#2A231C] text-[#F4A261] border border-[#483727]">
                    {activeComparison.teaB}
                  </div>
                </div>

                {/* Comparison rows */}
                <div className="space-y-1.5 text-xs">
                  {activeComparison.dimensions.map((dim, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-[#13221C] border border-[#273F33] space-y-1"
                    >
                      <div className="font-bold text-white text-[11px] text-center border-b border-[#273F33] pb-1">
                        【{dim.feature}】
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-1 text-[#E2E9E5] leading-relaxed">
                        <div className="pr-1.5 border-r border-[#273F33]">
                          {dim.aValue}
                        </div>
                        <div className="pl-1.5">
                          {dim.bValue}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 1-Sentence Quick Rule */}
                <div className="p-2.5 bg-[#13221C] rounded-xl text-xs text-[#E2E9E5] border border-[#273F33] leading-relaxed">
                  <span className="font-bold text-[#F4A261] mr-1">
                    ★ 辨别精要：
                  </span>
                  {activeComparison.distinguishTip}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SIX TEA MATRIX */}
          {activeTab === 'matrix' && (
            <div className="space-y-2.5 text-xs">
              <div className="text-[#AEC0B7] font-serif-sc text-xs">
                看干茶、观汤色、嗅香气、察叶底，四步快速鉴识：
              </div>

              {[
                {
                  cat: '绿茶 (不发酵)',
                  color: '#52C997',
                  dry: '翠绿、黄绿或墨绿，扁平、卷曲或针形，白毫明显',
                  soup: '清绿明亮、杏黄微绿，清澈透亮',
                  leaf: '嫩绿完整，叶质柔软如绸，叶脉清晰',
                  scent: '清香、嫩栗香、兰花香、豆香'
                },
                {
                  cat: '白茶 (微发酵)',
                  color: '#E0E7E3',
                  dry: '满披白毫，呈银白、灰绿或青黄，芽头肥壮',
                  soup: '杏黄、浅黄透亮，老白茶呈橙红、琥珀色',
                  leaf: '肥厚脉络分明，色泽灰绿或黄褐',
                  scent: '毫香、清甜香、药香、干荷叶香'
                },
                {
                  cat: '黄茶 (轻发酵·闷黄)',
                  color: '#FBBF24',
                  dry: '黄绿相间，金黄显毫，外覆轻薄白绒',
                  soup: '金黄澄澈，明亮如琥珀',
                  leaf: '嫩黄匀整，柔软厚实',
                  scent: '甜玉米香、清鲜玉米嫩香、炒米香'
                },
                {
                  cat: '乌龙茶 (半发酵)',
                  color: '#F4A261',
                  dry: '条索紧结或卷曲如蜻蜓头，色泽青褐、铁青或油润',
                  soup: '金黄、金橙或深红，清澈发亮',
                  leaf: '「绿叶红镶边」，叶底柔韧肥厚',
                  scent: '兰花香、桂花香、蜜桃香、火功炭焙香、岩骨花香'
                },
                {
                  cat: '红茶 (全发酵)',
                  color: '#E76F51',
                  dry: '乌黑油润带金毫，条索细紧或呈紧结颗粒',
                  soup: '红艳明亮，碗沿有明显的「金圈」',
                  leaf: '红亮匀齐，柔软鲜活',
                  scent: '蜜糖香、果香、高山花香、松烟香'
                },
                {
                  cat: '黑茶 (后发酵)',
                  color: '#C49A6C',
                  dry: '色泽黑褐油润，多紧压成饼、砖、沱，或散茶条索粗壮',
                  soup: '橙黄至深红浓艳，如红酒般透亮陈澈',
                  leaf: '黑褐或黄褐，叶底舒展粗壮厚韧',
                  scent: '陈香、木香、荷香、药香、金花菌花香'
                }
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-[#1A2E26] p-3.5 rounded-xl border border-[#2B4438] shadow-2xs space-y-2"
                >
                  <div className="font-serif-sc font-bold text-xs text-white flex items-center">
                    <span
                      className="w-2.5 h-2.5 rounded-full mr-2 shrink-0 border border-white/20"
                      style={{ backgroundColor: item.color }}
                    />
                    {item.cat}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-[#E2E9E5]">
                    <div>
                      <span className="text-[#AEC0B7] font-bold">干茶：</span>
                      <span>{item.dry}</span>
                    </div>
                    <div>
                      <span className="text-[#AEC0B7] font-bold">汤色：</span>
                      <span>{item.soup}</span>
                    </div>
                    <div>
                      <span className="text-[#AEC0B7] font-bold">香气：</span>
                      <span>{item.scent}</span>
                    </div>
                    <div>
                      <span className="text-[#AEC0B7] font-bold">叶底：</span>
                      <span>{item.leaf}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
