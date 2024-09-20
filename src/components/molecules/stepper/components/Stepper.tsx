import { Box, Stepper as MuiStepper, Step, StepIconProps, StepLabel, Typography, useTheme } from '@mui/material'
import { PropsStepper } from '../types/stepper.type'
import { StepIconComponentRoot, LineConnector } from '../styles/stepper.style'
import { SIZE_VARIANT } from '../constant/stepper.constant'
import { MvTypography } from '@/components/atoms/mv-typography'

/**
 * Renders a custom stepper component based on the provided data, orientation, and size.
 *
 * @param {PropsStepper} data - The data to be displayed in the stepper.
 * @param {string} orientation - The orientation of the stepper (horizontal or vertical).
 * @param {string} size - The size variant of the stepper (small, medium, large).
 * @return {JSX.Element} The custom stepper component.
 */
export const Stepper = ({ data = [], orientation = 'horizontal', size = 'small' }: PropsStepper) => {
  const { colorToken } = useTheme()
  const dataSize = SIZE_VARIANT[size]

  /**
   * Renders a step icon component with the given props and label.
   *
   * @param {StepIconProps} props - The props for the step icon component.
   * @param {string | undefined} label - The label to be displayed in the step icon component.
   * @return {JSX.Element} The rendered step icon component.
   */
  function StepIconComponent(props: StepIconProps, label: string | undefined) {
    return (
      <StepIconComponentRoot
        state={{ ...props }}
        sizeBox={dataSize.sizeBox}
        fontSizeIndex={dataSize.fontSizeIndex}
        colorComplete={colorToken.background.primary.subtlest}
        colorActive={colorToken.background.primary.normal}
        colorIdle={colorToken.background.neutral.disabled}
        textActive={colorToken.text.neutral.inverted}
        textIdle={colorToken.text.neutral.disabled}
      >
        {label}
      </StepIconComponentRoot>
    )
  }

  /**
   * Returns the text color based on the provided StepIconProps.
   *
   * @param {StepIconProps} props - The props for the step icon component.
   * @return {string} The text color. Returns '#5D5E62' if the step is active,
   *                  the primary color if the step is completed, and the disabled text color otherwise.
   */
  function getTextColor(props: StepIconProps) {
    if (props?.active) return colorToken.text.neutral.normal
    if (props?.completed) return colorToken.background.primary.normal

    return colorToken.text.neutral.disabled
  }
  function getSubTextColor(props: StepIconProps) {
    if (props?.active) return colorToken.text.neutral.normal
    if (props?.completed) return colorToken.text.neutral.normal

    return colorToken.text.neutral.disabled
  }

  /**
   * Renders a line connector component based on the provided orientation, width, height, and margin.
   *
   * @return {JSX.Element} The line connector component.
   */
  function connectorLine() {
    return (
      <LineConnector
        orientation={orientation}
        widthLine={dataSize.widthLine}
        heightLine={dataSize.heightLine}
        marginLeft={dataSize.marginLeft}
        colorLine={colorToken.background.primary.subtlest}
      />
    )
  }

  return (
    <MuiStepper orientation={orientation} connector={connectorLine()} sx={{ width: '100%' }}>
      {data?.map((v, i) => (
        <Step key={i}>
          <StepLabel
            StepIconComponent={() => {
              return StepIconComponent({ active: v?.active, completed: v?.passed } as StepIconProps, `${i + 1}`)
            }}
          >
            <Box sx={{ color: getTextColor({ active: v?.active, completed: v?.passed } as StepIconProps) }}>
              <MvTypography
                typeSize={'PX'}
                size={dataSize.fontSizeLabel as 'LABEL_SM_BOLDEST' | 'LABEL_MD_BOLDEST' | 'LABEL_LG_BOLDEST'}
                children={v?.title}
                sx={{
                  whiteSpace: 'nowrap',
                  color: getTextColor({ active: v?.active, completed: v?.passed } as StepIconProps)
                }}
              />
              <MvTypography
                typeSize={'PX'}
                size={dataSize.fontSizeDesc as 'HELPER_TEXT_SM' | 'HELPER_TEXT_MD' | 'HELPER_TEXT_LG'}
                children={v?.subtitle}
                sx={{
                  whiteSpace: 'nowrap',
                  color: getSubTextColor({ active: v?.active, completed: v?.passed } as StepIconProps)
                }}
              />
            </Box>
          </StepLabel>
        </Step>
      ))}
    </MuiStepper>
  )
}
