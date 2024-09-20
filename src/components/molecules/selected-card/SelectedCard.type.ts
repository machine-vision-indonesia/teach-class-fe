import { CSSProperties } from 'react'

export interface SelectedCardProps {
  actionButton: 'editable' | 'more' | 'status'
  color: 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'info' | 'light'
  label: string | number
  description: string
  cardType: 'withImage' | 'withIcon' | 'none'
  variant?: 'filled' | 'outlined'
  imagePath?: string
  iconName?: string

  // Props for custom styling
  cardStyles?: CSSProperties
  labelStyles?: CSSProperties
  descriptionStyles?: CSSProperties

  // Props for onClick handling
  onMoreClick?: (event: MouseEvent) => void
  onEditClick?: (event: MouseEvent) => void
  onDeleteClick?: (event: MouseEvent) => void
}
