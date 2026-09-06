import React, { useState, useMemo } from 'react';
import {
  ChevronRight,
  BookOpen,
  Sparkles,
  Thermometer,
  Sun,
  Flame,
  ScrollText,
  Users,
  Compass
} from 'lucide-react';
import { TEA_CATEGORIES, TEA_ITEMS } from '../../data/teaData';
import { CULTURE_TOPICS, TEA_SPIRIT_LIST } from '../../data/cultureData';
import { TeaItem, TeaCategory, CultureTopic, TeaSpiritItem } from '../../types';
import { triggerHaptic, addHistoryRecord } from '../../utils/storage';

interface HomeViewProps {
  onSelectTea: (tea: TeaItem) => void;
  onSelectCulture: (topic: CultureTopic) => void;
  onSelectSpirit: (spirit: TeaSpiritItem) => void;
  onOpenDailyQuote: () => void;
  onOpenIdentify: () => void;
  onOpenSolarTerm: () => void;
  onStartBrewingWithTea: (tea: TeaItem) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectTea,
  onSelectCulture,
  onSelectSpirit,
  onOpenDailyQuote,
  onOpenIdentify,
  onOpenSolarTerm,
  onStartBrewingWithTea
}) => {
  const [selectedCategory, setSelectedCategory] = useState<TeaCategory | 'all'>('all');

  // Filtered Tea Items by category
  const filteredTeas = useMemo(() => {
    if (selectedCategory === 'all') {
      return TEA_ITEMS;
    }
    return TEA_ITEMS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const handleTeaClick = (tea: TeaItem) => {
    triggerHaptic(20);
    addHistoryRecord({
      title: tea.name,
      type: 'tea',
      targetId: tea.id
    });
    onSelectTea(tea);
  };

  const handleCultureClick = (topic: CultureTopic) => {
    triggerHaptic(20);
    addHistoryRecord({
      title: topic.title,
      type: 'culture',
      targetId: topic.id
    });
    onSelectCulture(topic);
  };

  return (
    <div className="pb-28 pt-3 px-4 sm:px-5 max-w-md sm:max-w-lg mx-auto space-y-4 font-sans-sc text-[#E2E9E5]">
      {/* 六大茶类 - 移动端全景宫格 */}
      <div className="bg-[#1A2E26] rounded-3xl p-4 sm:p-5 border border-[#2B4438] shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-4 bg-[#52C997] rounded-full inline-block" />
            <h2 className="font-serif-sc font-bold text-base text-white">
              六大茶类全鉴
            </h2>
          </div>
          <span className="text-[11px] text-[#AEC0B7] font-serif-sc">
            {selectedCategory === 'all' ? '点击分类快捷筛选' : '已选择分类'}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* 全部胶囊 */}
          <button
            onClick={() => {
              triggerHaptic(15);
              setSelectedCategory('all');
            }}
            className={`p-2.5 rounded-xl border text-left transition active:scale-95 flex flex-col justify-between ${
              selectedCategory === 'all'
                ? 'bg-[#2E5B4B] border-[#52C997] text-white shadow-xs'
                : 'bg-[#13221C] border-[#273F33] text-[#CBE0D6] hover:border-[#3E6654]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-serif-sc text-white">全部名茶</span>
              <span className="w-2 h-2 rounded-full bg-[#52C997]" />
            </div>
            <div className="text-[10px] text-[#AEC0B7] mt-1 font-serif-sc">
              收录 {TEA_ITEMS.length} 款
            </div>
          </button>

          {TEA_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            const count = TEA_ITEMS.filter((t) => t.category === cat.key).length;

            return (
              <button
                key={cat.key}
                onClick={() => {
                  triggerHaptic(15);
                  setSelectedCategory(isSelected ? 'all' : cat.key);
                }}
                className={`p-2.5 rounded-xl border text-left transition active:scale-95 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#2E5B4B] border-[#52C997] text-white shadow-xs ring-1 ring-[#52C997]'
                    : 'bg-[#13221C] border-[#273F33] text-[#CBE0D6] hover:border-[#3E6654]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-serif-sc text-white">
                    {cat.name}
                  </span>
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                </div>
                <div className="text-[10px] text-[#AEC0B7] mt-1 font-serif-sc">
                  {count} 款名茶
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. 功夫泡茶导师入口与节气/茶语卡片 */}
      <div className="space-y-3">
        {/* 功夫泡茶主入口 */}
        <div
          onClick={() => {
            triggerHaptic(15);
            onStartBrewingWithTea(TEA_ITEMS[0]);
          }}
          className="bg-[#1A2E26] border border-[#2B4438] rounded-3xl p-4 sm:p-5 shadow-xs hover:border-[#3E6654] transition cursor-pointer active:scale-[0.99] group"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#52C997]" />
                <span className="text-[10px] font-bold tracking-wider text-[#F4A261] uppercase font-serif-sc">
                  实操导师 · 动作演示
                </span>
              </div>
              <h3 className="font-serif-sc text-base font-bold text-white">
                功夫泡茶实操与计时器
              </h3>
              <p className="text-xs text-[#CBE0D6]">
                分步动作指导 · 智能推算水温投茶量 · 清心梵音
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#243F34] text-[#52C997] flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-[#2E5B4B] group-hover:text-white transition border border-[#375B4C]">
              <Flame className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-3.5 pt-3 border-t border-[#273F33] flex items-center justify-between text-xs">
            <div className="flex items-center space-x-3">
              <span className="font-serif-sc font-bold text-sm text-[#52C997]">
                85℃ ~ 100℃
              </span>
              <span className="text-[#AEC0B7]">多茶类精准出汤</span>
            </div>
            <span className="text-[11px] font-serif-sc font-bold text-[#52C997] flex items-center">
              立即实操 <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </span>
          </div>
        </div>

        {/* 2个并列小卡：时令饮茶 + 每日茶语 */}
        <div className="grid grid-cols-2 gap-3">
          {/* 时令顺时宜茶卡 */}
          <div
            onClick={() => {
              triggerHaptic(15);
              onOpenSolarTerm();
            }}
            className="bg-[#1A2E26] border border-[#2B4438] rounded-2xl p-3.5 flex flex-col justify-between cursor-pointer active:scale-95 transition hover:border-[#3E6654]"
          >
            <div>
              <div className="flex items-center space-x-1.5 mb-1.5">
                <Sun className="w-3.5 h-3.5 text-[#F4A261]" />
                <span className="text-[10px] font-bold text-[#F4A261] font-serif-sc">
                  时令饮茶
                </span>
              </div>
              <h4 className="font-serif-sc font-bold text-sm text-white">
                顺时宜茶
              </h4>
              <p className="text-[11px] text-[#CBE0D6] mt-1 font-serif-sc line-clamp-2 leading-relaxed">
                春饮花茶散郁，夏品绿茶消暑，秋品乌龙润燥。
              </p>
            </div>
            <span className="text-[10px] font-bold text-[#F4A261] font-serif-sc mt-2.5 flex items-center">
              廿四节气食养 →
            </span>
          </div>

          {/* 每日茶语卡 */}
          <div
            onClick={() => {
              triggerHaptic(15);
              onOpenDailyQuote();
            }}
            className="bg-[#1A2E26] border border-[#2B4438] rounded-2xl p-3.5 flex flex-col justify-between cursor-pointer active:scale-95 transition hover:border-[#3E6654]"
          >
            <div>
              <div className="flex items-center space-x-1.5 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#52C997]" />
                <span className="text-[10px] font-bold text-[#52C997] font-serif-sc">
                  每日茶语
                </span>
              </div>
              <h4 className="font-serif-sc font-bold text-sm text-white">
                静品岁月
              </h4>
              <p className="text-[11px] text-[#CBE0D6] mt-1 font-serif-sc line-clamp-2 leading-relaxed">
                一盏清茗酬知音，半卷经书悟世情。
              </p>
            </div>
            <span className="text-[10px] font-bold text-[#52C997] font-serif-sc mt-2.5 flex items-center">
              诗词打卡 →
            </span>
          </div>
        </div>
      </div>

      {/* 4. 精选茶品名册列表 */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-4 bg-[#52C997] rounded-full inline-block" />
            <h3 className="font-serif-sc font-bold text-base text-white">
              {selectedCategory === 'all'
                ? '精选道地名茶'
                : `${TEA_CATEGORIES.find((c) => c.key === selectedCategory)?.name || ''}名品`}
            </h3>
          </div>
          <span className="text-xs text-[#AEC0B7] font-serif-sc">
            收录 {filteredTeas.length} 款
          </span>
        </div>

        {filteredTeas.length === 0 ? (
          <div className="py-12 text-center bg-[#1A2E26] rounded-3xl border border-[#2B4438]">
            <BookOpen className="w-8 h-8 mx-auto text-[#AEC0B7] mb-2" />
            <p className="text-[#AEC0B7] text-xs font-serif-sc">
              暂无该分类茶品
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTeas.map((tea) => (
              <div
                key={tea.id}
                onClick={() => handleTeaClick(tea)}
                className="bg-[#1A2E26] rounded-2xl p-4 border border-[#2B4438] hover:border-[#3E6654] shadow-xs transition active:scale-[0.99] cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-base font-serif-sc font-bold text-white">
                        {tea.name}
                      </h4>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md text-white font-serif-sc shadow-2xs"
                        style={{ backgroundColor: tea.colorHex }}
                      >
                        {tea.categoryName}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#AEC0B7] font-serif-sc mt-0.5">
                      {tea.pinyin} · 产地：{tea.origin}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerHaptic(20);
                      onStartBrewingWithTea(tea);
                    }}
                    className="text-xs px-3 py-1.5 rounded-full bg-[#2E5B4B] text-white font-serif-sc font-bold hover:bg-[#3B725E] transition shrink-0 shadow-xs border border-[#3E7461]"
                  >
                    去冲泡
                  </button>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {tea.coreFeatures.slice(0, 3).map((f, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-[#13221C] text-[#CBE0D6] border border-[#273F33]"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Taste Snippet - High Contrast and Clear */}
                <div className="mt-2.5 text-xs text-[#E2E9E5] bg-[#13221C] p-3 rounded-xl border border-[#273F33] leading-relaxed">
                  <span className="font-serif-sc text-[#F4A261] font-bold mr-1">
                    【品饮韵味】：
                  </span>
                  {tea.tasting.taste}
                </div>

                {/* Bottom Param Info */}
                <div className="mt-2.5 pt-2 border-t border-[#273F33] flex items-center justify-between text-[11px] text-[#AEC0B7] font-serif-sc">
                  <span className="flex items-center">
                    <Thermometer className="w-3 h-3 text-[#F4A261] mr-1" />
                    建议水温 {tea.brewSummary.temp}℃
                  </span>
                  <span>推荐器具：{tea.brewSummary.vessel}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. 茶文化四大专题 */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-4 bg-[#F4A261] rounded-full inline-block" />
            <h3 className="font-serif-sc font-bold text-base text-white">
              茶文化精粹专题
            </h3>
          </div>
          <span className="text-xs text-[#AEC0B7] font-serif-sc">四大板块</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {CULTURE_TOPICS.map((topic) => (
            <div
              key={topic.id}
              onClick={() => handleCultureClick(topic)}
              className="bg-[#1A2E26] p-3.5 rounded-2xl border border-[#2B4438] hover:border-[#3E6654] shadow-xs transition active:scale-98 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="text-[10px] font-serif-sc font-bold text-[#F4A261] mb-1">
                  {topic.type === 'history' ? '茶史源流' : topic.type === 'etiquette' ? '行茶仪规' : topic.type === 'literature' ? '茶书经典' : '茶俗风貌'}
                </div>
                <h4 className="font-serif-sc font-bold text-sm text-white line-clamp-1">
                  {topic.title}
                </h4>
                <p className="text-[11px] text-[#CBE0D6] line-clamp-2 mt-1 font-serif-sc leading-relaxed">
                  {topic.summary}
                </p>
              </div>

              <div className="mt-2.5 pt-2 border-t border-[#273F33] flex items-center justify-between text-[10px] text-[#52C997] font-serif-sc font-bold">
                <span>进入研读</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. 茶道四谛 */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-4 bg-[#52C997] rounded-full inline-block" />
            <h3 className="font-serif-sc font-bold text-base text-white">
              茶道四谛 · 心法
            </h3>
          </div>
          <span className="text-xs text-[#AEC0B7] font-serif-sc">和 · 敬 · 清 · 寂</span>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center">
          {TEA_SPIRIT_LIST.map((sp) => (
            <div
              key={sp.character}
              onClick={() => {
                triggerHaptic(20);
                onSelectSpirit(sp);
              }}
              className="bg-[#1A2E26] p-3 rounded-2xl border border-[#2B4438] hover:border-[#52C997] shadow-2xs transition active:scale-95 cursor-pointer"
            >
              <div className="w-9 h-9 mx-auto rounded-xl bg-[#2E5B4B] text-white flex items-center justify-center font-serif-sc font-bold text-base mb-1 shadow-2xs border border-[#3E7461]">
                {sp.character}
              </div>
              <div className="text-xs font-bold font-serif-sc text-white">
                {sp.character}
              </div>
              <div className="text-[10px] text-[#AEC0B7] truncate font-serif-sc mt-0.5">
                {sp.title.split(' · ')[0]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
