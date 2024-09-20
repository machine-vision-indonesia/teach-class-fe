import React, { useState, useRef, useEffect } from 'react'
import { useTheme } from '@mui/material'
import MvTypographyProps from '../types/mvTypography.types'
import { getContrastRatio } from '@mui/material'
import { getComputedStyleBackgroundColor, rgbToHex, getTextColor, StyledTypography } from '../utils'

const MvTypography: React.FC<MvTypographyProps> = ({
  typeSize = 'PX',
  size = 'BODY_MD_NORMAL',
  children,
  ...props
}) => {
  const theme = useTheme()
  const [textColor, setTextColor] = useState<string>('')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      const parentElement = ref.current.parentElement
      const parentColor = getComputedStyleBackgroundColor(parentElement)
      const rgbValues = parentColor.match(/\d+/g)
      if (rgbValues) {
        const [r, g, b] = rgbValues.map(Number)
        const hexColor = rgbToHex(r, g, b).toUpperCase()
        const contrastRatio = getContrastRatio(`rgb(${r},${g},${b})`, '#ffffff')
        const textColorFromTheme = getTextColor(hexColor, theme)

        if (textColorFromTheme) {
          setTextColor(textColorFromTheme)
        } else {
          if (hexColor === theme?.colorToken?.background?.neutral?.normal) {
            setTextColor(theme?.colorToken?.text?.neutral?.normal)
          } else if (hexColor === theme?.colorToken?.background?.neutral?.subtle) {
            setTextColor(theme?.colorToken?.text?.neutral?.normal)
          } else if (hexColor === theme?.colorToken?.background?.neutralInverted?.normal) {
            setTextColor(theme?.colorToken?.text?.neutral?.inverted || theme?.colorToken?.text?.neutralInverted?.normal)
          } else {
            if (contrastRatio < 5.5) {
              if (contrastRatio < 2) {
                setTextColor(theme?.colorToken?.text?.neutral?.normal)
              } else {
                setTextColor(theme?.colorToken?.text?.neutral?.inverted || theme?.colorToken?.background?.neutral?.normal)
              }
            } else {
              setTextColor(theme?.colorToken?.text?.neutral?.normal)
            }
          }
        }
      } else {
        setTextColor(theme.palette.getContrastText(parentColor))
      }
    }
  }, [theme])

  return (
    <StyledTypography ref={ref} typeSize={typeSize} size={size} color={props.color || textColor} {...props}>
      {children}
    </StyledTypography>
  )
}

export default MvTypography
