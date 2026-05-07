/**
 * Web 端组件测试 · vitest + @testing-library/react
 *
 * 覆盖:
 * - 渲染 tabs (按数量 / 文案)
 * - activeIndex 反映 active class + aria-selected
 * - 点 tab 触发 onChange(index)
 * - leading / trailing slot 渲染
 * - role=tab / role=tablist / a11y
 * - 行为契约 spec (跨端共享)
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TopTabs } from '../src/TopTabs'
import { topTabsScenarios } from '../src/TopTabs.behavior'

describe('TopTabs (Web) · 渲染', () => {
  it('按 tabs 数量渲染 button', () => {
    render(<TopTabs tabs={['关注', '发现', '附近']} activeIndex={0} onChange={() => {}} />)
    expect(screen.getAllByRole('tab')).toHaveLength(3)
  })

  it('每个 tab 渲染对应文案', () => {
    render(<TopTabs tabs={['关注', '发现', '附近']} activeIndex={0} onChange={() => {}} />)
    expect(screen.getByRole('tab', { name: '关注' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: '发现' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: '附近' })).toBeInTheDocument()
  })

  it('5 tab 长版本 · 全渲染', () => {
    render(
      <TopTabs
        tabs={['关注', '发现', '附近', '直播', '视频']}
        activeIndex={0}
        onChange={() => {}}
      />,
    )
    expect(screen.getAllByRole('tab')).toHaveLength(5)
  })

  it('容器有 role=tablist + aria-label', () => {
    render(<TopTabs tabs={['A']} activeIndex={0} onChange={() => {}} ariaLabel="主导航" />)
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-label', '主导航')
  })

  it('ariaLabel 默认值 "顶部 tabs"', () => {
    render(<TopTabs tabs={['A']} activeIndex={0} onChange={() => {}} />)
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-label', '顶部 tabs')
  })
})

describe('TopTabs (Web) · activeIndex 反映', () => {
  it('active tab 加 ak-top-tabs__tab--active class', () => {
    const { container } = render(
      <TopTabs tabs={['A', 'B', 'C']} activeIndex={1} onChange={() => {}} />,
    )
    const actives = container.querySelectorAll('.ak-top-tabs__tab--active')
    expect(actives).toHaveLength(1)
    expect(actives[0].textContent).toBe('B')
  })

  it('active tab aria-selected=true · 其他 false', () => {
    render(<TopTabs tabs={['A', 'B', 'C']} activeIndex={2} onChange={() => {}} />)
    const tabs = screen.getAllByRole('tab')
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false')
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false')
    expect(tabs[2]).toHaveAttribute('aria-selected', 'true')
  })

  it('activeIndex 越界 · 没有 tab 是 active', () => {
    const { container } = render(
      <TopTabs tabs={['A', 'B']} activeIndex={5} onChange={() => {}} />,
    )
    expect(container.querySelectorAll('.ak-top-tabs__tab--active')).toHaveLength(0)
  })

  it('active tab tabIndex=0 · 其他 -1 (键盘可达)', () => {
    render(<TopTabs tabs={['A', 'B']} activeIndex={0} onChange={() => {}} />)
    const tabs = screen.getAllByRole('tab')
    expect(tabs[0]).toHaveAttribute('tabindex', '0')
    expect(tabs[1]).toHaveAttribute('tabindex', '-1')
  })
})

describe('TopTabs (Web) · 交互', () => {
  it('点 tab 触发 onChange(index)', () => {
    const onChange = vi.fn()
    render(<TopTabs tabs={['A', 'B', 'C']} activeIndex={0} onChange={onChange} />)
    fireEvent.click(screen.getByRole('tab', { name: 'B' }))
    expect(onChange).toHaveBeenCalledWith(1)
  })

  it('点最后一个 tab · onChange 收到最后下标', () => {
    const onChange = vi.fn()
    render(<TopTabs tabs={['A', 'B', 'C']} activeIndex={0} onChange={onChange} />)
    fireEvent.click(screen.getByRole('tab', { name: 'C' }))
    expect(onChange).toHaveBeenCalledWith(2)
  })

  it('点当前 active tab · onChange 仍被调用 (调用方自行判等)', () => {
    const onChange = vi.fn()
    render(<TopTabs tabs={['A', 'B']} activeIndex={1} onChange={onChange} />)
    fireEvent.click(screen.getByRole('tab', { name: 'B' }))
    expect(onChange).toHaveBeenCalledWith(1)
  })
})

describe('TopTabs (Web) · slot', () => {
  it('leading slot 渲染', () => {
    render(
      <TopTabs
        tabs={['A']}
        activeIndex={0}
        onChange={() => {}}
        leading={<span data-testid="lead">☰</span>}
      />,
    )
    expect(screen.getByTestId('lead')).toBeInTheDocument()
  })

  it('trailing slot 渲染', () => {
    render(
      <TopTabs
        tabs={['A']}
        activeIndex={0}
        onChange={() => {}}
        trailing={<span data-testid="trail">🔍</span>}
      />,
    )
    expect(screen.getByTestId('trail')).toBeInTheDocument()
  })

  it('两个 slot 同时渲染', () => {
    render(
      <TopTabs
        tabs={['A']}
        activeIndex={0}
        onChange={() => {}}
        leading={<span data-testid="lead">☰</span>}
        trailing={<span data-testid="trail">🔍</span>}
      />,
    )
    expect(screen.getByTestId('lead')).toBeInTheDocument()
    expect(screen.getByTestId('trail')).toBeInTheDocument()
  })

  it('不传 slot · 不报错 · slot 容器为空', () => {
    const { container } = render(
      <TopTabs tabs={['A', 'B']} activeIndex={0} onChange={() => {}} />,
    )
    const leading = container.querySelector('.ak-top-tabs__slot--leading')
    const trailing = container.querySelector('.ak-top-tabs__slot--trailing')
    expect(leading).toBeTruthy()
    expect(trailing).toBeTruthy()
    expect(leading?.textContent).toBe('')
    expect(trailing?.textContent).toBe('')
  })
})

describe('TopTabs (Web) · 行为契约 (跨端共享 spec)', () => {
  for (const sc of topTabsScenarios) {
    it(sc.name, () => {
      const onChange = vi.fn()
      render(<TopTabs tabs={sc.tabs} activeIndex={sc.activeIndex} onChange={onChange} />)
      fireEvent.click(screen.getAllByRole('tab')[sc.pressIndex])
      if (sc.expectIndex === null) {
        expect(onChange).not.toHaveBeenCalled()
      } else {
        expect(onChange).toHaveBeenCalledWith(sc.expectIndex)
      }
    })
  }
})
