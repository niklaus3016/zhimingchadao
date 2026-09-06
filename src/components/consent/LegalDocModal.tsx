import React from 'react';
import { X, ScrollText } from 'lucide-react';
import { triggerHaptic } from '../../utils/storage';

interface LegalDocModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * 协议全文统一弹窗外壳（启动同意弹窗与「我的-隐私政策」共用，保证视觉与内容完全一致）。
 */
export const LegalDocModal: React.FC<LegalDocModalProps> = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 z-110 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 font-serif-sc animate-in fade-in">
      <div className="bg-[#16251F] rounded-3xl w-full max-w-2xl h-[85vh] overflow-hidden shadow-2xl border border-[#2B4438] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-[#273F33] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#243F34] text-[#52C997] rounded-xl border border-[#3E6654] flex items-center justify-center">
              <ScrollText className="w-4.5 h-4.5" />
            </div>
            <h2 className="text-sm font-bold text-white">{title}</h2>
          </div>
          <button
            onClick={() => {
              triggerHaptic(15);
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#13221C] border border-[#273F33] flex items-center justify-center text-[#AEC0B7] active:scale-90 transition hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 sm:p-5 bg-[#0F1C17]">
          {children}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-[#273F33] shrink-0">
          <button
            onClick={() => {
              triggerHaptic(15);
              onClose();
            }}
            className="w-full py-2.5 rounded-full bg-[#2E5B4B] hover:bg-[#3B725E] text-white font-bold text-xs shadow-xs active:scale-98 transition border border-[#3E7461]"
          >
            我已阅读
          </button>
        </div>
      </div>
    </div>
  );
};
