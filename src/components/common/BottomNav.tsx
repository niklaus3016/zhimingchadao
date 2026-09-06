import React from 'react';
import { BookOpen, Flame, CupSoda, User } from 'lucide-react';
import { triggerHaptic } from '../../utils/storage';

export type MainTab = 'home' | 'brew' | 'teaware' | 'profile';

interface BottomNavProps {
  currentTab: MainTab;
  onSelectTab: (tab: MainTab) => void;
  savedCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  savedCount = 0
}) => {
  const tabs = [
    {
      id: 'home' as MainTab,
      label: '茶百科',
      icon: BookOpen
    },
    {
      id: 'brew' as MainTab,
      label: '功夫实操',
      icon: Flame
    },
    {
      id: 'teaware' as MainTab,
      label: '器具图鉴',
      icon: CupSoda
    },
    {
      id: 'profile' as MainTab,
      label: '我的',
      icon: User,
      badge: savedCount > 0 ? savedCount : undefined
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#13221C]/95 backdrop-blur-xl border-t border-[#23382F] pb-[max(env(safe-area-inset-bottom),8px)] pt-2 transition-colors">
      <div className="max-w-md sm:max-w-lg mx-auto px-4 flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                triggerHaptic(20);
                onSelectTab(tab.id);
              }}
              className={`flex-1 py-1 flex flex-col items-center justify-center relative transition-all duration-150 active:scale-95 ${
                isActive
                  ? 'text-[#52C997]'
                  : 'text-[#9EB2A7] hover:text-white'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                  }`}
                />

                {tab.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2 px-1 min-w-[14px] h-[14px] rounded-full bg-[#E76F51] text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                    {tab.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[11px] mt-1 tracking-wider font-serif-sc ${
                  isActive
                    ? 'font-bold text-[#52C997]'
                    : 'text-[#9EB2A7] font-medium'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
