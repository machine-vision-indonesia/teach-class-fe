import {ReactNode} from "react";

export interface PropsGroupLabel {
  color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'accent'
  iconName?: string
  label: string
  style: 'header' | 'text'
  rightHeader?: ReactNode | ReactNode[] | JSX.Element | JSX.Element[]
  children: ReactNode | ReactNode[] | JSX.Element | JSX.Element[]
}
