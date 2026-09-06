import React, { useState } from 'react';
import {
  Bookmark,
  History,
  BookOpen,
  Settings,
  Trash2,
  Plus,
  Star,
  Sparkles,
  ChevronRight,
  HardDrive,
  Calendar,
  ShieldCheck
} from 'lucide-react';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';
import {
  getBookmarks,
  getHistory,
  clearHistory,
  getBrewNotes,
  saveBrewNote,
  deleteBrewNote,
  getCheckInStatus,
  performDailyCheckIn,
  getStorageStats,
  resetAllUserCache,
  triggerHaptic
} from '../../utils/storage';
import { BrewNote, AppSettings, UserBookmark, UserHistoryItem } from '../../types';

interface ProfileViewProps {
  onNavigateToItem: (type: string, targetId: string) => void;
  appSettings: AppSettings;
  onUpdateSettings: (settings: Partial<AppSettings>) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  onNavigateToItem,
  appSettings,
  onUpdateSettings
}) => {
  const [activeSection, setActiveSection] = useState<'bookmarks' | 'history' | 'notes' | 'settings'>('bookmarks');

  // Bookmarks
  const [bookmarks, setBookmarks] = useState<UserBookmark[]>(getBookmarks());
  const [bookmarkFilter, setBookmarkFilter] = useState<'all' | 'tea' | 'brew' | 'teaware' | 'culture'>('all');

  // History
  const [historyList, setHistoryList] = useState<UserHistoryItem[]>(getHistory());

  // Notes
  const [notes, setNotes] = useState<BrewNote[]>(getBrewNotes());
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);

  // New Note Form
  const [noteTeaName, setNoteTeaName] = useState('');
  const [noteCategory, setNoteCategory] = useState<'green' | 'black' | 'oolong' | 'white' | 'yellow' | 'dark'>('green');
  const [noteVessel, setNoteVessel] = useState('白瓷盖碗 (120ml)');
  const [noteTemp, setNoteTemp] = useState(90);
  const [noteInfusions, setNoteInfusions] = useState(5);
  const [noteRating, setNoteRating] = useState(5);
  const [noteText, setNoteText] = useState('');
  const [noteTags, setNoteTags] = useState('兰花幽香, 舌底生津');

  // Check In State
  const [checkInStatus, setCheckInStatus] = useState(getCheckInStatus());
  const [checkInMessage, setCheckInMessage] = useState<string | null>(null);

  // Storage Stats
  const [storageStats, setStorageStats] = useState(getStorageStats());
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // Refresh lists
  const reloadData = () => {
    setBookmarks(getBookmarks());
    setHistoryList(getHistory());
    setNotes(getBrewNotes());
    setCheckInStatus(getCheckInStatus());
    setStorageStats(getStorageStats());
  };

  const handleCheckIn = () => {
    triggerHaptic(30);
    const result = performDailyCheckIn();
    setCheckInMessage(result.message);
    setCheckInStatus(getCheckInStatus());
    setTimeout(() => setCheckInMessage(null), 3000);
  };

  const handleClearHistory = () => {
    if (confirm('确认清空所有历史学习足迹吗？')) {
      clearHistory();
      setHistoryList([]);
      triggerHaptic(20);
    }
  };

  const handleSaveNewNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTeaName.trim()) return;
    const tagArray = noteTags
      .split(/[,，\s]+/)
      .map((t) => t.trim())
      .filter(Boolean);

    saveBrewNote({
      teaName: noteTeaName.trim(),
      teaCategory: noteCategory,
      vessel: noteVessel,
      waterTemp: noteTemp,
      infusions: noteInfusions,
      rating: noteRating,
      notes: noteText.trim() || '无特殊备注',
      flavorTags: tagArray.length > 0 ? tagArray : ['甘醇']
    });

    triggerHaptic(25);
    setShowAddNoteModal(false);
    setNoteTeaName('');
    setNoteText('');
    reloadData();
  };

  const handleDeleteNote = (id: string) => {
    if (confirm('确认删除该条品茶日记吗？')) {
      deleteBrewNote(id);
      reloadData();
      triggerHaptic(15);
    }
  };

  const handleClearCache = () => {
    if (confirm('注意：这将清空所有本地打卡、笔记与收藏数据，并恢复为初始出厂状态。确定继续吗？')) {
      resetAllUserCache();
      reloadData();
      alert('已成功清空本地缓存！');
    }
  };

  const filteredBookmarks =
    bookmarkFilter === 'all'
      ? bookmarks
      : bookmarks.filter((b) => b.type === bookmarkFilter);

  return (
    <div className="pb-28 pt-3 px-4 sm:px-5 max-w-md sm:max-w-lg mx-auto space-y-4 font-serif-sc text-[#E2E9E5]">
      {/* 1. Header Profile Card with Daily Check-In */}
      <div className="bg-[#1A2E26] rounded-3xl p-5 border border-[#2B4438] shadow-xs space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-[#2E5B4B] text-white flex items-center justify-center font-bold text-lg font-serif-sc shadow-2xs border border-[#3E7461]">
              茗
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h2 className="text-base font-bold text-white">知茗茶客</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#F4A261]/20 text-[#F4A261] border border-[#F4A261]/40 font-bold font-mono">
                  LV.{Math.min(10, Math.floor(checkInStatus.totalDays / 2) + 1)} 茶人
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCheckIn}
            className="py-1.5 px-3 rounded-full bg-[#2E5B4B] text-white font-bold text-xs flex items-center space-x-1 active:scale-95 transition shadow-2xs font-serif-sc shrink-0 border border-[#52C997]"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>静心打卡</span>
          </button>
        </div>

        {checkInMessage && (
          <div className="p-2.5 rounded-xl bg-[#162A22] border border-[#2D4D3E] text-[#52C997] text-xs text-center font-serif-sc animate-in fade-in">
            {checkInMessage}
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#273F33] text-center font-sans-sc">
          <div className="bg-[#13221C] p-2 rounded-xl border border-[#273F33]">
            <div className="text-[10px] text-[#AEC0B7]">连续精进</div>
            <div className="text-sm font-bold font-mono text-[#52C997] mt-0.5">
              {checkInStatus.streakDays} <span className="text-[10px] font-normal font-serif-sc text-[#AEC0B7]">天</span>
            </div>
          </div>
          <div className="bg-[#13221C] p-2 rounded-xl border border-[#273F33]">
            <div className="text-[10px] text-[#AEC0B7]">典藏名品</div>
            <div className="text-sm font-bold font-mono text-white mt-0.5">
              {bookmarks.length} <span className="text-[10px] font-normal font-serif-sc text-[#AEC0B7]">项</span>
            </div>
          </div>
          <div className="bg-[#13221C] p-2 rounded-xl border border-[#273F33]">
            <div className="text-[10px] text-[#AEC0B7]">品茶心得</div>
            <div className="text-sm font-bold font-mono text-white mt-0.5">
              {notes.length} <span className="text-[10px] font-normal font-serif-sc text-[#AEC0B7]">篇</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Four Section Navigation Tabs */}
      <div className="flex bg-[#1A2E26] p-1 rounded-2xl border border-[#2B4438] shadow-2xs text-xs">
        {[
          { id: 'bookmarks', label: '我的收藏' },
          { id: 'history', label: '学习足迹' },
          { id: 'notes', label: '泡茶日记' },
          { id: 'settings', label: '个性设置' }
        ].map((sec) => (
          <button
            key={sec.id}
            onClick={() => {
              triggerHaptic(15);
              setActiveSection(sec.id as typeof activeSection);
              reloadData();
            }}
            className={`flex-1 py-1.5 rounded-xl font-bold transition ${
              activeSection === sec.id
                ? 'bg-[#2E5B4B] text-white shadow-2xs border border-[#52C997]'
                : 'text-[#AEC0B7] hover:text-white'
            }`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* --- SECTION 1: BOOKMARKS --- */}
      {activeSection === 'bookmarks' && (
        <div className="space-y-3">
          <div className="flex space-x-1.5 overflow-x-auto pb-0.5 no-scrollbar text-xs">
            {[
              { id: 'all', label: '全部' },
              { id: 'tea', label: '茶叶' },
              { id: 'brew', label: '冲泡' },
              { id: 'teaware', label: '茶具' },
              { id: 'culture', label: '文化' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  triggerHaptic(10);
                  setBookmarkFilter(f.id as typeof bookmarkFilter);
                }}
                className={`px-3 py-1 rounded-xl whitespace-nowrap transition font-serif-sc ${
                  bookmarkFilter === f.id
                    ? 'bg-[#2E5B4B] text-white font-bold shadow-2xs border border-[#52C997]'
                    : 'bg-[#1A2E26] text-[#CBE0D6] border border-[#2B4438]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {filteredBookmarks.length === 0 ? (
            <div className="py-10 text-center bg-[#1A2E26] rounded-2xl border border-[#2B4438] space-y-1.5">
              <Bookmark className="w-6 h-6 mx-auto text-[#AEC0B7]" />
              <div className="text-xs text-[#AEC0B7] font-serif-sc">
                暂无收藏条目
              </div>
              <p className="text-[11px] text-[#AEC0B7]/80 font-serif-sc">
                在浏览茶叶百科、器物或文化时点击收藏，即可在此品读
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredBookmarks.map((b) => (
                <div
                  key={b.id}
                  onClick={() => {
                    triggerHaptic(15);
                    onNavigateToItem(b.type, b.targetId);
                  }}
                  className="bg-[#1A2E26] p-3.5 rounded-2xl border border-[#2B4438] hover:border-[#3E6654] shadow-2xs transition active:scale-[0.99] cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#13221C] border border-[#273F33] flex items-center justify-center text-[#52C997]">
                      <Bookmark className="w-4 h-4 text-[#F4A261] fill-current" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold font-serif-sc text-white">
                        {b.title}
                      </h4>
                      <span className="text-[10px] text-[#AEC0B7] font-serif-sc">
                        {new Date(b.timestamp).toLocaleDateString()} · {b.type === 'tea' ? '名茶档案' : b.type === 'teaware' ? '器物鉴赏' : '茶道专题'}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-[#AEC0B7]" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* --- SECTION 2: STUDY HISTORY --- */}
      {activeSection === 'history' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#AEC0B7] font-serif-sc">
              记录最近研习的茶叶与文化内容
            </span>
            {historyList.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="text-xs text-[#F4A261] hover:underline flex items-center space-x-1 font-serif-sc"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>清空足迹</span>
              </button>
            )}
          </div>

          {historyList.length === 0 ? (
            <div className="py-10 text-center bg-[#1A2E26] rounded-2xl border border-[#2B4438] space-y-1.5">
              <History className="w-6 h-6 mx-auto text-[#AEC0B7]" />
              <div className="text-xs text-[#AEC0B7] font-serif-sc">
                暂无研习足迹
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {historyList.map((h) => (
                <div
                  key={h.id}
                  onClick={() => {
                    triggerHaptic(15);
                    onNavigateToItem(h.type, h.targetId);
                  }}
                  className="bg-[#1A2E26] p-3.5 rounded-2xl border border-[#2B4438] hover:border-[#3E6654] shadow-2xs transition active:scale-[0.99] cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#13221C] border border-[#273F33] flex items-center justify-center text-[#52C997]">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold font-serif-sc text-white">
                        {h.title}
                      </h4>
                      <span className="text-[10px] text-[#AEC0B7] font-serif-sc">
                        {new Date(h.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-[#AEC0B7]" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* --- SECTION 3: BREW NOTES --- */}
      {activeSection === 'notes' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#AEC0B7] font-serif-sc">
              记录每次品饮水温、道数与口感心得
            </span>
            <button
              onClick={() => {
                triggerHaptic(15);
                setShowAddNoteModal(true);
              }}
              className="px-3 py-1 rounded-full bg-[#2E5B4B] text-white text-xs font-bold font-serif-sc flex items-center space-x-1 shadow-2xs active:scale-95 transition border border-[#52C997]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>记茶事</span>
            </button>
          </div>

          {notes.length === 0 ? (
            <div className="py-10 text-center bg-[#1A2E26] rounded-2xl border border-[#2B4438] space-y-1.5">
              <Sparkles className="w-6 h-6 mx-auto text-[#AEC0B7]" />
              <div className="text-xs text-[#AEC0B7] font-serif-sc">
                暂无品茶手记
              </div>
              <p className="text-[11px] text-[#AEC0B7]/80 font-serif-sc">
                点击上方“记茶事”，记录属于你的茶汤心语
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="bg-[#1A2E26] p-4 rounded-2xl border border-[#2B4438] shadow-2xs space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-base font-bold font-serif-sc text-white">
                          {note.teaName}
                        </span>
                        <div className="flex text-amber-400">
                          {Array.from({ length: note.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px] text-[#AEC0B7] font-serif-sc">
                        {note.date} · 器皿: {note.vessel} · 水温: {note.waterTemp}℃ · 出汤: {note.infusions}道
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        triggerHaptic(15);
                        handleDeleteNote(note.id);
                      }}
                      className="text-[#AEC0B7] hover:text-red-400 p-1"
                      title="删除笔记"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs text-[#E2E9E5] font-serif-sc leading-relaxed bg-[#13221C] p-2.5 rounded-xl border border-[#273F33]">
                    “{note.notes}”
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {note.flavorTags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-[#162A22] text-[#52C997] border border-[#2D4D3E] font-serif-sc"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* --- SECTION 4: SETTINGS --- */}
      {activeSection === 'settings' && (
        <div className="space-y-3.5">
          <div className="bg-[#1A2E26] p-4 rounded-2xl border border-[#2B4438] shadow-2xs space-y-3.5">
            <h3 className="text-xs font-bold text-white flex items-center font-serif-sc">
              <Settings className="w-3.5 h-3.5 mr-1.5 text-[#F4A261]" />
              偏好设置与体验
            </h3>

            {/* Sound Toggle */}
            <div className="flex items-center justify-between pt-1 font-serif-sc">
              <div>
                <div className="text-xs font-bold text-white">
                  冲泡梵钟音效
                </div>
                <div className="text-[10px] text-[#AEC0B7]">
                  倒计时结束时播放静心铜磬提示音
                </div>
              </div>
              <button
                onClick={() => {
                  triggerHaptic(15);
                  onUpdateSettings({ soundEnabled: !appSettings.soundEnabled });
                }}
                className={`w-10 h-5.5 rounded-full transition p-0.5 flex items-center ${
                  appSettings.soundEnabled ? 'bg-[#2E5B4B] justify-end border border-[#52C997]' : 'bg-[#13221C] border border-[#273F33] justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-2xs" />
              </button>
            </div>

            {/* Haptic Toggle */}
            <div className="flex items-center justify-between border-t border-[#273F33] pt-2.5 font-serif-sc">
              <div>
                <div className="text-xs font-bold text-white">
                  触感反馈
                </div>
                <div className="text-[10px] text-[#AEC0B7]">
                  操作按键轻微触感震动
                </div>
              </div>
              <button
                onClick={() => {
                  triggerHaptic(15);
                  onUpdateSettings({ enableVibration: !appSettings.enableVibration });
                }}
                className={`w-10 h-5.5 rounded-full transition p-0.5 flex items-center ${
                  appSettings.enableVibration ? 'bg-[#2E5B4B] justify-end border border-[#52C997]' : 'bg-[#13221C] border border-[#273F33] justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-2xs" />
              </button>
            </div>
          </div>

          {/* Privacy Policy Entry */}
          <div className="bg-[#1A2E26] p-4 rounded-2xl border border-[#2B4438] shadow-2xs">
            <button
              onClick={() => {
                triggerHaptic(15);
                setShowPrivacyModal(true);
              }}
              className="w-full flex items-center justify-between text-left group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-[#243F34] text-[#52C997] border border-[#3E6654] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-serif-sc group-hover:text-[#52C997] transition">
                    隐私政策
                  </div>
                  <div className="text-[10px] text-[#AEC0B7] font-serif-sc">
                    查看个人信息保护与本地数据安全说明
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#AEC0B7] group-hover:text-white transition shrink-0" />
            </button>
          </div>

          {/* Storage & Offline Stats */}
          <div className="bg-[#1A2E26] p-4 rounded-2xl border border-[#2B4438] shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white flex items-center font-serif-sc">
                <HardDrive className="w-3.5 h-3.5 mr-1.5 text-[#F4A261]" />
                本地离线存储统计
              </h3>
              <span className="text-xs font-mono text-[#52C997]">
                约 {storageStats.usageKb} KB
              </span>
            </div>
            <div className="text-[11px] text-[#AEC0B7] font-serif-sc space-y-0.5">
              <div>• 已收藏条目：{storageStats.bookmarkCount} 条</div>
              <div>• 研习足迹：{storageStats.historyCount} 条</div>
              <div>• 泡茶笔记：{storageStats.noteCount} 篇</div>
            </div>
            <button
              onClick={handleClearCache}
              className="w-full py-2 rounded-xl border border-red-800 text-red-300 text-xs font-medium hover:bg-red-950/40 transition font-serif-sc"
            >
              清空离线存储与重置
            </button>
          </div>

          {/* About App */}
          <div className="bg-[#13221C] p-4 rounded-2xl border border-[#273F33] text-center space-y-1 font-serif-sc">
            <div className="font-bold text-xs text-[#F4A261]">
              知茗茶道
            </div>
            <div className="text-[10px] text-[#AEC0B7] font-mono">
              包名：com.zhimingchadao.app · 版本：v1.0
            </div>
            <p className="text-[11px] text-[#CBE0D6] leading-relaxed max-w-xs mx-auto pt-0.5">
              以茶静心，器以载道。随时随地研习中国茶之美。
            </p>
          </div>
        </div>
      )}

      {/* Add New Note Modal */}
      {showAddNoteModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
          <div className="w-full max-w-md bg-[#16251F] rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-[#2B4438] max-h-[85vh] overflow-y-auto no-scrollbar font-serif-sc space-y-3.5">
            <div className="flex items-center justify-between border-b border-[#273F33] pb-2.5">
              <h3 className="text-sm font-bold text-white">
                记录一次品茗手记
              </h3>
              <button
                onClick={() => setShowAddNoteModal(false)}
                className="text-[#AEC0B7] hover:text-white text-sm p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveNewNote} className="space-y-3 text-xs font-serif-sc">
              <div>
                <label className="font-bold text-white block mb-1">
                  茶叶名称 *
                </label>
                <input
                  type="text"
                  required
                  value={noteTeaName}
                  onChange={(e) => setNoteTeaName(e.target.value)}
                  placeholder="例如：安吉白茶、正山小种、肉桂"
                  className="w-full p-2.5 rounded-xl border border-[#273F33] bg-[#13221C] text-white placeholder-[#849188] focus:outline-none focus:border-[#52C997]"
                />
              </div>

              <div>
                <label className="font-bold text-white block mb-1">
                  茶具与器皿
                </label>
                <input
                  type="text"
                  value={noteVessel}
                  onChange={(e) => setNoteVessel(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#273F33] bg-[#13221C] text-white placeholder-[#849188] focus:outline-none focus:border-[#52C997]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="font-bold text-white block mb-1">
                    冲泡水温 (℃)
                  </label>
                  <input
                    type="number"
                    value={noteTemp}
                    onChange={(e) => setNoteTemp(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-[#273F33] bg-[#13221C] text-white font-mono focus:outline-none focus:border-[#52C997]"
                  />
                </div>
                <div>
                  <label className="font-bold text-white block mb-1">
                    冲泡道数
                  </label>
                  <input
                    type="number"
                    value={noteInfusions}
                    onChange={(e) => setNoteInfusions(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-[#273F33] bg-[#13221C] text-white font-mono focus:outline-none focus:border-[#52C997]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-white block mb-1">
                  口感评分 ({noteRating} 星)
                </label>
                <div className="flex space-x-1.5 text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNoteRating(star)}
                      className="p-1"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= noteRating ? 'fill-current' : 'text-stone-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-white block mb-1">
                  品饮心得感悟
                </label>
                <textarea
                  rows={3}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="香气、回甘、喉韵以及品茶时的心境..."
                  className="w-full p-2.5 rounded-xl border border-[#273F33] bg-[#13221C] text-white placeholder-[#849188] focus:outline-none focus:border-[#52C997]"
                />
              </div>

              <div>
                <label className="font-bold text-white block mb-1">
                  风味标签（逗号分隔）
                </label>
                <input
                  type="text"
                  value={noteTags}
                  onChange={(e) => setNoteTags(e.target.value)}
                  placeholder="花果香, 舌底生津, 顺滑"
                  className="w-full p-2.5 rounded-xl border border-[#273F33] bg-[#13221C] text-white placeholder-[#849188] focus:outline-none focus:border-[#52C997]"
                />
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full bg-[#2E5B4B] text-white font-bold font-serif-sc shadow-xs active:scale-98 transition text-xs hover:bg-[#3B725E] border border-[#3E7461]"
                >
                  保存入册
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <PrivacyPolicyModal onClose={() => setShowPrivacyModal(false)} />
      )}
    </div>
  );
};
