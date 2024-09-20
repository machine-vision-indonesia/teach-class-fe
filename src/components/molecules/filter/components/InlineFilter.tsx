import { ChangeEvent, useEffect, useState } from 'react'
import { Button, Select } from '@/components/atoms'
import { Input } from '@/components/atoms/input'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Box, Grid, Popover, Stack, useTheme } from '@mui/material'
import ButtonGroup from '@mui/material/ButtonGroup'
import FormControl from '@mui/material/FormControl'
import { useDebounce } from '../hooks/useDebounce'
import { IFilterResult } from '../types/filterResult.types'
import { IFilter } from '../types/filter.types'
import { DataViewControllerType, FilterType } from '../constants'
import { MvTypography } from '@/components/atoms/mv-typography'
import { DateTimePicker } from '@/components/molecules/date-time-picker'
import { Field } from '@/components/molecules/field'
import { Chip } from '@/components/atoms/chip'
import _ from 'lodash'
import { Checkbox } from '@/components/atoms/checkbox'
import { DateRangePicker } from '@/components/molecules/date-range-picker'
import { IFilterMultiSelect } from '../types/inlineFilter.types'
import { SelectAsync } from '@/components/molecules/select-async'

export const InlineFilter: React.FC<IFilter> = ({
  resultController = [],
  dataViewController = [],
  onChange = () => {}
}) => {
  const theme = useTheme()

  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({})
  const [filterSelectValues, setFilterSelectValues] = useState<{ [key: string]: string }>({})
  const [filterMultiSelectValues, setFilterMultiSelectValues] = useState<IFilterMultiSelect>({})
  const [viewSelectValues, setViewSelectValues] = useState<{ [key: string]: string }>({})
  const [viewSelectTempValues, setViewSelectTempValues] = useState<{ id?: string; label?: string }[]>([])
  const debouncedInputValues = useDebounce(inputValues, 1000)
  const [viewMode, setViewMode] = useState<string | undefined>('')

  // filter box //
  const [inputTempValues, setInputTempValues] = useState<{ [key: string]: string }>({})
  const [filterDateValues, setFilterDateValues] = useState<{ [key: string]: string }>({})
  const [filterDateRangeValues, setFilterDateRangeValues] = useState<{
    [key: string]: {
      startDate?: any
      endDate?: any
    }
  }>({})
  const [filterSelectTempValues, setFilterSelectTempValues] = useState<{ id?: string; label?: string }[]>([])

  const [filterMultiSelectTempValues, setFilterMultiSelectTempValues] = useState<IFilterMultiSelect>({})
  const [filterCheckboxTempValues, setFilterCheckboxTempValues] = useState<IFilterMultiSelect>({})
  const [filterBoxIsOpen, setFilterBoxIsOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const resultControllerSliced = resultController.length > 3 ? resultController.slice(1) : []
  const [filterSelectedTemp, setFilterSelectedTemp] = useState({})
  const [viewSelectedTemp, setViewSelectedTemp] = useState({})
  const handleClickFilterBox = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterBoxIsOpen(prev => !prev)
    setAnchorEl(event.currentTarget)
  }
  const handleCloseFilterBox = () => {
    setFilterBoxIsOpen(false)
    setAnchorEl(null)
  }
  const id = filterBoxIsOpen ? 'simple-popover' : undefined

  // filter result
  const [filters, setFilters] = useState<IFilterResult>({
    resultController: {},
    dataController: {}
  })

  const [filterBoxTemp, setFilterBoxTemp] = useState<{ [key: string]: any }>({})

  const handleInputChange = (key: string, value: string) => {
    setInputValues(prevValues => ({
      ...prevValues,
      [key]: value
    }))
  }

  const handleInputTempChange = (key: string, value: string) => {
    setFilterBoxTemp({ ...filterBoxTemp, [key]: value })
  }

  const handleSelectChange = (key: string, id: string, label: string, valueKey: string, labelKey: string) => {
    setFilterSelectValues(prevValues => ({
      ...prevValues,
      [key]: id
    }))
    setFilterSelectTempValues(prevValues => [
      ...prevValues,
      {
        [key]: id,
        [valueKey]: id,
        [labelKey]: label
      }
    ])
    setFilterSelectedTemp(prev => ({
      ...prev,
      [key]: id
    }))
  }

  const handleMultiSelectChange = (e: any, key: string) => {
    setFilterMultiSelectValues(prevValues => ({
      ...prevValues,
      [key]: e
    }))
    setFilterMultiSelectTempValues(prev => ({ ...prev, [key]: e }))
  }

  const handleDateChange = (key: string, value: string) => {
    setFilterDateValues(prevValues => ({
      ...prevValues,
      [key]: value
    }))
  }

  const handleDateRangeChange = (start: any, end: any, key: string) => {
    setFilterDateRangeValues(prevValues => ({
      ...prevValues,
      [key]: {
        startDate: start,
        endDate: end
      }
    }))
  }

  const handleSelectTempChange = (key: string, id: string, label: string, valueKey: string, labelKey: string) => {
    setFilterBoxTemp({ ...filterBoxTemp, [key]: id })
    setFilterSelectTempValues(prevValues => [
      ...prevValues,
      {
        [key]: id,
        [valueKey]: id,
        [labelKey]: label
      }
    ])
    setFilterSelectedTemp(prev => ({
      ...prev,
      [key]: id
    }))
  }

  const handleMultiSelectTempChange = (e: any, key: any) => {
    setFilterBoxTemp({ ...filterBoxTemp, [key]: e })
    setFilterMultiSelectTempValues(prev => ({ ...prev, [key]: e }))
  }

  const handleCheckboxTempChange = (e: ChangeEvent<HTMLInputElement>, key: any, id?: string, label?: string) => {
    setFilterCheckboxTempValues(prevValues => {
      const keyValues = Array.isArray(prevValues[key]) ? prevValues[key] : []

      let newValues
      if (e.target.checked) {
        newValues = {
          ...prevValues,
          [key]: [...keyValues, { id, label }]
        }
      } else {
        newValues = {
          ...prevValues,
          [key]: keyValues.filter(item => item.id !== id)
        }
      }

      setFilterBoxTemp(prev => ({
        ...prev,
        ...newValues
      }))

      return newValues
    })
  }

  const handleViewSelectChange = (key: string, id: string, label: string, valueKey: string, labelKey: string) => {
    setViewSelectValues(prevValues => ({
      ...prevValues,
      [key]: id
    }))
    setViewSelectTempValues(prevValues => [
      ...prevValues,
      {
        [key]: id,
        [valueKey]: id,
        [labelKey]: label
      }
    ])
    setViewSelectedTemp(prev => ({
      ...prev,
      [key]: id
    }))
  }

  const handleDateTempChange = (key: string, value: string) => {
    setFilterBoxTemp({ ...filterBoxTemp, [key]: value })
  }

  const handleDateRangeTempChange = (start: any, end: any, key: string) => {
    setFilterBoxTemp({
      ...filterBoxTemp,
      [key]: {
        startDate: start,
        endDate: end
      }
    })
  }

  const handleClearFilterBoxTemp = () => {
    const fieldToRemove = resultControllerSliced.map(item => {
      return item.key
    })

    const newResultController = Object.keys(filters.resultController)
      .filter(key => !fieldToRemove.includes(key))
      .reduce(
        (acc, key) => {
          acc[key] = filters.resultController[key]
          return acc
        },
        {} as { [key: string]: any }
      )

    setFilters(prevFilters => ({
      ...prevFilters,
      resultController: newResultController
    }))

    setInputTempValues({})
    setFilterSelectTempValues([])
    setFilterMultiSelectTempValues({})
    setFilterCheckboxTempValues({})
    setFilterBoxTemp({})
    setFilterSelectedTemp({})
  }

  const handleApplyFilterBoxTemp = () => {
    setFilters(prev => ({
      ...prev,
      resultController: {
        ...prev.resultController,
        ...filterBoxTemp
      }
    }))
    handleCloseFilterBox()
  }

  const handleChipDelete = (event: any, key: string, value: string) => {
    const updatedResultController = { ...filters.resultController }
    const updatedFilterBox = { ...filterBoxTemp }
    if (updatedResultController[key] === value) {
      delete updatedResultController[key]
    }

    const updatedSelectValues = { ...filterSelectValues }
    if (updatedSelectValues[key] === value) {
      delete updatedSelectValues[key]
    }
    setFilterSelectValues(updatedSelectValues)

    if (updatedFilterBox[key] === value) {
      delete updatedFilterBox[key]
    }

    setFilterBoxTemp(updatedFilterBox)

    setFilters(prev => ({
      ...prev,
      resultController: updatedResultController
    }))

    const updatedTemp = { ...filterSelectedTemp }
    if (updatedTemp[key] === value) {
      delete updatedTemp[key]
    }

    setFilterSelectedTemp(updatedTemp)

    const updatedFilterSelectTemp = filterSelectTempValues.filter(item => {
      return !(item[key] === value)
    })
    setFilterSelectTempValues(updatedFilterSelectTemp)

    const updatedInputValues = { ...inputValues }
    if (updatedInputValues[key] === value) {
      delete updatedInputValues[key]
    }

    setInputValues(updatedInputValues)

    const updatedFilterDateValues = { ...filterDateValues }
    if (updatedFilterDateValues[key] === value) {
      delete updatedFilterDateValues[key]
    }

    setFilterDateValues(updatedFilterDateValues)
  }

  const handleChipMultiSelectDelete = (parentKey: any, key: string, value: string) => {
    const updatedResultController = filters.resultController[parentKey].filter((item: any) => {
      return !(item.id === key)
    })

    setFilters(prev => ({
      ...prev,
      resultController: {
        ...prev.resultController,
        [parentKey]: updatedResultController
      }
    }))

    const updatedArrayMultiSelect = filterMultiSelectTempValues[parentKey]?.filter(item => item.id !== key) || []

    const updatedFilterMultiSelectTempValues = {
      ...filterMultiSelectTempValues,
      [parentKey]: updatedArrayMultiSelect
    }
    setFilterMultiSelectTempValues(updatedFilterMultiSelectTempValues)
    setFilterMultiSelectValues(updatedFilterMultiSelectTempValues)
  }

  const handleChipCheckboxDelete = (parentKey: any, key: string, value: string) => {
    const updatedResultController = filters.resultController[parentKey].filter((item: any) => {
      return !(item.id === key)
    })

    setFilters(prev => ({
      ...prev,
      resultController: {
        ...prev.resultController,
        [parentKey]: updatedResultController
      }
    }))

    const updatedArrayCheckbox = filterCheckboxTempValues[parentKey]?.filter(item => item.id !== key) || []

    const updatedFilterCheckboxTempValues = {
      ...filterCheckboxTempValues,
      [parentKey]: updatedArrayCheckbox
    }
    setFilterCheckboxTempValues(updatedFilterCheckboxTempValues)
  }

  const handleChipDateRangeDelete = (parentKey: any, key: string, value: string, type: 'start' | 'end') => {
    if (type === 'start') {
      const startIsExist = !!filterDateRangeValues[key]?.startDate
      const startIsExistInFilters = !!filters.resultController[key]?.startDate

      if (startIsExistInFilters) {
        setFilters(prev => ({
          ...prev,
          resultController: {
            ...prev.resultController,
            [key]: {
              ...prev.resultController[key],
              startDate: null
            }
          }
        }))
      }

      if (startIsExist) {
        setFilterDateRangeValues(prev => ({
          ...prev,
          [key]: {
            ...prev[key],
            startDate: null
          }
        }))
      }
    }
    if (type === 'end') {
      const endIsExist = !!filterDateRangeValues[key]?.endDate
      const endIsExistInFilters = !!filters.resultController[key]?.endDate

      if (endIsExistInFilters) {
        setFilters(prev => ({
          ...prev,
          resultController: {
            ...prev.resultController,
            [key]: {
              ...prev.resultController[key],
              endDate: null
            }
          }
        }))
      }

      if (endIsExist) {
        setFilterDateRangeValues(prev => ({
          ...prev,
          [key]: {
            ...prev[key],
            endDate: null
          }
        }))
      }
    }
  }

  const renderFilterBox = () => {
    return (
      <Box
        display={'flex'}
        flexDirection={'column'}
        maxWidth={'460px'}
        height='auto'
        bgcolor={theme.colorToken.background.neutral.normal}
      >
        <Box
          display={'flex'}
          gap={2}
          justifyContent={'flex-start'}
          alignItems={'center'}
          padding={4}
          sx={{
            borderBottom: `1px solid ${theme.colorToken.border.neutral.normal}`
          }}
        >
          <Icon icon={'tabler:filter'} width={24} height={24} />
          <MvTypography typeSize={'PX'} size={'BODY_LG_BOLDEST'}>
            Filter
          </MvTypography>
        </Box>
        <Box
          display={'flex'}
          flexDirection={'column'}
          width={'100%'}
          gap={4}
          padding={4}
          height={'280px'}
          overflow={'auto'}
        >
          {resultControllerSliced.map(item => {
            if (item.type === FilterType.SEARCH) {
              return (
                <Field width={'100%'} label={item.name}>
                  <Input
                    InputProps={{
                      startAdornment: <Icon icon={'tabler:search'} width={16} height={16} style={{ marginRight: 8 }} />
                    }}
                    placeholder={item.placeholder || item.name}
                    size='small'
                    value={filterBoxTemp[item.key] || ''}
                    onChange={e => handleInputTempChange(item.key, e.target.value)}
                    sx={{
                      width: '100%'
                    }}
                  />
                </Field>
              )
            }
            if (item.type === FilterType.SELECT) {
              if (item.dataFetchService) {
                return (
                  <Field label={item.name} sx={{ width: '100%' }}>
                    <FormControl size='small' sx={{ width: '100%' }}>
                      <SelectAsync
                        variant='default'
                        data={[]}
                        labelKey={item.labelKey || 'label'}
                        valueKey={item.valueKey || 'id'}
                        placeholder={item.placeholder || item.name}
                        onChange={e =>
                          handleSelectTempChange(
                            item.key,
                            e?.[item.valueKey || 'id'],
                            e?.[item.labelKey || 'label'],
                            item.valueKey || 'id',
                            item.labelKey || 'label'
                          )
                        }
                        setSelected={e =>
                          handleSelectTempChange(
                            item.key,
                            e?.[item.valueKey || 'id'],
                            e?.[item.labelKey || 'label'],
                            item.valueKey || 'id',
                            item.labelKey || 'label'
                          )
                        }
                        selected={filterSelectTempValues.find(fv => fv[item.key] === filterSelectedTemp[item.key])}
                        size='small'
                        fullWidth
                        dataFetchService={item.dataFetchService}
                      />
                    </FormControl>
                  </Field>
                )
              } else {
                return (
                  <Field label={item.name} sx={{ width: '100%' }}>
                    <FormControl size='small' sx={{ width: '100%' }}>
                      <Select
                        variant='default'
                        data={item.options}
                        labelKey={item.labelKey || 'label'}
                        valueKey={item.valueKey || 'id'}
                        placeholder={item.placeholder || item.name}
                        onChange={e =>
                          handleSelectTempChange(
                            item.key,
                            e?.[item.valueKey || 'id'],
                            e?.[item.labelKey || 'label'],
                            item.valueKey || 'id',
                            item.labelKey || 'label'
                          )
                        }
                        setSelected={e =>
                          handleSelectTempChange(
                            item.key,
                            e?.[item.valueKey || 'id'],
                            e?.[item.labelKey || 'label'],
                            item.valueKey || 'id',
                            item.labelKey || 'label'
                          )
                        }
                        selected={filterSelectTempValues.find(fv => fv[item.key] === filterSelectedTemp[item.key])}
                        size='small'
                        fullWidth
                      />
                    </FormControl>
                  </Field>
                )
              }
            }
            if (item.type === FilterType.DATE) {
              return (
                <Field label={item.name} sx={{ width: '100%' }}>
                  <DateTimePicker
                    type='datePicker'
                    onChange={e => handleDateTempChange(item.key, e)}
                    {...(filterBoxTemp[item.key]
                      ? {
                          value: filterBoxTemp[item.key]
                        }
                      : {})}
                    {...(item.placeholder
                      ? {
                          label: item.placeholder
                        }
                      : {})}
                  />
                </Field>
              )
            }
            if (item.type === FilterType.DATE_TIME) {
              return (
                <Field label={item.name} sx={{ width: '100%' }}>
                  <DateTimePicker
                    type='dateTimePicker'
                    onChange={e => handleDateTempChange(item.key, e)}
                    {...(filterBoxTemp[item.key]
                      ? {
                          value: filterBoxTemp[item.key]
                        }
                      : {})}
                    {...(item.placeholder
                      ? {
                          label: item.placeholder
                        }
                      : {})}
                  />
                </Field>
              )
            }
            if (item.type === FilterType.DATE_RANGE) {
              return (
                <Field label={item.name} sx={{ width: '100%' }}>
                  <DateRangePicker
                    onChange={(start, end) => handleDateRangeTempChange(start, end, item.key)}
                    startDate={filterBoxTemp[item.key]?.startDate || null}
                    endDate={filterBoxTemp[item.key]?.endDate || null}
                  />
                </Field>
              )
            }
            if (item.type === FilterType.TIME) {
              return (
                <Field label={item.name} sx={{ width: '100%' }}>
                  <DateTimePicker
                    type='timePicker'
                    onChange={e => handleDateTempChange(item.key, e)}
                    {...(filterBoxTemp[item.key]
                      ? {
                          value: filterBoxTemp[item.key]
                        }
                      : {})}
                    {...(item.placeholder
                      ? {
                          label: item.placeholder
                        }
                      : {})}
                  />
                </Field>
              )
            }
            if (item.type === FilterType.YEAR) {
              return (
                <Field label={item.name} sx={{ width: '100%' }}>
                  <DateTimePicker
                    type='yearPicker'
                    onChange={e => handleDateTempChange(item.key, e)}
                    {...(filterBoxTemp[item.key]
                      ? {
                          value: filterBoxTemp[item.key]
                        }
                      : {})}
                    {...(item.placeholder
                      ? {
                          label: item.placeholder
                        }
                      : {})}
                  />
                </Field>
              )
            }
            if (item.type === FilterType.MONTH_YEAR) {
              return (
                <Field label={item.name} sx={{ width: '100%' }}>
                  <DateTimePicker
                    type='monthYearPicker'
                    onChange={e => handleDateTempChange(item.key, e)}
                    {...(filterBoxTemp[item.key]
                      ? {
                          value: filterBoxTemp[item.key]
                        }
                      : {})}
                    {...(item.placeholder
                      ? {
                          label: item.placeholder
                        }
                      : {})}
                  />
                </Field>
              )
            }
            if (item.type === FilterType.MULTI_SELECT) {
              if (item.dataFetchService) {
                return (
                  <Field label={item.name} sx={{ width: '100%' }}>
                    <FormControl size='small' sx={{ width: '100%' }}>
                      <SelectAsync
                        variant='multiple'
                        labelKey={item.labelKey || 'label'}
                        valueKey={item.valueKey || 'id'}
                        placeholder={item.placeholder || item.name}
                        onChange={e => handleMultiSelectTempChange(e, item.key)}
                        setSelected={e => handleMultiSelectTempChange(e, item.key)}
                        selected={filterMultiSelectTempValues[item.key] || []}
                        size='small'
                        fullWidth
                        sx={{ width: '100%' }}
                        data={[]}
                        dataFetchService={item.dataFetchService}
                      />
                    </FormControl>
                  </Field>
                )
              } else {
                return (
                  <Field label={item.name} sx={{ width: '100%' }}>
                    <FormControl size='small' sx={{ width: '100%' }}>
                      <Select
                        variant='multiple'
                        data={item.options}
                        labelKey={item.labelKey || 'label'}
                        valueKey={item.valueKey || 'id'}
                        placeholder={item.placeholder || item.name}
                        onChange={e => handleMultiSelectTempChange(e, item.key)}
                        setSelected={e => handleMultiSelectTempChange(e, item.key)}
                        selected={filterMultiSelectTempValues[item.key] || []}
                        size='small'
                        fullWidth
                      />
                    </FormControl>
                  </Field>
                )
              }
            }
            if (item.type === FilterType.CHECKBOX) {
              return (
                <Field label={item.name} sx={{ width: '100%' }}>
                  <Stack spacing={0}>
                    {item.options?.map(option => (
                      <Checkbox
                        color={'primary'}
                        label={option[item.labelKey || 'label']}
                        size='large'
                        checked={
                          !!filterCheckboxTempValues[item.key]?.find(
                            optionItem => optionItem[item.valueKey || 'id'] === option[item.valueKey || 'id']
                          )
                        }
                        onChange={e =>
                          handleCheckboxTempChange(
                            e,
                            item.key,
                            option[item.valueKey || 'id'],
                            option[item.labelKey || 'label']
                          )
                        }
                      />
                    ))}
                  </Stack>
                </Field>
              )
            }
          })}
        </Box>
        <Grid
          container
          padding={4}
          columns={2}
          gap={2}
          sx={{
            borderTop: `1px solid ${theme.colorToken.border.neutral.normal}`
          }}
        >
          <Grid item xs>
            <Button
              variant='outlined'
              content='textOnly'
              text='Clear All'
              sx={{
                width: '100%',
                paddingY: '8px'
              }}
              disabled={Object.keys(filterBoxTemp).length === 0}
              onClick={handleClearFilterBoxTemp}
            />
          </Grid>
          <Grid item xs>
            <Button
              variant='contained'
              content='textOnly'
              text='Apply'
              sx={{
                width: '100%',
                paddingY: '8px'
              }}
              disabled={Object.keys(filterBoxTemp).length === 0}
              onClick={handleApplyFilterBoxTemp}
            />
          </Grid>
        </Grid>
      </Box>
    )
  }

  const renderResultController = () => {
    if (resultControllerSliced.length > 0)
      return (
        <>
          {resultController[0].type === FilterType.SEARCH && (
            <Input
              InputProps={{
                startAdornment: <Icon icon={'tabler:search'} width={16} height={16} style={{ marginRight: 8 }} />
              }}
              placeholder={resultController[0].placeholder || resultController[0].name}
              size='small'
              value={inputValues[resultController[0].key] || ''}
              onChange={e => handleInputChange(resultController[0].key, e.target.value)}
              sx={{
                width: '220px'
              }}
            />
          )}
          <Button
            content='iconText'
            icon='tabler:filter'
            text='Filter'
            variant='text'
            color='primary'
            sx={{
              paddingX: 4
            }}
            onClick={handleClickFilterBox}
          />
          <Popover
            id={id}
            open={filterBoxIsOpen}
            anchorEl={anchorEl}
            onClose={handleCloseFilterBox}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            sx={{
              zIndex: 5
            }}
          >
            {renderFilterBox()}
          </Popover>
        </>
      )
    else {
      return resultController.map(item => {
        if (item.type === FilterType.SEARCH) {
          return (
            <Input
              InputProps={{
                startAdornment: <Icon icon={'tabler:search'} width={16} height={16} style={{ marginRight: 8 }} />
              }}
              placeholder={item.placeholder || item.name}
              size='medium'
              value={inputValues[item.key] || ''}
              onChange={e => handleInputChange(item.key, e.target.value)}
              width='200px'
            />
          )
        }
        if (item.type === FilterType.SELECT) {
          if (item.dataFetchService) {
            return (
              <FormControl size='small' sx={{ minWidth: 220, maxWidth: 360 }}>
                <SelectAsync
                  variant='default'
                  data={[]}
                  labelKey={item.labelKey || 'label'}
                  valueKey={item.valueKey || 'id'}
                  labelId={item.name}
                  label={item.name}
                  placeholder={item.placeholder || item.name}
                  onChange={e =>
                    handleSelectChange(
                      item.key,
                      e?.[item.valueKey || 'id'],
                      e?.[item.labelKey || 'label'],
                      item.valueKey || 'id',
                      item.labelKey || 'label'
                    )
                  }
                  setSelected={e =>
                    handleSelectChange(
                      item.key,
                      e?.[item.valueKey || 'id'],
                      e?.[item.labelKey || 'label'],
                      item.valueKey || 'id',
                      item.labelKey || 'label'
                    )
                  }
                  selected={filterSelectTempValues.find(fv => fv[item.key] === filterSelectedTemp[item.key])}
                  size='small'
                  dataFetchService={item.dataFetchService}
                />
              </FormControl>
            )
          } else {
            return (
              <FormControl size='small' sx={{ minWidth: 220, maxWidth: 360 }}>
                <Select
                  variant='default'
                  data={item.options}
                  labelKey={item.labelKey || 'label'}
                  valueKey={item.valueKey || 'id'}
                  labelId={item.name}
                  label={item.name}
                  placeholder={item.placeholder || item.name}
                  onChange={e =>
                    handleSelectChange(
                      item.key,
                      e?.[item.valueKey || 'id'],
                      e?.[item.labelKey || 'label'],
                      item.valueKey || 'id',
                      item.labelKey || 'label'
                    )
                  }
                  setSelected={e =>
                    handleSelectChange(
                      item.key,
                      e?.[item.valueKey || 'id'],
                      e?.[item.labelKey || 'label'],
                      item.valueKey || 'id',
                      item.labelKey || 'label'
                    )
                  }
                  selected={filterSelectTempValues.find(fv => fv[item.key] === filterSelectedTemp[item.key])}
                  size='small'
                />
              </FormControl>
            )
          }
        }
        if (item.type === FilterType.DATE) {
          return (
            <DateTimePicker
              type='datePicker'
              onChange={e => handleDateChange(item.key, e)}
              {...(filterDateValues[item.key]
                ? {
                    value: filterDateValues[item.key]
                  }
                : {})}
              {...(item.placeholder
                ? {
                    label: item.placeholder
                  }
                : {})}
            />
          )
        }
        if (item.type === FilterType.DATE_TIME) {
          return (
            <DateTimePicker
              type='dateTimePicker'
              onChange={e => handleDateChange(item.key, e)}
              {...(filterDateValues[item.key]
                ? {
                    value: filterDateValues[item.key]
                  }
                : {})}
              {...(item.placeholder
                ? {
                    label: item.placeholder
                  }
                : {})}
            />
          )
        }
        if (item.type === FilterType.TIME) {
          return (
            <DateTimePicker
              type='timePicker'
              onChange={e => handleDateChange(item.key, e)}
              {...(filterDateValues[item.key]
                ? {
                    value: filterDateValues[item.key]
                  }
                : {})}
              {...(item.placeholder
                ? {
                    label: item.placeholder
                  }
                : {})}
            />
          )
        }
        if (item.type === FilterType.MONTH_YEAR) {
          return (
            <DateTimePicker
              type='monthYearPicker'
              onChange={e => handleDateChange(item.key, e)}
              {...(filterDateValues[item.key]
                ? {
                    value: filterDateValues[item.key]
                  }
                : {})}
              {...(item.placeholder
                ? {
                    label: item.placeholder
                  }
                : {})}
            />
          )
        }
        if (item.type === FilterType.YEAR) {
          return (
            <DateTimePicker
              type='yearPicker'
              onChange={e => handleDateChange(item.key, e)}
              {...(filterDateValues[item.key]
                ? {
                    value: filterDateValues[item.key]
                  }
                : {})}
              {...(item.placeholder
                ? {
                    label: item.placeholder
                  }
                : {})}
            />
          )
        }
        if (item.type === FilterType.DATE_RANGE) {
          return (
            <DateRangePicker
              onChange={(start, end) => handleDateRangeChange(start, end, item.key)}
              startDate={filterDateRangeValues[item.key]?.startDate || undefined}
              endDate={filterDateRangeValues[item.key]?.endDate || undefined}
            />
          )
        }
        if (item.type === FilterType.MULTI_SELECT || item.type === FilterType.CHECKBOX) {
          if (item.dataFetchService) {
            return (
              <FormControl size='small' sx={{ minWidth: 220, maxWidth: 360 }}>
                <SelectAsync
                  variant='multiple'
                  data={[]}
                  labelKey={item.labelKey || 'label'}
                  valueKey={item.valueKey || 'id'}
                  labelId={item.name}
                  label={item.name}
                  placeholder={item.placeholder || item.name}
                  onChange={e => handleMultiSelectChange(e, item.key)}
                  selected={filterMultiSelectTempValues[item.key] || []}
                  size='small'
                  sx={{ minWidth: 220, maxWidth: 360 }}
                  dataFetchService={item.dataFetchService}
                />
              </FormControl>
            )
          } else {
            return (
              <FormControl size='small' sx={{ minWidth: 220, maxWidth: 360 }}>
                <Select
                  variant='multiple'
                  data={item.options}
                  labelKey={item.labelKey || 'label'}
                  valueKey={item.valueKey || 'id'}
                  labelId={item.name}
                  label={item.name}
                  placeholder={item.placeholder || item.name}
                  onChange={e => handleMultiSelectChange(e, item.key)}
                  selected={filterMultiSelectTempValues[item.key] || []}
                  size='small'
                  setSelected={e => handleMultiSelectChange(e, item.key)}
                />
              </FormControl>
            )
          }
        }

        return null
      })
    }
  }

  const renderDataViewController = () => {
    return dataViewController.map(item => {
      if (item.type === DataViewControllerType.BUTTON_GROUP) {
        return (
          <ButtonGroup
            orientation='horizontal'
            variant='outlined'
            sx={{
              '& .MuiButtonGroup-grouped:first-of-type': {
                borderTopLeftRadius: '8px !important',
                borderBottomLeftRadius: '8px !important'
              },
              '& .MuiButtonGroup-grouped:last-child': {
                borderTopRightRadius: '8px !important',
                borderBottomRightRadius: '8px !important'
              }
            }}
          >
            {item.options &&
              item.options.map(option => (
                <Button
                  variant={viewMode === option.key ? 'contained' : 'outlined'}
                  content='iconText'
                  size='medium'
                  text={option.label || ''}
                  icon={option.icon || ''}
                  onClick={() => setViewMode(option.key)}
                />
              ))}
          </ButtonGroup>
        )
      }

      if (item.type === DataViewControllerType.SELECT) {
        if (item.dataFetchService) {
          return (
            <FormControl size='small' sx={{ minWidth: 200, maxWidth: 360 }}>
              <SelectAsync
                variant='default'
                data={[]}
                labelKey={item.labelKey || 'label'}
                valueKey={item.valueKey || 'id'}
                labelId={item.name}
                label={item.name}
                placeholder={item.name}
                onChange={e =>
                  handleViewSelectChange(
                    item.key,
                    e?.[item.valueKey || 'id'],
                    e?.[item.labelKey || 'label'],
                    item.valueKey || 'id',
                    item.labelKey || 'label'
                  )
                }
                selected={viewSelectTempValues.find(fv => fv[item.key] === viewSelectedTemp[item.key])}
                size='small'
                dataFetchService={item.dataFetchService}
              />
            </FormControl>
          )
        } else {
          return (
            <FormControl size='small' sx={{ minWidth: 200, maxWidth: 360 }}>
              <Select
                variant='default'
                data={item.options}
                labelKey={item.labelKey || 'label'}
                valueKey={item.valueKey || 'id'}
                labelId={item.name}
                label={item.name}
                placeholder={item.name}
                onChange={e =>
                  handleViewSelectChange(
                    item.key,
                    e?.[item.valueKey || 'id'],
                    e?.[item.labelKey || 'label'],
                    item.valueKey || 'id',
                    item.labelKey || 'label'
                  )
                }
                selected={viewSelectTempValues.find(fv => fv[item.key] === viewSelectedTemp[item.key])}
                size='small'
              />
            </FormControl>
          )
        }
      }
    })
  }

  const renderFilterResult = () => {
    if (!!filters.resultController) {
      const entries = Object.entries(filters.resultController)

      return entries.map(([key, value]) => {
        const isCheckbox = !!filterCheckboxTempValues[key]
        const isMultiSelect = !!filterMultiSelectTempValues[key]
        const isDateRange = !!filterDateRangeValues[key] || !!filters.resultController[key]?.startDate

        return (
          <Box
            bgcolor={theme.colorToken.background.neutral.normal}
            border={'1px solid ' + theme.colorToken.border.neutral.normal}
            borderRadius={'6px'}
            paddingX={'14px'}
            paddingY={'8px'}
            display={'flex'}
            gap={2}
            alignItems={'center'}
          >
            <MvTypography typeSize={'PX'} size={'BODY_SM_NORMAL'}>
              {key}
            </MvTypography>
            {value && Array.isArray(value) ? (
              isMultiSelect ? (
                value.map(item => {
                  const propertyKeys = Object.keys(item)

                  return (
                    <Chip
                      label={item[propertyKeys[1]]}
                      onClick={() => {}}
                      size='small'
                      onMouseDown={e => e.stopPropagation()}
                      onDelete={e => handleChipMultiSelectDelete(key, item[propertyKeys[0]], item[propertyKeys[1]])}
                    />
                  )
                })
              ) : (
                value.map(item => {
                  const propertyKeys = Object.keys(item)

                  return (
                    <Chip
                      label={item[propertyKeys[1]]}
                      onClick={() => {}}
                      size='small'
                      onMouseDown={e => e.stopPropagation()}
                      onDelete={e => handleChipCheckboxDelete(key, item[propertyKeys[0]], item[propertyKeys[1]])}
                    />
                  )
                })
              )
            ) : isDateRange ? (
              <>
                {value && value.startDate && (
                  <Chip
                    label={value.startDate ? value.startDate instanceof Date && value.startDate.toISOString() : ''}
                    onClick={() => {}}
                    size='small'
                    onMouseDown={e => e.stopPropagation()}
                    onDelete={e => handleChipDateRangeDelete(e, key, value.startDate, 'start')}
                  />
                )}
                -
                {value && value.endDate && (
                  <Chip
                    label={value.endDate ? value.endDate instanceof Date && value.endDate.toISOString() : ''}
                    onClick={() => {}}
                    size='small'
                    onMouseDown={e => e.stopPropagation()}
                    onDelete={e => handleChipDateRangeDelete(e, key, value.endDate, 'end')}
                  />
                )}
              </>
            ) : (
              <Chip
                label={value instanceof Date ? value.toISOString() : typeof value !== 'object' ? value : ''}
                onClick={() => {}}
                size='small'
                onMouseDown={e => e.stopPropagation()}
                onDelete={e => handleChipDelete(e, key, value)}
                style={{ display: !(value instanceof Date) && typeof value !== 'string' ? 'none' : 'flex' }}
              />
            )}
          </Box>
        )
      })
    } else {
      return null
    }
  }

  useEffect(() => {
    if (dataViewController.length > 0) {
      const filteredValue = dataViewController.find(item => item.type === DataViewControllerType.BUTTON_GROUP)

      if (filteredValue) {
        setViewMode(filteredValue?.options?.[0].key)
      }
    }
  }, [])

  useEffect(() => {
    setFilterBoxTemp(prev => ({
      ...prev,
      ...filterCheckboxTempValues
    }))
  }, [filterCheckboxTempValues])

  useEffect(() => {
    setFilterBoxTemp(prev => ({
      ...prev,
      ...filterMultiSelectTempValues
    }))
  }, [filterMultiSelectTempValues])

  useEffect(() => {
    setFilters(prevFilters => ({
      ...prevFilters,
      resultController: {
        ...prevFilters.resultController,
        ...filterSelectValues,
        ...filterMultiSelectValues,
        ...filterDateValues,
        ...filterDateRangeValues
      },
      dataController: {
        ...prevFilters.dataController
      }
    }))
  }, [filterSelectValues, filterMultiSelectValues, filterDateValues, filterDateRangeValues])

  useEffect(() => {
    setFilters(prevFilters => ({
      ...prevFilters,
      dataController: {
        ...prevFilters.dataController,
        ...viewSelectValues
      }
    }))
  }, [viewSelectValues])

  useEffect(() => {
    setFilters(prevFilters => ({
      ...prevFilters,
      resultController: {
        ...prevFilters.resultController
      },
      dataController: {
        ...prevFilters.dataController,
        viewMode: viewMode
      }
    }))
  }, [viewMode])

  useEffect(() => {
    setFilters(prevFilters => ({
      ...prevFilters,
      resultController: {
        ...prevFilters.resultController,
        ...debouncedInputValues
      }
    }))
  }, [debouncedInputValues])

  useEffect(() => {
    onChange(filters)
  }, [filters])

  return (
    <Box
      width={'100%'}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'start'}
      justifyContent={'start'}
      gap={'12px'}
    >
      <Box
        width={'100%'}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        bgcolor={theme.colorToken.background.neutral.normal}
      >
        {/* result controller */}
        <Box display={'flex'} gap={2} alignItems={'center'}>
          {renderResultController()}
        </Box>
        {/* data view controller */}
        <Box display={'flex'} gap={2} alignItems={'center'}>
          {renderDataViewController()}
        </Box>
      </Box>
      {!_.isEmpty(filters.resultController) && (
        <Box
          width={'100%'}
          display={'flex'}
          padding={4}
          flexDirection={'column'}
          alignItems={'flex-start'}
          gap={2}
          borderRadius={'6px'}
          bgcolor={theme.colorToken.background.neutral.subtlest}
        >
          <Box width={'100%'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <MvTypography typeSize='PX' size='BODY_MD_BOLDEST'>
              Results are filtered by:
            </MvTypography>
            <Button
              variant='text'
              content='textOnly'
              text='Clear all'
              sx={{
                backgroundColor: theme.colorToken.background.neutral.normal,
                paddingX: 4,
                fontWeight: 500,
                boxShadow: `0px 2px 4px ${theme.colorToken.background.neutralInverted.subtle + '50'}`
              }}
              onClick={() => {
                setInputValues({})
                setFilters(prevFilters => ({
                  ...prevFilters,
                  resultController: {}
                }))
                setFilterBoxTemp({})
                setFilterSelectTempValues([])
                setFilterSelectValues({})
                setFilterMultiSelectTempValues({})
                setFilterCheckboxTempValues({})
                setFilterMultiSelectValues({})
                setFilterDateValues({})
                setFilterDateRangeValues({})
                setFilterSelectedTemp({})
              }}
            />
          </Box>
          <Box width={'100%'} display={'flex'} flexDirection={'row'} flexWrap={'wrap'} gap={2}>
            {renderFilterResult()}
          </Box>
        </Box>
      )}
    </Box>
  )
}
