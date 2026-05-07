import type { TopTabsProps } from './TopTabs.types'
import './TopTabs.css'

const cls = (...parts: (string | false | undefined)[]) => parts.filter(Boolean).join(' ')

/** akong TopTabs · Web · sticky 顶部 tab 切换 (类小红书顶部 "关注 / 发现 / 附近") */
export function TopTabs(props: TopTabsProps) {
  const { tabs, activeIndex, onChange, leading, trailing, ariaLabel = '顶部 tabs' } = props

  return (
    <div className="ak-top-tabs" role="tablist" aria-label={ariaLabel}>
      <div className="ak-top-tabs__bar">
        <div className="ak-top-tabs__slot ak-top-tabs__slot--leading">{leading}</div>

        <div className="ak-top-tabs__tabs">
          {tabs.map((label, i) => {
            const active = i === activeIndex
            return (
              <button
                key={`${i}-${label}`}
                type="button"
                role="tab"
                aria-selected={active}
                tabIndex={active ? 0 : -1}
                className={cls('ak-top-tabs__tab', active && 'ak-top-tabs__tab--active')}
                onClick={() => onChange(i)}
              >
                <span className="ak-top-tabs__label">{label}</span>
                <span className="ak-top-tabs__underline" aria-hidden="true" />
              </button>
            )
          })}
        </div>

        <div className="ak-top-tabs__slot ak-top-tabs__slot--trailing">{trailing}</div>
      </div>
    </div>
  )
}

export default TopTabs
