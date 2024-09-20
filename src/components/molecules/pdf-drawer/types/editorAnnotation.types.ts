import { Dispatch, SetStateAction } from 'react'
import ItemEditorAnnotationInterface from './itemEditorAnnotation.types'

export default interface EditorAnnotationInterface {
  itemAnnotations: ItemEditorAnnotationInterface[]
  setItemAnnotations: Dispatch<SetStateAction<ItemEditorAnnotationInterface[]>>
  tempItemAnnotations: ItemEditorAnnotationInterface[]
  setTempItemAnnotations: Dispatch<SetStateAction<ItemEditorAnnotationInterface[]>>
  historyPosition: number | undefined
  setHistoryPosition: Dispatch<SetStateAction<number>>
  addAnnotationItem: (props: { type: 'checklist' | 'cross' | 'text' | 'draw'; text?: string }) => void
  undoAnnotationItem: () => void
  redoAnnotationItem: () => void
  toggleEraseMode: () => void
  toggleSelectMode: () => void
  isEraseMode: boolean
  isSelectMode: boolean
  setIsEraseMode: Dispatch<SetStateAction<boolean>>
  setIsSelectMode: Dispatch<SetStateAction<boolean>>
  removeAnnotationItem: (annotationId: string) => void
}
