import { StepConnector, styled, stepConnectorClasses } from '@mui/material'

export const LineConnector = styled(StepConnector)<{
  orientation: 'horizontal' | 'vertical'
  widthLine?: number
  heightLine?: number
  marginLeft?: number
  colorLine?: string
}>(({ orientation, heightLine, marginLeft, colorLine }) => ({
  [`& .${stepConnectorClasses.line}`]: {
    height: orientation === 'horizontal' ? 2 : heightLine,
    width: orientation === 'horizontal' ? '100%' : 2,
    marginLeft: orientation === 'horizontal' ? 0 : marginLeft,
    marginTop: 0,
    border: `2px solid ${colorLine}`,
    backgroundColor: colorLine,
    borderRadius: 1
  }
}))

export const StepIconComponentRoot = styled('div')<{
  state: { completed?: boolean; active?: boolean }
  sizeBox?: string
  fontSizeIndex?: string
  colorComplete?: string
  colorActive?: string
  textActive?: string
  colorIdle?: string
  textIdle?: string
}>(({ state, sizeBox, fontSizeIndex, colorComplete, colorActive, colorIdle, textActive, textIdle }) => ({
  zIndex: 1,
  width: sizeBox,
  height: sizeBox,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: fontSizeIndex,
  fontWeight: 600,
  borderRadius: '50%',
  backgroundColor: colorIdle,
  color: textIdle,

  ...(state.active && {
    backgroundColor: colorActive,
    color: textActive
  }),

  ...(state.completed && {
    backgroundColor: colorComplete,
    color: colorActive
  })
}))
