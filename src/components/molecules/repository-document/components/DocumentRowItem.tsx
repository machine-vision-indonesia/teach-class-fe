// #region ===== Import =====
import { Stack, useTheme, Box } from '@mui/material'

// ** Core / Components
import { Icon } from '@iconify/react/dist/iconify.js'

// ** Atoms / Components
import { MvTypography } from '@/components/atoms/mv-typography'
import { Badge } from '@/components/atoms/badge'

// ** Other
import { PropsDocumentRowItem } from '../types/RepositoryDocument.types'
import { formatBytes } from '@/utils/general'
import { useCallback } from 'react'
import Image from 'next/image'
// #endregion

export const DocumentRowItem = ({ sx, actions, title, size, tag, fileType }: PropsDocumentRowItem) => {
  const theme = useTheme()
  const isImageFile = fileType === 'png' || fileType === 'jpg'
  const imageExtFile = useCallback((name: string) => {
    const extensionMap: { [key: string]: string } = {
      pdf: "./images/icon/pdf.svg",
      docx: "./images/icon/docx.svg",
      xlsx: "./images/icon/xlsx.svg",
      txt: "./images/icon/txt.svg",
      pptx: "./images/icon/ppt.svg",
      form: "./images/icon/form.svg",
      onenote: "./images/icon/onenote.svg",
    };

    return extensionMap[name] || "./images/icon/pdf.svg";
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'center',
        padding: '10px 16px',
        border: 1,
        marginBottom: 2,
        backgroundColor: theme.colorToken.background.default,
        borderColor: theme.colorToken.border.neutral.normal,
        '&:hover': {
          backgroundColor: theme.colorToken.background.neutral.subtlest
        },
        ...sx
      }}
    >
      <Stack width='100%' direction='row' justifyContent='space-between' alignItems='center'>
        <Stack direction='row' gap={2} alignItems='center'>
          {isImageFile ? <Icon icon='fluent-mdl2:page' fontSize={75} /> : (
            <Image
              alt='image'
              src={imageExtFile(fileType as string)}
              width={75}
              height={75}
              priority={true}
            />
          )}
          <MvTypography size='BODY_SM_NORMAL' typeSize='PX'>
            {title}
          </MvTypography>
        </Stack>

        <Stack direction='row' gap={2} alignItems='center'>
          <Badge
            color={theme.colorToken.background.info.hover as string}
            isTransparent
            label={tag ?? 'General'}
            size='medium'
            style='rect'
          />
          <MvTypography size='HELPER_TEXT_SM' mt={1} color={theme.colorToken.text.neutral.disabled} typeSize='PX'>
            {formatBytes(parseInt(size as string, 10))}
          </MvTypography>
          {actions && actions}
        </Stack>
      </Stack>
    </Box>
  )
}
