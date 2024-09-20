import { Button } from '@/components/atoms'
import { MvTypography } from '@/components/atoms/mv-typography'
import ButtonAction from '@/components/molecules/button-action'
import { ChecklistGroup } from '@/components/molecules/checklist-group'
import { ChecklistRequest } from '@/components/molecules/checklist-request'
import { Field } from '@/components/molecules/field'
import { SectionGroup } from '@/components/molecules/section-group'
import { Table } from '@/components/molecules/table'
import { BASE_DELIVERY_PLAN_PATH } from '@/modules/dms/common/constants'
import { InventoryTransferRequestStatus } from '@/modules/dms/common/constants/inventoryTransferRequestStatus'
import { Box, Grid, useTheme } from '@mui/material'
import Stack from '@mui/material/Stack'
import { GridColDef } from '@mui/x-data-grid'
import Image from 'next/image'
import { useNavigate } from 'react-router-dom'

export const Step3 = () => {
  const theme = useTheme()
  const navigate = useNavigate()

  const onSubmitStep3 = () => {
    // TODO: hit api for update status & next step (simulated)
    localStorage.setItem(
      '_simulated_status_[CLUSTER:InventoryTransfer][PAGES:Delivery-ITR]',
      InventoryTransferRequestStatus.CONFIRM
    )
    navigate(0)
  }

  const columns: GridColDef[] = [
    {
      field: 'material_name',
      headerName: 'MATERIAL',
      flex: 1,
      minWidth: 180,
      maxWidth: 220
    },
    {
      field: 'material_code',
      headerName: 'MATERIAL CODE',
      flex: 1,
      minWidth: 180,
      maxWidth: 220
    },
    {
      field: 'batch_number',
      headerName: 'BATCH NUMBER',
      flex: 1,
      minWidth: 180,
      maxWidth: 220
    },
    {
      field: 'type',
      headerName: 'TYPE',
      flex: 1,
      minWidth: 180,
      maxWidth: 220
    },
    {
      field: 'qty_request',
      headerName: 'QTY REQUEST',
      flex: 1,
      minWidth: 180,
      maxWidth: 220
    },
    {
      field: 'unit',
      headerName: 'UNIT',
      flex: 1,
      minWidth: 180,
      maxWidth: 220
    },
    {
      field: 'actual_qty',
      headerName: 'ACTUAL QTY',
      flex: 1,
      minWidth: 180,
      maxWidth: 220
    }
  ]

  return (
    <>
      <Stack width={'100%'} alignItems={'start'} rowGap={'12px'}>
        {/* sales order information */}
        <SectionGroup color='default' title='Inventory Transfer Information'>
          <Grid container columns={{ xs: 1, md: 3 }} rowSpacing={6} columnSpacing={4}>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.colorToken.text.neutral.subtlest}>
                  ITR Number
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  234325
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.colorToken.text.neutral.subtlest}>
                  Transfer Date Request
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  DD/MM/YYYY
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.colorToken.text.neutral.subtlest}>
                  Transfer Date Sceduled
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  DD/MM/YYYY
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.colorToken.text.neutral.subtlest}>
                  From
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  KBI
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.colorToken.text.neutral.subtlest}>
                  To
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  Jababeka
                </MvTypography>
              </Stack>
            </Grid>
          </Grid>
        </SectionGroup>

        {/* material request */}
        <SectionGroup color='default' title='Material Request'>
          <Table
            columns={columns}
            rows={[
              {
                id: 0,
                material_name: 'Material A',
                material_code: 'MaterialA001',
                batch_number: '2054.07.0A2',
                type: 'Finish Good',
                qty_request: 200,
                unit: 'Pcs',
                actual_qty: 20
              },
              {
                id: 1,
                material_name: 'Material B',
                material_code: 'MaterialB002',
                batch_number: '2054.07.0A2',
                type: 'Raw Material',
                qty_request: 160,
                unit: 'Pcs',
                actual_qty: 20
              },
              {
                id: 2,
                material_name: 'Material C',
                material_code: 'MaterialC003',
                batch_number: '2054.07.0A2',
                type: 'Finish Good',
                qty_request: 150,
                unit: 'Kg',
                actual_qty: 20
              }
            ]}
            checkboxSelection={false}
          />
        </SectionGroup>

        {/* checklist group */}
        <Box width={'100%'}>
          <ChecklistGroup
            title={'Transfer Request Checklist'}
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
          />
        </Box>

        {/* transportation used */}
        <SectionGroup color='default' title='Transportation Used'>
          <Grid container columns={{ xs: 1, sm: 1, md: 2 }} spacing={4}>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.colorToken.text.neutral.subtlest}>
                  Driver Name
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  Agus Suhadi
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.colorToken.text.neutral.subtlest}>
                  Road Letter Number
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  7686753
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.colorToken.text.neutral.subtlest}>
                  Vehicle
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  Tronton
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.colorToken.text.neutral.subtlest}>
                  Vehicle registration Number
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  AG 7866 BD
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1} md={2}>
              <Box
                width={'100%'}
                border={`1px solid ${theme.colorToken.border.neutral.normal}`}
                borderRadius={'6px'}
                padding={'16px'}
                display={'flex'}
                flexDirection={'column'}
                rowGap={'16px'}
              >
                <MvTypography typeSize={'PX'} size={'BODY_LG_BOLDEST'}>
                  Container
                </MvTypography>
                <Grid container columns={{ xs: 1, sm: 1, md: 2 }} spacing={4}>
                  <Grid item xs={1}>
                    <Field label='Front' isRequired>
                      <Box
                        height='200px'
                        width='100%'
                        position='relative'
                        overflow='hidden'
                        border='2px dashed'
                        borderColor='neutral.100'
                        borderRadius='4px'
                      >
                        <Image
                          alt='images'
                          src='https://placehold.co/1000x1000'
                          fill={true}
                          objectFit='cover'
                          priority={true}
                        />
                      </Box>
                    </Field>
                  </Grid>
                  <Grid item xs={1}>
                    <Field label='Back' isRequired>
                      <Box
                        height='200px'
                        width='100%'
                        position='relative'
                        overflow='hidden'
                        border='2px dashed'
                        borderColor='neutral.100'
                        borderRadius='4px'
                      >
                        <Image
                          alt='images'
                          src='https://placehold.co/1000x1000'
                          fill={true}
                          objectFit='cover'
                          priority={true}
                        />
                      </Box>
                    </Field>
                  </Grid>
                  <Grid item xs={1}>
                    <Field label='Right Side' isRequired>
                      <Box
                        height='200px'
                        width='100%'
                        position='relative'
                        overflow='hidden'
                        border='2px dashed'
                        borderColor='neutral.100'
                        borderRadius='4px'
                      >
                        <Image
                          alt='images'
                          src='https://placehold.co/1000x1000'
                          fill={true}
                          objectFit='cover'
                          priority={true}
                        />
                      </Box>
                    </Field>
                  </Grid>
                  <Grid item xs={1}>
                    <Field label='Left Side' isRequired>
                      <Box
                        height='200px'
                        width='100%'
                        position='relative'
                        overflow='hidden'
                        border='2px dashed'
                        borderColor='neutral.100'
                        borderRadius='4px'
                      >
                        <Image
                          alt='images'
                          src='https://placehold.co/1000x1000'
                          fill={true}
                          objectFit='cover'
                          priority={true}
                        />
                      </Box>
                    </Field>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </SectionGroup>
      </Stack>

      <Stack
        width={'100%'}
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        sx={{
          marginTop: '18px'
        }}
      >
        <Button
          variant='outlined'
          content='textOnly'
          color='primary'
          text='Cancel'
          onClick={() => navigate(BASE_DELIVERY_PLAN_PATH)}
          sx={{ paddingX: '16px', paddingY: '12px', minWidth: 0 }}
        />
        <ButtonAction
          size='large'
          confirmationStatusVariant='warning'
          modalOptions='default'
          confirmationText={{
            negativeLabel: 'Cancel',
            positiveLabel: 'Yes',
            title: 'Are you sure want to Stuffing?',
            description: 'You won’t be able to revert this!'
          }}
          alertText={{
            error: {
              title: 'Network Errors.',
              description: 'Unable to connect to the network or server.'
            },
            success: {
              title: 'Successfully save data.',
              description: 'Schedule ITR has been saved by our system.'
            }
          }}
          variant='contained'
          color='primary'
          content='textOnly'
          payload={null}
          actionService={payload => {
            onSubmitStep3()
          }}
          text='Save'
        />
      </Stack>
    </>
  )
}
