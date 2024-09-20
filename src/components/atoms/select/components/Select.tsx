import { Autocomplete, Box, useTheme } from '@mui/material'
import { Chip } from '../../chip/components/Chip'
import { Icon } from '@iconify/react/dist/iconify.js'
import { getSize } from '../utils'
import { Input } from '../../input'
import { Button } from '../../button'
import { useEffect, useState } from 'react'
import { PropsSelect } from '../types/Select.type'

/**
 * Komponen Select adalah elemen antarmuka pengguna yang serbaguna yang dirancang untuk berbagai tugas
 * entri data. Komponen ini sangat dapat disesuaikan, menampilkan tiga properti utama: States, Ukuran,
 * dan Jenis. Setiap properti ini menawarkan berbagai opsi untuk beradaptasi dengan berbagai kasus
 * penggunaan dan kebutuhan pengguna.
 */
export const Select = <T,>({
  data,
  selected,
  iconKey,
  labelKey,
  valueKey,
  onChange,
  disabled,
  variant = 'default',
  error,
  placeholder,
  readOnly,
  size = 'small',
  labelId,
  setSelected,
  limitTags = 2,
  ...rest
}: PropsSelect<T>) => {
  const [selectedValue, setSelectedValue] = useState<T | T[]>(selected || [])
  const theme = useTheme()

  useEffect(() => {
    if (
      !selected ||
      (Array.isArray(selected) && selected.length === 0) ||
      (typeof selected === 'object' && Object.keys(selected).length === 0)
    ) {
      setSelectedValue(selected as any)
    }
  }, [selected])

  const handleChange = (_: any, value: any) => {
    setSelectedValue(value || [])
    if (Array.isArray(value)) {
      onChange?.(value)
    } else {
      onChange?.(value as T)
    }
  }

  const onDelete = (valueToDelete: T) => {
    if (Array.isArray(selectedValue)) {
      const newSelectedValues = selectedValue.filter(
        item => (item as any)?.[valueKey] !== (valueToDelete as any)?.[valueKey]
      )
      setSelectedValue(newSelectedValues)
      onChange?.(newSelectedValues)
    }
  }

  const handleSelectAll = () => {
    setSelectedValue(data)
    onChange?.(data)
  }

  const handleClearSelection = () => {
    setSelectedValue([])
    onChange?.([])
  }

  const renderOption = (index: number, totalOptions: number) => (props: any, option: T) => {
    const isLastOption = index === totalOptions - 1
    const isMultiple = isLastOption && variant === 'multiple'
    return (
      <Box key={(option as any)?.[valueKey]} display='flex' flexDirection='column' height='100%' zIndex={9999}>
        <Box flex='1' overflow='auto' mb={isMultiple ? 6 : 0}>
          <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            {option && (option as any)?.[iconKey ?? ''] && (
              <Box sx={{ mr: 2 }}>
                <Icon icon={(option as Record<string, any>)?.[iconKey ?? ''] as string} fontSize={12} />
              </Box>
            )}
            {option && (option as any)?.[labelKey ?? '']}
          </Box>
        </Box>
        {isMultiple && (
          <Box
            display='flex'
            mx='5px'
            padding='5px'
            borderRadius='6px'
            sx={{ background: theme.colorToken.background.neutral.normal }}
            alignItems='center'
            position='fixed'
            bottom={0}
            left={0}
            right={0}
            zIndex={1}
          >
            <Button
              size='small'
              variant='plain'
              content='textOnly'
              text='Select All'
              onClick={handleSelectAll}
              sx={{ mx: 1, width: '50%' }}
            />
            <Button
              size='small'
              variant='plain'
              content='textOnly'
              text='Clear Selection'
              onClick={handleClearSelection}
              sx={{ width: '50%' }}
            />
          </Box>
        )}
      </Box>
    )
  }

  return (
    <Autocomplete
      size={size}
      onChange={handleChange}
      freeSolo
      options={data}
      getOptionLabel={option => (option as any)?.[labelKey ?? ''] || ''}
      value={selectedValue}
      isOptionEqualToValue={(option, value) => (option as any)?.[valueKey] === (value as any)?.[valueKey]}
      disabled={disabled}
      readOnly={readOnly}
      multiple={variant === 'multiple'}
      limitTags={limitTags}
      renderInput={params => (
        <Input error={!!error} helperText={rest?.helperText ?? ''} placeholder={placeholder} {...params} />
      )}
      renderTags={(value: any, getTagProps) =>
        value.map((option: T, index: number) => {
          const { key, ...tagProps } = getTagProps({ index })
          return (
            <Chip
              onMouseDown={e => e.stopPropagation()}
              onDelete={() => onDelete(option)}
              key={key}
              sx={{
                margin: 1,
                height: getSize.chipSize(size),
                fontSize: getSize.fontSize(size)
              }}
              label={(option as any)?.[labelKey ?? '']}
              onClick={() => onDelete(option)}
            />
          )
        })
      }
      renderOption={(props, option, state) => {
        const index = state.index
        return renderOption(index, data.length)(props, option)
      }}
      clearIcon={false}
      forcePopupIcon={true}
      popupIcon={<Icon icon='tabler:chevron-down' fontSize={getSize.iconSize()} />}
      {...rest}
    />
  )
}
