import React, { forwardRef, useImperativeHandle, useState, useMemo, useCallback } from 'react'
import { Box, useTheme, Skeleton, Grid } from '@mui/material'
import { DataGrid, GridSortModel } from '@mui/x-data-grid'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Pagination } from 'src/components/atoms/pagination/Pagination'
import { Accordion } from '@/components/atoms'
import EmptyStateTable from './EmptyStateTable'
import { PropsTableAsyncCollapsed } from '../types/TableAsyncCollapsed.type'

export const Table = forwardRef<{ refetchData: () => void }, PropsTableAsyncCollapsed>(
  (
    {
      dataFetchService,
      limit = 10,
      defaultSortBy,
      maxWidth = '100%',
      width = '100%',
      dataKey = 'data',
      withOnScroll = true,
      rowSelection = false,
      countBy = 'id',
      emptyText = 'No data created',
      isCollapsed = false,
      groupFieldKeyTitle,
      groupName = 'user',
      columns,
      ...props
    },
    ref
  ) => {
    const [page, setPage] = useState(1)
    const [sortModel, setSortModel] = useState<GridSortModel>([])
    const theme = useTheme()

    const sortString = useMemo(() => {
      if (sortModel.length) {
        return [`${sortModel[0].sort === 'desc' ? '-' : ''}${sortModel[0].field}`, 'id'].toString()
      }
      return defaultSortBy ? [`${defaultSortBy}`, 'id'].toString() : undefined
    }, [sortModel, defaultSortBy])

    const { data: dataRaw, error, isLoading, isSuccess, refetch } = dataFetchService({
      page,
      limit,
      filter: undefined,
      sort: sortString
    })

    const { data: dataCount, error: errorCount, isLoading: isLoadingCount, isSuccess: isSuccessCount, refetch: refetchCount } = dataFetchService({
      aggregate: { countDistinct: countBy },
      filter: undefined,
      sort: sortString
    })

    const handleRefetchData = useCallback(() => {
      refetch()
      refetchCount()
    }, [refetch, refetchCount])

    useImperativeHandle(ref, () => ({
      refetchData: handleRefetchData
    }), [handleRefetchData])

    const dataGridSx = useMemo(() => ({
      width: '100%',
      '&.MuiDataGrid-root .MuiDataGrid-columnHeaders': {
        borderRadius: 0,
        backgroundColor: theme.colorToken.background.neutral.subtlest
      },
      '&.MuiDataGrid-root .MuiDataGrid-columnHeaderTitle': {
        color: theme.colorToken.text.primary
      },
      '&.MuiDataGrid-root .MuiDataGrid-row:hover': {
        backgroundColor: theme.colorToken.background.primary.subtlest
      },
      '&.MuiDataGrid-root .MuiDataGrid-row.Mui-selected': {
        backgroundColor: theme.colorToken.text.primary.bold
      },
      ...(props.isStripped
        ? {
          '&.MuiDataGrid-root .MuiDataGrid-row:nth-of-type(even)': {
            backgroundColor: theme.colorToken.background.neutral.subtlest
          },
          '&.MuiDataGrid-root .MuiDataGrid-row .MuiDataGrid-cell': {
            border: 0
          }
        }
        : {})
    }), [theme, props.isStripped])

    const renderDataGrid = useCallback((data: any[]) => (
      <DataGrid
        {...props}
        sx={dataGridSx}
        rowSelection={rowSelection}
        rows={data}
        columns={columns ?? []}
        loading={false}
        hideFooter
        autoHeight
        sortingMode='server'
        sortModel={sortModel}
        onSortModelChange={(model: GridSortModel) => setSortModel(model)}
      />
    ), [dataGridSx, rowSelection, columns, sortModel, props])

    const processData = useCallback((rawData: any[]) => {
      if (isCollapsed) {
        return rawData.map((el, i) => ({
          content: renderDataGrid((el as any)[groupName]?.map((item: any, index: number) => ({ id: `${i}-${index}`, ...item })) ?? []),
          title: el[groupFieldKeyTitle ?? '']
        }))
      } else {
        return (rawData as any[]).flatMap((el: any, groupIndex: number) =>
          (el[groupName] as any)?.map((item: any, itemIndex: number) => ({
            id: `${groupIndex}-${itemIndex}`,
            ...item,
            [groupFieldKeyTitle ?? 'group']: el[groupFieldKeyTitle ?? '']
          })) ?? []
        );
      }
    }, [isCollapsed, groupName, groupFieldKeyTitle, renderDataGrid])

    const renderSkeleton = useCallback(() => (
      <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Skeleton variant='rectangular' width='100%' height={60} />
        {Array(limit).fill(null).map((_, i) => (
          <Skeleton key={`table-skeleton-${i}`} animation='wave' sx={{ mt: 1 }} variant='rectangular' width='100%' height={30} />
        ))}
      </Box>
    ), [limit])

    const renderError = useCallback(() => (
      <Grid container direction="column" justifyContent="center" alignItems="center" padding={4} minHeight="70dvh">
        <EmptyStateTable />
        <MvTypography size='LABEL_MD_BOLDEST' noWrap typeSize={'PX'} mt={8} mb={2}>
          {emptyText}
        </MvTypography>
        {props.renderEmptyComponent}
      </Grid>
    ), [emptyText, props.renderEmptyComponent])

    const renderContent = useCallback(() => {
      if (isLoading || isLoadingCount) {
        return renderSkeleton()
      }

      if (error || errorCount) {
        return renderError()
      }

      if (isSuccess && isSuccessCount && (dataRaw as any)?.[dataKey]) {
        const processedData = processData((dataRaw as any)[dataKey]);

        if (isCollapsed) {
          return <Accordion data={processedData} />
        } else {
          return renderDataGrid(processedData)
        }
      }

      return <MvTypography size='LABEL_MD_BOLDEST' noWrap typeSize={'PX'}>empty data</MvTypography>
    }, [isLoading, isLoadingCount, error, errorCount, isSuccess, isSuccessCount, dataRaw, dataKey, processData, isCollapsed, renderDataGrid, renderSkeleton, renderError])

    const paginationInfo = useMemo(() => {
      if (isSuccess && isSuccessCount) {
        const totalCount = dataCount?.data[0]?.countDistinct[countBy] ?? 0
        const currentPageCount = dataRaw?.data.length ?? 0
        const startIndex = currentPageCount ? (page - 1) * limit + 1 : 0
        const endIndex = (page - 1) * limit + currentPageCount

        return {
          showingText: `Showing ${startIndex} to ${endIndex} of ${totalCount} entries`,
          pageCount: Math.ceil(totalCount / limit)
        }
      }
      return null
    }, [isCollapsed, isSuccess, isSuccessCount, dataCount, dataRaw, page, limit, countBy])

    return (
      <Box maxWidth={maxWidth} width={width} sx={{ height: '100%' }}>
        <Box
          border={`1px solid`}
          borderColor={theme.colorToken.border.neutral.normal}
          borderRadius={1.5}
          sx={{
            backgroundColor: theme.colorToken.background.neutral.normal,
            marginTop: '24.5px',
            padding: undefined
          }}
        >
          <Box sx={{ width: withOnScroll ? '100%' : '90%', overflowX: withOnScroll ? 'scroll' : 'hidden' }}>
            {renderContent()}
          </Box>

          {paginationInfo && (
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              padding='20px'
            >
              <MvTypography size='LABEL_MD_NORMAL' noWrap typeSize={'PX'}>
                {paginationInfo.showingText}
              </MvTypography>
              <Pagination
                count={paginationInfo.pageCount}
                page={page}
                onChange={(_, value) => setPage(value)}
                shape='rounded'
              />
            </Box>
          )}
        </Box>
      </Box>
    )
  }
)
