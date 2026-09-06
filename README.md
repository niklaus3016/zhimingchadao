# 知茗茶道

一款纯前端、全离线可用的中国茶文化百科与茶艺冲泡实操 App。

- **技术栈**：React 19 + TypeScript + Vite + Tailwind CSS v4 + Capacitor 8（Android）
- **数据存储**：localStorage（收藏、浏览足迹、品茶日记、打卡、设置），无后端、无网络请求

## 功能模块

- **茶百科**：六大茶类筛选、17 款名茶档案（品鉴 / 功效禁忌 / 典故 / 储藏）、茶文化专题、茶道四谛
- **功夫实操**：六大茶类分步冲泡演示与计时（梵钟提示音 / 触感反馈 / 屏幕常亮）、投茶量参数换算器、避坑指引
- **器具图鉴**：茶具鉴赏、茶器适配原理、开壶与养护教程
- **我的**：收藏、浏览足迹、品茶日记、每日打卡、个性设置、隐私政策
- **快捷功能**：每日茶语、廿四节气饮茶指南（含时令禁忌）、名茶辨识对比

## 本地开发

```bash
npm install
npm run dev      # 启动 Vite 开发服务器（端口 3000）
npm run lint     # TypeScript 类型检查（tsc --noEmit，严格模式）
npm run build    # 生产构建，输出到 dist/
```

## Android 打包

```bash
npm run build
npx cap sync android   # 将 dist/ 同步到 android/app/src/main/assets/public
npx cap open android   # 在 Android Studio 中打开并打包
```

应用包名：`com.zhimingchadao.app`；已声明 INTERNET（在线字体）与 VIBRATE（触感反馈）权限。
