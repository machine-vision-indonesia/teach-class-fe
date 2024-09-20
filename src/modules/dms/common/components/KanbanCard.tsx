import { Box, Grid, Stack, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { generateUUID } from '../utils'
import { MvTypography } from '@/components/atoms/mv-typography'
import { IKanbanCardItem, KanbanCardProps } from '../types/kanbanCard.types'

const KanbanCard: React.FC<KanbanCardProps> = ({ data = [], statusOrder = [], onClick = () => {} }) => {
  const theme = useTheme()

  const [sampleData, setSampleData] = useState<{ id: string; status: string }[]>([
    {
      id: generateUUID(),
      status: 'Open'
    },
    {
      id: generateUUID(),
      status: 'Open'
    },
    {
      id: generateUUID(),
      status: 'SCM Approved'
    },
    {
      id: generateUUID(),
      status: 'SCM Approved'
    }
  ])

  const [dataOpen, setDataOpen] = useState<{ id: string; status: string }[]>([])

  const groupDataByStatus = (data: IKanbanCardItem[], statusOrder: string[]) => {
    return statusOrder.map(status => ({
      status,
      items: data.filter(item => item.status.name === status)
    }))
  }

  const groupedData = groupDataByStatus(data, statusOrder)

  useEffect(() => {
    const filteredData = sampleData.filter(item => item.status === 'Open')
    setDataOpen(filteredData)
  }, [sampleData])

  return (
    <Box
      padding={'24px'}
      border={`1px solid ${theme.colorToken.border.neutral.normal}`}
      borderRadius={'6px'}
      overflow={'auto'}
    >
      <Stack direction={'row'} alignItems={'flex-start'} spacing={'16px'} paddingBottom={'20px'} overflow={'auto'}>
        {groupedData.map(group => {
          const statusColor = group.items[0]?.status.color || theme.colorToken.background.primary.normal

          return (
            <Stack alignItems={'flex-start'} spacing={'16px'} maxWidth={'200px'}>
              <Box
                bgcolor={statusColor + '20'}
                borderRadius={'6px'}
                padding={'16px'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                width={'200px'}
                height={'43px'}
                border={`1px solid ${statusColor}`}
              >
                <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={statusColor}>
                  {group.status}
                </MvTypography>
              </Box>
              {group.items.map(item => (
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  alignItems={'flex-start'}
                  gap={'0px'}
                  width={'200px'}
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
                    <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'}>
                      [DP Number]
                    </MvTypography>
                  </Box>
                  <Stack padding={'8px'} width={'100%'} alignItems={'center'} spacing={'10px'}>
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
                        [ID SO Number]
                      </MvTypography>
                    </Box>
                    <MvTypography typeSize={'PX'} size={'BODY_LG_BOLDEST'} sx={{ marginBottom: '12px !important' }}>
                      Customer A
                    </MvTypography>
                    <Grid container columns={2}>
                      <Grid item xs={1}>
                        <Stack alignItems={'center'} spacing={'4px'}>
                          <MvTypography typeSize={'PX'} size={'BODY_MD_BOLDEST'}>
                            Jababeka
                          </MvTypography>
                          <MvTypography
                            typeSize={'PX'}
                            size={'BODY_MD_NORMAL'}
                            color={theme.colorToken.text.neutral.subtle}
                          >
                            Location
                          </MvTypography>
                        </Stack>
                      </Grid>
                      <Grid item xs={1}>
                        <Stack alignItems={'center'} spacing={'4px'}>
                          <MvTypography typeSize={'PX'} size={'BODY_MD_BOLDEST'}>
                            3
                          </MvTypography>
                          <MvTypography
                            typeSize={'PX'}
                            size={'BODY_MD_NORMAL'}
                            color={theme.colorToken.text.neutral.subtle}
                          >
                            Material
                          </MvTypography>
                        </Stack>
                      </Grid>
                    </Grid>
                    <MvTypography typeSize={'PX'} size={'LABEL_SM_BOLDEST'}>
                      DD/MM/YYYY
                    </MvTypography>
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

export default KanbanCard
