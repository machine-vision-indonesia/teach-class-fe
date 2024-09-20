import { MvTypography } from '@/components/atoms/mv-typography'
import { Box, useTheme } from '@mui/material'
import { IPageHeader } from '../types/pageHeader.types'
import { Breadcrumbs } from '@/components/atoms/breadcrumbs'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react/dist/iconify.js'

export default function PageHeader({ title, breadcrumbsData, actionButton, back }: IPageHeader) {
  const theme = useTheme()
  return (
    <Box display={'flex'} width={'100%'} flexDirection={'column'} alignItems={'flex-start'} gap={back ? '24px' : ''}>
      {back && (
        <Link
          to={'..'}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            textDecoration: 'none',
            gap: '4px'
          }}
        >
          <Icon icon={'ph:arrow-left'} color={theme.colorToken.text.primary.normal} />
          <MvTypography size='LABEL_MD_NORMAL' typeSize='PX' color={theme.colorToken.text.primary.normal}>
            Back
          </MvTypography>
        </Link>
      )}
      <Box display='flex' width={'100%'} justifyContent='space-between' alignItems='center'>
        <Box>
          <MvTypography typeSize='PX' size='TITLE_XL'>
            {title}
          </MvTypography>
          {breadcrumbsData && <Breadcrumbs data={breadcrumbsData!} />}
        </Box>

        {actionButton && <>{actionButton}</>}
      </Box>
    </Box>
  )
}
