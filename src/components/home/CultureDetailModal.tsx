import React, { useState, useEffect } from 'react';
import { X, Bookmark, BookmarkCheck, Share2, CheckCircle2, Type } from 'lucide-react';
import { CultureTopic, TeaSpiritItem } from '../../types';
import { toggleBookmark, isItemBookmarked, triggerHaptic } from '../../utils/storage';

interface CultureDetailModalProps {
  topic: CultureTopic | null;
  spirit: TeaSpiritItem | null;
  onClose: () => void;
}

export const CultureDetailModal: React.FC<CultureDetailModalProps> = ({
  topic,
  spirit,
  onClose
}) => {
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large'>('normal');
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  const targetId = topic ? topic.id : spirit ? `spirit_${spirit.character}` : '';
  const title = topic ? topic.title : spirit ? `茶道心法 · ${spirit.character}` : '';
  const categoryLabel = topic ? '茶文化精粹' : '茶道四谛';

  useEffect(() => {
    if (targetId) setBookmarked(isItemBookmarked(targetId, 'culture'));
  }, [targetId]);

  if (!topic && !spirit) return null;

  const handleToggleBookmark = () => {
    toggleBookmark({
      targetId,
      type: 'culture',
      title,
      categoryLabel
    });
    setBookmarked((prev) => !prev);
  };

  const handleShare = () => {
    triggerHaptic(20);
    const text = topic
      ? `【知茗茶道 · ${topic.title}】\n${topic.summary}`
      : `【知茗茶道 · 茶道心法「${spirit?.character}」】\n${spirit?.title}\n${spirit?.meaning}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2200);
  };

  const textClass = fontSizeLevel === 'large' ? 'text-sm leading-relaxed' : 'text-xs leading-relaxed';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in p-0 sm:p-4 text-[#E2E9E5]">
      <div className="w-full max-w-md bg-[#16251F] rounded-t-3xl sm:rounded-3xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden border border-[#2B4438]">
        {/* Header Bar */}
        <div className="bg-[#1A352B] text-white px-5 pt-4 pb-4 shrink-0 relative overflow-hidden border-b border-[#2B4438]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-black/30 border border-white/20 text-white font-bold font-serif-sc">
              {categoryLabel}
            </span>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => {
                  triggerHaptic(15);
                  setFontSizeLevel((prev) => (prev === 'normal' ? 'large' : 'normal'));
                }}
                className="w-7 h-7 rounded-full bg-black/30 hover:bg-black/50 border border-white/20 active:scale-95 transition text-white flex items-center justify-center"
                title="切换字号"
              >
                <Type className="w-3.5 h-3.5" />
              </button>

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

              <button
                onClick={handleShare}
                className="w-7 h-7 rounded-full bg-black/30 hover:bg-black/50 border border-white/20 active:scale-95 transition text-white flex items-center justify-center"
                title="分享"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>

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

          <h2 className="text-lg font-bold font-serif-sc tracking-wide text-white">
            {title}
          </h2>
          {topic?.subtitle && (
            <p className="text-[11px] text-[#AEC0B7] mt-0.5 font-serif-sc italic">
              {topic.subtitle}
            </p>
          )}
        </div>

        {/* Floating Copied Toast */}
        {copiedNotification && (
          <div className="bg-[#F4A261] text-black font-bold text-xs px-3 py-1.5 text-center flex items-center justify-center space-x-1 shrink-0 font-serif-sc">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>内容已复制，可分享至备忘录！</span>
          </div>
        )}

        {/* Content Body */}
        <div className="overflow-y-auto px-4 py-3.5 space-y-3 flex-1 no-scrollbar">
          {topic && (
            <>
              {/* Summary quote */}
              <div className="p-3 rounded-xl bg-[#13221C] text-[#52C997] text-xs font-serif-sc border border-[#273F33] leading-relaxed">
                {topic.summary}
              </div>

              {/* Sections */}
              <div className="space-y-3 mt-2">
                {topic.content.map((sec, i) => (
                  <div
                    key={i}
                    className="bg-[#1A2E26] p-4 rounded-2xl border border-[#2B4438] shadow-2xs space-y-2 font-serif-sc"
                  >
                    <h3 className="text-sm font-bold text-white">
                      {sec.sectionTitle}
                    </h3>
                    <p className={`text-[#E2E9E5] whitespace-pre-line ${textClass}`}>
                      {sec.text}
                    </p>
                    {sec.quote && (
                      <div className="text-xs text-[#F4A261] bg-[#13221C] p-2.5 rounded-xl font-serif-sc border border-[#273F33]">
                        {sec.quote}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {spirit && (
            <div className="space-y-3 font-serif-sc">
              {/* Character Banner Card */}
              <div className="text-center py-4 bg-[#1A2E26] rounded-2xl border border-[#2B4438] shadow-2xs">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#2E5B4B] text-white flex items-center justify-center font-serif-sc font-bold text-3xl shadow-2xs border border-[#3E7461]">
                  {spirit.character}
                </div>
                <div className="text-[10px] text-[#AEC0B7] uppercase tracking-widest font-serif-sc mt-2">
                  {spirit.pinyin}
                </div>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {spirit.title}
                </h3>
              </div>

              {/* Core Meaning */}
              <div className="bg-[#1A2E26] p-4 rounded-2xl border border-[#2B4438] shadow-2xs space-y-1.5">
                <div className="text-xs font-bold text-[#52C997]">
                  【茶道本意】
                </div>
                <p className={`text-[#E2E9E5] ${textClass}`}>
                  {spirit.meaning}
                </p>
              </div>

              {/* Modern Interpretation */}
              <div className="bg-[#1A2E26] p-4 rounded-2xl border border-[#2B4438] shadow-2xs space-y-1.5">
                <div className="text-xs font-bold text-[#F4A261]">
                  【现代生活解读】
                </div>
                <p className={`text-[#E2E9E5] ${textClass}`}>
                  {spirit.modernInterpretation}
                </p>
              </div>

              {/* Daily Practice */}
              <div className="bg-[#13221C] p-4 rounded-2xl border border-[#273F33] shadow-2xs space-y-1.5">
                <div className="text-xs font-bold text-[#52C997]">
                  【今日静心践行】
                </div>
                <p className={`text-[#E2E9E5] ${textClass}`}>
                  {spirit.dailyPractice}
                </p>
              </div>

              {/* Classic Quote */}
              <div className="p-3 bg-[#1A2E26] rounded-2xl text-center text-xs font-serif-sc text-[#F4A261] border border-[#2B4438]">
                {spirit.quote}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
