export const checkIsImage = (attch: any[]) => {
  let isImageExist = true
  attch.map(item => {
    if (item?.type?.split('/')[0] !== 'image') {
      isImageExist = false
    }
  })

  return isImageExist
}

export const truncateText = (text: string, maxLength: number) => {
  const truncatedText = text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text

  return truncatedText
}

export const fileSizeReadable = (size?: number) => {
  const DEFAULT_SIZE = 0
  const fileSize = size ?? DEFAULT_SIZE

  if (!fileSize) return `${DEFAULT_SIZE} kb`

  const sizeInKb = fileSize / 1024

  if (sizeInKb > 1024) {
    return `${(sizeInKb / 1024).toFixed(2)} mb`
  } else {
    return `${sizeInKb.toFixed(2)} kb`
  }
}

export const dateConvert = (dateTime: string) => {
  const dateCreated = new Date(dateTime)

  const formatedTime = dateCreated.toLocaleDateString('en-US', {
    hour: '2-digit',
    hourCycle: 'h24',
    minute: '2-digit'
  })

  const [date, time] = formatedTime.split(', ')

  return { date, time }
}

export const getRelativeDate = (dateTime: string): string => {
  const messageDate = new Date(dateTime)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (messageDate.toDateString() === today.toDateString()) return 'Today'

  if (messageDate.toDateString() === yesterday.toDateString()) return 'Yesterday'

  return messageDate.toDateString()
}

export const getDateDivider = (dateTime: string): string => {
  return new Date(dateTime).toDateString()
}
