import { ReactNode } from 'react'

export interface StyledLabelProps {
  label: React.ReactNode
  icon?: string
  variant?: 'basic' | 'line'
  onAddItem: (parentId: string) => void
  onDeleteItem: (itemId: string) => void
  onEditItem: (itemId: string, editedLabel: string) => void
  onCancelEdit: (itemId: string) => void
  children: ReactNode
}
