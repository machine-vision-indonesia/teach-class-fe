import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { Stack } from '@mui/material'

import { Button } from '@/components/atoms'
import { MvTypography } from '@/components/atoms/mv-typography'

interface IMonthPagingProps {
  selectedDate: Date
  onChange: (start: Date, end: Date) => void
}

export const MonthPaging = ({ selectedDate, onChange }: IMonthPagingProps) => {
  const limitPerPage = 7
  const maxDate = useMemo(() => getMaxDay(selectedDate), [selectedDate])
  const maxPage = useMemo(() => Math.ceil(maxDate / limitPerPage), [maxDate, limitPerPage])

  const [page, setPage] = useState(1)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    handleChangePagination(1)
  }, [selectedDate])

  const getFilterDates = useCallback(
    (page: number) => {
      const start = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), (page - 1) * limitPerPage + 1)
      const end = new Date(start.getFullYear(), start.getMonth(), Math.min(start.getDate() + limitPerPage - 1, maxDate))
      return { start, end }
    },
    [selectedDate, limitPerPage, maxDate]
  )

  const { start: startFilterDate, end: endFilterDate } = useMemo(() => getFilterDates(page), [page, getFilterDates])

  const formatDate = useCallback(
    (date: Date): string => date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    []
  )

  function getMaxDay(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const handleChangePagination = useCallback(
    (newPage: number) => {
      if (newPage < 1 || newPage > maxPage) return

      setPage(newPage)
      const { start, end } = getFilterDates(newPage)
      onChange(start, end)
    },
    [maxPage, getFilterDates, onChange]
  )

  return (
    <Stack direction='row' spacing={2} sx={{ alignItems: 'center' }}>
      <Button
        content='iconOnly'
        icon='tabler:chevron-left'
        variant='text'
        sx={{ minWidth: 0, width: '20px', padding: 0 }}
        onClick={() => handleChangePagination(page - 1)}
        disabled={page === 1}
      />
      <MvTypography typeSize='PX' size='LABEL_LG_BOLDEST'>
        {startFilterDate.getDate()} - {endFilterDate.getDate()}, {formatDate(selectedDate)}
      </MvTypography>
      <Button
        content='iconOnly'
        icon='tabler:chevron-right'
        variant='text'
        sx={{ minWidth: 0, width: '20px', padding: 0 }}
        onClick={() => handleChangePagination(page + 1)}
        disabled={page === maxPage}
      />
    </Stack>
  )
}
