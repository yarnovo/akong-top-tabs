import type { ReactNode } from 'react'

export interface TopTabsProps {
  /** tab 文案列表 · 顺序即展示顺序 */
  tabs: string[]
  /** 受控当前激活下标 · 越界视为无激活 */
  activeIndex: number
  /** 切换回调 · 点 tab 时触发 (即使点的就是当前 active 也会触发 · 调用方自行判等) */
  onChange: (index: number) => void
  /** 左侧 slot · 比如 ☰ 菜单 · 不传则不渲染左侧占位 */
  leading?: ReactNode
  /** 右侧 slot · 比如 🔍 搜索 · 不传则不渲染右侧占位 */
  trailing?: ReactNode
  /** a11y · 默认 '顶部 tabs' */
  ariaLabel?: string
}
