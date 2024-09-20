import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

import { Box, useTheme } from '@mui/material'
import { Dispatch, RefObject, SetStateAction, useLayoutEffect, useRef, useState } from 'react'
import { Page, Document } from 'react-pdf'
import PDFEditor from './pdf-editor'
import EditorAnnotationInterface from '../types/editorAnnotation.types'
import useResizeObserver from '@react-hook/resize-observer'

const useWidth = (target: RefObject<HTMLElement>): number | null => {
  const [width, setWidth] = useState<number | null>(null)

  useLayoutEffect(() => {
    if (target.current) {
      setWidth(target.current.getBoundingClientRect().width)
    }
  }, [target])

  useResizeObserver(target, entry => setWidth(entry.contentRect.width))

  return width
}

export default function PDFViewer(props: {
  url: string
  editorAnnotation: EditorAnnotationInterface
  viewer: {
    currentPage: number
    setPages: Dispatch<SetStateAction<number>>
    setCurrentPage: Dispatch<SetStateAction<number>>
    currentScale: number
    setCurrentScale: Dispatch<SetStateAction<number>>
    currentRotation: number
    setCurrentRotation: Dispatch<SetStateAction<number>>
    isFitToWidth: boolean
    setIsFitToWidth: Dispatch<SetStateAction<boolean>>
  }
}) {
  const theme = useTheme()

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    props.viewer.setPages(numPages)
  }

  // Apakah memang betul nama nya sesuai yang diupload?
  // const parsedUrl = new URL(props.url)
  // const pathParts = parsedUrl.pathname.split('/')
  // const uuid = pathParts[pathParts.length - 1]

  const wrapperDiv = useRef(null)
  const width = useWidth(wrapperDiv)

  return (
    <Box
      style={{
        height: '90%',
        background: theme.palette.neutral[500],
        display: 'flex',
        justifyContent: 'center'
      }}
      ref={wrapperDiv}
    >
      <Document file={props.url} onLoadSuccess={onDocumentLoadSuccess}>
        <Box margin={'16px'} position={'relative'}>
          <Page
            pageNumber={props.viewer.currentPage}
            scale={props.viewer.isFitToWidth ? 1 : props.viewer.currentScale}
            rotate={props.viewer.currentRotation}
            {...(props.viewer.isFitToWidth
              ? {
                  width: width || undefined
                }
              : {})}
          />
          <PDFEditor
            editorAnnotation={props.editorAnnotation}
            currentPage={props.viewer.currentPage}
            isEraseMode={props.editorAnnotation.isEraseMode}
            isSelectMode={props.editorAnnotation.isSelectMode}
          />
        </Box>
      </Document>
    </Box>
  )
}
