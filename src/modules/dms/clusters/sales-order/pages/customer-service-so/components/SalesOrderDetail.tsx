import { ButtonCopy } from '@/components/atoms/button-copy'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Accordion } from '@/components/molecules/accordion'
import { ChecklistGroup } from '@/components/molecules/checklist-group'
import { ChecklistRequest } from '@/components/molecules/checklist-request'
import { Table } from '@/components/molecules/table'
import { Box, Grid, Stack, useTheme } from '@mui/material'
import SalesOrderAnalysis from './SalesOrderAnalysis'

export const SalesOrderDetail = () => {
  const theme = useTheme()

  const rows = [
    {
      id: '0',
      material_name: 'Material A',
      material_code: 'MaterialA001',
      type: 'Finish Good',
      quantity: '200',
      unit: 'Pcs'
    },
    {
      id: '1',
      material_name: 'Material B',
      material_code: 'MaterialB002',
      type: 'Raw Material',
      quantity: '160',
      unit: 'Pcs'
    },
    {
      id: '2',
      material_name: 'Material C',
      material_code: 'MaterialC003',
      type: 'Finish Good',
      quantity: '150',
      unit: 'Kg'
    }
  ]
  return (
    <Box
      border={`1px solid ${theme.colorToken.border.neutral.normal}`}
      borderRadius={'6px'}
      padding={'24px'}
      display={'flex'}
      flexDirection={'column'}
      rowGap={'16px'}
      width={'100%'}
    >
      <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
        <MvTypography typeSize={'PX'} size={'TITLE_SM'}>
          Sales Order
        </MvTypography>
        <Stack direction={'row'} alignItems='center' spacing={'4px'}>
          <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
            Total Material:
          </MvTypography>
          <Box
            bgcolor={theme.colorToken.background.primary.subtlest}
            borderRadius={'100px'}
            padding={'4px'}
            minWidth={'28px'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <MvTypography typeSize={'PX'} size={'BODY_SM_BOLDEST'}>
              3
            </MvTypography>
          </Box>
        </Stack>
      </Stack>
      <Accordion
        data={[
          {
            content: <SalesOrderAnalysis />,
            title: 'Sales Order Analysis'
          }
        ]}
      />
      <Box
        display={'flex'}
        flexDirection={'column'}
        border={`1px solid ${theme.colorToken.border.neutral.normal}`}
        borderRadius={'6px'}
      >
        <Box display={'flex'} padding={'12px'}>
          <MvTypography typeSize={'PX'} size={'LABEL_LG_BOLDEST'}>
            Sales Order Information
          </MvTypography>
        </Box>
        <Grid container spacing={4} columns={{ xs: 1, sm: 1, md: 3 }} sx={{ padding: '16px 18px' }}>
          <Grid item xs={1}>
            <Stack spacing={'8px'}>
              <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                PO Number Customer
              </MvTypography>
              <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.colorToken.text.neutral.normal}>
                -
              </MvTypography>
            </Stack>
          </Grid>
          <Grid item xs={1}>
            <Stack spacing={'8px'}>
              <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                ID SO DMS
              </MvTypography>
              <Stack direction={'row'} alignItems={'center'} spacing={'6px'}>
                <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.colorToken.text.neutral.normal}>
                  234325
                </MvTypography>
                <ButtonCopy value={'234325'} title={'ID SO DMS'} />
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={1}>
            <Stack spacing={'8px'}>
              <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                Customer
              </MvTypography>
              <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.colorToken.text.neutral.normal}>
                Customer Name
              </MvTypography>
            </Stack>
          </Grid>
          <Grid item xs={1}>
            <Stack spacing={'8px'}>
              <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                Delivery Address
              </MvTypography>
              <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.colorToken.text.neutral.normal}>
                Lorem ipsum dolor sit amet consectetur. Ullamcorper volutpat mauris pretium mauris feugiat. Vestibulum
                fermentum est semper molestie commodo duis id amet amet.
              </MvTypography>
            </Stack>
          </Grid>
          <Grid item xs={1}>
            <Stack spacing={'8px'}>
              <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                Remark
              </MvTypography>
              <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.colorToken.text.neutral.normal}>
                Lorem ipsum dolor sit amet consectetur. Ullamcorper volutpat mauris pretium mauris feugiat. Vestibulum
                fermentum est semper molestie commodo duis id amet amet.
              </MvTypography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Box
        display={'flex'}
        flexDirection={'column'}
        border={`1px solid ${theme.colorToken.border.neutral.normal}`}
        borderRadius={'6px'}
      >
        <Box display={'flex'} padding={'16px'} borderBottom={`1px solid ${theme.colorToken.border.neutral.normal}`}>
          <MvTypography typeSize={'PX'} size={'LABEL_LG_BOLDEST'}>
            Material Request
          </MvTypography>
        </Box>
        <Box padding={'16px 18px'}>
          <Table
            columns={[
              {
                field: 'material_name',
                headerName: 'MATERIAL NAME',
                justifyContent: 'flex-start',
                flex: 1,
                minWidth: 300
              },
              {
                field: 'material_code',
                headerName: 'MATERIAL CODE',
                justifyContent: 'flex-start',
                flex: 1,
                minWidth: 300
              },
              {
                field: 'type',
                headerName: 'TYPE',
                justifyContent: 'flex-start',
                width: 250
              },
              {
                field: 'quantity',
                headerName: 'QUANTITY',
                justifyContent: 'flex-start',
                width: 250
              },
              {
                field: 'unit',
                headerName: 'UNIT',
                justifyContent: 'flex-start',
                width: 250
              }
            ]}
            rows={rows}
            checkboxSelection={false}
            onRowSelectionModelChange={ids => {
              const selectedIDs = new Set(ids)
              console.log(selectedIDs)
              const selectedRowData = rows.filter(row => selectedIDs.has(row.id.toString()))
              console.log(selectedRowData)
            }}
          />
        </Box>
      </Box>
      <ChecklistGroup
        title={'Order Request Checklist'}
        checklistRequests={[
          <ChecklistRequest
            title='Document/Label/Stiker'
            options={[
              { id: 'surat_jalan', label: 'Surat Jalan' },
              { id: 'coa', label: 'COA' },
              { id: 'msds', label: 'MSDS' },
              { id: 'packing_list', label: 'Packing List' },
              { id: 'surat_pernyataan_bermaterai', label: 'Surat Pernyataan Bermaterai' },
              { id: 'po', label: 'PO' },
              { id: 'titipan_dokumen', label: 'Titipan Dokumen' },
              { id: 'label_product', label: 'Label Product' },
              { id: 'hazzard_nfpa', label: 'Hazzard + NFPA' }
            ]}
            valueKey='id'
            labelKey='label'
            value={[
              { id: 'surat_jalan', label: 'Surat Jalan' },
              { id: 'coa', label: 'COA' },
              { id: 'msds', label: 'MSDS' }
            ]}
          />,
          <ChecklistRequest
            title='Packing'
            options={[
              { id: 'strapping', label: 'Strapping' },
              { id: 'wrapping', label: 'Wrapping' },
              { id: 'shipping_marks', label: 'Shipping Marks' },
              { id: 'hazzard_nfpa', label: 'Hazzard + NFPA' },
              { id: 'label_product', label: 'Label Product' },
              { id: 'msds', label: 'MSDS' },
              { id: 'pallet', label: 'Pallet' },
              { id: 'ibc_frame', label: 'IBC Frame' }
            ]}
            valueKey='id'
            labelKey='label'
            value={[{ id: 'msds', label: 'MSDS' }]}
          />
        ]}
        disabled
      />
    </Box>
  )
}
