export default interface ItemEditorAnnotationInterface {
  id: string
  page: number
  text?: string
  image?: string
  type: 'checklist' | 'cross' | 'text' | 'draw'
  position: {
    heightPercentage: number
    widthPercentage: number
  }
}
