export interface PropsBadge {
  color: 'primary' | 'neutral' | 'neutralInverted' | 'danger' | 'warning' | 'success' | 'info' | string
  style: 'rect' | 'circular'
  isTransparent?: boolean
  size?: 'small' | 'medium'
  icon?: string
  label?: string | number
}
