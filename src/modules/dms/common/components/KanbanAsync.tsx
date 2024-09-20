import { Box, CircularProgress, Grid, Stack, useTheme } from '@mui/material'
import React, { useMemo } from 'react'
import { MvTypography } from '@/components/atoms/mv-typography'

import { format } from 'date-fns'
import { IGroupedKanbanData, IKanbanCardData, IKanbanCardItem, KanbanProps } from '../types/kanbanCardAsync.types'
import { DPStatus } from '../../clusters/delivery-plan/pages/list-delivery-plan/services/fetch/fetchDeliveryPlanStatus.service'

const KanbanAsync: React.FC<KanbanProps> = ({ statusOrder, onClick, dataFetchService, kanbanStatusFetchService }) => {
  const theme = useTheme()

  const { isLoading, isError, isFetching, data: serviceData } = dataFetchService()
  const {
    isLoading: kanbanStatusLoading,
    isError: kanbanStatusError,
    isFetching: kanbanStatusFetching,
    data: kanbanStatusServiceData
  } = kanbanStatusFetchService({ search: '' })

  const isDataLoading = isLoading || isFetching || kanbanStatusLoading || kanbanStatusFetching
  const isDataError = isError || kanbanStatusError

  const groupedData: IGroupedKanbanData[] = useMemo(() => {
    if (!serviceData?.data || !kanbanStatusServiceData?.data) return []

    return kanbanStatusServiceData.data
      .sort((a: DPStatus, b: DPStatus) => {
        const indexA = statusOrder?.indexOf(a.name)
        const indexB = statusOrder?.indexOf(b.name)
        const maxIndex = statusOrder?.length
        return (indexA === -1 ? maxIndex : indexA) - (indexB === -1 ? maxIndex : indexB)
      })
      .map((status: DPStatus) => ({
        status: status.name,
        items: serviceData.data.filter((item: IKanbanCardData) => item.status?.name === status.name)
      }))
  }, [serviceData, statusOrder, kanbanStatusServiceData])

  if (isDataLoading) {
    return (
      <Grid container direction='column' alignItems='center' padding={4} minHeight='70dvh'>
        <CircularProgress />
        <MvTypography size='BODY_LG_BOLDEST' noWrap typeSize={'PX'} mt={8} mb={2}>
          Loading....
        </MvTypography>
      </Grid>
    )
  }

  if (isDataError) {
    return (
      <Grid container direction='column' alignItems='center' padding={4} minHeight='70dvh'>
        <MvTypography size='LABEL_MD_BOLDEST' noWrap typeSize={'PX'} mt={8} mb={2}>
          Terjadi Error
        </MvTypography>
      </Grid>
    )
  }

  return (
    <Box
      padding={'24px'}
      border={`1px solid ${theme.colorToken.border.neutral.normal}`}
      borderRadius={'6px'}
      overflow={'auto'}
      height={'70vh'}
    >
      <Stack direction={'row'} alignItems={'flex-start'} spacing={'16px'} paddingBottom={'20px'} overflow={'auto'}>
        {groupedData.map((group: any, index: number) => {
          const statusColor = group.items[0]?.status.color || theme.colorToken.background.primary.normal

          return (
            <Stack key={index} alignItems={'flex-start'} spacing={'16px'}>
              <Box
                bgcolor={statusColor + '20'}
                borderRadius={'6px'}
                padding={'16px'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                minWidth={'300px'}
                height={'43px'}
                border={`1px solid ${statusColor}`}
              >
                <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={statusColor}>
                  {group?.status}
                </MvTypography>
              </Box>
              {group?.items?.map((item: IKanbanCardData, index: number) => (
                <Box
                  key={item.id}
                  display={'flex'}
                  flexDirection={'column'}
                  alignItems={'flex-start'}
                  gap={'0px'}
                  minWidth={'300px'}
                  borderRadius={'6px'}
                  overflow={'hidden'}
                  boxShadow={'0px 0px 4px 0px #00000014'}
                  sx={{
                    transition: '0.1s',
                    '&:hover': {
                      boxShadow: '0px 0px 16px 0px rgba(0, 0, 0, 0.3)'
                    },
                    cursor: 'pointer'
                  }}
                  onClick={() => onClick?.(item)}
                >
                  <Box
                    width={'100%'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    padding={'8px'}
                    bgcolor={statusColor}
                  >
                    <MvTypography typeSize={'PX'} size={'LABEL_LG_BOLDEST'}>
                      {item?.title}
                    </MvTypography>
                  </Box>
                  <Stack padding={'8px'} width={'100%'} alignItems={'center'} gap={'20px'}>
                    <Box
                      bgcolor={statusColor + '20'}
                      borderRadius={'6px'}
                      padding={'6px'}
                      display={'flex'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      width={'100%'}
                    >
                      <MvTypography typeSize={'PX'} size={'LABEL_SM_BOLDEST'} color={statusColor}>
                        {item?.subTitle}
                      </MvTypography>
                    </Box>
                    {item?.contentTitle && (
                      <MvTypography typeSize={'PX'} size={'BODY_LG_BOLDEST'} textAlign={'center'}>
                        {item?.contentTitle}
                      </MvTypography>
                    )}
                    <Grid
                      container
                      sx={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'center'
                      }}
                      rowGap={'10px'}
                    >
                      {item?.contentItems?.map((v: IKanbanCardItem, i: number) => {
                        return (
                          <Grid
                            key={i}
                            item
                            md={item?.contentItems.length > 2 ? 4 : 6}
                            xs={6}
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              width: '100%'
                            }}
                          >
                            <Stack alignItems={'center'} spacing={'4px'} gap={'2px'}>
                              <MvTypography
                                typeSize={'PX'}
                                size={'BODY_MD_BOLDEST'}
                                sx={{
                                  whiteSpace: 'normal',
                                  overflowWrap: 'break-word',
                                  maxWidth: '100%',
                                  textAlign: 'center'
                                }}
                              >
                                {v.value || '-'}
                              </MvTypography>
                              <MvTypography
                                typeSize={'PX'}
                                size={'LABEL_MD_NORMAL'}
                                color={theme.colorToken.text.neutral.subtle}
                                sx={{
                                  whiteSpace: 'normal',
                                  overflowWrap: 'break-word',
                                  maxWidth: '100%',
                                  textAlign: 'center'
                                }}
                              >
                                {v?.title}
                              </MvTypography>
                            </Stack>
                          </Grid>
                        )
                      })}
                    </Grid>
                    {item.singleDateData ? (
                      <MvTypography typeSize={'PX'} size={'LABEL_SM_BOLDEST'}>
                        {format(item.singleDateData, 'dd/MM/yyyy')}
                      </MvTypography>
                    ) : item.dateFrom && item.dateTo ? (
                      <Box sx={{ display: 'flex', gap: '10px' }}>
                        <MvTypography typeSize={'PX'} size={'LABEL_SM_BOLDEST'}>
                          {format(item.dateFrom, 'dd MMM hh:mm')}
                        </MvTypography>
                        <MvTypography typeSize={'PX'} size={'LABEL_SM_BOLDEST'}>
                          -
                        </MvTypography>
                        <MvTypography typeSize={'PX'} size={'LABEL_SM_BOLDEST'}>
                          {format(item.dateTo, 'dd MMM hh:mm')}
                        </MvTypography>
                      </Box>
                    ) : (
                      <></>
                    )}
                  </Stack>
                </Box>
              ))}
            </Stack>
          )
        })}
      </Stack>
    </Box>
  )
}

export default KanbanAsync
