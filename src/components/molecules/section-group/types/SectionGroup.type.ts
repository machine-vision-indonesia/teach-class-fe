import { ReactNode } from 'react'

export interface SectionGroupProps {
  title: string
  squareLeft?: ReactNode
  squareRightChildrenLeft?: ReactNode
  squareRightChildrenCenter?: ReactNode
  squareRightChildrenRight?: ReactNode
  children?: ReactNode
  color: ColorSection | 'default'
}

export type ColorSection = 'primary' | 'default' | 'success' | 'warning' | 'critical' | 'info'
