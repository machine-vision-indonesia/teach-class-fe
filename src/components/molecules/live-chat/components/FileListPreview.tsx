import { Button } from '@/components/atoms'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Box, useTheme } from '@mui/material'
import React, { memo } from 'react'
import PdfIcon from '@/../public/images/icon/pdf.svg'
import TxtIcon from '@/../public/images/icon/txt.svg'
import XlsxIcon from '@/../public/images/icon/xlsx.svg'
import DocIcon from '@/../public/images/icon/docx.svg'
import PptIcon from '@/../public/images/icon/ppt.svg'
import Image from 'next/image'
import { env } from 'next-runtime-env'
import { IFileListPreview } from '../types/fileListPreview'
import { fileSizeReadable } from '../utils'

export const FileListPreview = memo(function FileListPreview({
  fileId,
  fileName,
  fileType,
  fileSize,
  progressPercent,
  onDelete
}: IFileListPreview) {
  const { colorToken } = useTheme()

  const BASE_URL: string | undefined = env('NEXT_PUBLIC_REST_API_URL')

  const checkIconType = (item: any) => {
    if (item?.split('/')[1] === 'plain' || item?.split('/')[1] === 'txt') return TxtIcon
    if (item?.split('/')[1] === 'xlsx' || item?.split('/')[1] === 'xls' || item?.split('/')[1] === 'csv')
      return XlsxIcon
    if (item?.split('/')[1] === 'pdf') return PdfIcon
    if (item?.split('/')[1] === 'docx' || item?.split('/')[1] === 'doc') return DocIcon
    if (item?.split('/')[1].split('.')[3] === 'presentation') return PptIcon
  }

  return (
    <Box
      padding={'12px'}
      display={'flex'}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      border={`1px solid ${colorToken.border.neutral.normal}`}
      borderRadius={'6px'}
    >
      <Box display={'flex'} alignItems={'center'} gap={2}>
        {fileType?.split('/')[0] === 'image' ? (
          <Box position={'relative'} width={'14px'} height={'20px'} display={'flex'}>
            <Image
              src={`${BASE_URL}/assets/${fileId}`}
              objectFit='cover'
              layout='fill'
              alt='image-preview'
              loading='lazy'
              property='true'
            />
          </Box>
        ) : (
          <Image
            priority
            src={checkIconType(fileType)}
            style={{
              width: '20px',
              height: '20px'
            }}
            alt='file'
          />
        )}

        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
          <Box display={'flex'} gap={'5px'} alignItems={'center'}>
            <MvTypography color={colorToken.text.primary.normal} size='BODY_SM_BOLDEST' typeSize='PX'>
              {fileName}
            </MvTypography>
            <MvTypography color={colorToken.icon.neutral.subtlest} size='BODY_SM_NORMAL' typeSize='PX'>
              {fileSizeReadable(fileSize)}
            </MvTypography>
          </Box>
          {progressPercent ? (
            <Box display={'flex'} gap={'5px'} alignItems={'center'}>
              <MvTypography color={colorToken.icon.neutral.subtlest} size='BODY_SM_NORMAL' typeSize='PX'>
                {progressPercent}%
              </MvTypography>
              <MvTypography color={colorToken.icon.neutral.subtlest} size='BODY_SM_NORMAL' typeSize='PX'>
                Uploading
              </MvTypography>
            </Box>
          ) : (
            <></>
          )}
        </Box>
      </Box>

      <Button
        sx={{
          minWidth: '5px !important'
        }}
        size='small'
        content='iconOnly'
        buttonStyle='plain'
        icon='basil:cross-solid'
        iconSize={22}
        onClick={onDelete}
      />
    </Box>
  )
})
