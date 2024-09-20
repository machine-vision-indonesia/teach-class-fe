import { ReactNode } from 'react'

export interface TreeViewProps {
  variant?: 'basic' | 'line'
  data: any[]
  children: ReactNode
}
