import styled from '@emotion/styled'
import { ITextareaStylingProps } from '../types/textarea.types'

export const MvTextarea = styled.textarea((props: ITextareaStylingProps) => ({
  borderRadius: '6px',
  padding: '6px 8px',
  color: props.color,
  background: props.background,
  fontFamily: 'sans-serif',
  fontSize: props.fontSize,
  border: `1px solid ${props.borderColor}`,
  ':focus': {
    outlineColor: props.focusColor
  },
  ':hover': {
    borderColor: props.hoverBorderColor
  },
  ':disabled': {
    background: props.disabledBackground,
    border: '0px'
  },
  ':read-only': {
    background: props.readonlyBackground,
    border: 0,
    color: props.color
  },
  '::placeholder': {
    color: props.placeholdertextColor
  }
}))
