// #region ===== Import =====

// ** MUI Components
import { Box, useTheme, Stack } from '@mui/material'

// ** Core / Components
import Icon from '@/@core/components/icon'

// ** Atoms / Components
import { MvTypography } from '@/components/atoms/mv-typography'
import { Badge } from '@/components/atoms/badge'

// ** Other
import { PropsDocumentGridItem } from '../types/RepositoryDocument.types'
import { formatBytes } from '@/utils/general'
import { useCallback } from 'react'
import Image from 'next/image'
// #endregion

export const DocumentGridItem = ({ documentName, title, tag, size, sx, actions, fileType }: PropsDocumentGridItem) => {
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
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
        padding: '10px 16px',
        borderRadius: '6px',
        background: theme.colorToken.background.default,
        border: '1px solid',
        borderColor: theme.colorToken.border.neutral.normal,
        '&:hover': {
          backgroundColor: theme.colorToken.background.neutral.subtlest
        },
        transition: '0.1s',
        ...sx
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '6px',
          width: '100%'
        }}
      >
        <MvTypography
          size='BODY_MD_NORMAL'
          typeSize='PX'
          sx={{
            width: '9vw',
            fontWeight: 400,
            color: theme.colorToken.text.primary.normal,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {documentName}
        </MvTypography>
        {actions && actions}
      </Box>

      <Box
        sx={{
          padding: '24px 0px',
          borderRadius: '6px',
          marginBottom: '10px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {isImageFile ? <Icon icon='fluent-mdl2:page' fontSize={75} /> : (
          <Image
            alt='image'
            src={imageExtFile(fileType as string)}
            width={75}
            height={75}
            priority={true}
          />
        )}

        {/* <Icon icon='fluent-mdl2:page' fontSize={75} /> */}
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <Box width='100%'>
          <MvTypography size='BODY_SM_NORMAL' typeSize='PX'>
            {title}
          </MvTypography>
          <Stack direction='row' alignItems='center' justifyContent='space-between'>
            <MvTypography size='HELPER_TEXT_SM' mt={1} color={theme.colorToken.text.neutral.disabled} typeSize='PX'>
              {formatBytes(parseInt(size as string, 10))}
            </MvTypography>
            <Badge
              color={theme.colorToken.background.info.hover as string}
              isTransparent
              label={tag ?? 'General'}
              size='medium'
              style='rect'
            />
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}
