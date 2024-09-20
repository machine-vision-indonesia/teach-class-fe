import { useRef, useState } from 'react'
import { Box, useTheme } from '@mui/material'
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable'
import Image from 'next/image'
import EditorAnnotationInterface from '../types/editorAnnotation.types'
import ItemEditorAnnotationInterface from '../types/itemEditorAnnotation.types'
import checklistIcon from '../images/check.png'
import crossIcon from '../images/cross.png'

function ItemEditorAnnotation(props: {
  data: ItemEditorAnnotationInterface
  editorAnnotation: EditorAnnotationInterface
  parentNode?: HTMLDivElement | null
  hidden: boolean
  onClick?: () => void
  isEraseMode: boolean | undefined
  isSelectMode: boolean | undefined
}) {
  const theme = useTheme()

  const [isHovered, setIsHovered] = useState(false)
  function onStopDraggableText(event: DraggableEvent, data: DraggableData, targetId: string) {
    const parentNode = props?.parentNode || undefined
    const clientRect = parentNode?.getBoundingClientRect()

    const heightPercentage = clientRect?.height ? data.x / (clientRect.height / 100) : 0
    const widthPercentage = clientRect?.width ? data.y / (clientRect?.width / 100) : 0

    props.editorAnnotation.setItemAnnotations(items => {
      const result = items.map(item => {
        if (item.id === targetId) {
          return {
            id: item.id,
            page: item.page,
            text: item.text,
            image: item.image,
            type: item.type,
            position: {
              heightPercentage: heightPercentage,
              widthPercentage: widthPercentage
            }
          }
        }

        return item
      })

      return result
    })
  }

  if (props.data.type === 'text') {
    return (
      <Draggable
        key={props.data.id}
        defaultPosition={{
          x: props.data.position.heightPercentage,
          y: props.data.position.widthPercentage
        }}
        bounds={'parent'}
        onStop={(event, data) => onStopDraggableText(event, data, props.data.id)}
        disabled={!props.isSelectMode || props.hidden}
      >
        <Box
          width={'fit-content'}
          data-id={props.data.id}
          sx={{
            position: 'absolute',
            fontSize: 12,
            opacity: props.hidden ? 0 : 1,
            color: theme.colorToken.text.danger.normal,
            outline: props.isSelectMode
              ? isHovered
                ? `${theme.colorToken.border.primary.normal} solid 2px`
                : 'none'
              : props.isEraseMode
                ? isHovered
                  ? `${theme.colorToken.border.danger.normal} solid 2px`
                  : 'none'
                : 'none'
          }}
          onClick={() => {
            if (props.isEraseMode) {
              props.editorAnnotation.removeAnnotationItem(props.data.id)
            }
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {props.data.text}
        </Box>
      </Draggable>
    )
  }

  if (props.data.type === 'checklist') {
    return (
      <Draggable
        key={props.data.id}
        defaultPosition={{
          x: props.data.position.heightPercentage,
          y: props.data.position.widthPercentage
        }}
        bounds={'parent'}
        onStop={(event, data) => onStopDraggableText(event, data, props.data.id)}
        disabled={!props.isSelectMode || props.hidden}
      >
        <Image
          src={checklistIcon}
          width={14}
          height={14}
          alt='Check Image'
          data-id={props.data.id}
          style={{
            position: 'absolute',
            opacity: props.hidden ? 0 : 1,
            outline: props.isSelectMode
              ? isHovered
                ? `${theme.colorToken.border.primary.normal} solid 2px`
                : 'none'
              : props.isEraseMode
                ? isHovered
                  ? `${theme.colorToken.border.danger.normal} solid 2px`
                  : 'none'
                : 'none'
          }}
          onClick={() => {
            if (props.isEraseMode) {
              props.editorAnnotation.removeAnnotationItem(props.data.id)
            }
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </Draggable>
    )
  }

  if (props.data.type === 'cross') {
    return (
      <Draggable
        key={props.data.id}
        defaultPosition={{
          x: props.data.position.heightPercentage,
          y: props.data.position.widthPercentage
        }}
        bounds={'parent'}
        onStop={(event, data) => onStopDraggableText(event, data, props.data.id)}
        disabled={!props.isSelectMode || props.hidden}
      >
        <Image
          src={crossIcon}
          width={14}
          height={14}
          alt='Cross Image'
          data-id={props.data.id}
          style={{
            position: 'absolute',
            opacity: props.hidden ? 0 : 1,
            outline: props.isSelectMode
              ? isHovered
                ? `${theme.colorToken.border.primary.normal} solid 2px`
                : 'none'
              : props.isEraseMode
                ? isHovered
                  ? `${theme.colorToken.border.danger.normal} solid 2px`
                  : 'none'
                : 'none'
          }}
          onClick={() => {
            if (props.isEraseMode) {
              props.editorAnnotation.removeAnnotationItem(props.data.id)
            }
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </Draggable>
    )
  }

  if (props.data.type === 'draw') {
    return (
      <Draggable
        key={props.data.id}
        defaultPosition={{
          x: props.data.position.heightPercentage,
          y: props.data.position.widthPercentage
        }}
        bounds={'parent'}
        onStop={(event, data) => onStopDraggableText(event, data, props.data.id)}
        disabled={!props.isSelectMode || props.hidden}
      >
        <Image
          src={props.data.image ?? ''}
          width={400}
          height={200}
          alt='Draw Image'
          data-id={props.data.id}
          style={{
            position: 'absolute',
            opacity: props.hidden ? 0 : 1,
            outline: props.isSelectMode
              ? isHovered
                ? `${theme.colorToken.border.primary.normal} solid 2px`
                : 'none'
              : props.isEraseMode
                ? isHovered
                  ? `${theme.colorToken.border.danger.normal} solid 2px`
                  : 'none'
                : 'none'
          }}
          onClick={() => {
            if (props.isEraseMode) {
              props.editorAnnotation.removeAnnotationItem(props.data.id)
            }
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </Draggable>
    )
  }

  return <Box>Unsupported Data Type</Box>
}

export default function PDFEditor(props: {
  editorAnnotation: EditorAnnotationInterface
  currentPage: number
  isEraseMode?: boolean
  isSelectMode?: boolean
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const historyPosition = props.editorAnnotation.historyPosition
  const itemAnnotations = props.editorAnnotation.itemAnnotations.filter((_, index) => index <= (historyPosition ?? 0))

  return (
    <Box ref={wrapperRef} position={'absolute'} width={'100%'} height={'100%'} top={0} zIndex={4}>
      {itemAnnotations.map(data => (
        <ItemEditorAnnotation
          key={data.id}
          data={data}
          editorAnnotation={props.editorAnnotation}
          parentNode={wrapperRef?.current}
          hidden={data.page !== props.currentPage}
          isEraseMode={props.isEraseMode}
          isSelectMode={props.isSelectMode}
        />
      ))}
    </Box>
  )
}
