import { ThemeColor } from 'src/@core/layouts/types'

export interface ModalKanbanProps {
  isOpen: boolean
  onClose: () => void
  color?: ThemeColor
  textBanner?: string
  textHeader?: []
  isHeader?: boolean
  isFooter?: boolean
  isActionButtons?: boolean
  mainContent?: React.ReactNode
  footer?: React.ReactNode
}
