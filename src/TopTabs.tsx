import type { TopTabsProps } from './TopTabs.types'
import './TopTabs.css'

const cls = (...parts: (string | false | undefined)[]) => parts.filter(Boolean).join(' ')

/** akong TopTabs · Web · DOM `<button>` */
export function TopTabs(props: TopTabsProps) {
  const {
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    fullWidth = false,
    iconLeft,
    iconRight,
    children,
    onClick,
    onPress,
    type = 'button',
    ariaLabel,
  } = props

  const handle = () => {
    if (disabled || loading) return
    onClick?.()
    onPress?.()
  }

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      onClick={handle}
      className={cls(
        'ak-top-tabs',
        `ak-top-tabs--${variant}`,
        `ak-top-tabs--${size}`,
        fullWidth && 'ak-top-tabs--full-width',
        loading && 'ak-top-tabs--loading',
      )}
    >
      {iconLeft && <span className="ak-top-tabs__icon">{iconLeft}</span>}
      {children && <span>{children}</span>}
      {iconRight && <span className="ak-top-tabs__icon">{iconRight}</span>}
    </button>
  )
}

export default TopTabs
