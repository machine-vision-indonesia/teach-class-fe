import { ReactNode } from 'react'

export interface TypeAccordionData {
  badge?: ReactNode
  content: ReactNode | string
  image?: ReactNode
  icon?: string
  buttons?: ReactNode
  title: string
}
export interface PropsAccordion {
  variant?: 'default' | 'stripped'
  data: TypeAccordionData[],
  bgColor? : string
}
