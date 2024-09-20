import {ReactNode} from "react";

export interface PropsInputField {
  label?: string
  inlineIconStyle?: 'prefix' | 'suffix' | 'custom'
  inlineIcon?: string
  inlineIconSuffix?: string
  size: 'small'|'medium' | undefined
  state: 'default' | 'active' | 'error' | 'success' | 'disabled'
  style?:'prefix' | 'suffix' | 'custom'
  children?: ReactNode | ReactNode[] | JSX.Element | JSX.Element[]
  children2?: ReactNode | ReactNode[] | JSX.Element | JSX.Element[]
}
