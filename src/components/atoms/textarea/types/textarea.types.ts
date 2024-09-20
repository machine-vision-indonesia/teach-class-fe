import { TextareaHTMLAttributes } from 'react'

export interface PropsTextarea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'small' | 'medium' | 'large'
  isError?: boolean
}

export interface ITextareaStylingProps {
  color?: string
  background?: string
  borderColor?: string
  hoverBorderColor?: string
  focusColor?: string
  disabledBackground?: string
  readonlyBackground?: string
  fontSize?: string
  placeholdertextColor?: string
}
