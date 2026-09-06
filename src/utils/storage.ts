import { UserBookmark, UserHistoryItem, BrewNote, AppSettings } from '../types';

const STORAGE_KEYS = {
  BOOKMARKS: 'zhiming_tea_bookmarks_v1',
  HISTORY: 'zhiming_tea_history_v1',
  BREW_NOTES: 'zhiming_tea_brewnotes_v1',
  CHECK_IN: 'zhiming_tea_checkin_v1',
  SETTINGS: 'zhiming_tea_settings_v1',
  CUSTOM_BG: 'zhiming_tea_custom_bg_v1',
  CONSENT: 'zhiming_tea_consent_v1'
};

// 用户协议与隐私政策当前版本（政策内容更新时同步修改此日期，将强制用户重新阅读并同意）
export const CONSENT_VERSION = '2026-09-06';

export function isConsentAgreed(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CONSENT);
    if (!raw) return false;
    const rec = JSON.parse(raw) as { version?: string };
    return rec.version === CONSENT_VERSION;
  } catch {
    return false;
  }
}

export function saveConsentAgreement(): void {
  try {
    localStorage.setItem(
      STORAGE_KEYS.CONSENT,
      JSON.stringify({ version: CONSENT_VERSION, agreedAt: Date.now() })
    );
  } catch {
    // Ignore storage errors
  }
}

export const DEFAULT_SETTINGS: AppSettings = {
  fontSize: 'normal',
  soundEnabled: true,
  enableVibration: true
};

// 本地时区日期字符串（YYYY-MM-DD），避免 toISOString() 的 UTC 偏移问题
function getLocalDateStr(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// Haptic feedback
export function triggerHaptic(duration = 20) {
  try {
    const settings = getAppSettings();
    if (settings.enableVibration && typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(duration);
    }
  } catch {
    // Ignore haptic errors on unsupported devices
  }
}

// Bookmarks
export function getBookmarks(): UserBookmark[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleBookmark(bookmark: Omit<UserBookmark, 'id' | 'timestamp'>): boolean {
  try {
    const list = getBookmarks();
    const existingIndex = list.findIndex(
      (b) => b.targetId === bookmark.targetId && b.type === bookmark.type
    );
    let isBookmarked = false;
    if (existingIndex >= 0) {
      list.splice(existingIndex, 1);
      isBookmarked = false;
    } else {
      list.unshift({
        ...bookmark,
        id: `bm_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        timestamp: Date.now()
      });
      isBookmarked = true;
    }
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(list));
    triggerHaptic(25);
    return isBookmarked;
  } catch {
    return false;
  }
}

export function isItemBookmarked(targetId: string, type: UserBookmark['type']): boolean {
  const list = getBookmarks();
  return list.some((b) => b.targetId === targetId && b.type === type);
}

// History
export function getHistory(): UserHistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addHistoryRecord(item: Omit<UserHistoryItem, 'id' | 'timestamp'>) {
  try {
    let list = getHistory();
    list = list.filter((h) => !(h.targetId === item.targetId && h.type === item.type));
    list.unshift({
      ...item,
      id: `hist_${Date.now()}`,
      timestamp: Date.now()
    });
    // Keep max 50 recent records
    if (list.length > 50) list = list.slice(0, 50);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(list));
  } catch {
    // Ignore storage write error
  }
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEYS.HISTORY);
  triggerHaptic(30);
}

// Brew Notes (Tasting Journal)
export function getBrewNotes(): BrewNote[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BREW_NOTES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveBrewNote(note: Omit<BrewNote, 'id' | 'date'> & { date?: string }): BrewNote {
  const list = getBrewNotes();
  const newNote: BrewNote = {
    ...note,
    id: `note_${Date.now()}`,
    date: note.date || new Date().toISOString().split('T')[0]
  };
  list.unshift(newNote);
  localStorage.setItem(STORAGE_KEYS.BREW_NOTES, JSON.stringify(list));
  triggerHaptic(35);
  return newNote;
}

export function deleteBrewNote(id: string) {
  const list = getBrewNotes().filter((n) => n.id !== id);
  localStorage.setItem(STORAGE_KEYS.BREW_NOTES, JSON.stringify(list));
  triggerHaptic(20);
}

// Check-in
export interface CheckInStatus {
  totalDays: number;
  streakDays: number;
  lastDate: string;
  historyDates: string[];
}

export function getCheckInStatus(): CheckInStatus {
  const empty: CheckInStatus = { totalDays: 0, streakDays: 0, lastDate: '', historyDates: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CHECK_IN);
    return raw ? { ...empty, ...JSON.parse(raw) } : empty;
  } catch {
    return empty;
  }
}

export function performDailyCheckIn(): { success: boolean; message: string; streak: number } {
  const today = getLocalDateStr();
  const status = getCheckInStatus();

  if (status.lastDate === today) {
    return { success: false, message: '今日已完成茶语静心打卡', streak: status.streakDays };
  }

  // Check if consecutive（按本地时区计算昨天）
  const yesterday = getLocalDateStr(new Date(Date.now() - 86400000));
  const isConsecutive = status.lastDate === yesterday;
  const newStreak = isConsecutive ? status.streakDays + 1 : 1;
  const newTotal = status.totalDays + 1;

  const newStatus: CheckInStatus = {
    totalDays: newTotal,
    streakDays: newStreak,
    lastDate: today,
    historyDates: [...new Set([...status.historyDates, today])]
  };

  localStorage.setItem(STORAGE_KEYS.CHECK_IN, JSON.stringify(newStatus));
  triggerHaptic(50);
  return { success: true, message: `打卡成功！已连续打卡 ${newStreak} 天`, streak: newStreak };
}

// Settings
export function getAppSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveAppSettings(settings: Partial<AppSettings>) {
  const current = getAppSettings();
  const updated = { ...current, ...settings };
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
  return updated;
}

export const SUCI_XUEMO_BG = 'linear-gradient(135deg, #182B24 0%, #223D34 50%, #13221C 100%)';

// App background wallpaper
export function getCustomAppBg(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_BG);
    return saved || SUCI_XUEMO_BG;
  } catch {
    return SUCI_XUEMO_BG;
  }
}

export function setCustomAppBg(bg: string | null) {
  try {
    if (bg) {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_BG, bg);
    } else {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_BG, SUCI_XUEMO_BG);
    }
  } catch {
    // Ignore storage write errors
  }
  triggerHaptic(20);
}

// Cache stats & clear
export function getStorageStats(): { usageKb: number; bookmarkCount: number; historyCount: number; noteCount: number } {
  let totalChars = 0;
  for (const k of Object.values(STORAGE_KEYS)) {
    const val = localStorage.getItem(k);
    if (val) totalChars += val.length;
  }
  return {
    usageKb: Math.round((totalChars * 2) / 1024 * 10) / 10,
    bookmarkCount: getBookmarks().length,
    historyCount: getHistory().length,
    noteCount: getBrewNotes().length
  };
}

export function resetAllUserCache() {
  for (const k of Object.values(STORAGE_KEYS)) {
    localStorage.removeItem(k);
  }
  triggerHaptic(50);
}
