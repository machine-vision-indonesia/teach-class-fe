import React, { ReactNode, useState } from 'react'
import Stack from '@mui/material/Stack'
import MuiBreadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import NextLink from 'next/link'
import { Icon } from '@iconify/react'
import { useTheme } from '@mui/material/styles'
import { MvTypography } from '../../mv-typography'
import { style } from '../styles/breadcrumbs.style'
import { PropsBreadcrumbs } from '../types/breadcrumbs.type'

/**
 * Elemen navigasi yang sangat berguna dalam desain web dan aplikasi. Breadcrumbs membantu pengguna memahami lokasi mereka saat
 * ini dalam hierarki situs atau aplikasi dan memungkinkan mereka untuk dengan mudah kembali ke halaman sebelumnya atau level
 * hierarki yang lebih tinggi.
 */
export const Breadcrumbs = ({ data }: PropsBreadcrumbs) => {
  const { palette } = useTheme()

  return (
    <Stack direction='row' spacing={1} alignItems='center'>
      <MuiBreadcrumbs
        aria-label='breadcrumb'
        separator={<Icon color={palette.text.disabled} fontSize='18px' icon='formkit:right' />}
      >
        {data.map((dataItem, dataI) =>
          dataI + 1 >= data.length ? (
            <Stack key={dataI} direction='row' alignItems='center' spacing='8px'>
              <MvTypography size='SUBTITLE_SM' typeSize='PX' color={thm => thm.palette.text.disabled + ' !important'}>
                {dataItem.label}
              </MvTypography>
            </Stack>
          ) : (
            <Stack key={dataI} direction='row' alignItems='center' spacing='8px'>
              <Link sx={style} variant='subtitle2' underline='none' href={dataItem.path} component={NextLink}>
                {dataItem.label}
              </Link>
            </Stack>
          )
        )}
      </MuiBreadcrumbs>
    </Stack>
  )
}
