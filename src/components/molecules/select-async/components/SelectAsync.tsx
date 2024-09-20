import { PropsSelect } from '../types/Select.type'
import { Select } from '@/components/atoms'
import { useDebounce } from '@/hooks/useDebounce'
import { useCallback, UIEventHandler, useState, useEffect } from 'react'

/**
 * Komponen Select adalah elemen antarmuka pengguna yang serbaguna yang dirancang untuk berbagai tugas
 * entri data. Komponen ini sangat dapat disesuaikan, menampilkan tiga properti utama: States, Ukuran,
 * dan Jenis. Setiap properti ini menawarkan berbagai opsi untuk beradaptasi dengan berbagai kasus
 * penggunaan dan kebutuhan pengguna.
 */
export const SelectAsync = <T extends object>({
  data,
  selected,
  labelKey,
  valueKey,
  onChange,
  disabled,
  variant = 'default',
  error,
  dataFetchService,
  placeholder,
  readOnly,
  size,
  labelId,
  setSelected,
  ...rest
}: PropsSelect<T>) => {
  const limit = 10
  const [searchValue, setSearchValue] = useState<string>('')
  const [currentData, setCurrentData] = useState(data)
  const debouncedSearchValue = useDebounce(searchValue, 500)

  const fetchDefaultData = () => ({
    data: { pages: [] },
    hasNextPage: false,
    fetchNextPage: () => { },
    isFetchingNextPage: false
  })

  const fetchData = dataFetchService
    ? dataFetchService({ limit: debouncedSearchValue ? undefined : limit, search: debouncedSearchValue })
    : fetchDefaultData()

  const { data: listData, fetchNextPage } = fetchData

  const handleScroll = useCallback<UIEventHandler<HTMLUListElement>>(
    event => {
      const position = event.currentTarget.scrollTop + event.currentTarget.clientHeight
      if (event.currentTarget.scrollHeight - position <= 1) {
        fetchNextPage()
      }
    },
    [fetchNextPage]
  )

  useEffect(() => {
    const list = listData?.pages?.flatMap(page => page.data) ?? data
    setCurrentData(list as any)
  }, [listData, data])

  const handleInputChange = (event: any) => {
    const value = event?.target?.value;
    if (value === 0) { //value when selected chip
      setSearchValue('')
    } else {
      setSearchValue(value ?? '');
    }

  }

  return (
    <Select
      labelKey={labelKey}
      valueKey={valueKey}
      onChange={onChange}
      error={error}
      selected={selected}
      setSelected={setSelected}
      disabled={disabled}
      readOnly={readOnly}
      variant={variant == 'multiple' ? 'multiple' : 'default'}
      labelId={labelId}
      data={(currentData as any) ?? []}
      placeholder={placeholder}
      ListboxProps={{
        onScroll: handleScroll,
        style: { maxHeight: '200px', overflowY: 'auto' }
      }}
      onInputChange={handleInputChange}
      {...rest}
    />
  )
}
