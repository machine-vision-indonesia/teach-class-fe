import { ChatBoxMessage } from './ChatBox.type'

export const formatDate = (date: Date) => {
  const month = (date.getMonth() + 1).toString().padStart(2, 'O')
  const year = date.getFullYear().toString().slice(2)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${month}/${year}, ${hours}:${minutes}`
}

export const formatFileSize = (fileSize: number): string => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']

  let size = fileSize
  let unitIndex = 0

  while (size >= 1000 && unitIndex < units.length - 1) {
    size /= 1000
    unitIndex++
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`
}

export const formatRelativeDate = (date: Date): string => {
  if (!date) return '-'

  const current = new Date(date)
  const now = new Date()
  const diffInMilliseconds = now.getTime() - current.getTime()
  const seconds = Math.floor(diffInMilliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

  if (seconds < 60) {
    return rtf.format(-seconds, 'second')
  } else if (minutes < 60) {
    return rtf.format(-minutes, 'minute')
  } else if (hours < 24) {
    return rtf.format(-hours, 'hour')
  } else if (days === 1) {
    return 'yesterday'
  } else if (days < 7) {
    return rtf.format(-days, 'day')
  } else {
    return new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric' }).format(current)
  }
}

export const groupingMessage = (messages: ChatBoxMessage[]) => {
  const groupedMessage: any[] = []
  let activeIndex = 0

  messages.forEach((message, index) => {
    const isSameUserAsPrevious = index > 0 && messages[index - 1].sender.senderId === message.sender.senderId

    if (!isSameUserAsPrevious && index !== 0) {
      activeIndex++
    }

    groupedMessage[activeIndex] = groupedMessage?.[activeIndex] ? [...groupedMessage[activeIndex], message] : [message]
  })

  return groupedMessage
}

export const generateRandomTimeInSameDate = (): Date => {
  const baseDate: Date = new Date()

  // Get the number of milliseconds since midnight
  const millisecondsSinceMidnight: number =
    baseDate.getHours() * 60 * 60 * 1000 +
    baseDate.getMinutes() * 60 * 1000 +
    baseDate.getSeconds() * 1000 +
    baseDate.getMilliseconds()

  // Generate a random number of milliseconds within a day
  const randomMilliseconds: number = Math.floor(Math.random() * 86400000) // 86400000 milliseconds in a day

  // Calculate the final random time by adding the random milliseconds to the start of the day
  const randomTime: Date = new Date(baseDate)
  randomTime.setHours(0, 0, 0, 0) // Set hours, minutes, seconds, and milliseconds to 0
  randomTime.setMilliseconds(millisecondsSinceMidnight + randomMilliseconds)

  return randomTime
}
