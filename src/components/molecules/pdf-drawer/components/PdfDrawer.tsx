import { Box } from '@mui/material'
import { pdfjs } from 'react-pdf'

import PDFToolbar from './pdf-toolbar'
import PDFViewer from './pdf-viewer'
import IPdfPreview from '../types/mainAnnotation.types'
import usePDFEditor from '../hooks/use-pdf-editor'
import { env } from 'next-runtime-env'
import { eraserBase64 } from '../constants'

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString()

/**
 *
 * PDF Drawer Viewer adalah sebuah fitur yang memungkinkan pengguna untuk melihat dan mengedit dokumen PDF langsung dalam aplikasi. Header PDF Drawer Viewer ini dilengkapi dengan berbagai alat pengeditan seperti Select, Text, Draw, dan Eraser. Ada juga tombol navigasi untuk kembali, kontrol zoom, dan opsi tampilan untuk menyesuaikan lebar atau memutar halaman. Pengguna dapat dengan mudah mengunduh atau mencetak dokumen PDF dengan tombol yang disediakan, menjadikan PDF Drawer Viewer ini sebagai alat yang komprehensif dan efisien untuk pengelolaan dokumen PDF.
 */
export const PDFDrawer = ({ url = '', attachmentId, editable = true, downloadable = true }: IPdfPreview) => {
  const {
    pages,
    setPages,
    currentPage,
    setCurrentPage,
    currentScale,
    setCurrentScale,
    currentRotation,
    setCurrentRotation,
    editorAnnotation,
    isEraseMode,
    isSelectMode,
    isUndoActive,
    isRedoActive,
    isFitToWidth,
    setIsFitToWidth
  } = usePDFEditor()

  if (attachmentId) {
    url = `${env(
      'NEXT_PUBLIC_REST_API_URL'
    )}/assets/${attachmentId}?downloadable=true&preview=true&access_token=${localStorage.getItem('accessToken')}`
  }

  const cursorStyle = isEraseMode
    ? {
        cursor: `url(${eraserBase64}) 16 24, auto`
      }
    : {}

  return (
    <Box style={cursorStyle} width='100%'>
      <PDFToolbar
        url={url}
        editorAnnotation={editorAnnotation}
        viewer={{
          currentPage: currentPage,
          pages,
          setCurrentPage,
          currentScale,
          setCurrentScale,
          currentRotation,
          setCurrentRotation,
          isFitToWidth,
          setIsFitToWidth
        }}
        editable={editable}
        downloadable={downloadable}
        isEraseMode={isEraseMode}
        isSelectMode={isSelectMode}
        isUndoActive={isUndoActive}
        isRedoActive={isRedoActive}
      />
      <PDFViewer
        url={url}
        editorAnnotation={editorAnnotation}
        viewer={{
          currentPage,
          setCurrentPage,
          setPages,
          currentScale,
          setCurrentScale,
          currentRotation,
          setCurrentRotation,
          isFitToWidth,
          setIsFitToWidth
        }}
      />
    </Box>
  )
}
