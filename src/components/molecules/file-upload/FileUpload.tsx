import React, { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'

// ** Icon Imports
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { Icon } from '@iconify/react'
import { Grid } from '@mui/material'
import ModalDeleteOnServer from './ModalDeleteOnServer'
import client from 'src/client'

import { toast } from 'react-hot-toast'
import { env } from 'next-runtime-env'

// const Img = styled('img')(({ theme }) => ({
//   width: 48,
//   height: 48,
//   marginBottom: theme.spacing(8.75)
// }))

interface FileProp {
  name: string
  type: string
  size: number
  lastModified?: number
}
interface PropsFileUpload {
  onSubmit?: (file: File[]) => void
  maxFiles?: number
  autoSubmit?: boolean
  fullPreview?: boolean
  accept?: 'pdf' | 'images'
  isGridPicture?: boolean
  isMultipleFile?: boolean
  isContainerScrollable?: boolean
  defaultValue?: string[]
  deleteOnServer?: boolean
  endpointToUpdate?: string
  value: any
  refetching?: () => void
  value?: File[]
  disabled?: boolean
}

export const FileUpload = ({
  onSubmit,
  maxFiles = 0,
  autoSubmit,
  fullPreview,
  accept,
  isGridPicture = false,
  isMultipleFile = false,
  isContainerScrollable = false,
  defaultValue = [],
  deleteOnServer = false,
  endpointToUpdate = '',
  value = [],
  disabled = false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refetching = () => {}
}: PropsFileUpload) => {
  const getAcceptOptions = () => {
    let accOptions = {}
    if (accept === 'images') {
      accOptions = {
        'image/*': ['.jpeg', '.jpg', '.png', '.svg']
      }
    } else if (accept === 'pdf') {
      accOptions = {
        'application/pdf': ['.pdf']
      }
    }

    return accOptions
  }

  const [files, setFiles] = useState<File[]>(value)
  const [openDelete, setOpenDelete] = useState('')
  const theme = useTheme()
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles,
    accept: getAcceptOptions(),
    onDrop: (acceptedFiles: File[]) => {
      setFiles(prev => {
        if (isMultipleFile) {
          return [...prev, ...acceptedFiles.map((file: File) => Object.assign(file))].filter(
            (val, idx, self) => self.findIndex(x => x.name === val.name) === idx
          )
        } else {
          return acceptedFiles.map((file: File) => Object.assign(file))
        }
      })
      if (autoSubmit) {
        if (isMultipleFile) {
          onSubmit?.(
            [...files, ...acceptedFiles.map((file: File) => Object.assign(file))].filter(
              (val, idx, self) => self.findIndex(x => x.name === val.name) === idx
            )
          )
        } else {
          onSubmit?.(acceptedFiles)
        }
      }
    },
    disabled
  })

  useEffect(() => {
    if (defaultValue.length !== 0) {
      defaultValue.forEach(x => {
        generateFileType(x)
          .then(res => {
            setFiles(prev =>
              [...res, ...prev].filter((val, idx, self) => self.findIndex(x => x.name === val.name) === idx)
            )
          })
          .catch(() => null)
      })
    }
  }, [defaultValue])

  const generateFileType = async (idImg: string) => {
    const assetBaseUrl = env('NEXT_PUBLIC_REST_API_URL')
    const response = await fetch(assetBaseUrl + '/assets/' + idImg)
    if (response.status !== 200) throw new Error()

    const imgData = await response.blob()
    const file = new File([imgData], idImg, {
      type: 'image/*',
      lastModified: 0
    })

    return [file]
  }

  const renderFilePreview = (
    file: FileProp,
    width?: number | string,
    height?: number | string,
    customStyle?: React.CSSProperties
  ) => {
    if (file.type.startsWith('image')) {
      return (
        <img
          width={width || 38}
          height={height || 38}
          alt={file.name}
          src={URL.createObjectURL(file as any)}
          style={customStyle}
        />
      )
    } else {
      return <Icon icon='tabler:file-description' />
    }
  }

  const handleRemoveFile = (file: FileProp) => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)
    if (file.lastModified === 0) {
      setOpenDelete(file.name)

      // setFiles([...filtered])
      // if (autoSubmit) {
      //   onSubmit?.([...filtered])
      // }
    } else {
      setFiles([...filtered])
      if (autoSubmit) {
        onSubmit?.([...filtered])
      }
    }
  }

  const autoUpdateAfterRemove = (idImg: string) => {
    client.api
      .patch(endpointToUpdate, {
        images: files.filter(file => file.name !== idImg).map(x => x.name)
      })
      .then(() => {
        toast.success('Image File deleted on server')
        setFiles(files.filter(file => file.name !== idImg))
        refetching()
      })
      .catch(() => toast.error('Error deleting image file on server'))
  }

  const fileList = isGridPicture ? (
    <Grid
      container
      rowSpacing={5}
      columnSpacing={5}
      sx={isContainerScrollable ? { maxHeight: '450px', overflowY: 'scroll' } : undefined}
    >
      {files.map((file: FileProp, idx: number) => (
        <Grid item xs={4} key={idx}>
          <Box style={{ position: 'relative' }}>
            {renderFilePreview(file, 200, 200, {
              border: '1px solid black',
              borderRadius: 6
            })}
            {disabled ? null : (
              <IconButton onClick={() => handleRemoveFile(file)} style={{ position: 'absolute', top: 0, right: 0 }}>
                <Icon icon='tabler:x' fontSize={20} />
              </IconButton>
            )}
          </Box>
        </Grid>
      ))}
    </Grid>
  ) : (
    files.map((file: FileProp) => (
      <ListItem key={file.name}>
        <div className='file-details'>
          <div className='file-preview'>{renderFilePreview(file)}</div>
          <div>
            <Typography className='file-name'>{file.name}</Typography>
            <Typography className='file-size' variant='body2'>
              {Math.round(file.size / 100) / 10 > 1000
                ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
                : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
            </Typography>
          </div>
        </div>
        {disabled ? null : (
          <IconButton onClick={() => handleRemoveFile(file)}>
            <Icon icon='tabler:x' fontSize={20} />
          </IconButton>
        )}
      </ListItem>
    ))
  )

  const handleRemoveAllFiles = () => {
    setFiles([])
    if (autoSubmit) {
      onSubmit?.([])
    }
  }

  return (
    <DropzoneWrapper>
      <div style={{ display: fullPreview && files.length ? 'none' : '' }} {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Box
            bgcolor={thm => thm.palette.placeholder}
            display='flex'
            alignItems='center'
            justifyContent='center'
            width='48px'
            height='48px'
            mb={theme.spacing(8.75)}
            borderRadius='6px'
          >
            <Icon icon='material-symbols:upload-sharp' fontSize={30} color={theme.palette.text.secondary} />
          </Box>
          {/* <Img alt='Upload img' src={`/images/misc/upload-${theme.palette.mode}.png`} /> */}
          <Typography variant='h4' sx={{ mb: 2.5 }}>
            Drop files here or click to upload.
          </Typography>
          <Typography variant='subtitle2'>
            {maxFiles === 1 ? 'Only 1 file is allowed' : `Maximum of ${maxFiles} files are allowed`}
          </Typography>
        </Box>
      </div>
      {fullPreview && maxFiles === 1 && files.length ? (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            p: '30px 60px'
          }}
        >
          <div className='file-preview'>{renderFilePreview(files[0], 250, 'auto')}</div>
          {disabled ? null : (
            <Button
              sx={{
                aspectRatio: '1/1',
                minWidth: '26px',
                p: '4px',
                position: 'absolute',
                top: 0,
                right: 0
              }}
              onClick={handleRemoveAllFiles}
            >
              <Icon icon='tabler:x' />
            </Button>
          )}
        </Box>
      ) : null}
      {files.length && !fullPreview ? (
        <>
          <List>{fileList}</List>
          {!autoSubmit && (
            <div className='buttons'>
              <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
                Remove All
              </Button>
              <Button variant='contained' onClick={() => onSubmit?.(files)}>
                Upload Files
              </Button>
            </div>
          )}
        </>
      ) : null}
      {deleteOnServer && (
        <ModalDeleteOnServer
          isOpen={openDelete}
          setModal={() => setOpenDelete('')}
          liveUpdate={autoUpdateAfterRemove}
        />
      )}
    </DropzoneWrapper>
  )
}
