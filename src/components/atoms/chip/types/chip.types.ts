import { ThemeOptions } from '@mui/material'
import { ReactElement } from 'react'

export interface PropsMvChip {
  // color?: ChipProps['color'] | 'accent'
  shape?: 'rounded' | 'circular'
  size?: 'small' | 'medium'
  avatar?: ReactElement<any, string | React.JSXElementConstructor<any>>
  onClick: () => void
  onDelete?: (event: any) => void
}

export interface StyleMvChip extends ThemeOptions {}
