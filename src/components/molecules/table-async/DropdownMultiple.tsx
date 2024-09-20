import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { type UseQueryResult } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { filterValuesAtom } from './atoms'

type DropdownMultipleFilterProps = {
  name: string
  labelKey: string
  field: string
  dataFetchService: () => UseQueryResult<{ data: any[] }>
}

export function DropdownMultiple(props: DropdownMultipleFilterProps) {
  const query = props.dataFetchService()
  const [filterValues, setFilterValues] = useAtom(filterValuesAtom)

  const selectedOptions =
    filterValues
      .find(filterValue => filterValue.name === props.name)
      ?.values.map(value => ({
        id: value.value,
        label: value.text
      })) ?? []

  const options = query.isSuccess
    ? query.data.data.map(row => ({
        id: row.id,
        label: row[props.labelKey]
      }))
    : []

  return (
    <Autocomplete
      multiple
      value={selectedOptions}
      onChange={(_, newValue) => {
        if (!newValue.length) {
          setFilterValues(filterValues.filter(filterValue => filterValue.name !== props.name))
        }

        const newFilterValues = filterValues.filter(filterValue => filterValue.name !== props.name)

        setFilterValues([
          ...newFilterValues,
          {
            name: props.name,
            type: 'dropdown-multiple',
            field: props.field,
            values: newValue.map(value => ({
              text: value.label,
              value: value.id
            }))
          }
        ])
      }}
      sx={{ width: 300 }}
      options={options}
      loading={query.isLoading}
      autoHighlight
      renderTags={() => null}
      disableClearable
      disableCloseOnSelect
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderOption={(props, option, state) => (
        <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <Checkbox checked={state.selected} />
          {option.label}
        </Box>
      )}
      renderInput={params => (
        <TextField
          {...params}
          placeholder={props.name}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password' // disable autocomplete and autofill
          }}
          sx={{
            '& fieldset': { border: 'none' },
            '& .MuiOutlinedInput-root.Mui-focused': {
              boxShadow: 'none'
            }
          }}
          InputLabelProps={{
            shrink: false
          }}
        />
      )}
    />
  )
}
