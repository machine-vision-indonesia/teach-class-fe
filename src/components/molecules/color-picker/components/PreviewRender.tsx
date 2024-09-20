import React from 'react'
import { PreviewProps } from '../types/preview.types'
import { hexToRgba, RgbaColor } from '@uiw/react-color'
import { Button } from '@mui/material'

const PreviewRender = ({ nameText, color, size }: PreviewProps) => {
  const newColor: string = color as string
  let hexColor = newColor
  if (newColor.length < 3) {
    while (hexColor.length < 3) {
      hexColor = '00' + hexColor
    }
  }
  const rgbaColor: RgbaColor = hexToRgba(hexColor)

  const getLuminance = (r: any, g: any, b: any) => {
    const a = [r, g, b].map(v => {
      v /= 255

      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    })

    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
  }

  const isLightColor = (r: any, g: any, b: any) => {
    const luminance = getLuminance(r, g, b)

    return luminance > 0.5
  }

  return (
    <Button
      variant='contained'
      size={size}
      sx={{
        borderRadius: 10,
        backgroundColor: `${color}`,
        color: '#FFF',
        '&:hover': {
          backgroundColor: `${color}`
        }
      }}
    >
      {nameText}
    </Button>
  )
}

export default PreviewRender
