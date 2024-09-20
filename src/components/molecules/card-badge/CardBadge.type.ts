export type SummaryTypes = 'A' | 'B' | 'C' | 'D'
export type StyleTypes = 'filled' | 'outlined'

export type PropsCardBadge = {
  name?: string
  description?: string
  iconName?: string
  useShadow?: boolean
  badgeValue?: string
  style?: StyleTypes
}
