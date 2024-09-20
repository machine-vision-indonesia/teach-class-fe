import { ReactNode } from 'react'
import { COLOR_VARIANT } from '../constants/accordion.constant'

export interface TypeAccordionData {
  badge?: ReactNode
  content: ReactNode | string
  image?: ReactNode
  icon?: string
  buttons?: ReactNode
  title: string
  disabled?: boolean
  additional?: string
  leftElement?: ReactNode
  rightElement?: ReactNode
}
export interface PropsAccordion {
  variant?: 'default' | 'stripped' | 'withButton' | 'withButtonAdditional'
  data: TypeAccordionData[]
  bgColor?: string
  disabled?: boolean
  hover?: boolean
  strippedColor?: keyof typeof COLOR_VARIANT
}
