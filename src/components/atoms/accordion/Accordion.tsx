import React, { SyntheticEvent, useState } from 'react'
import { Icon } from '@iconify/react'
import { Typography, Stack, Box, useTheme } from '@mui/material'

import { AccordionCustom, AccordionDetailsCustom, AccordionSummaryCustom } from './Accordion.style'
import { PropsAccordion } from './Accordion.type'

export const Accordion = ({ data = [], variant = 'default', bgColor = '#ffffff' }: PropsAccordion) => {
  const { palette } = useTheme()
  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Stack direction='column' spacing={1}>
      {data.map((v, i) => {
        const isExpanded = expanded === `panel${i}`

        return (
          <Box key={'k' + i} position='relative' className='custom-accordion-wrapper'>
            <AccordionCustom bgColor={bgColor} className='accordion-custom' expanded={isExpanded} onChange={handleChange(`panel${i}`)}>
              <AccordionSummaryCustom bgColor={bgColor}>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Stack direction='row' spacing={2} alignItems='center'>
                    {v.image || (
                      <Icon
                        className='summary-icon'
                        color={palette.text.secondary}
                        fontSize='18px'
                        icon={v?.icon || (isExpanded ? 'tabler:chevron-down' : 'tabler:chevron-right')}
                      />
                    )}
                    <Typography className='summary-title' variant='menuActive'>
                      {v.title}
                    </Typography>
                    {v.badge}
                  </Stack>

                  {v.buttons ? (
                    <Box onClick={e => e?.stopPropagation()}>{v?.buttons}</Box>
                  ) : (
                    <>
                      {v.image && (
                        <Icon
                          className='summary-icon'
                          color={palette.text.secondary}
                          fontSize='18px'
                          icon={v?.icon || (isExpanded ? 'tabler:chevron-down' : 'tabler:chevron-right')}
                        />
                      )}
                    </>
                  )}
                </Box>
              </AccordionSummaryCustom>
              <AccordionDetailsCustom bgColor={bgColor}>
                {typeof v.content == 'string' ? <Typography variant='body2'>{v.content}</Typography> : v.content}
              </AccordionDetailsCustom>
            </AccordionCustom>

            {variant === 'stripped' && (
              <Box
                className='accordion-bar'
                position='absolute'
                zIndex={1}
                width='6px'
                height='100%'
                bgcolor={thm => thm.palette.customColors?.buttonEnable ?? '#0040FE'}
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
