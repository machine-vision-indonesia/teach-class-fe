export interface ButtonCopyProps {
  value: string
  title: string
  disabled?: boolean
  color?: 'primary' | 'success' | 'error' | 'warning' | undefined
  variant?: 'contained' | 'icon-only'
}
