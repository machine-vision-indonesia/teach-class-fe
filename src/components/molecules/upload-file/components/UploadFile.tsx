import React, { DragEvent, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import { Box, Button, IconButton, Card, LinearProgress } from '@mui/material'
import { InputFileProps } from '../types/UploadFile.type'
import { formatFileSize, truncateFileName } from '../utils/UploadFile.utils'
import { MvTypography } from '@/components/atoms/mv-typography'
import { useTheme } from '@mui/material/styles'
import Image from 'next/image'
import { ImagePreview } from './ImagePreview'
import { useFileHandlers } from '../hooks/useFileHandler'

export const UploadFile = ({
  variant = 'single',
  preview = false,
  type = 'default',
  disabled = false,
  helperText = false,
  value,
  onDelete,
  selected,
  state,
  size = 'small',
  width,
  name,
  onChange,
  setId,
  description
}: PropsWithChildren<InputFileProps>) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const fileInputDragnDropRef = useRef<HTMLInputElement>(null)
  const [isPreview, setIsPreview] = useState(false)

  const {
    handleFileInputChange,
    handleDrop,
    selectedFiles,
    uploadProgress,
    imagePreviews,
    extensionNames,
    setSelectedFiles,
    extensionFileNames,
    setExtensionFileNames,
    setImagePreviews,
    setExtensionNames,
    isError,
    id,
  } = useFileHandlers()

  useEffect(() => {
    if (selectedFiles && setId) {
      setId(id)
    }
  }, [selectedFiles, id]);

  const isSmallSize = size === 'small'

  const theme = useTheme()

  useEffect(() => {
    if (value) {
      setSelectedFiles(value)
    }
  }, [value])

  // ============================== Start Function =================================
  const handleDeleteFile = (index: number, type = 'default') => {
    // remove files
    // pop extension name

    if (type === 'image') {
      const updatedFiles = [...imagePreviews]
      updatedFiles.splice(index, 1)
      setImagePreviews(updatedFiles)

      const updatedExtension = [...extensionNames]
      updatedExtension.splice(index, 1)
      setExtensionNames(updatedExtension)
      if (updatedFiles.length === 1) {
        setIsPreview(true)
      } else {
        setIsPreview(false)
      }
    } else {
      const updatedFiles = [...selectedFiles]
      updatedFiles.splice(index, 1)
      setSelectedFiles(updatedFiles)

      const updatedExtension = [...extensionFileNames]
      updatedExtension.splice(index, 1)
      setExtensionFileNames(updatedExtension)

      if (selectedFiles.length === 1) {
        setIsPreview(true)
      } else {
        setIsPreview(false)
      }

    }

    onDelete && onDelete(index)
  }

  const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }, [])

  const handleChooseFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleChooseDragnDropFile = () => {
    if (fileInputDragnDropRef.current) {
      fileInputDragnDropRef.current.click()
    }
  }

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

  const onFileChange = (e: any) => {
    handleFileInputChange(e)
    if ((imagePreviews.length === 1) || (selectedFiles.length === 1)) {
      setIsPreview(false)
    } else {
      setIsPreview(true)
    }
    if (onChange) {
      onChange(e)
    }
  }

  // ============================== END Start Function =================================

  const renderSelectedFiles = (files: File[]) => {
    return <>
      {files.length > 0 && (
        <>
          <Box
            display='flex'
            gap={2}
            flexWrap='wrap'
            mt={3}
            alignItems='center'
            width={width}
          >
            {imagePreviews?.map((el: string, i: number) => (
              <ImagePreview
                totalImages={imagePreviews.length ?? 0}
                handleDelete={() => handleDeleteFile(i, 'image')}
                image={el}
                key={i}
                width={'100%'}
                percentage={uploadProgress[i]}
                isError={isError}
              />
            ))}
          </Box>
          <Box
            sx={{
              marginTop: 2,
              borderRadius: '4px',
              width: width
            }}
          >
            {files.map((file, index) => {
              const fileName = file.name.split('.').pop()
              const isImageFile = fileName === 'png' || fileName === 'jpg'
              const progress = uploadProgress[index]

              return (
                <>
                  {isImageFile}
                  {!isImageFile && (
                    <Card
                      key={index}
                      sx={{
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 4,
                        marginTop: 4,
                        paddingLeft: 2,
                        paddingRight: 2,
                        padding: 3
                      }}
                    >
                      <Box
                        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Image
                            alt='image'
                            src={imageExtFile(extensionFileNames[index])}
                            width={18}
                            height={18}
                            priority={true}
                          />

                          <Box sx={{ display: 'flex', gap: 1, paddingLeft: '12px' }}>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                              <Box>
                                <MvTypography size='TITLE_XS' fontWeight='bold' typeSize='PX' color='primary'>
                                  {truncateFileName(file.name, 10)}
                                </MvTypography>
                                <Box
                                  sx={{
                                    display: uploadProgress[index] > 0 && uploadProgress[index] < 100 ? 'flex' : 'none',
                                    alignItems: 'center',
                                    gap: 1,
                                    marginTop: 1
                                  }}
                                >
                                  <MvTypography
                                    typeSize='PX'
                                    size='HELPER_TEXT_MD'
                                    color={theme.palette.neutral[400]}
                                    fontWeight='400'
                                  >
                                    {progress}%
                                  </MvTypography>

                                  {/* circle */}
                                  <Box
                                    sx={{
                                      width: 3,
                                      height: 3,
                                      backgroundColor: theme.palette.neutral[300],
                                      borderRadius: '100%'
                                    }}
                                  />

                                  <MvTypography
                                    typeSize='PX'
                                    size='HELPER_TEXT_MD'
                                    color={theme.palette.neutral[400]}
                                    fontWeight='400'
                                  >
                                    {isError ? 'Uploading Failed' : 'Uploading'}
                                  </MvTypography>
                                </Box>
                              </Box>
                              <Box marginTop={1} width='60px'>
                                <MvTypography size='HELPER_TEXT_MD' typeSize='PX' color={theme.palette.neutral[400]}>
                                  {' '}
                                  {formatFileSize(file.size)}
                                </MvTypography>
                              </Box>
                            </Box>
                          </Box>
                        </Box>

                        <Box>
                          <IconButton disabled={progress < 100} size='small' onClick={() => handleDeleteFile(index)}>
                            <Box
                              sx={{
                                width: '23px',
                                height: '23px'
                              }}
                            >
                              <Icon icon='maki:cross' color={theme.palette.primary.main} fontSize={'12px'} />
                            </Box>
                          </IconButton>
                        </Box>
                      </Box>
                      {/* Progress bar */}
                      {uploadProgress[index] > 0 && uploadProgress[index] < 100 && (
                        <Box sx={{ marginTop: 1, paddingX: '12px', marginBottom: 2 }}>
                          <LinearProgress
                            sx={{ height: 4 }}
                            color={isError ? 'error' : 'primary'}
                            variant='determinate'
                            value={uploadProgress[index]}
                          />
                        </Box>
                      )}
                    </Card>
                  )}
                </>
              )
            })}
          </Box>
        </>
      )}
    </>
  }

  const renderDragnDrop = () => (
    <>
      <Box
        sx={{
          border: '2px dashed',
          borderColor: 'neutral.100',
          padding: '16px',
          borderRadius: '4px',
          textAlign: 'center',
          cursor: 'pointer',
          paddingTop: isSmallSize ? '10px' : '30px',
          boxShadow: disabled || state === 'readonly' ? '0 0 10px rgba(0, 0, 0, 0.1)' : 'none',
          opacity: disabled || state === 'readonly' ? 0.6 : 1,
          pointerEvents: disabled || state === 'readonly' ? 'none' : 'auto',
          width: width,
          display: isPreview ? 'none' : 'block',
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleChooseDragnDropFile}
      >
        <input
          type='file'
          name={name}
          id={name}
          key={Date.now()}
          ref={fileInputDragnDropRef}
          style={{ display: 'none' }}
          onChange={onFileChange}
          multiple
        />
        <Icon
          color='primary'
          icon='ion:cloud-upload-outline'
          style={{
            fontSize: 36,
            color: disabled || state === 'readonly' ? theme.palette.primary.dark['400'] : theme.palette.primary.main
          }}
        />

        <Box sx={{ marginTop: isSmallSize ? '0' : '1rem' }}>
          <MvTypography typeSize='PX' size={isSmallSize ? 'BODY_MD_BOLDEST' : 'BODY_LG_BOLDEST'}>
            Drag and drop your file here
          </MvTypography>
        </Box>

        <Box sx={{ marginTop: isSmallSize ? 2 : '1rem' }}>
          <MvTypography typeSize='PX' size={isSmallSize ? 'BODY_SM_NORMAL' : 'BODY_MD_NORMAL'}>
            {description ?? 'File Support JPG, PNG, GIF. Maximum Size 2 Mb'}
          </MvTypography>
        </Box>

        <Box sx={{ marginTop: isSmallSize ? 2 : '1rem' }}>
          <MvTypography typeSize='PX' size={isSmallSize ? 'BODY_SM_NORMAL' : 'BODY_MD_NORMAL'} color={theme.palette.neutral[300]}>
            OR
          </MvTypography>
        </Box>

        <Box sx={{ marginTop: isSmallSize ? 2 : '1rem' }}>
          <Button
            size={isSmallSize ? 'small' : 'medium'}
            variant='contained'
            disabled={disabled || state === 'readonly'}
            startIcon={<Icon icon='ph:paperclip' />}
            sx={{
              '&.Mui-disabled': {
                backgroundColor: t => t.palette.secondary.main,
                color: t => t.palette.primary.contrastText
              }
            }}
          >
            Choose File
          </Button>
        </Box>
      </Box>
      {renderSelectedFiles(selectedFiles)}
    </>
  )

  const renderDefault = () => (
    <>
      <Box
        sx={{
          border: '1px solid',
          borderColor: theme.palette.divider,
          padding: 0,
          borderRadius: '4px',
          display: isPreview ? 'none' : 'flex',
          height: isSmallSize ? 29 : 38,
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: state === 'readonly' ? '0 0 10px rgba(0, 0, 0, 0.1)' : 'none',
          opacity: state === 'readonly' ? 0.6 : 1,
          width: width
        }}
      >
        <MvTypography size='BODY_MD_NORMAL' typeSize='PX' paddingLeft={4} color={theme.palette.neutral[400]}>
          Choose your file
        </MvTypography>
        <Button
          variant='contained'
          onClick={handleChooseFile}
          disabled={disabled || state === 'readonly'}
          sx={{
            '&.Mui-disabled': {
              backgroundColor: t => t.palette.secondary.main,
              color: t => t.palette.primary.contrastText
            }
          }}
          size={isSmallSize ? 'small' : 'medium'}
        >
          Choose File
        </Button>

        <input
          type='file'
          id={name}
          name={name}
          key={Date.now()}
          ref={fileInputRef}
          style={{ display: 'none' }} // Hide the input visually
          onChange={(e) => onFileChange(e)}
          multiple={variant === 'multiple'}
        />
      </Box>

      {helperText && (
        <MvTypography size='HELPER_TEXT_SM' typeSize='PX' marginTop={1} color={theme.palette.neutral[600]}>
          {typeof helperText === 'boolean' ? ' Maximum size 2 Mb' : helperText}
        </MvTypography>
      )}
      {renderSelectedFiles(selectedFiles)}
    </>
  )

  return (
    <>
      {type === 'default' ? renderDefault() : renderDragnDrop()}
    </>
  )
}
