import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Thermometer,
  CupSoda,
  Waves,
  Feather,
  Flame,
  Coffee,
  AlertCircle,
  Calculator
} from 'lucide-react';
import {
  BREW_GUIDES,
  BREW_TROUBLE_LIBRARY,
  calculateBrewParams
} from '../../data/brewData';
import { TeaCategory } from '../../types';
import { triggerHaptic, getAppSettings } from '../../utils/storage';

interface BrewViewProps {
  initialTeaCategory?: TeaCategory;
  initialTeaName?: string;
}

export const BrewView: React.FC<BrewViewProps> = ({
  initialTeaCategory = 'green',
  initialTeaName
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'guide' | 'calculator' | 'troubleshoot'>('guide');

  // Find matching guide or default to first
  const initialGuide =
    BREW_GUIDES.find((g) => g.category === initialTeaCategory) ||
    BREW_GUIDES[0];

  const [selectedGuideId, setSelectedGuideId] = useState<string>(initialGuide.id);
  const activeGuide = BREW_GUIDES.find((g) => g.id === selectedGuideId) || BREW_GUIDES[0];

  // If initialTeaName changed externally
  useEffect(() => {
    if (initialTeaCategory) {
      const match = BREW_GUIDES.find((g) => g.category === initialTeaCategory);
      if (match) setSelectedGuideId(match.id);
    }
  }, [initialTeaCategory, initialTeaName]);

  // Timer States
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(
    activeGuide.steps[0]?.durationSec || 15
  );
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [wakeLockActive, setWakeLockActive] = useState<boolean>(false);

  // Audio synth bell for completion
  const audioContextRef = useRef<AudioContext | null>(null);

  const playSingingBowlBell = () => {
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, ctx.currentTime); // 528Hz DNA/Zen frequency
      osc.frequency.exponentialRampToValueAtTime(264, ctx.currentTime + 2.5);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.5);
    } catch {
      // Ignore audio failure if autoplay policy blocks
    }
  };

  // Screen Wake Lock API
  useEffect(() => {
    let wakeLock: unknown = null;
    const requestWakeLock = async () => {
      if ('wakeLock' in navigator && isRunning) {
        try {
          wakeLock = await (navigator as unknown as { wakeLock: { request: (type: string) => Promise<unknown> } }).wakeLock.request('screen');
          setWakeLockActive(true);
        } catch {
          setWakeLockActive(false);
        }
      }
    };

    if (isRunning) {
      requestWakeLock();
    } else {
      setWakeLockActive(false);
    }

    return () => {
      if (wakeLock && typeof (wakeLock as { release: () => Promise<void> }).release === 'function') {
        (wakeLock as { release: () => Promise<void> }).release();
      }
    };
  }, [isRunning]);

  // Timer Tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            triggerHaptic(60);
            if (getAppSettings().soundEnabled) playSingingBowlBell();
            return 0;
          }
          return prev - 1;
        });
      }, 1000 / playbackSpeed);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsRemaining, playbackSpeed]);

  // Switch guide resets state
  const handleSelectGuide = (guide: typeof activeGuide) => {
    triggerHaptic(20);
    setSelectedGuideId(guide.id);
    setCurrentStepIndex(0);
    setSecondsRemaining(guide.steps[0]?.durationSec || 15);
    setIsRunning(false);
    setIsFinished(false);
  };

  const toggleTimer = () => {
    triggerHaptic(25);
    if (isFinished) {
      // Auto move next or restart
      if (currentStepIndex < activeGuide.steps.length - 1) {
        jumpToStep(currentStepIndex + 1);
        setIsRunning(true);
      } else {
        jumpToStep(0);
      }
      return;
    }
    setIsRunning((prev) => !prev);
  };

  const resetCurrentStep = () => {
    triggerHaptic(20);
    setIsRunning(false);
    setIsFinished(false);
    setSecondsRemaining(activeGuide.steps[currentStepIndex]?.durationSec || 15);
  };

  const jumpToStep = (index: number) => {
    triggerHaptic(20);
    setCurrentStepIndex(index);
    setSecondsRemaining(activeGuide.steps[index].durationSec);
    setIsRunning(false);
    setIsFinished(false);
  };

  // Calculator State
  const [calcCategory, setCalcCategory] = useState<TeaCategory>('oolong');
  const [vesselVolume, setVesselVolume] = useState<number>(120);
  const [peopleCount, setPeopleCount] = useState<number>(2);
  const calcResults = calculateBrewParams(calcCategory, vesselVolume, peopleCount);

  // Troubleshooting Filter
  const [troubleFilter, setTroubleFilter] = useState<string>('all');
  const filteredTroubles =
    troubleFilter === 'all'
      ? BREW_TROUBLE_LIBRARY
      : BREW_TROUBLE_LIBRARY.filter((item) => item.tag.includes(troubleFilter));

  const currentStep = activeGuide.steps[currentStepIndex];

  return (
    <div className="pb-28 pt-3 px-4 sm:px-5 max-w-md sm:max-w-lg mx-auto space-y-4 font-serif-sc text-[#E2E9E5]">
      {/* 1. Header & Sub-Tabs */}
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <span className="w-1.5 h-4 bg-[#52C997] rounded-full inline-block" />
          <h1 className="text-lg font-bold text-white tracking-tight">
            功夫实操导师
          </h1>
          <span className="text-[10px] text-[#F4A261] bg-[#F4A261]/20 border border-[#F4A261]/40 px-2 py-0.5 rounded-full font-bold">
            清心实操
          </span>
        </div>

        {/* 3 Sub-Tabs Pill */}
        <div className="flex bg-[#1A2E26] p-1 rounded-2xl border border-[#2B4438] shadow-2xs text-xs">
          {[
            { id: 'guide', label: '动作实操' },
            { id: 'calculator', label: '参数换算' },
            { id: 'troubleshoot', label: '避坑指引' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                triggerHaptic(15);
                setActiveSubTab(tab.id as typeof activeSubTab);
              }}
              className={`flex-1 py-1.5 rounded-xl font-bold transition ${
                activeSubTab === tab.id
                  ? 'bg-[#2E5B4B] text-white shadow-2xs border border-[#52C997]'
                  : 'text-[#AEC0B7] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* --- TAB 1: BREWING GUIDE --- */}
      {activeSubTab === 'guide' && (
        <div className="space-y-3.5">
          {/* Tea Category Horizontal Scroll */}
          <div className="flex space-x-1.5 overflow-x-auto pb-0.5 no-scrollbar">
            {BREW_GUIDES.map((g) => (
              <button
                key={g.id}
                onClick={() => handleSelectGuide(g)}
                className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition font-serif-sc ${
                  selectedGuideId === g.id
                    ? 'bg-[#2E5B4B] text-white font-bold shadow-2xs border border-[#52C997]'
                    : 'bg-[#1A2E26] text-[#CBE0D6] border border-[#2B4438] hover:border-[#3E6654]'
                }`}
              >
                {g.teaName.split('（')[0]}
              </button>
            ))}
          </div>

          {/* Quick Parameters Card */}
          <div className="bg-[#1A2E26] p-4 rounded-2xl border border-[#2B4438] shadow-xs">
            <div className="flex items-center justify-between mb-2.5">
              <div className="font-serif-sc font-bold text-sm text-white">
                {activeGuide.teaName}
              </div>
              <span className="text-[10px] text-[#F4A261] bg-[#F4A261]/20 border border-[#F4A261]/40 px-2 py-0.5 rounded-full font-bold">
                标准配比
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs font-sans-sc">
              <div className="bg-[#13221C] p-2.5 rounded-xl border border-[#273F33]">
                <Thermometer className="w-4 h-4 mx-auto text-[#F4A261] mb-1" />
                <div className="text-[#AEC0B7] text-[10px]">水温标准</div>
                <div className="font-bold text-white mt-0.5 font-serif-sc">
                  {activeGuide.waterTemp}℃
                </div>
              </div>
              <div className="bg-[#13221C] p-2.5 rounded-xl border border-[#273F33]">
                <CupSoda className="w-4 h-4 mx-auto text-[#52C997] mb-1" />
                <div className="text-[#AEC0B7] text-[10px]">投茶比例</div>
                <div className="font-bold text-white mt-0.5 font-serif-sc">
                  {activeGuide.teaWeightGrams}g / {activeGuide.waterVolumeMl}ml
                </div>
              </div>
              <div className="bg-[#13221C] p-2.5 rounded-xl border border-[#273F33]">
                <Waves className="w-4 h-4 mx-auto text-[#52C997] mb-1" />
                <div className="text-[#AEC0B7] text-[10px]">醒茶建议</div>
                <div className="font-bold text-white mt-0.5 font-serif-sc">
                  {activeGuide.washRounds > 0 ? `醒茶${activeGuide.washRounds}道` : '免洗茶'}
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#AEC0B7] mt-2.5 font-serif-sc">
              器具建议：{activeGuide.recommendedVessel}
            </p>
          </div>

          {/* Brewing Reference Card: water / wash / infusion schedule */}
          <div className="bg-[#1A2E26] p-4 rounded-2xl border border-[#2B4438] shadow-xs space-y-2.5">
            <div className="text-xs font-bold text-[#52C997] flex items-center font-serif-sc">
              <Waves className="w-3.5 h-3.5 mr-1" />
              冲泡参考
            </div>
            <div className="p-2.5 rounded-xl bg-[#13221C] border border-[#273F33] text-[11px] font-serif-sc leading-relaxed">
              <span className="font-bold text-[#F4A261]">【用水】</span>
              <span className="text-[#E2E9E5]">{activeGuide.waterType}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#13221C] border border-[#273F33] text-[11px] font-serif-sc leading-relaxed">
              <span className="font-bold text-[#F4A261]">【醒茶】</span>
              <span className="text-[#E2E9E5]">{activeGuide.washTeaTip}</span>
            </div>
            <div className="pt-1">
              <div className="text-[11px] font-bold text-white mb-1.5 font-serif-sc">
                各泡出汤参考秒数（逐泡递增）：
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeGuide.infusionTimesSec.map((sec, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded-lg bg-[#13221C] border border-[#273F33] text-[10px] font-mono text-[#CBE0D6]"
                  >
                    {i + 1}泡 · <span className="text-[#52C997] font-bold">{sec}s</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Brewing Stage */}
          <div className="bg-[#1A2E26] rounded-3xl p-5 border border-[#2B4438] shadow-sm relative overflow-hidden text-center">
            {/* Ambient light ring */}
            <div className="flex items-center justify-between text-xs mb-2 text-[#AEC0B7] font-serif-sc">
              <span>
                步骤 {currentStepIndex + 1} / {activeGuide.steps.length}
              </span>
              <span className="bg-[#243F34] text-[#52C997] border border-[#3E6654] px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                {wakeLockActive ? '屏幕常亮中' : '分步演示'}
              </span>
            </div>

            {/* Action Illustration Ring */}
            <div className="py-2 relative">
              <div
                className={`w-24 h-24 mx-auto rounded-full border-2 border-[#52C997]/30 flex items-center justify-center relative bg-[#13221C] ${
                  isRunning ? 'border-[#52C997] shadow-lg shadow-[#52C997]/20' : ''
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-[#1E372D] flex items-center justify-center text-[#52C997]">
                  {currentStep?.actionName === '温具' && <CupSoda className="w-8 h-8" />}
                  {currentStep?.actionName === '投茶' && <Feather className="w-8 h-8" />}
                  {currentStep?.actionName === '润茶/洗茶' && <Waves className="w-8 h-8" />}
                  {currentStep?.actionName === '注水' && <Flame className="w-8 h-8 text-[#F4A261]" />}
                  {currentStep?.actionName === '出汤' && <Coffee className="w-8 h-8 text-[#F4A261]" />}
                  {currentStep?.actionName === '分茶品茗' && <Sparkles className="w-8 h-8 text-[#F4A261]" />}
                </div>

                {isRunning && (
                  <div className="absolute inset-0 rounded-full border border-[#52C997]/50 animate-ping pointer-events-none" />
                )}
              </div>

              <div className="mt-3">
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#F4A261]/20 text-[#F4A261] border border-[#F4A261]/40 font-bold">
                  {currentStep?.actionName}
                </span>
                <h3 className="text-lg font-bold font-serif-sc mt-1.5 text-white">
                  {currentStep?.title}
                </h3>
                <p className="text-xs text-[#AEC0B7] mt-0.5 max-w-xs mx-auto">
                  {currentStep?.subTitle}
                </p>
              </div>

              {/* Countdown */}
              <div className="mt-3 font-mono font-bold text-4xl text-[#52C997] tracking-wider drop-shadow-xs">
                {String(Math.floor(secondsRemaining / 60)).padStart(2, '0')}:
                {String(secondsRemaining % 60).padStart(2, '0')}
              </div>
              <div className="text-[10px] text-[#AEC0B7] mt-1 font-serif-sc">
                {isRunning ? '动作计时中 · 梵钟提示' : isFinished ? '本步已完成！' : '点击启动计时实操'}
              </div>
            </div>

            {/* Timer Controls */}
            <div className="mt-3 pt-3 border-t border-[#273F33] flex items-center justify-between">
              <button
                onClick={() => {
                  triggerHaptic(15);
                  setPlaybackSpeed((prev) => (prev === 1 ? 2 : 1));
                }}
                className="text-[11px] px-3 py-1.5 rounded-full bg-[#13221C] border border-[#273F33] text-[#CBE0D6] hover:text-white font-medium"
              >
                {playbackSpeed}x 速度
              </button>

              <button
                onClick={toggleTimer}
                className="w-12 h-12 rounded-full bg-[#2E5B4B] hover:bg-[#3B725E] text-white flex items-center justify-center shadow-md active:scale-95 transition border border-[#52C997]"
              >
                {isFinished ? (
                  <RotateCcw className="w-5 h-5" />
                ) : isRunning ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                )}
              </button>

              <button
                onClick={resetCurrentStep}
                className="text-[11px] px-3 py-1.5 rounded-full bg-[#13221C] border border-[#273F33] text-[#CBE0D6] hover:text-white font-medium"
              >
                重置
              </button>
            </div>
          </div>

          {/* Action Technique Details */}
          <div className="bg-[#1A2E26] p-4 rounded-2xl border border-[#2B4438] shadow-xs space-y-2">
            <div className="text-xs font-bold text-[#52C997] flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              当前动作要领
            </div>
            <p className="text-xs text-[#E2E9E5] font-sans-sc leading-relaxed">
              {currentStep?.technique}
            </p>
            <div className="pt-2 border-t border-[#273F33] space-y-1">
              {currentStep?.keyPoints.map((pt, i) => (
                <div key={i} className="text-[11px] text-[#AEC0B7] flex items-start font-sans-sc">
                  <span className="text-[#F4A261] mr-1.5">•</span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step Timeline */}
          <div className="space-y-1.5">
            <div className="text-xs font-bold text-[#AEC0B7]">
              全流程动作步骤（点击直接跳转）：
            </div>
            <div className="space-y-1.5">
              {activeGuide.steps.map((st, idx) => (
                <div
                  key={st.stepNumber}
                  onClick={() => jumpToStep(idx)}
                  className={`p-3 rounded-xl border transition flex items-center justify-between cursor-pointer ${
                    currentStepIndex === idx
                      ? 'bg-[#2E5B4B] border-[#52C997] text-white font-bold'
                      : 'bg-[#1A2E26] border-[#2B4438] text-[#CBE0D6] hover:border-[#3E6654]'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span
                      className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center ${
                        currentStepIndex === idx
                          ? 'bg-white text-[#182B24] font-bold'
                          : 'bg-[#13221C] text-[#AEC0B7] border border-[#273F33]'
                      }`}
                    >
                      {st.stepNumber}
                    </span>
                    <span className="text-xs font-serif-sc">{st.title}</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#AEC0B7]">
                    {st.durationSec}秒
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 2: CALCULATOR --- */}
      {activeSubTab === 'calculator' && (
        <div className="space-y-3.5">
          <div className="bg-[#1A2E26] p-5 rounded-2xl border border-[#2B4438] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#273F33] pb-2.5">
              <h3 className="text-sm font-bold text-white flex items-center font-serif-sc">
                <Calculator className="w-4 h-4 text-[#F4A261] mr-1.5" />
                泡茶参数智能换算
              </h3>
              <span className="text-[10px] text-[#AEC0B7]">科学配比</span>
            </div>

            {/* Tea Category */}
            <div>
              <label className="text-xs font-bold text-white block mb-2 font-serif-sc">
                1. 选择冲泡茶类
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs font-serif-sc">
                {[
                  { key: 'green', name: '绿茶' },
                  { key: 'black', name: '红茶' },
                  { key: 'oolong', name: '乌龙茶' },
                  { key: 'white', name: '白茶' },
                  { key: 'yellow', name: '黄茶' },
                  { key: 'dark', name: '黑茶/普洱' }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      triggerHaptic(15);
                      setCalcCategory(item.key as TeaCategory);
                    }}
                    className={`py-2 px-1 rounded-xl border text-center transition ${
                      calcCategory === item.key
                        ? 'bg-[#2E5B4B] text-white border-[#52C997] font-bold shadow-2xs'
                        : 'bg-[#13221C] border-[#273F33] text-[#CBE0D6]'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Vessel Volume */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-white mb-2">
                <span>2. 茶席器具容量</span>
                <span className="text-[#52C997] font-mono">{vesselVolume} ml</span>
              </div>
              <input
                type="range"
                min="80"
                max="300"
                step="10"
                value={vesselVolume}
                onChange={(e) => setVesselVolume(Number(e.target.value))}
                className="w-full accent-[#52C997]"
              />
              <div className="flex justify-between text-[10px] text-[#AEC0B7] mt-1">
                <span>小盖碗 (100ml)</span>
                <span>标准壶 (150ml)</span>
                <span>大公道 (250ml+)</span>
              </div>
            </div>

            {/* People Count */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-white mb-2">
                <span>3. 品茗人数</span>
                <span className="text-[#52C997] font-mono">{peopleCount} 人</span>
              </div>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 6].map((num) => (
                  <button
                    key={num}
                    onClick={() => setPeopleCount(num)}
                    className={`flex-1 py-1.5 rounded-xl border text-xs transition ${
                      peopleCount === num
                        ? 'bg-[#2E5B4B] text-white border-[#52C997] font-bold'
                        : 'bg-[#13221C] border-[#273F33] text-[#CBE0D6]'
                    }`}
                  >
                    {num}人
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="bg-[#1A2E26] p-4 rounded-2xl border border-[#2B4438] shadow-xs space-y-3">
            <div className="text-xs font-bold text-[#F4A261] flex items-center justify-between font-serif-sc">
              <span>推算推荐方案</span>
              <span className="text-[11px] font-normal text-[#AEC0B7]">
                茶水比 {calcResults.ratioText}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-[#13221C] p-2.5 rounded-xl border border-[#273F33]">
                <div className="text-[10px] text-[#AEC0B7]">精准投茶量</div>
                <div className="text-base font-bold text-[#52C997] font-mono mt-0.5">
                  {calcResults.recommendedGrams} <span className="text-xs font-normal">克</span>
                </div>
              </div>
              <div className="bg-[#13221C] p-2.5 rounded-xl border border-[#273F33]">
                <div className="text-[10px] text-[#AEC0B7]">最佳水温</div>
                <div className="text-base font-bold text-[#F4A261] font-mono mt-0.5">
                  {calcResults.waterTemp} <span className="text-xs font-normal">℃</span>
                </div>
              </div>
              <div className="bg-[#13221C] p-2.5 rounded-xl border border-[#273F33]">
                <div className="text-[10px] text-[#AEC0B7]">醒茶洗茶</div>
                <div className="text-base font-bold text-white font-mono mt-0.5">
                  {calcResults.washRounds > 0 ? `${calcResults.washRounds}道` : '免洗'}
                </div>
              </div>
            </div>

            {/* Drinker count advice */}
            <div className="p-2.5 rounded-xl bg-[#13221C] border border-[#273F33] text-[11px] font-serif-sc leading-relaxed">
              <span className="font-bold text-[#52C997]">茶席建议：</span>
              <span className="text-[#E2E9E5]">{calcResults.drinkerAdvice}</span>
            </div>

            {/* Infusion schedule */}
            <div className="space-y-1.5 pt-1.5">
              <div className="text-xs font-bold text-white font-serif-sc">
                各泡出汤秒数：
              </div>
              <div className="space-y-1">
                {calcResults.infusionTable.map((inf) => (
                  <div
                    key={inf.round}
                    className="p-2 rounded-xl bg-[#13221C] border border-[#273F33] flex items-center justify-between text-xs font-serif-sc"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="w-5 h-5 rounded-full bg-[#243F34] text-[#52C997] font-bold text-[10px] flex items-center justify-center font-mono border border-[#3E6654]">
                        {inf.round}
                      </span>
                      <span className="text-[#E2E9E5]">
                        {inf.note}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-[#52C997]">
                      {inf.seconds} 秒
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 3: TROUBLESHOOT --- */}
      {activeSubTab === 'troubleshoot' && (
        <div className="space-y-3">
          <div className="flex space-x-1.5 overflow-x-auto pb-0.5 no-scrollbar">
            {['all', '苦涩闷汤', '滋味淡薄', '焖熟变黄', '茶汤混浊', '洗茶不当', '香气不显'].map(
              (tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    triggerHaptic(10);
                    setTroubleFilter(tag);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition font-serif-sc ${
                    troubleFilter === tag
                      ? 'bg-[#2E5B4B] text-white font-bold border border-[#52C997]'
                      : 'bg-[#1A2E26] text-[#CBE0D6] border border-[#2B4438]'
                  }`}
                >
                  {tag === 'all' ? '全部问题' : tag}
                </button>
              )
            )}
          </div>

          <div className="space-y-2.5">
            {filteredTroubles.map((tr) => (
              <div
                key={tr.id}
                className="bg-[#1A2E26] p-4 rounded-2xl border border-[#2B4438] shadow-2xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center font-serif-sc">
                    <AlertCircle className="w-4 h-4 mr-1.5 shrink-0 text-[#F4A261]" />
                    {tr.problem}
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#F4A261]/20 text-[#F4A261] border border-[#F4A261]/40 font-bold">
                    {tr.tag}
                  </span>
                </div>

                <div className="text-xs space-y-1.5 font-serif-sc">
                  <div className="p-2.5 rounded-xl bg-[#13221C] border border-[#273F33] text-[#E2E9E5] leading-relaxed">
                    <span className="font-bold text-[#F4A261]">【原因】：</span>
                    {tr.cause}
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#162A22] border border-[#2D4D3E] text-[#E2E9E5] leading-relaxed">
                    <span className="font-bold text-[#52C997]">【对策】：</span>
                    {tr.solution}
                  </div>
                </div>

                <div className="text-[10px] text-[#AEC0B7] font-serif-sc">
                  易发茶类：{tr.relatedTeas.join('、')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
