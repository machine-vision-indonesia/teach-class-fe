export interface IFileListPreview {
  fileId?: string
  fileName: string
  fileType: string
  fileSize?: number
  progressPercent?: number
  onDelete?: () => void
}
