import { ThemeColor } from '@/@core/layouts/types'
import { IParams } from '@/types/master/filter'
import { SxProps, Theme } from '@mui/material'
import { UseQueryResult } from '@tanstack/react-query'
import { ReactNode } from 'react'

export interface PropsDateHeader {
  date?: string
  color: ThemeColor
  sx?: SxProps<Theme>
}

export interface PropsDocumentRowItem {
  tag?: string
  title?: string
  size?: string
  time?: string
  documentName?: string
  sx?: SxProps<Theme>
  chip?: ReactNode | ReactNode[] | JSX.Element | JSX.Element[]
  actions?: ReactNode | ReactNode[] | JSX.Element | JSX.Element[]
  fileType?: string
}

export interface PropsDocumentGridItem {
  tag?: string
  title?: string
  size?: string
  time?: string
  documentName?: string
  sx?: SxProps<Theme>
  chip?: ReactNode | ReactNode[] | JSX.Element | JSX.Element[]
  actions?: ReactNode | ReactNode[] | JSX.Element | JSX.Element[]
  fileType?: string
}

export interface Document {
  id: string
  title: string
  filename_download: string
  filesize: string
  modified_on: string
}

export interface GroupedDocument {
  date: string
  formattedDate: string
  day: string
  documents: Document[]
  fileType?: string
}

export interface IRepository {
  title: string
  filename_download: string
  id: string
  filesize: string
  modified_on: string
}

export interface FetchParameters extends IParams {
  search?: string
}

export type PropsRepositoryDocument = {
  children?: ReactNode
  limit?: number
  title?: string
  rightHeaderContent?: ReactNode
  isStripped?: boolean
  dataFetchService: (params?: FetchParameters) => UseQueryResult<{
    data: any[]
    meta?: { filter_count: number }
    aggregate?: { countDistinct: string }
  }>
  hideSearchBar?: boolean
  searchText?: string
  defaultSortBy?: string
  maxWidth?: string
  width?: string
  dataKey?: string
  withOnScroll?: boolean
  rowSelection?: boolean
  countBy?: string
  persistentFilters?: boolean
}

export interface PropsFilter {
  handleViewMode: (_: any, nextView: string) => void
  viewMode: string
}
