// #region ===== Import =====
import React, { FC, useCallback, useState } from 'react'

// ** MUI Components
import { useTheme, Box, IconButton, Grid, MenuItem, Menu, Stack } from '@mui/material'

// ** Core / Components
import Icon from '@/@core/components/icon'

// ** Atoms / Components
import { MvTypography } from '@/components/atoms/mv-typography'

// ** Molecules / Components
import { PDFDrawer } from '../../pdf-drawer'
import { Modal } from '../../modal'

// ** Other
import { Header } from './Header'
import { DocumentRowItem } from './DocumentRowItem'
import { DocumentGridItem } from './DocumentGridItem'
import { GroupedDocument, PropsRepositoryDocument, Document, IRepository } from '../types/RepositoryDocument.types'
import { getFormattedDate, getDay } from '../utils/RepositoryDocument.utils'
import Filter from './Filter'
import { env } from 'next-runtime-env'
// #endregion

export const RepositoryDocument: FC<PropsRepositoryDocument> = ({ children, dataFetchService }) => {
  const theme = useTheme()
  const [viewMode, setViewMode] = useState<string>('grid')
  const [id, setId] = useState('')
  const [open, setOpen] = useState(false)

  const { data: dataService } = dataFetchService()

  const handleViewMode = (_: any, nextView: string) => {
    setViewMode(nextView)
  }

  const docs: Document[] = dataService?.data ?? []

  function actionsDownload(id = '') {
    const link = document.createElement('a');
    link.href = `${env('NEXT_PUBLIC_REST_API_URL')}/assets/${id}?download`;
    link.download = 'pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function actionViewFile(id = '') {
    setId(id);
    setOpen(true);
  }

  const MenuItemWithIcon = ({
    icon,
    color,
    text,
    onClick
  }: {
    icon: string
    color: string
    text: string
    onClick: () => void
  }) => (
    <MenuItem onClick={onClick}>
      <Box sx={{ mr: '6px' }}>
        <Icon icon={icon} fontSize='inherit' color={color} />
      </Box>
      {text}
    </MenuItem>
  )

  const MenuItems = ({ documentAttachmentId, fileType }: { documentAttachmentId: string | undefined, fileType?: string }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const handleClick = useCallback((event: any) => {
      setAnchorEl(event.currentTarget)
    }, [])

    const handleClose = useCallback(() => {
      setAnchorEl(null)
    }, [])

    return (
      <>
        <IconButton
          aria-label='more'
          aria-controls='long-menu'
          aria-haspopup='true'
          color='secondary'
          onClick={handleClick}
        >
          <Icon icon='system-uicons:menu-vertical' fontSize='inherit' color={theme.colorToken.icon.neutral.subtlest} />
        </IconButton>
        <Menu keepMounted id='long-menu' anchorEl={anchorEl} onClose={handleClose} open={Boolean(anchorEl)}>
          {
            fileType === 'pdf' ? (
              <MenuItemWithIcon
                icon='ph:eye'
                color={theme.colorToken.icon.info.normal as string}
                text='Detail'
                onClick={() => {
                  actionViewFile(documentAttachmentId)
                  handleClose()
                }}
              />
            ) : ''
          }
          <MenuItemWithIcon
            icon='material-symbols:download'
            color={theme.colorToken.icon.info.normal as string}
            text='Download Doc'
            onClick={() => {
              actionsDownload(documentAttachmentId)
              handleClose()
            }}
          />
        </Menu>
      </>
    )
  }

  const buildDocumentItems = () => {
    const groupedByDate: GroupedDocument[] = docs.reduce((result: GroupedDocument[], current: Document) => {
      const currentDate = new Date(current.modified_on).toLocaleDateString('en-GB') // Format: 'DD-MM-YYYY'

      const existingGroup = result.find(group => {
        const groupDate = new Date(group.date).toLocaleDateString('en-GB')
        return groupDate === currentDate
      })

      if (existingGroup) {
        existingGroup.documents.push(current)
      } else {
        result.push({
          date: current.modified_on,
          formattedDate: getFormattedDate(current.modified_on),
          day: getDay(current.modified_on),
          documents: [current]
        })
      }

      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

      return result
    }, [])

    if (viewMode === 'grid') {
      return groupedByDate?.map((grouped, index) => (
        <>
          <Header key={index + grouped.date} color='secondary' date={grouped.formattedDate} />
          <Grid container spacing={2} sx={{ mb: '10px', mt: '10px' }}>
            {grouped.documents.map((document: IRepository, index: number) => {
              const fileType = document.filename_download.split('.').pop();
              return (
                <Grid item xs={6} md={3} key={index}>
                  <DocumentGridItem fileType={fileType} title={document.title} size={document.filesize} />
                </Grid>
              )
            })}
          </Grid>
        </>
      ))
    } else {
      return groupedByDate?.map((grouped, index) => (
        <>
          <Header key={index} color='secondary' date={grouped.formattedDate} />
          <Box sx={{ mt: '6px', mb: '10px' }}>
            {grouped.documents.map((document: IRepository, index: number) => {
              const fileType = document.filename_download.split('.').pop();
              return (
                <DocumentRowItem
                  key={index}
                  fileType={fileType}
                  title={document.title}
                  size={document.filesize}
                  actions={
                    <Box display='flex' alignItems='center'>
                      <MenuItems fileType={fileType} documentAttachmentId={document.id} />
                    </Box>
                  }
                />
              )
            })}
          </Box>
        </>
      ))
    }
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '24px', mb: '24px', margin: 5 }}>
        <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ flexGrow: 1 }}>
          <MvTypography size='TITLE_MD' typeSize='PX'>
            File Repository
          </MvTypography>
          {children}
        </Stack>
      </Box>
      <Box
        sx={{
          background: theme.colorToken.background.default,
          borderRadius: '6px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'start'
        }}
      >
        <Box
          sx={{
            flex: 1,
            padding: '15px',
            backgroundColor: theme.colorToken.background.default,
            border: 1,
            borderColor: 'divider',
            borderRadius: '6px',
            display: 'flex',
            flexDirection: 'column',
            margin: 5
          }}
        >
          <Filter handleViewMode={handleViewMode} viewMode={viewMode} />
          {buildDocumentItems()}
        </Box>
      </Box>

      {/* Modal */}
      <Modal renderAction={false} isOpen={open} onClose={() => setOpen(prev => !prev)}>
        <PDFDrawer
          attachmentId=""
          downloadable
          editable
          url={`${env('NEXT_PUBLIC_REST_API_URL')}/assets/${id}`}
        />
      </Modal>
    </>
  )
}
