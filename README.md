# @akong/top-tabs

akong TopTabs · sticky 顶部 tab 切换 · 类小红书"关注 / 发现 / 附近" · 跨端 (Web + React Native)

## Demo

[GitHub Pages 演示](https://yarnovo.github.io/akong-top-tabs/)

## 安装

```bash
npm i github:yarnovo/akong-top-tabs github:yarnovo/akong-tokens
```

## Web

```tsx
import { TopTabs } from '@akong/top-tabs'
import '@akong/top-tabs/style.css'
import '@akong/tokens/style.css'  // 顶层引一次 token (整个 app 共用)

const [active, setActive] = useState(0)

<TopTabs
  tabs={['关注', '发现', '附近']}
  activeIndex={active}
  onChange={setActive}
  leading={<button aria-label="菜单">☰</button>}
  trailing={<button aria-label="搜索">🔍</button>}
/>
```

## React Native

```tsx
import { TopTabs } from '@akong/top-tabs'

<TopTabs
  tabs={['关注', '发现', '附近']}
  activeIndex={active}
  onChange={setActive}
/>
```

Metro bundler 自动按 `.native.tsx` 后缀解析 · 同 `import` 路径两端通用。

## API

| Prop | Type | Default | 说明 |
|---|---|---|---|
| tabs | `string[]` | — | tab 文案列表 · 顺序即展示顺序 |
| activeIndex | `number` | — | 受控当前激活下标 · 越界视为无激活 |
| onChange | `(index: number) => void` | — | 点 tab 触发 · 含点击当前 active |
| leading | `ReactNode` | — | 左侧 slot · 比如 ☰ |
| trailing | `ReactNode` | — | 右侧 slot · 比如 🔍 |
| ariaLabel | `string` | `'顶部 tabs'` | a11y |

## 设计原则

- **一份 props**：Web 跟 RN 共享 `TopTabs.types.ts`
- **两端实现**：`TopTabs.tsx` (Web · 半透明 + backdrop-blur) + `TopTabs.native.tsx` (RN · `Animated.timing` 下划线)
- **真 sticky**：Web `position: sticky; top: 0; z-index: var(--ak-z-sticky)`
- **safe-top**：`padding-top: env(safe-area-inset-top)` 适配 iPhone 刘海
- **触摸目标 ≥ 44pt**：每个 tab 跟 slot 都满足 iOS HIG
- **极简反馈**：active 加粗 + 居中下划线 (4px × 2px · 圆角) · 0.15s ease-out 过渡
- **token 100% 接 @akong/tokens**：改一处 token 自动 update

## 视觉

| 状态 | 文字色 | 字重 | 下划线 |
|---|---|---|---|
| active | `var(--ak-fg)` | `semibold` | 4px × 2px · 居中 |
| 非 active | `var(--ak-fg-subtle)` | `regular` | 隐藏 |

容器：`bg = color-mix(--ak-bg 85% + transparent)` + `backdrop-filter: blur(20px) saturate(180%)`，类 iOS UINavigationBar 半透明效果。
