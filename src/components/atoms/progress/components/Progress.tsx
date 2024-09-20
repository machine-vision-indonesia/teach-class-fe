import MuiLinearProgress, { type LinearProgressProps as MuiLinearProgressProps } from '@mui/material/LinearProgress'
import { ProgressProps } from '../types/progress.types'
import { useTheme } from '@mui/material'

export const Progress = ({ size, isFailed, ...props }: MuiLinearProgressProps & ProgressProps) => {
  const colorUsed = !props.color || props.color == 'inherit' ? 'primary' : props.color
  const { palette } = useTheme()

  const getSize = () => {
    switch (size) {
      case 'small':
        return '4px'
      case 'medium':
        return '6px'
      case 'large':
        return '8px'
      default:
        return '6px'
    }
  }

  return (
    <MuiLinearProgress
      sx={{
        height: getSize(),
        bgcolor: isFailed ? `${palette.error.main}50` : `${colorUsed}.200`,

        '& .MuiLinearProgress-bar': {
          background: isFailed ? palette.error.main : (palette?.[colorUsed] as any)?.main
        }
      }}
      {...props}
    />
  )
}
