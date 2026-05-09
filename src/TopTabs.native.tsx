/**
 * akong TopTabs · React Native 实现
 *
 * Metro bundler 默认按 `.native.tsx` 后缀解析 RN 端 · `.tsx` 解析 Web 端
 * 用方 `import { TopTabs } from '@aily-ui/top-tabs'` 自动取对应平台
 */

import { useEffect, useRef } from 'react'
import { Animated, Pressable, Text, View, useColorScheme, Platform } from 'react-native'
import { tokens } from '@aily-ui/tokens'
import type { TopTabsProps } from './TopTabs.types'

interface TabItemProps {
  label: string
  active: boolean
  onPress: () => void
  fg: string
  fgSubtle: string
}

function TabItem({ label, active, onPress, fg, fgSubtle }: TabItemProps) {
  const underline = useRef(new Animated.Value(active ? 1 : 0)).current

  useEffect(() => {
    Animated.timing(underline, {
      toValue: active ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start()
  }, [active, underline])

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      accessibilityLabel={label}
      style={{
        minHeight: tokens.touchMin,
        paddingHorizontal: tokens.space[1],
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          color: active ? fg : fgSubtle,
          fontSize: tokens.text.md,
          fontWeight: active ? (tokens.weight.semibold as '600') : (tokens.weight.regular as '400'),
          lineHeight: tokens.text.md * tokens.leading.snug,
        }}
      >
        {label}
      </Text>
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 6,
          width: 4,
          height: 2,
          borderRadius: tokens.radius.full,
          backgroundColor: fg,
          opacity: underline,
          transform: [
            {
              scaleX: underline.interpolate({
                inputRange: [0, 1],
                outputRange: [0.4, 1],
              }),
            },
          ],
        }}
      />
    </Pressable>
  )
}

export function TopTabs(props: TopTabsProps) {
  const { tabs, activeIndex, onChange, leading, trailing, ariaLabel = '顶部 tabs' } = props
  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark'
  const t = scheme === 'dark' ? tokens.dark : tokens.light

  const safeTop = Platform.OS === 'ios' ? 44 : 0

  return (
    <View
      accessibilityRole="tablist"
      accessibilityLabel={ariaLabel}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: tokens.z.sticky,
        backgroundColor: t.bg,
        paddingTop: safeTop,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          minHeight: tokens.touchMin,
          paddingHorizontal: tokens.space[3],
        }}
      >
        <View
          style={{
            minWidth: leading ? tokens.touchMin : 0,
            minHeight: tokens.touchMin,
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          {leading}
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {tabs.map((label, i) => (
            <View key={`${i}-${label}`} style={{ marginHorizontal: tokens.space[2] }}>
              <TabItem
                label={label}
                active={i === activeIndex}
                onPress={() => onChange(i)}
                fg={t.fg}
                fgSubtle={t.fgSubtle}
              />
            </View>
          ))}
        </View>

        <View
          style={{
            minWidth: trailing ? tokens.touchMin : 0,
            minHeight: tokens.touchMin,
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          {trailing}
        </View>
      </View>
    </View>
  )
}

export default TopTabs
