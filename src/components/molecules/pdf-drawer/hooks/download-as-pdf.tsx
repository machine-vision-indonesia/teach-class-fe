import { PDFDocument, rgb } from 'pdf-lib'
import EditorAnnotationInterface from '../types/editorAnnotation.types'
import { checklistBase64 } from '../constants'
import { crossBase64 } from '../constants'

export default async function DownloadAsPDF(props: { url: string; editorAnnotation: EditorAnnotationInterface }) {
  const existingPdfBytes = await fetch(props.url).then(res => res.arrayBuffer())
  const pdfDoc = await PDFDocument.load(existingPdfBytes)
  const pages = pdfDoc.getPages()

  const checklistImageBytes = await fetch(checklistBase64).then(res => res.arrayBuffer())
  const crossImageBytes = await fetch(crossBase64).then(res => res.arrayBuffer())
  const checkImage = await pdfDoc.embedPng(checklistImageBytes)
  const crossImage = await pdfDoc.embedPng(crossImageBytes)

  for (let index = 1; index <= pages.length; index++) {
    const page = pages[index - 1]
    const imgRatio = 1.5
    const { width, height } = page.getSize()

    const annotationItems = props.editorAnnotation.itemAnnotations.filter(value => value.page === index)

    for (const item of annotationItems) {
      const positionWidth = (width * item.position.widthPercentage) / 100
      const positionHeight = (height * item.position.heightPercentage) / 100

      if (item.type === 'text') {
        const textSize = 12 / imgRatio
        page.drawText(item.text ?? '', {
          x: positionHeight - 0.5,
          y: height - textSize - positionWidth + 0.8,
          size: textSize,
          color: rgb(1, 0, 0)
        })
      }

      if (item.type === 'checklist') {
        const checkSize = 14 / imgRatio
        page.drawImage(checkImage, {
          width: checkSize,
          height: checkSize,
          x: positionHeight - 0.5,
          y: height - checkSize - positionWidth
        })
      }

      if (item.type === 'cross') {
        const crossSize = 14 / imgRatio
        page.drawImage(crossImage, {
          width: crossSize,
          height: crossSize,
          x: positionHeight - 0.5,
          y: height - crossSize - positionWidth
        })
      }

      if (item.type === 'draw') {
        const checkImage = await pdfDoc.embedPng(item.image ?? '')
        const [itemWidth, itemHeight] = [400 / imgRatio, 200 / imgRatio]
        page.drawImage(checkImage, {
          width: itemWidth,
          height: itemHeight,
          x: positionHeight,
          y: height - itemHeight - positionWidth
        })
      }
    }
  }

  const pdfBytes = await pdfDoc.save({})
  const blob = new Blob([pdfBytes], { type: 'application/pdf' })

  const url = URL.createObjectURL(blob)
  window.open(url)
}
