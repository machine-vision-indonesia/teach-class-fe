import { PropsBreadcrumbs } from '@/components/atoms/breadcrumbs'
import { ReactNode } from 'react'

export interface IPageHeader {
  title: string
  breadcrumbsData?: PropsBreadcrumbs['data']
  actionButton?: ReactNode
  back?: boolean
}
