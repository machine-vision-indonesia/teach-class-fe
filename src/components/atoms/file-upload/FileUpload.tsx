import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'

// ** Icon Imports
import DropzoneWrapper from '../../../@core/styles/libs/react-dropzone'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { Icon } from '@iconify/react'

// const Img = styled('img')(({ theme }) => ({
//   width: 48,
//   height: 48,
//   marginBottom: theme.spacing(8.75)
// }))

interface FileProp {
  name: string
  type: string
  size: number
}
interface PropsFileUpload {
  onSubmit?: (file: File[]) => void
}

export const FileUpload = ({ onSubmit }: PropsFileUpload) => {
  const [files, setFiles] = useState<File[]>([])
  const theme = useTheme()
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    }
  })

  const renderFilePreview = (file: FileProp) => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file as any)} />
    } else {
      return <Icon icon='tabler:file-description' />
    }
  }

  const handleRemoveFile = (file: FileProp) => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)
    setFiles([...filtered])
  }

  const fileList = files.map((file: FileProp) => (
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
      <IconButton onClick={() => handleRemoveFile(file)}>
        <Icon icon='tabler:x' fontSize={20} />
      </IconButton>
    </ListItem>
  ))

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  return (
    <DropzoneWrapper>
      <div {...getRootProps({ className: 'dropzone' })}>
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
            (This is just a demo drop zone. Selected files are not actually uploaded.)
          </Typography>
        </Box>
      </div>
      {files.length ? (
        <>
          <List>{fileList}</List>
          <div className='buttons'>
            <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
              Remove All
            </Button>
            <Button variant='contained' onClick={() => onSubmit?.(files)}>
              Upload Files
            </Button>
          </div>
        </>
      ) : null}
    </DropzoneWrapper>
  )
}
