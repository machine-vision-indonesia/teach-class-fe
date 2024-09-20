import React, { SyntheticEvent, useState } from 'react'
import { Typography, Stack, Box, useTheme } from '@mui/material'
import { PropsAccordion, TypeAccordionData } from '../types/accordion.types' // Assuming AccordionData interface is defined in accordion.types
import { AccordionCustom, AccordionDetailsCustom, AccordionSummaryCustom } from '../styles/Accordion.style'
import Icon from '@/@core/components/icon'
import { COLOR_VARIANT } from '../constants/accordion.constant'

/**
 * Renders an Accordion component based on the provided data and settings.
 *
 * @param {PropsAccordion} data - Array of data items to be displayed in the accordion
 * @param {string} variant - Variant of the accordion ('default', 'withButton', 'withButtonAdditional', 'stripped')
 * @param {string} bgColor - Background color of the accordion
 * @param {boolean} disabled - Flag to disable the accordion
 * @param {boolean} hover - Flag to enable hover effect
 * @param {string} strippedColor - Color used for stripped variant
 * @return {JSX.Element} The rendered Accordion component
 */
const Accordion: React.FC<PropsAccordion> = ({
  data = [],
  variant = 'default',
  bgColor = '#ffffff',
  disabled = false,
  hover = true,
  strippedColor = 'primary'
}) => {
  const { palette } = useTheme()
  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const colorStrip = COLOR_VARIANT[strippedColor] || COLOR_VARIANT.primary

  return (
    <Stack direction='column' spacing={4} sx={{ width: '100%' }}>
      {data.map((v: TypeAccordionData, i: number) => {
        const isExpanded = expanded === `panel${i}`
        const isDisabled = disabled || v.disabled

        return (
          <Box key={'k' + i} position='relative' className='custom-accordion-wrapper'>
            <AccordionCustom
              bgColor={bgColor}
              className='accordion-custom'
              expanded={isExpanded}
              onChange={isDisabled ? undefined : handleChange(`panel${i}`)} // Disable onChange if disabled
              disabled={isDisabled} // Set disabled prop on Accordion
            >
              <AccordionSummaryCustom
                bgColor={bgColor}
                sx={{
                  '&:hover': {
                    border: hover ? '2px solid #d3d1d1' : '', // Define your hover background color here
                    cursor: 'pointer' // Change cursor on hover
                  }
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingRight: '8px'
                  }}
                >
                  <Stack direction='row' spacing={8} alignItems='center'>
                    <Stack direction='row' spacing={2} alignItems='center'>
                      {v.image || (
                        <Icon
                          color={palette.getContrastText(bgColor)}
                          fontSize={'18px'}
                          icon={v?.icon || (isExpanded ? 'tabler:chevron-down' : 'tabler:chevron-right')}
                        />
                      )}
                      <Typography className='summary-title' variant='body1' color={palette.getContrastText(bgColor)}>
                        {v.title}
                      </Typography>
                      {v.badge}
                      {v.leftElement}
                    </Stack>

                    {variant === 'withButton' && (
                      <>
                        {v.buttons ? (
                          <Box onClick={e => e.stopPropagation()}>{v.buttons}</Box>
                        ) : (
                          <>
                            {v.image && (
                              <Icon
                                className='summary-icon'
                                color={palette.getContrastText(bgColor)}
                                fontSize='18px'
                                icon={v?.icon || (isExpanded ? 'tabler:chevron-down' : 'tabler:chevron-right')}
                              />
                            )}
                          </>
                        )}
                      </>
                    )}

                    {variant === 'withButtonAdditional' && (
                      <>
                        {v.additional && (
                          <Stack direction='row' spacing={2} alignItems='center'>
                            <Typography
                              className='summary-title'
                              variant='body1'
                              color={palette.getContrastText(bgColor)}
                            >
                              {v.additional}
                            </Typography>
                          </Stack>
                        )}
                        {v.buttons ? (
                          <Box onClick={e => e.stopPropagation()}>{v.buttons}</Box>
                        ) : (
                          <>
                            {v.image && (
                              <Icon
                                className='summary-icon'
                                color={palette.getContrastText(bgColor)}
                                fontSize='18px'
                                icon={v?.icon || (isExpanded ? 'tabler:chevron-down' : 'tabler:chevron-right')}
                              />
                            )}
                          </>
                        )}
                      </>
                    )}
                  </Stack>
                  {v.rightElement}
                </Box>
              </AccordionSummaryCustom>
              <AccordionDetailsCustom bgColor={bgColor}>
                {typeof v.content === 'string' ? (
                  <Typography variant='body2' color={palette.getContrastText(bgColor)}>
                    {v.content}
                  </Typography>
                ) : (
                  v.content
                )}
              </AccordionDetailsCustom>
            </AccordionCustom>

            {variant === 'stripped' && (
              <Box
                className='accordion-bar'
                position='absolute'
                zIndex={1}
                width='6px'
                height='100%'
                bgcolor={colorStrip}
                top={0}
                sx={{
                  borderTopLeftRadius: thm => thm.shape.borderRadius,
                  borderBottomLeftRadius: thm => thm.shape.borderRadius
                }}
              />
            )}
          </Box>
        )
      })}
    </Stack>
  )
}

export default Accordion
