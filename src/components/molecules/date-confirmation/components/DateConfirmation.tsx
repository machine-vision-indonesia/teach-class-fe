import React, { useState } from 'react'
import { Box, Grid, Stack, useTheme } from '@mui/material'
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from '@mui/lab'
import { timelineItemClasses } from '@mui/lab/TimelineItem'
import { createSections, getSeparatorColor } from '../utils'
import { DateSection } from './DateSection'
import { ValuesState, Section } from '../types/dateSection.types'
import { DateConfirmationProps } from '../types/dateConfirmation.types'

export const DateConfirmation: React.FC<DateConfirmationProps> = ({
  sectionTitles = [],
  initialValues = {},
  disabledSections = {},
  onChange,
  direction = 'column'
}) => {
  const theme = useTheme()
  const sections = createSections(sectionTitles)

  const initializeValues = (sections: Section[]) => {
    const values: ValuesState = {}
    sections.forEach(section => {
      values[section.id] = initialValues[section.id] || { date: null, selectedOption: '' }
    })
    return values
  }

  const [Values, setValues] = useState<ValuesState>(initializeValues(sections))
  const [selectedDisabledSections, setDisabledSections] = useState<{ [key: string]: boolean }>({ ...disabledSections })

  const handleChange = (sectionId: string, field: keyof ValuesState[string], value: any) => {
    const updatedValues = {
      ...Values,
      [sectionId]: {
        ...Values[sectionId],
        [field]: value
      }
    }
    setValues(updatedValues)
    onChange(updatedValues)
  }

  return (
    <Stack display='flex' justifyContent='center' alignItems='left'>
      <Stack direction='row' spacing={2} width={'100%'}>
        {direction === 'column' && (
          <Timeline
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0
              }
            }}
            position='right'
          >
            {sections.map((section, index) => (
              <TimelineItem key={section.id}>
                <TimelineSeparator>
                  <TimelineDot
                    sx={{ bgcolor: getSeparatorColor(index, Values, selectedDisabledSections, theme, sections) }}
                  />
                  {index < sections.length && (
                    <TimelineConnector
                      sx={{
                        color: getSeparatorColor(index, Values, selectedDisabledSections, theme, sections),
                        width: '1px',
                        borderStyle: 'dashed',
                        borderWidth: '2px'
                      }}
                    />
                  )}
                </TimelineSeparator>
                <TimelineContent>
                  <DateSection
                    title={section.title}
                    date={Values[section.id]?.date || null}
                    selectedOption={Values[section.id]?.selectedOption || ''}
                    onDateChange={date => handleChange(section.id, 'date', date)}
                    onOptionChange={event => handleChange(section.id, 'selectedOption', event.target.value)}
                    isdisable={selectedDisabledSections[section.id] || Boolean(Values[section.id]?.date)}
                    direction='column'
                  />
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        )}
        {direction === 'row' && (
          <Grid container columns={{ xs: 1, sm: 2, md: 3 }} spacing={4}>
            {sections.map((section, index) => (
              <Grid
                item
                xs={1}
                key={section.id}
                sx={{
                  paddingLeft: index === 0 ? '0px !important' : '',
                  paddingTop: 0 + ' !important'
                }}
              >
                <Box
                  width={'100%'}
                  border={`1px solid ${theme.colorToken.border.neutral.normal}`}
                  borderRadius={'6px'}
                  padding={'16px'}
                >
                  <DateSection
                    title={section.title}
                    date={Values[section.id]?.date || null}
                    selectedOption={Values[section.id]?.selectedOption || ''}
                    onDateChange={date => handleChange(section.id, 'date', date)}
                    onOptionChange={event => handleChange(section.id, 'selectedOption', event.target.value)}
                    isdisable={selectedDisabledSections[section.id] || Boolean(Values[section.id]?.date)}
                    direction='row'
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Stack>
    </Stack>
  )
}
