import { ReactNode } from "react";

export interface PropsCardImage {
  imageUrl?: string
  actions?: ReactNode | ReactNode[] | JSX.Element | JSX.Element[]
  actionPosition?: 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft'
  title?: ReactNode | ReactNode[] | JSX.Element | JSX.Element[]
  imageId?: string
  width?: number | string
  height?: number | string
  fitImage?: 'cover' | 'fill' | 'contain' | 'none' | 'scale-down'
}
