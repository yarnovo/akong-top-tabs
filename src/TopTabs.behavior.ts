/**
 * 跨端行为契约 · Web + RN 都遵循
 *
 * "给定 props · 模拟点哪个 tab · 期望 onChange 收到哪个 index" 的纯描述
 * 各端测试 import 这份 spec 跑 · 行为强一致
 */

export interface Scenario {
  name: string
  tabs: string[]
  activeIndex: number
  /** 模拟点击的下标 */
  pressIndex: number
  /** 期望 onChange 收到的 index · null = 不该触发 (越界场景) */
  expectIndex: number | null
}

/** 共享场景 · Web + RN 都跑 */
export const topTabsScenarios: Scenario[] = [
  {
    name: '点非 active tab · onChange 收到点击的 index',
    tabs: ['关注', '发现', '附近'],
    activeIndex: 0,
    pressIndex: 1,
    expectIndex: 1,
  },
  {
    name: '点最后一个 tab · onChange 收到最后下标',
    tabs: ['关注', '发现', '附近'],
    activeIndex: 0,
    pressIndex: 2,
    expectIndex: 2,
  },
  {
    name: '点当前 active tab · onChange 仍触发 (调用方自行判等)',
    tabs: ['关注', '发现', '附近'],
    activeIndex: 1,
    pressIndex: 1,
    expectIndex: 1,
  },
  {
    name: '5 tab 长版本 · 点中间',
    tabs: ['关注', '发现', '附近', '直播', '视频'],
    activeIndex: 0,
    pressIndex: 2,
    expectIndex: 2,
  },
]
