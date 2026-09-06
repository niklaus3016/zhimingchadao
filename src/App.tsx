import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { BottomNav, MainTab } from './components/common/BottomNav';
import { HomeView } from './components/home/HomeView';
import { BrewView } from './components/brew/BrewView';
import { TeawareView } from './components/teaware/TeawareView';
import { ProfileView } from './components/profile/ProfileView';

import { TeaDetailModal } from './components/home/TeaDetailModal';
import { CultureDetailModal } from './components/home/CultureDetailModal';
import { DailyQuoteModal } from './components/extra/DailyQuoteModal';
import { TeaIdentifyModal } from './components/extra/TeaIdentifyModal';
import { SolarTermModal } from './components/extra/SolarTermModal';

import { TeaItem, CultureTopic, TeaSpiritItem, AppSettings, TeaCategory } from './types';
import { TEA_ITEMS } from './data/teaData';
import { CULTURE_TOPICS, TEA_SPIRIT_LIST } from './data/cultureData';
import { StartupConsentModal } from './components/consent/StartupConsentModal';
import {
  getAppSettings,
  saveAppSettings,
  getCustomAppBg,
  getBookmarks,
  triggerHaptic,
  isConsentAgreed,
  saveConsentAgreement,
  SUCI_XUEMO_BG
} from './utils/storage';

export default function App() {
  // 启动门禁：未同意《用户服务协议》与《隐私政策》前不进入主应用
  const [consented, setConsented] = useState<boolean>(() => isConsentAgreed());
  const [currentTab, setCurrentTab] = useState<MainTab>('home');
  const [appSettings, setAppSettings] = useState<AppSettings>(getAppSettings());
  const [customBg] = useState<string>(() => getCustomAppBg() || SUCI_XUEMO_BG);

  // Modal States
  const [selectedTea, setSelectedTea] = useState<TeaItem | null>(null);
  const [selectedCulture, setSelectedCulture] = useState<CultureTopic | null>(null);
  const [selectedSpirit, setSelectedSpirit] = useState<TeaSpiritItem | null>(null);

  const [showDailyQuote, setShowDailyQuote] = useState(false);
  const [showIdentify, setShowIdentify] = useState(false);
  const [showSolarTerm, setShowSolarTerm] = useState(false);

  // Cross-Navigation to Brew View
  const [brewInitialCategory, setBrewInitialCategory] = useState<TeaCategory>('green');
  const [brewInitialTeaName, setBrewInitialTeaName] = useState<string | undefined>();

  // Bookmarks count for badge
  const [bookmarkCount, setBookmarkCount] = useState<number>(() => getBookmarks().length);

  // Update Settings
  const handleUpdateSettings = (newSettings: Partial<AppSettings>) => {
    const updated = saveAppSettings(newSettings);
    setAppSettings(updated);
  };

  // Start brew from tea card or tea modal
  const handleStartBrewingWithTea = (tea: TeaItem) => {
    setSelectedTea(null);
    setBrewInitialCategory(tea.category);
    setBrewInitialTeaName(tea.name);
    setCurrentTab('brew');
    triggerHaptic(25);
  };

  // Profile history/bookmark click
  const handleNavigateFromProfile = (type: string, targetId: string) => {
    if (type === 'tea') {
      const found = TEA_ITEMS.find((t) => t.id === targetId);
      if (found) setSelectedTea(found);
    } else if (type === 'culture') {
      if (targetId.startsWith('spirit_')) {
        const char = targetId.replace('spirit_', '');
        const sp = TEA_SPIRIT_LIST.find((s) => s.character === char);
        if (sp) setSelectedSpirit(sp);
      } else {
        const cult = CULTURE_TOPICS.find((c) => c.id === targetId);
        if (cult) setSelectedCulture(cult);
      }
    } else if (type === 'brew') {
      setCurrentTab('brew');
    } else if (type === 'teaware') {
      setCurrentTab('teaware');
    }
  };

  const fontSizeClass =
    appSettings.fontSize === 'huge'
      ? 'text-base'
      : appSettings.fontSize === 'large'
      ? 'text-sm'
      : 'text-xs';

  // 未同意协议：仅渲染同意闭环弹窗
  if (!consented) {
    return (
      <div className="min-h-screen bg-[#0F1C17]">
        <StartupConsentModal
          onAgree={() => {
            saveConsentAgreement();
            triggerHaptic(30);
            setConsented(true);
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${fontSizeClass} transition-colors duration-200 antialiased flex flex-col justify-between selection:bg-[#2E5B4B] selection:text-white overflow-x-hidden text-[#E2E9E5]`}
      style={{
        background: customBg
      }}
    >
      {/* Mobile App Container */}
      <div className="w-full max-w-md sm:max-w-lg mx-auto min-h-screen flex flex-col relative bg-transparent">
        {/* Top App Bar */}
        <Header
          onOpenDailyQuote={() => setShowDailyQuote(true)}
          onOpenIdentify={() => setShowIdentify(true)}
          onOpenSolarTerm={() => setShowSolarTerm(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          {currentTab === 'home' && (
            <HomeView
              onSelectTea={(tea) => setSelectedTea(tea)}
              onSelectCulture={(topic) => setSelectedCulture(topic)}
              onSelectSpirit={(spirit) => setSelectedSpirit(spirit)}
              onOpenDailyQuote={() => setShowDailyQuote(true)}
              onOpenIdentify={() => setShowIdentify(true)}
              onOpenSolarTerm={() => setShowSolarTerm(true)}
              onStartBrewingWithTea={handleStartBrewingWithTea}
            />
          )}

          {currentTab === 'brew' && (
            <BrewView
              initialTeaCategory={brewInitialCategory}
              initialTeaName={brewInitialTeaName}
            />
          )}

          {currentTab === 'teaware' && <TeawareView />}

          {currentTab === 'profile' && (
            <ProfileView
              onNavigateToItem={handleNavigateFromProfile}
              appSettings={appSettings}
              onUpdateSettings={handleUpdateSettings}
            />
          )}
        </main>

        {/* 4-Tab Bottom Navigation Bar */}
        <BottomNav
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            setBookmarkCount(getBookmarks().length);
          }}
          savedCount={bookmarkCount}
        />
      </div>

      {/* --- MODALS & OVERLAYS --- */}
      {selectedTea && (
        <TeaDetailModal
          tea={selectedTea}
          onClose={() => {
            setSelectedTea(null);
            setBookmarkCount(getBookmarks().length);
          }}
          onStartBrewing={handleStartBrewingWithTea}
        />
      )}

      {(selectedCulture || selectedSpirit) && (
        <CultureDetailModal
          topic={selectedCulture}
          spirit={selectedSpirit}
          onClose={() => {
            setSelectedCulture(null);
            setSelectedSpirit(null);
            setBookmarkCount(getBookmarks().length);
          }}
        />
      )}

      {showDailyQuote && (
        <DailyQuoteModal onClose={() => setShowDailyQuote(false)} />
      )}

      {showIdentify && (
        <TeaIdentifyModal onClose={() => setShowIdentify(false)} />
      )}

      {showSolarTerm && (
        <SolarTermModal onClose={() => setShowSolarTerm(false)} />
      )}
    </div>
  );
}
