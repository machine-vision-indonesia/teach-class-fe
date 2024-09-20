import { MvTypography } from '@/components/atoms/mv-typography'
import { formatFileSize, truncateFileName } from '@/components/molecules/upload-file'
import { Icon } from '@iconify/react'
import { Box, Card } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import Image from 'next/image'
import { useCallback } from 'react'

const PreviewDocumentFile = ({
  name,
  extension,
  size
}: {
  name: string
  extension: string
  size: number
}) => {
  const theme = useTheme()

  const imageExtFile = useCallback((name: string) => {
    const extensionMap: { [key: string]: string } = {
      pdf: '/images/icon/pdf.svg',
      docx: '/images/icon/docx.svg',
      xlsx: '/images/icon/xlsx.svg',
      txt: '/images/icon/txt.svg',
      pptx: '/images/icon/ppt.svg',
      form: '/images/icon/form.svg',
      onenote: '/images/icon/onenote.svg'
    }

    return extensionMap[name] || './images/icon/pdf.svg'
  }, [])

  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 2,
        marginTop: 2,
        paddingLeft: 2,
        paddingRight: 2,
        padding: 3,
        border: '1px solid',
        borderColor: theme.colorToken.text.neutral.normal
      }}
      elevation={0}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
          <Image alt='image' src={imageExtFile(extension)} width={18} height={18} priority={true} />

          <Box sx={{ display: 'flex', gap: 1, paddingLeft: '12px' }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <MvTypography size='TITLE_XS' fontWeight='bold' typeSize='PX' color='primary'>
                {truncateFileName(name, 10)}
              </MvTypography>
              <MvTypography size='HELPER_TEXT_MD' typeSize='PX' color={theme.colorToken.text.neutral.subtlest}>
                {' '}
                {formatFileSize(size)}
              </MvTypography>
            </Box>
          </Box>
          <IconButton aria-label='download' style={{ marginLeft: 'auto' }}>
            <Icon icon='lucide:download' fontSize='20px' color={theme.colorToken.text.primary.normal} />
          </IconButton>
        </Box>
      </Box>
    </Card>
  )
}

export default PreviewDocumentFile
