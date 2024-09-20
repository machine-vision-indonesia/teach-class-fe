export interface InputFileProps {
  variant?: 'single' | 'multiple'
  preview?: true | false
  type?: 'default' | 'dragndrop'
  state?: 'default' | 'readonly'
  size?: 'small' | 'medium'
  width?: number
  disabled?: boolean
  helperText?: boolean | string
  value?: File[]
  onDelete?: (index: number) => void
  selected?: string[]
  name?: string
  onChange?: any
  setId?: React.Dispatch<React.SetStateAction<string[]>>
  description?: string
}

export interface imagePreview {
  image: string
  width?: number | string
  percentage: number
  handleDelete?: () => void
  totalImages: number
  isError?: boolean
}

export interface IDatacoreFile {
  charset: string
  description: string
  duration: string
  embed: string
  filename_disk: string
  filename_download: string
  filesize: string
  folder: string
  height: string
  id: string
  location: string
  metadata: string
  modified_by: string
  modified_on: string
  storage: string
  title: string
  type: string
  uploaded_by: string
  uploaded_on: string
  width: string
}

export interface UseUploadFilesOptions {
  onUploadProgress?: (progressEvent: any, fileIndex: number) => void
}
export interface FilePreview {
  name: string
  type: string
  preview?: string
}
