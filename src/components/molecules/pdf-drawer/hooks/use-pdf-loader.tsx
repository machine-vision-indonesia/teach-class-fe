import { PDFDocument } from 'pdf-lib'
import { useEffect, useState } from 'react'

export function usePDFLoader(url: string) {
  const [data, setData] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    async function fetchAPI(params: string) {
      if (data !== undefined) return

      setIsLoading(true)
      try {
        const response = await fetch(params)
        const arrayBuffer = await response.arrayBuffer()
        const raw = await PDFDocument.load(arrayBuffer)

        const data = await raw.saveAsBase64({ dataUri: true })

        setData(data)
        setIsLoading(false)
      } catch (_) {
        setIsLoading(false)
      }
    }

    fetchAPI(url)
  })

  return { data, isLoading }
}
