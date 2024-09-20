// New function
export const truncateFileName = (fileName: string, maxLength: any) => {
  const parts = fileName.split(/(?<=^[^\d]+)(?=\d)/) // Split before the first digit
  const truncatedName = parts[0].length > maxLength ? `${parts[0].slice(0, maxLength)}...${parts[1] || ''}` : fileName

  const extensionMatch = fileName.match(/(\.[^.]+)$/) // Match the file extension
  const extension = extensionMatch ? extensionMatch[1] : ''

  return truncatedName + extension
}

export const formatFileSize = (bytes: number) => {
  const units = [
    { size: 1024 ** 3, suffix: 'GB' },
    { size: 1024 ** 2, suffix: 'MB' },
    { size: 1024, suffix: 'KB' },
    { size: 1, suffix: 'bytes' }
  ]

  const { suffix, size: unitSize } = units.find(({ size }) => bytes >= size) || { suffix: 'bytes', size: 1 }

  return `${(bytes / unitSize).toFixed(2)} ${suffix}`
}
