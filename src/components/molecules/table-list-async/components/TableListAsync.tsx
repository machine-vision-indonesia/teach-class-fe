import { MvTypography } from '@/components/atoms/mv-typography'
import { Grid, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import { DataGrid, GridSortModel } from '@mui/x-data-grid'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { Pagination } from 'src/components/atoms/pagination/Pagination'
import { type PropsTableListAsync } from '../types/TableListAsync.type'
import EmptyStateTable from './EmptyStateTable'

export const TableListAsync = forwardRef(
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
      ...props
    }: PropsTableListAsync,
    ref
  ) => {
    const [page, setPage] = useState(1)

    const [sortModel, setSortModel] = useState<GridSortModel>([])
    const theme = useTheme()

    const {
      data: dataRaw,
      error,
      isLoading,
      isSuccess,
      refetch
    } = dataFetchService({
      page,
      limit,
      filter: undefined,
      sort: sortModel.length
        ? [`${sortModel[0].sort === 'desc' ? '-' : ''}${sortModel[0].field}`, 'id'].toString()
        : defaultSortBy
          ? [`${defaultSortBy}`, 'id'].toString()
          : undefined
    })

    const {
      data: dataCount,
      error: errorCount,
      isLoading: isLoadingCount,
      isSuccess: isSuccessCount,
      refetch: refetchCount
    } = dataFetchService({
      aggregate: {
        countDistinct: countBy
      },
      filter: undefined,
      sort: sortModel.length
        ? [`${sortModel[0].sort === 'desc' ? '-' : ''}${sortModel[0].field}`, 'id'].toString()
        : undefined
    })

    const content = () => {
      if (isLoading || isLoadingCount) {
        return (
          <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Skeleton variant='rectangular' width='100%' height={60} />
            {Array(limit)
              .fill(null)
              .map((_, i) => (
                <Skeleton
                  key={`table-skeleton-${i}`}
                  animation='wave'
                  sx={{ mt: 1 }}
                  variant='rectangular'
                  width='100%'
                  height={30}
                />
              ))}
          </Box>
        )
      }

      if (error || errorCount) {
        return (
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            padding={4}
            minHeight="70dvh"
          >
            <EmptyStateTable />
            <MvTypography size='LABEL_MD_BOLDEST' noWrap typeSize={'PX'} mt={8} mb={2}>
              {emptyText}
            </MvTypography>
            {props.renderEmptyComponent}
          </Grid>

        )
      }

      if (isSuccess && isSuccessCount) {
        return (
          <DataGrid
            {...props}
            sx={{
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
            }}
            rowSelection={rowSelection}
            rows={(dataRaw[dataKey].map((item, index) => ({ id: index, ...item })) as any[]) ?? []}
            columns={props.columns ?? []}
            loading={false}
            hideFooter
            autoHeight
            sortingMode='server'
            sortModel={sortModel}
            onSortModelChange={(model: GridSortModel) => setSortModel(model)}
          />
        )
      }

      return (
        <MvTypography size='LABEL_MD_BOLDEST' noWrap typeSize={'PX'} >
          empty data
        </MvTypography>
      )
    }
    const handleRefetchData = () => {
      refetch()
      refetchCount()
    }

    useImperativeHandle(ref, () => ({
      refetchData: handleRefetchData
    }))

    return (
      <Box
        maxWidth={maxWidth}
        width={width}
        sx={{
          height: '100%'
        }}
      >
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

          {withOnScroll === true ? (
            <Box
              sx={{
                width: '100%',
                overflowX: 'scroll'
              }}
            >
              {content()}
            </Box>
          ) : withOnScroll === false ? (
            <Box
              sx={{
                width: '90%'
              }}
            >
              {content()}
            </Box>
          ) : (
            <></>
          )}

          {isSuccess && isSuccessCount && (
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              {...({ padding: '20px' })}
            >
              <MvTypography size='LABEL_MD_NORMAL' noWrap typeSize={'PX'} >
                Showing {dataRaw?.data.length ? (page - 1) * limit + 1 : 0} to{' '}
                {(page - 1) * limit + (dataRaw?.data.length ?? 0)} of {dataCount?.data[0]?.countDistinct[countBy] ?? 0}{' '}
                entries
              </MvTypography>
              <Pagination
                count={Math.ceil((dataCount?.data[0]?.countDistinct[countBy] ?? 0) / limit)}
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
