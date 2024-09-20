export type TypeStepperStyle = 'rounded' | 'square'
export type TypeStepperVariant = 'icon' | 'number'

export interface TypeStepperData {
  iconName?: string
  title: string
  subtitle?: string
  active?: boolean
  passed?: boolean
}

export interface PropsStepper {
  data: TypeStepperData[]
  orientation?: 'horizontal' | 'vertical'
  size?: 'small' | 'medium' | 'large'
}
