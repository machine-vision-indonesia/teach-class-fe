import {
  Autocomplete,
  Box,
  Card,
  MenuItem,
  Popper,
  TextField,
  Typography,
  createFilterOptions,
  styled
} from '@mui/material'
import { PropsDropdown } from './Dropdown.type'
import { SetStateAction, useState } from 'react'
import { Icon } from '@iconify/react'
import Image from 'next/image'

const StyledPopper = styled(Popper)({
  '& .MuiAutocomplete-groupLabel': {
    backgroundColor: '#F2F2F2',
    color: '#909094',
    borderRadius: '6px',
    fontSize: '10px'
  }
})
const filter = createFilterOptions<PropsDropdown>()
const RenderVariant = (variant: PropsDropdown['variant'], data?: PropsDropdown['data']) => {
  const [value, setValue] = useState(null) as any

  if (variant === 'grouped') {
    return (
      <Autocomplete
        disablePortal
        options={data ?? []}
        sx={{ width: 300 }}
        groupBy={option => option.subHeader ?? '' ?? undefined}
        PopperComponent={StyledPopper}
        getOptionLabel={option => option.content}
        popupIcon={false}
        renderInput={(params: any) => (
          <TextField
            {...params}
            label='Search'
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  <Icon icon='eva:search-outline' color='#828282' />
                  {params.InputProps.endAdornment}
                </>
              )
            }}
          />
        )}
        filterOptions={(options, params: any) => {
          const filtered = filter(options as PropsDropdown[], params)

          const { inputValue } = params

          const isExisting = options.some(option => inputValue === option.content)
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              inputValue,
              content: `Add New Row "${inputValue}"`
            })
          }

          return filtered
        }}
        noOptionsText={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: '60%',
                height: '100px',
                mb: '16px'
              }}
            >
              <Image src='https://i.ibb.co/QMkLdT8/no-option.jpg' alt='No Option' fill objectFit='contain' />
            </Box>
            <Typography>No Data Available</Typography>
          </Box>
        }
        renderOption={(props, option) => (
          <MenuItem
            sx={{
              '&.MuiAutocomplete-option': {
                color: '#000',
                mx: '14px',
                px: '8px'
              },
              '&.MuiAutocomplete-option:hover': {
                backgroundColor: '#005EFF',
                color: '#fff',
                mx: '14px',
                borderRadius: '6px'
              },
              '&.MuiAutocomplete-option[aria-selected="true"]': {
                color: '#005EFF',
                mx: '14px',
                borderRadius: '6px'
              }
            }}
            {...props}
          >
            {option.content}
          </MenuItem>
        )}
      />
    )
  } else {
    return (
      <Autocomplete
        sx={{
          width: 300
        }}
        value={value}
        popupIcon={false}
        PopperComponent={StyledPopper}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setValue({
              content: newValue
            })
          } else if (newValue && newValue.inputValue) {
            setValue({
              content: newValue.inputValue
            })
          } else {
            setValue(newValue as SetStateAction<PropsDropdown | null>)
          }
        }}
        noOptionsText={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: '60%',
                height: '100px',
                mb: '16px'
              }}
            >
              <Image src='https://i.ibb.co/QMkLdT8/no-option.jpg' alt='No Option' fill objectFit='contain' />
            </Box>
            <Typography>No Data Available</Typography>
          </Box>
        }
        filterOptions={(options, params: any) => {
          const filtered = filter(options as PropsDropdown[], params)

          const { inputValue } = params

          const isExisting = options.some(option => inputValue === option.content)
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              inputValue,
              content: `Add New Row "${inputValue}"`
            })
          }

          return filtered
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id='free-solo-with-text-demo'
        options={data ?? []}
        getOptionLabel={option => {
          if (typeof option === 'string') {
            return option
          }

          if (option.inputValue) {
            return option.inputValue
          }

          return option.content
        }}
        renderOption={(props, option) => (
          <MenuItem
            sx={{
              '&.MuiAutocomplete-option': {
                color: '#000',
                mx: '14px',
                px: '8px'
              },
              '&.MuiAutocomplete-option:hover': {
                backgroundColor: '#005EFF',
                color: '#fff',
                mx: '14px',
                borderRadius: '6px'
              },
              '&.MuiAutocomplete-option[aria-selected="true"]': {
                color: '#005EFF',
                mx: '14px',
                borderRadius: '6px'
              }
            }}
            {...props}
          >
            {option.content}
          </MenuItem>
        )}
        renderInput={(params: any) => (
          <TextField
            {...params}
            label='Search'
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  <Icon icon='eva:search-outline' color='#828282' />
                  {params.InputProps.endAdornment}
                </>
              )
            }}
          />
        )}
      />
    )
  }
}

export const Dropdown = ({ data, variant }: PropsDropdown) => {
  return (
    <Card
      sx={{
        width: 'max-content',
        height: 'max-content',
        borderRadius: '6px',
        '&.Mui-disabled': {
          '& *': {
            color: '#000'
          },
          '& .content': {
            color: '#000'
          }
        }
      }}
    >
      {RenderVariant(variant, data)}
    </Card>
  )
}
