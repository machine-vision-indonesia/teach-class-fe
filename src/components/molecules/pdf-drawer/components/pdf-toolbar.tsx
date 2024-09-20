'use client'
import dynamic from 'next/dynamic'
import { Box, IconButton, useTheme } from '@mui/material'
import DownloadAsPDF from '../hooks/download-as-pdf'
import { Dispatch, SetStateAction, useState } from 'react'
import AddTextEditor from './add-text-editor'
import EditorAnnotationInterface from '../types/editorAnnotation.types'
import { Icon } from '@iconify/react'
import { Button } from 'src/components/atoms'
import { MvTypography } from '@/components/atoms/mv-typography'

const AddDrawEditor = dynamic(() => import('./add-draw-editor'), {
  ssr: false
})

export default function PDFToolbar(props: {
  url: string
  editorAnnotation: EditorAnnotationInterface
  viewer: {
    pages: number
    currentPage: number
    setCurrentPage: Dispatch<SetStateAction<number>>
    currentScale: number
    setCurrentScale: Dispatch<SetStateAction<number>>
    currentRotation: number
    setCurrentRotation: Dispatch<SetStateAction<number>>
    isFitToWidth: boolean
    setIsFitToWidth: Dispatch<SetStateAction<boolean>>
  }
  editable?: boolean
  downloadable?: boolean
  isEraseMode?: boolean
  isSelectMode?: boolean
  isUndoActive?: boolean
  isRedoActive?: boolean
}) {
  const theme = useTheme()

  const [isEraseMode, setIsEraseMode] = useState(false)
  const [isSelectMode, setIsSelectMode] = useState(false)
  const [moreIsActive, setMoreIsActive] = useState(false)

  return (
    <Box
      top={0}
      position={'sticky'}
      zIndex={5}
      sx={{
        backgroundColor: theme.colorToken.background.neutral.normal,
        boxShadow: `0 1px 4px 0px ${theme.palette.neutral[500]}`
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '16px'
        }}
        bgcolor={theme.colorToken.background.neutral.normal}
      >
        <Box display={'flex'} columnGap={'8px'} alignItems={'center'}>
          <Button
            variant='outlined'
            color='primary'
            content='iconOnly'
            icon='tabler:arrow-back-up'
            disabled={!props.editable || !props.isUndoActive}
            onClick={() => props.editorAnnotation.undoAnnotationItem()}
            sx={{
              paddingX: 2,
              minWidth: 0
            }}
          />
          <Button
            variant='outlined'
            color='primary'
            content='iconOnly'
            icon='tabler:arrow-forward-up'
            disabled={!props.editable || !props.isRedoActive}
            onClick={() => props.editorAnnotation.redoAnnotationItem()}
            sx={{
              paddingX: 2,
              minWidth: 0
            }}
          />
        </Box>
        <Box display={'flex'} columnGap={'0px'} alignItems={'center'}>
          <Button
            variant={isSelectMode ? 'solid' : 'plain'}
            color='primary'
            content='iconText'
            icon='tabler:location'
            text='Select'
            onClick={() => {
              setIsSelectMode(!isSelectMode)
              setIsEraseMode(false)
              if (isEraseMode) {
                props.editorAnnotation.toggleEraseMode()
              }

              props.editorAnnotation.toggleSelectMode()
            }}
            disabled={!props.editable}
            sx={{
              paddingX: 4
            }}
          />
          <AddTextEditor addAnnotationItem={props.editorAnnotation.addAnnotationItem} disabled={!props.editable} />
          <AddDrawEditor addAnnotationItem={props.editorAnnotation.addAnnotationItem} disabled={!props.editable} />
          {!moreIsActive && (
            <Button
              variant='plain'
              color='primary'
              content='iconText'
              icon='tabler:grid-dots'
              text='More'
              onClick={() => {
                setMoreIsActive(true)
              }}
              disabled={!props.editable}
              sx={{
                paddingX: 4
              }}
            />
          )}
          {moreIsActive && (
            <>
              <Button
                variant='plain'
                color='primary'
                content='iconText'
                icon='tabler:check'
                text='Check'
                onClick={() => props.editorAnnotation.addAnnotationItem({ type: 'checklist' })}
                disabled={!props.editable}
                sx={{
                  paddingX: 4
                }}
              />
              <Button
                variant='plain'
                color='primary'
                content='iconText'
                icon='tabler:x'
                text='Cross'
                onClick={() => props.editorAnnotation.addAnnotationItem({ type: 'cross' })}
                disabled={!props.editable}
                sx={{
                  paddingX: 4
                }}
              />
            </>
          )}
          <Button
            variant={isEraseMode ? 'solid' : 'plain'}
            color='error'
            content='iconText'
            icon='tabler:eraser'
            text='Eraser'
            onClick={() => {
              setIsEraseMode(!isEraseMode)
              setIsSelectMode(false)
              if (isSelectMode) {
                props.editorAnnotation.toggleSelectMode()
              }

              props.editorAnnotation.toggleEraseMode()
            }}
            disabled={!props.editable}
            sx={{
              paddingX: 4
            }}
          />
        </Box>
        <Box display={'flex'} columnGap={'8px'}>
          <Button
            variant='solid'
            color='success'
            content='textOnly'
            text='Download'
            onClick={() =>
              DownloadAsPDF({
                url: props.url,
                editorAnnotation: props.editorAnnotation
              })
            }
            disabled={!props.downloadable}
            sx={{
              paddingX: 3
            }}
          />
        </Box>
      </Box>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        bgcolor={theme.colorToken.background.neutral.inverted}
        sx={{ color: theme.colorToken.text.neutral.inverted, padding: '12px' }}
      >
        <Box display={'flex'} alignItems={'center'}>
          <IconButton
            sx={{ color: theme.colorToken.text.neutral.inverted }}
            onClick={() =>
              props.viewer.setCurrentPage(value => {
                if (value === 1) return value

                return value - 1
              })
            }
          >
            <Icon fontSize='20px' icon='tabler:chevron-left' />
          </IconButton>
          <Box paddingX={0} display='flex' alignItems='center' gap={2}>
            <Box
              width={24}
              height={24}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              bgcolor={theme.palette.neutral?.black}
            >
              <MvTypography typeSize={'PX'} size={'HELPER_TEXT_MD'} color={theme.colorToken.text.neutral.inverted}>
                {props.viewer.currentPage}
              </MvTypography>
            </Box>
            <MvTypography typeSize={'PX'} size={'LABEL_MD_BOLDEST'} color={theme.colorToken.text.neutral.inverted}>
              /
            </MvTypography>
            <MvTypography typeSize={'PX'} size={'HELPER_TEXT_MD'} color={theme.colorToken.text.neutral.inverted}>
              {props.viewer.pages}
            </MvTypography>
          </Box>
          <IconButton
            sx={{ color: theme.colorToken.text.neutral.inverted }}
            onClick={() =>
              props.viewer.setCurrentPage(value => {
                if (value === props.viewer.pages) return value

                return value + 1
              })
            }
          >
            <Icon fontSize='20px' icon='tabler:chevron-right' />
          </IconButton>
        </Box>
        <MvTypography typeSize={'PX'} size={'SUBTITLE_MD'}>
          |
        </MvTypography>
        <Box display={'flex'} alignItems={'center'}>
          <IconButton
            sx={{ color: theme.colorToken.text.neutral.inverted }}
            onClick={() =>
              props.viewer.setCurrentScale(prevScale => {
                const newScale = Math.max(prevScale - 0.1, 0.5)
                return parseFloat(newScale.toFixed(1))
              })
            }
            disabled={props.viewer.isFitToWidth}
          >
            <Icon fontSize='20px' icon='tabler:minus' />
          </IconButton>
          <Box paddingX={0} display='flex' alignItems='center' gap={2}>
            <Box
              minWidth={50}
              height={24}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              bgcolor={theme.palette.neutral?.black}
            >
              <MvTypography
                typeSize={'PX'}
                size={'HELPER_TEXT_MD'}
                color={
                  props.viewer.isFitToWidth ? theme.palette.neutral['200'] : theme.colorToken.text.neutral.inverted
                }
              >
                {parseFloat((props.viewer.currentScale * 100).toFixed(2))}%
              </MvTypography>
            </Box>
          </Box>
          <IconButton
            sx={{ color: theme.colorToken.text.neutral.inverted }}
            onClick={() =>
              props.viewer.setCurrentScale(prevScale => {
                const newScale = prevScale + 0.1
                return parseFloat(newScale.toFixed(1))
              })
            }
            disabled={props.viewer.isFitToWidth}
          >
            <Icon fontSize='20px' icon='tabler:plus' />
          </IconButton>
        </Box>
        <MvTypography typeSize={'PX'} size={'SUBTITLE_MD'}>
          |
        </MvTypography>
        <Box display={'flex'} alignItems={'center'} gap={0} paddingLeft={2}>
          <IconButton
            sx={{ color: theme.colorToken.text.neutral.inverted }}
            onClick={() => {
              props.viewer.setIsFitToWidth(prev => !prev)
            }}
          >
            <Icon fontSize='20px' icon='tabler:arrows-horizontal' />
          </IconButton>
          <IconButton
            sx={{ color: theme.colorToken.text.neutral.inverted }}
            onClick={() => {
              props.viewer.setCurrentRotation(prevRotation => (prevRotation + 90) % 360)
            }}
          >
            <Icon fontSize='20px' icon='tabler:rotate-dot' />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}
