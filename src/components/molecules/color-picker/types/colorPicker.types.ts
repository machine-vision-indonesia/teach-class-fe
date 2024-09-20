export interface PropsColorPicker {
  nameText?: string
  defaultValue?: string
  size: 'small' | 'medium' | 'large'
  onChange?: (hex: string) => void
  required?: boolean
  helperText?: string
  disabled?: boolean
  isPreview?: boolean
}
