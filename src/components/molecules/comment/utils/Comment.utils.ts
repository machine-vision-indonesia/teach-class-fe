import { ThemeColor } from '@/@core/layouts/types'
import { SortOrder } from '../types/Comment.type'
import { Theme } from '@mui/material/styles'

export function sortByDate(array: { date_created: string }[], order: SortOrder = 'asc'): { date_created: string }[] {
  return array.sort((a, b) => {
    const dateA = new Date(a.date_created)
    const dateB = new Date(b.date_created)

    if (order === 'asc') {
      return dateA.getTime() - dateB.getTime()
    } else {
      return dateB.getTime() - dateA.getTime()
    }
  })
}

export function getRelativeDateString(dateString: string | Date): string {
  const date = new Date(dateString)
  const now = new Date()

  // Normalize dates to remove the time part
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const compareDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())

  // Calculate the difference in days
  const diffTime = today.getTime() - compareDate.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    // Calculate hours difference for today
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    if (diffHours === 0) {
      // Calculate minutes difference if less than an hour
      const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return `${diffMinutes} minutes ago`
    }
    return `${diffHours} hours ago`
  } else if (diffDays === 1) {
    return 'Yesterday'
  } else if (diffDays <= 7) {
    return `${diffDays} days ago`
  } else if (diffDays <= 14) {
    return 'a week ago'
  } else if (diffDays <= 30) {
    return `${diffDays} days ago`
  } else {
    // Return only the date
    const options: any = { year: 'numeric', month: 'long', day: 'numeric' }
    return compareDate.toLocaleDateString(undefined, options)
  }
}

// Group Label Utils

export const resolveHeaderBackground = (color: ThemeColor | 'accent', theme: Theme) => {
  switch (color) {
    case 'primary':
      return theme.colorToken.background.primary.normal
    case 'secondary':
      return theme.colorToken.background.neutral.subtle
    case 'error':
      return theme.colorToken.background.danger.normal
    case 'warning':
      return theme.colorToken.background.yellow.normal
    case 'success':
      return theme.colorToken.background.success.normal
    case 'info':
      return theme.colorToken.background.info.normal
    case 'accent':
      return 'transparent'
    default:
      return theme.colorToken.background.primary.normal
  }
}

export const resolveLabelColor = (style: 'header' | 'text', color: ThemeColor | 'accent', theme: Theme) => {
  if (style === 'text') {
    return theme.colorToken.text.neutral.disabled
  }

  if (color === 'accent') {
    return theme.colorToken.icon.neutral.normal
  } else if (color === 'primary') {
    return theme.colorToken.icon.primary.normal
  } else {
    return theme.colorToken.icon.neutral.inverted
  }
}
