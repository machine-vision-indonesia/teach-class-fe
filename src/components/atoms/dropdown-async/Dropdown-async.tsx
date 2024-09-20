import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { UseQueryResult } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Paper, Button, Divider } from '@mui/material'

interface DropdownMultipleFilterProps {
  valueKey: string
  valueLabel: string
  placeholder: any
  fullWidth: any
  width?: number | string
  disableClearable?: boolean
  disabled?: any
  isError?: boolean
  defaultValue?: any
  dataFetchService: (params?: any) => UseQueryResult<{ data: any[] }>
  paramFilter?: any
  onChange: (event: Options) => void
  isHaveActionButton?: boolean
  actionButtonLabel?: string
  onActionButtonClick?: () => void
}

interface Options {
  id: string
  key: string
  label: string
  data: any
}

export function DropdownAsync({
  valueKey,
  valueLabel,
  placeholder,
  fullWidth,
  width,
  disabled = false,
  isError = false,
  defaultValue,
  dataFetchService,
  onChange,
  isHaveActionButton = false,
  actionButtonLabel,
  onActionButtonClick,
  paramFilter,
  disableClearable = true
}: DropdownMultipleFilterProps) {
  const { isSuccess, data, isLoading, isError: isErrData, isFetching } = dataFetchService(paramFilter)
  const [value, setValue] = useState(defaultValue)
  const [options, setOptions] = useState<Options[]>([])

  const onMouseDownClick = async () => {
    onActionButtonClick()
  }

  useEffect(() => {
    if (isSuccess && !isErrData && !isLoading && !isFetching) {
      const _options = isSuccess
        ? data?.data.map(
            row =>
              ({
                key: row[valueKey],
                id: row[valueKey],
                label: row[valueLabel],
                data: row
              } as Options)
          )
        : []
      setOptions(_options)

      const matchValue = _options.find(el => el.id === defaultValue?.id)

      setValue(matchValue)
    }
  }, [isSuccess, isErrData, isLoading, isFetching, defaultValue, paramFilter, data, valueKey, valueLabel])

  if (isErrData) return <div>Error</div>

  if (isLoading || isFetching) return <div>Loading dropdown...</div>

  return (
    <Autocomplete
      onChange={(_, newValue) => {
        onChange(newValue)
        setValue(newValue)
      }}
      defaultValue={value}
      disabled={isLoading || isFetching || disabled}
      loadingText='Loading...'
      size='small'
      sx={{
        marginTop: '4px',
        width: width,
        ...(isError
          ? {
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'error.main'
                },
                '&:hover fieldset': {
                  borderColor: 'error.main'
                }
              }
            }
          : {})
      }}
      value={value}
      options={options}
      loading={isLoading || isFetching}
      autoHighlight
      renderTags={() => null}
      disableClearable={disableClearable}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      getOptionLabel={option => option?.label || ''}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.id}>
            {option.label}
          </li>
        )
      }}
      renderInput={params => (
        <TextField
          {...params}
          placeholder={isLoading || isFetching ? 'is loading...' : placeholder}
          fullWidth={fullWidth}
          inputProps={{
            ...params.inputProps
          }}
        />
      )}
      PaperComponent={({ children }) => {
        return (
          <Paper
            sx={{
              '& .MuiAutocomplete-listbox': {
                "& .MuiAutocomplete-option[aria-selected='true']": {
                  bgcolor: '#CCDFFF',
                  color: '#005EFF',
                  '&.Mui-focused': {
                    bgcolor: '#CCDFFF',
                    color: '#005EFF'
                  }
                }
              },
              '& .MuiAutocomplete-listbox .MuiAutocomplete-option.Mui-focused': {
                bgcolor: '#005EFF',
                color: '#fff'
              }
            }}
          >
            {children}
            {isHaveActionButton && (
              <>
                <Divider />
                <Button
                  color='primary'
                  fullWidth
                  sx={{ justifyContent: 'flex-start', pl: 2 }}
                  onMouseDown={onMouseDownClick}
                >
                  {actionButtonLabel}
                </Button>
              </>
            )}
          </Paper>
        )
      }}
    />
  )
}
