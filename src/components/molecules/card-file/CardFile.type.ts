import { CSSProperties, ReactNode } from 'react'

export interface PropsCardFile {
  file_name?: string
  description?: string
  wrapperStyle?: CSSProperties
  type?: 'image' | 'pdf' | 'word' | 'other'
}
