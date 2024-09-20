import Autocomplete from '@mui/material/Autocomplete'

// import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import { Chip } from '../chip/components/Chip'
import { DropdownMultipleFilterProps } from './dropdownAsyncMultiple.types'

// import { useState } from 'react'
export function DropdownAsyncMultiple({
  valueKey,
  valueLabel,
  placeholder,
  valueDropdown,
  paramFilter = {},
  dataFetchService,
  onChange
}: DropdownMultipleFilterProps) {
  const query = dataFetchService(paramFilter)

  const options = query.isSuccess
    ? query.data.data.map(row => ({
        key: row[valueKey],
        id: row[valueKey],
        label: row[valueLabel]
      }))
    : []

  return (
    <Autocomplete
      multiple
      onChange={(_, newValue) => {
        onChange(newValue)
      }}
      size='small'
      value={valueDropdown}
      renderTags={(value, getTagProps) => {
        return value.map((option, index) => <Chip {...getTagProps({ index })} key={index} label={option.label} />)
      }}
      sx={{ width: 300 }}
      options={options}
      loading={query.isLoading}
      autoHighlight
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={option => option.label}
      renderInput={params => (
        <TextField
          {...params}
          variant='outlined'
          label=''
          placeholder={placeholder}
          inputProps={{
            ...params.inputProps
          }}
        />
      )}
    />
  )
}
