import { Box, Card, FormHelperText, Stack, useTheme } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Fade from '@mui/material/Fade'
import TrapFocus from '@mui/material/Unstable_TrapFocus'
import { Sketch } from '@uiw/react-color'
import { ColorResult } from '@uiw/color-convert'
import TextField from '@mui/material/TextField'
import { PropsColorPicker } from '../types/colorPicker.types'
import { BoxStyleColorPicker, CardColorPicker } from '../styles/colorPicker.styles'
import { getSize } from '../utils'
import PreviewRender from './PreviewRender'

/**
 * Color Picker adalah komponen esensial dalam antarmuka pengguna yang dirancang untuk memfasilitasi
 * pemilihan warna secara intuitif dan akurat. Alat ini sangat penting dalam berbagai aplikasi, terutama
 * dalam desain grafis, pengembangan web, dan perangkat lunak yang memerlukan personalisasi warna.
 */
export const ColorPicker = ({
  nameText,
  size,
  defaultValue,
  onChange,
  isPreview,
  required = false,
  helperText
}: PropsColorPicker) => {
  const theme = useTheme()
  const [hex, setHex] = useState(theme.colorToken.background.primary.normal)
  const [bannerOpen, setBannerOpen] = useState(false)

  const customColor = [
    theme.colorToken.background.primary.normal,
    theme.colorToken.background.danger.normal,
    theme.colorToken.background.success.normal,
    theme.colorToken.background.warning.normal,
    theme.colorToken.background.info.normal,
    theme.palette.accent.main,
    theme.colorToken.background.brickRed.normal,
    theme.colorToken.background.pink.normal,
    theme.colorToken.background.violet.normal,
    theme.colorToken.background.purple.normal,
    theme.colorToken.background.violetBlue.normal,
    theme.colorToken.background.royalBlue.normal,
    theme.colorToken.background.dodgerBlue.normal,
    theme.colorToken.background.cyan.normal,
    theme.colorToken.background.seaGreen.normal,
    theme.colorToken.background.springGreen.normal
  ]

  const handleChange = (newValue: ColorResult) => {
    const hexCode: string = newValue.hex?.includes('#') ? newValue.hex : `#${newValue.hex}`
    setHex(hexCode)
    if (onChange) {
      onChange(newValue.hex?.replace(/^#/, ''))
    }
  }

  useEffect(() => {
    if (defaultValue) {
      const hexCode: string = defaultValue?.includes('#') ? defaultValue : `#${defaultValue}`
      setHex(hexCode)
    }
  }, [defaultValue])

  return (
    <Card
      sx={{
        boxShadow: 'none',
        width: '100%'
      }}
    >
      <CardContent sx={CardColorPicker}>
        <Stack width={'100%'}>
          <Box sx={BoxStyleColorPicker}>
            <Button
              onClick={() => {
                setBannerOpen(!bannerOpen)
              }}
              sx={{
                width: getSize.boxSize(size),
                height: getSize.boxSize(size),
                backgroundColor: `${hex}`,
                minWidth: 0,
                minHeight: 0,
                '&:hover': {
                  backgroundColor: `${hex}`
                }
              }}
            />
            <TextField
              size={size == 'small' ? undefined : getSize.textFieldSize(size)}
              sx={{
                width: '100%',
                paddingLeft: 1,
                '& .MuiInputBase-input': size == 'small' ? { fontSize: 12, height: 30, padding: 1 } : undefined
              }}
              value={hex.toUpperCase()}
              onChange={event => {
                const newColorResult: ColorResult = {
                  hex: event.target.value,
                  hsl: { h: 0, s: 0, l: 0 },
                  hsv: { h: 0, s: 0, v: 0 },
                  rgb: { r: 0, g: 0, b: 0 },
                  rgba: { r: 0, g: 0, b: 0, a: 0 },
                  hsla: { h: 0, s: 0, l: 0, a: 0 },
                  hsva: { h: 0, s: 0, v: 0, a: 0 },
                  hexa: event.target.value
                }
                handleChange(newColorResult)
              }}
              error={Boolean(helperText)}
            />
          </Box>

          {bannerOpen && (
            <Box sx={{ position: 'fixed', inset: 0, zIndex: 9998 }} onClick={() => setBannerOpen(false)} />
          )}
          <TrapFocus open disableAutoFocus disableEnforceFocus>
            <Fade
              appear={true}
              in={bannerOpen}
              onDoubleClick={() => {
                setBannerOpen(!bannerOpen)
              }}
            >
              <Paper
                role='dialog'
                sx={{
                  position: 'absolute',
                  top: size === 'small' ? '57px' : size === 'medium' ? '60px' : '75px',
                  zIndex: 9999
                }}
              >
                <Sketch color={hex} onChange={handleChange} presetColors={customColor} />
              </Paper>
            </Fade>
          </TrapFocus>
        </Stack>
        {isPreview ? (
          <Stack sx={{ marginLeft: 2 }} direction='column' justifyContent='center'>
            <PreviewRender nameText={nameText} color={hex} size={getSize.previewSize(size)} />
          </Stack>
        ) : (
          <></>
        )}
      </CardContent>
      {helperText && (
        <FormHelperText
          sx={{
            color: theme.palette.error.main,
            px: '14px',
            mt: '-18px'
          }}
        >
          {helperText}
        </FormHelperText>
      )}
    </Card>
  )
}
