import React, { useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { ShieldCheck, ShieldAlert, RotateCcw, LogOut } from 'lucide-react';
import { triggerHaptic } from '../../utils/storage';
import { PrivacyPolicyContent, UserAgreementContent } from './LegalContent';
import { LegalDocModal } from './LegalDocModal';

interface StartupConsentModalProps {
  /** 用户点击「同意并继续」后回调（由 App 写入同意状态并进入主界面） */
  onAgree: () => void;
}

type LegalView = 'privacy' | 'agreement' | null;

/**
 * 启动时的《用户服务协议》与《隐私政策》同意闭环：
 * 同意弹窗（z-50）→ 全文弹窗（z-[110]）→ 拒绝确认（z-[110]）→ 拒绝阻断屏（z-[120]）
 */
export const StartupConsentModal: React.FC<StartupConsentModalProps> = ({ onAgree }) => {
  const [legalView, setLegalView] = useState<LegalView>(null);
  const [showDeclineConfirm, setShowDeclineConfirm] = useState(false);
  const [declined, setDeclined] = useState(false);
  const [exitFailed, setExitFailed] = useState(false);

  // 拒绝后退出：原生端调用 Capacitor App.exitApp()，Web 端尝试 window.close()
  const handleExitApp = async () => {
    triggerHaptic(20);
    try {
      if (Capacitor.isNativePlatform()) {
        const { App } = await import('@capacitor/app');
        await App.exitApp();
        return;
      }
      window.close();
      setExitFailed(true);
    } catch {
      setExitFailed(true);
    }
  };

  // 拒绝后的阻断屏：不同意则无法使用本应用
  if (declined) {
    return (
      <div className="fixed inset-0 z-120 bg-[#0F1C17] flex items-center justify-center p-6 font-serif-sc text-[#E2E9E5] animate-in fade-in">
        <div className="max-w-sm w-full text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#2C1C19] border border-[#502820] text-[#FF8577] flex items-center justify-center">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h2 className="text-base font-bold text-white">您已拒绝《用户服务协议》与《隐私政策》</h2>
            <p className="text-xs text-[#AEC0B7] leading-relaxed">
              仅当您阅读并同意上述协议后，方可使用知茗茶道。拒绝后将无法进入应用。
            </p>
            {exitFailed && (
              <p className="text-[11px] text-[#FF8577]">自动退出未成功，请您手动关闭本应用。</p>
            )}
          </div>
          <div className="flex space-x-2.5 pt-1">
            <button
              onClick={() => {
                triggerHaptic(15);
                setDeclined(false);
                setExitFailed(false);
              }}
              className="flex-1 py-2.5 rounded-full border border-[#3E6654] text-[#CBE0D6] text-xs font-bold hover:bg-[#1A2E26] transition flex items-center justify-center"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              重新阅读并同意
            </button>
            <button
              onClick={handleExitApp}
              className="flex-1 py-2.5 rounded-full bg-[#2C1C19] border border-[#502820] text-[#FF8577] text-xs font-bold hover:bg-[#3A2521] transition flex items-center justify-center"
            >
              <LogOut className="w-3.5 h-3.5 mr-1" />
              退出应用
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ===== 1. 同意弹窗 ===== */}
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 font-serif-sc animate-in fade-in">
        <div className="bg-[#16251F] w-full max-w-sm shadow-2xl border border-[#2B4438] rounded-3xl overflow-hidden flex flex-col max-h-[88vh]">
          <div className="p-5 overflow-y-auto no-scrollbar">
            <div className="flex flex-col items-center text-center mb-4">
              <div className="w-11 h-11 rounded-2xl bg-[#243F34] text-[#52C997] border border-[#3E6654] flex items-center justify-center mb-2.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">用户协议与隐私政策</h3>
              <p className="text-[10px] text-[#AEC0B7] mt-1">知茗茶道 · 2026年9月6日生效</p>
            </div>

            <div className="space-y-3 mb-4">
              <p className="text-[13px] text-[#E2E9E5] leading-7 flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F4A261] mr-2 mt-3 shrink-0" />
                (1)《隐私政策》中关于信息收集与使用的说明——本应用为纯本地离线应用，茶事记录仅存于您的设备。
              </p>
              <p className="text-[13px] text-[#E2E9E5] leading-7 flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F4A261] mr-2 mt-3 shrink-0" />
                (2)《隐私政策》中关于设备权限使用的说明——本应用仅使用网络（加载字体）与振动（触感反馈）权限。
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#13221C] border border-[#273F33]">
              <p className="text-[12px] text-[#AEC0B7] leading-7">
                阅读完整的
                <span
                  onClick={() => {
                    triggerHaptic(10);
                    setLegalView('agreement');
                  }}
                  className="text-[#52C997] hover:underline cursor-pointer font-bold"
                >
                  《用户服务协议》
                </span>
                和
                <span
                  onClick={() => {
                    triggerHaptic(10);
                    setLegalView('privacy');
                  }}
                  className="text-[#52C997] hover:underline cursor-pointer font-bold"
                >
                  《隐私政策》
                </span>
                了解详细内容。
              </p>
            </div>
          </div>

          <div className="flex border-t border-[#273F33] shrink-0">
            <button
              onClick={() => {
                triggerHaptic(15);
                setShowDeclineConfirm(true);
              }}
              className="flex-1 py-3.5 text-sm font-medium text-[#AEC0B7] hover:text-white border-r border-[#273F33] hover:bg-[#13221C] transition-colors"
            >
              不同意
            </button>
            <button
              onClick={() => {
                triggerHaptic(25);
                onAgree();
              }}
              className="flex-1 py-3.5 text-sm font-bold text-white bg-[#2E5B4B] hover:bg-[#3B725E] transition-colors"
            >
              同意并继续
            </button>
          </div>
        </div>
      </div>

      {/* ===== 2. 协议全文弹窗（与「我的-隐私政策」共用同一外壳与内容） ===== */}
      {legalView && (
        <LegalDocModal
          title={legalView === 'privacy' ? '隐私政策' : '用户服务协议'}
          onClose={() => {
            triggerHaptic(15);
            setLegalView(null);
          }}
        >
          {legalView === 'privacy' ? <PrivacyPolicyContent /> : <UserAgreementContent />}
        </LegalDocModal>
      )}

      {/* ===== 3. 拒绝确认弹窗 ===== */}
      {showDeclineConfirm && (
        <div className="fixed inset-0 z-110 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 font-serif-sc animate-in fade-in">
          <div className="bg-[#16251F] rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-[#2B4438] flex flex-col">
            <div className="p-5 text-center">
              <div className="w-11 h-11 mx-auto rounded-2xl bg-[#2C1C19] text-[#FF8577] border border-[#502820] flex items-center justify-center mb-3">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-white mb-2">确认拒绝</h2>
              <p className="text-xs text-[#AEC0B7] leading-relaxed">
                仅当您同意《用户服务协议》与《隐私政策》后，才能使用知茗茶道。您确定要拒绝吗？
              </p>
            </div>
            <div className="flex border-t border-[#273F33]">
              <button
                onClick={() => {
                  triggerHaptic(10);
                  setShowDeclineConfirm(false);
                }}
                className="flex-1 py-3.5 text-sm font-medium text-[#CBE0D6] hover:bg-[#13221C] transition-colors border-r border-[#273F33]"
              >
                取消
              </button>
              <button
                onClick={() => {
                  triggerHaptic(25);
                  setShowDeclineConfirm(false);
                  setDeclined(true);
                }}
                className="flex-1 py-3.5 text-sm font-bold text-[#FF8577] hover:bg-[#2C1C19] transition-colors"
              >
                确定拒绝
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
