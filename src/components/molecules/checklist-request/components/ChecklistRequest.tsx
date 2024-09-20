import { Box, Grid, useTheme } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Checkbox } from '@/components/atoms/checkbox'
import { ChecklistRequestProps, ICheckboxValues } from '../types/checklistRequest.types'

export const ChecklistRequest: React.FC<ChecklistRequestProps> = ({
  title = 'Label',
  options = [],
  disabled = false,
  labelKey = 'label',
  valueKey = 'id',
  onChange = () => {},
  value = [],
  bordered = true,
  padded = true
}) => {
  const theme = useTheme()

  const [checkboxValues, setCheckboxValues] = useState<ICheckboxValues>({})

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>, id: string, label: string) => {
    setCheckboxValues(prevValues => {
      const keyValues = Array.isArray(prevValues[title]) ? prevValues[title] : []

      let newValues
      if (e.target.checked) {
        newValues = {
          ...prevValues,
          [title]: [
            ...keyValues,
            {
              [valueKey]: id,
              [labelKey]: label
            }
          ]
        }
      } else {
        newValues = {
          ...prevValues,
          [title]: keyValues.filter(item => item.id !== id)
        }
      }

      return newValues
    })
  }

  useEffect(() => {
    if (value.length > 0) {
      setCheckboxValues({
        [title]: value
      })
    }
  }, [])

  useEffect(() => {
    onChange(checkboxValues)
  }, [checkboxValues])

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'start'}
      borderRadius={'6px'}
      border={`${bordered ? '1px' : '0px'} solid ${theme.colorToken.border.neutral.normal}`}
      padding={padded ? '16px 18px' : 0}
      width={'100%'}
      gap={'8px'}
    >
      {!!title && (
        <MvTypography typeSize={'PX'} size={'LABEL_LG_BOLDEST'}>
          {title}
        </MvTypography>
      )}

      <Grid container rowSpacing={{ xs: '18px' }} columnSpacing={{ xs: '8px' }} columns={4}>
        {options.map((option, index: number) => (
          <Grid item xs={1} key={index}>
            <Checkbox
              disabled={disabled || option.disabled}
              label={option[labelKey || 'label']}
              onChange={e => handleCheckboxChange(e, option[valueKey || 'id'], option[labelKey || 'label'])}
              checked={
                !!checkboxValues[title]?.find(optionItem => optionItem[valueKey || 'id'] === option[valueKey || 'id'])
              }
              size='large'
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
