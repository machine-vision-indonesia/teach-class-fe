import { useState, useCallback, ChangeEvent } from 'react'
import { useUploadFiles } from '../services/UploadFile.service'
import { FilePreview } from '../types/UploadFile.type'

export const useFileHandlers = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [extensionNames, setExtensionNames] = useState<string[]>([])
  const [extensionFileNames, setExtensionFileNames] = useState<string[]>([])
  const [fileTypes, setFileTypes] = useState<FilePreview[]>([])
  const [imageTypes, setImageTypes] = useState<FilePreview[]>([])
  const [uploadProgress, setUploadProgress] = useState<number[]>([])
  const [statusUpload, setStatusUpload] = useState<string>('')
  const [uploadCompletion, setUploadCompletion] = useState<boolean[]>([])
  const [id, setId] = useState<string []>([])

  const { mutate: uploadFiles, isError } = useUploadFiles()

  const simulateUploadProgress = (index: number) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(prevProgress => {
        const updatedProgress = [...prevProgress]
        updatedProgress[index] = Math.min(progress, 100)

        if (progress >= 100) {
          clearInterval(interval)
        }

        return updatedProgress
      })
    }, 500)
  }

  const markUploadComplete = (index: number) => {
    setUploadCompletion(prevCompletion => {
      const updatedCompletion = [...prevCompletion]
      updatedCompletion[index] = true
      return updatedCompletion
    })
  }

  const markUploadIncomplete = (index: number) => {
    setUploadCompletion(prevCompletion => {
      const updatedCompletion = [...prevCompletion]
      updatedCompletion[index] = false
      return updatedCompletion
    })
  }

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()

    const files = event.dataTransfer.files
    const droppedFiles = Array.from(files || [])

    if (files) {
      // Initialize progress array with zeros
      processFiles(droppedFiles)
      setUploadProgress(new Array(droppedFiles.length).fill(0))

      try {
        uploadFiles(droppedFiles, {
          onSuccess: () => {
            droppedFiles.forEach((_, index) => {
              markUploadComplete(selectedFiles.length + index)
            })
          },
          onError: () => {
            setStatusUpload('failed')
            droppedFiles.forEach((_, index) => {
              markUploadIncomplete(selectedFiles.length + index)
            })
            console.error('Upload failed')
          }
        })
      } catch (error) {
        setStatusUpload('failed')
        console.error(error)
      }
    }
  }, [])

  const processFiles = (newFiles: File[]) => {
    const filteredFiles = newFiles.filter(
      file => !selectedFiles.some(selectedFile => selectedFile.name === file.name && selectedFile.size === file.size)
    )

    const newImagePreviews: string[] = []
    const newExtensionNames = [...extensionNames]
    const newExtensionFileNames = [...extensionFileNames]
    const newFileTypes = [...fileTypes]
    const newImageTypes = [...imageTypes]

    filteredFiles.forEach(file => {
      const fileType = file.type.startsWith('image/') ? 'image' : 'file'
      const fileExtension = file.name.split('.').pop() || ''
      newExtensionNames.push(fileExtension)

      if (fileType === 'image') {
        const preview = URL.createObjectURL(file)
        newImageTypes.push({ name: file.name, type: fileType, preview })
        newImagePreviews.push(preview)
      } else {
        newFileTypes.push({ name: file.name, type: fileType })
        newExtensionFileNames.push(fileExtension)
      }
    })

    setFileTypes(prevFileTypes => [...prevFileTypes, ...newFileTypes])
    setImageTypes(prevImageTypes => [...prevImageTypes, ...newImageTypes])
    setImagePreviews(prevPreviews => [...prevPreviews, ...newImagePreviews])
    setExtensionNames(newExtensionNames)
    setExtensionFileNames(newExtensionFileNames)

    const newSelectedFiles = [...selectedFiles, ...filteredFiles]
    setSelectedFiles(newSelectedFiles)

    // Upload Progress
    const newUploadProgress = [...uploadProgress]
    const newUploadCompletion = [...uploadCompletion]

    filteredFiles.forEach((_, index) => {
      const globalIndex = selectedFiles.length + index
      if (newUploadProgress[globalIndex] === undefined) {
        newUploadProgress[globalIndex] = 0
      }
      if (newUploadCompletion[globalIndex] === undefined) {
        newUploadCompletion[globalIndex] = false
      }
    })

    setUploadProgress(newUploadProgress)
    setUploadCompletion(newUploadCompletion)

    filteredFiles.forEach((_, index) => {
      markUploadComplete(index)
      simulateUploadProgress(selectedFiles.length + index)
    })
  }

  const handleFileInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    const arrFiles = Array.from(files || [])

    if (files) {
      // Initialize progress array with zeros
      setUploadProgress(new Array(arrFiles.length).fill(0))
      const droppedFiles = Array.from(files)
      processFiles(droppedFiles)

      try {
        uploadFiles(Array.from(files), {
          onSuccess: (val) => {
            const mapId = val.map(el => el.id)
            setId(mapId)
            arrFiles.forEach((_, index) => {
              markUploadComplete(selectedFiles.length + index)
            })
          },
          onError: () => {
            setStatusUpload('failed')
            arrFiles.forEach((_, index) => {
              markUploadIncomplete(selectedFiles.length + index)
            })
            console.error('Upload failed')
          }
        })
      } catch (error) {
        setStatusUpload('failed')
        console.error(error)
      }
    }
  }

  const handleFileInputChangeDragger = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      processFiles(Array.from(files))
    }
  }

  return {
    handleFileInputChange,
    handleDrop,
    handleFileInputChangeDragger,
    selectedFiles,
    setSelectedFiles,
    imagePreviews,
    setImagePreviews,
    extensionNames,
    extensionFileNames,
    setExtensionNames,
    setExtensionFileNames,
    fileTypes,
    setFileTypes,
    imageTypes,
    setImageTypes,
    uploadProgress,
    setUploadProgress,
    statusUpload,
    isError,
    uploadCompletion,
    id
  }
}
