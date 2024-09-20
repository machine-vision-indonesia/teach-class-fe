import { useState, useEffect } from 'react'

import * as uuid from 'uuid'
import ItemEditorAnnotationInterface from '../types/itemEditorAnnotation.types'
import EditorAnnotationInterface from '../types/editorAnnotation.types'

export default function usePDFEditor() {
  const [itemAnnotations, setItemAnnotations] = useState<ItemEditorAnnotationInterface[]>([])
  const [tempItemAnnotations, setTempItemAnnotations] = useState<ItemEditorAnnotationInterface[]>([])
  const [historyPosition, setHistoryPosition] = useState<number>(-1)
  const [isUndoActive, setIsUndoActive] = useState<boolean>(false)
  const [isRedoActive, setIsRedoActive] = useState<boolean>(false)

  const [pages, setPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentScale, setCurrentScale] = useState(1.5)
  const [currentRotation, setCurrentRotation] = useState(0)

  const [isFitToWidth, setIsFitToWidth] = useState<boolean>(false)

  const [isEraseMode, setIsEraseMode] = useState(false)
  const [isSelectMode, setIsSelectMode] = useState(false)

  function addAnnotationItem(props: { type: 'checklist' | 'cross' | 'text' | 'draw'; text?: string; image?: string }) {
    if (props.type === 'text' && props?.text === '') return

    const textId = uuid.v4()
    const data: ItemEditorAnnotationInterface = {
      id: textId,
      page: currentPage,
      type: props.type,
      text: props?.text,
      image: props?.image,
      position: {
        heightPercentage: 0,
        widthPercentage: 0
      }
    }

    let newAnnotations
    if (historyPosition < itemAnnotations.length - 1) {
      const histories = itemAnnotations.filter((_, index) => index <= historyPosition)
      newAnnotations = [...histories, data]
      setHistoryPosition(histories.length)
    } else {
      newAnnotations = [...itemAnnotations, data]
      setHistoryPosition(itemAnnotations.length)
    }

    setItemAnnotations(newAnnotations)
    setTempItemAnnotations(newAnnotations)
  }

  function undoAnnotationItem() {
    // Should not continue the process if there is no history
    if (historyPosition == -1) return

    setHistoryPosition(value => value - 1)
  }

  function redoAnnotationItem() {
    // Should not continue the process if there is no next item annotation
    if (historyPosition === tempItemAnnotations.length - 1) return

    setHistoryPosition(value => value + 1)
  }

  function toggleEraseMode() {
    setIsEraseMode(!isEraseMode)
  }

  function toggleSelectMode() {
    setIsSelectMode(!isSelectMode)
  }

  function removeAnnotationItem(annotationId: string) {
    const updatedAnnotations = itemAnnotations.filter(annotation => annotation.id !== annotationId)
    setItemAnnotations(updatedAnnotations)
    setTempItemAnnotations(updatedAnnotations)
    if (historyPosition >= updatedAnnotations.length) {
      setHistoryPosition(updatedAnnotations.length - 1)
    }
  }

  useEffect(() => {
    if (historyPosition == -1) {
      setIsUndoActive(false)
    } else {
      setIsUndoActive(true)
    }
  }, [historyPosition])

  useEffect(() => {
    if (historyPosition === tempItemAnnotations.length - 1) {
      setIsRedoActive(false)
    } else {
      setIsRedoActive(true)
    }
  }, [historyPosition])

  useEffect(() => {
    const newAnnotations = tempItemAnnotations.slice(0, historyPosition + 1)
    if (JSON.stringify(newAnnotations) !== JSON.stringify(itemAnnotations)) {
      setItemAnnotations(newAnnotations)
    }
  }, [historyPosition, tempItemAnnotations])

  const editorAnnotation: EditorAnnotationInterface = {
    itemAnnotations,
    setItemAnnotations,
    tempItemAnnotations,
    setTempItemAnnotations,
    historyPosition,
    setHistoryPosition,
    addAnnotationItem,
    undoAnnotationItem,
    redoAnnotationItem,
    toggleEraseMode,
    toggleSelectMode,
    isEraseMode,
    setIsEraseMode,
    removeAnnotationItem,
    isSelectMode,
    setIsSelectMode
  }

  return {
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
    setIsEraseMode,
    isSelectMode,
    setIsSelectMode,
    isUndoActive,
    isRedoActive,
    isFitToWidth,
    setIsFitToWidth
  }
}
