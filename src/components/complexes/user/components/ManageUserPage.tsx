import Link from '@mui/material/Link'
import NextLink from 'next/link'
import Icon from 'src/@core/components/icon'
import { useTheme } from '@mui/material/styles'
import { Button } from 'src/components/atoms/button'
import Box from '@mui/material/Box'
import { useEffect } from 'react'
import { Alert } from 'src/components/atoms/alert/Alert'
import { useAtom } from 'jotai'
import { userAlertAtom } from '../atoms'
import { useRouter } from 'next/router'
import { GridRenderCellParams, type GridValueGetterParams } from '@mui/x-data-grid'
import { ActionButton } from './ActionButton'
import { TableAsyncV2 } from '@/components/molecules/table-async-v2'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Breadcrumbs } from '@mui/material'
import { IResultController } from '@/components/molecules/filter/types/filter.types'
import { fetchListDepartment, GetTableUsers } from '../service/fetchUser.service'
import { GetTableUsersResponse } from '../types/ManageUserPage.types'

export function ManageUserPage() {
  const theme = useTheme()
  const [userAlert, setUserAlert] = useAtom(userAlertAtom)
  const router = useRouter()


  useEffect(() => {
    if (!userAlert.open) {
      return
    }

    setTimeout(() => {
      setUserAlert({
        ...userAlert,
        open: false
      })
    }, 4000)
  }, [setUserAlert, userAlert])

  const CONTROLLER = [
    {
      key: 'profile.full_name',
      name: 'Search User',
      type: 'SEARCH'
    },

    {
      key: 'sto.name',
      name: 'Department',
      type: 'MULTI_SELECT',
      dataFetchService: fetchListDepartment,
      valueKey: 'id',
      labelKey: 'name'
    },
  ]

  return (
    <>
      <main>
        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '24px' }}>
          <Box sx={{ flexGrow: 1 }}>
            <MvTypography size='TITLE_XL' typeSize='PX'>Manage User</MvTypography>
            <Breadcrumbs
              aria-label='breadcrumb'
              sx={{ mt: '8px' }}
              separator={<Icon icon='mdi:chevron-right' color='#909094' />}
            >
              <Link component={NextLink} href='/'>
                <Icon icon='mdi:home-outline' style={{ color: theme.palette.primary.main }} fontSize='20px' />
              </Link>
              <MvTypography size='BODY_MD_BOLDEST' typeSize='PX'>Manage User</MvTypography>
            </Breadcrumbs>
          </Box>

          {userAlert.pathname === router.pathname && userAlert.open ? (
            <Alert
              variant='contained'
              content={userAlert.content}
              color={userAlert.color}
              title={userAlert.title}
              icon={userAlert.icon}
              onClose={() => setUserAlert({ ...userAlert, open: false })}
            />
          ) : null}

          <Button
            LinkComponent={NextLink}
            variant='contained'
            content='iconText'
            text='Add User'
            icon='mdi:plus'
            size='large'
            sx={{ height: '43px', padding: '8px 16px !important', borderRadius: '4px', fontSize: '1rem' }}
            href='/core/user/add'
          />
        </Box>

        <TableAsyncV2
          columns={[
            {
              field: 'profile.id_number',
              headerName: 'ID',
              flex: 1,
              sortable: false,
              disableColumnMenu: true,
              valueGetter: (params: GridValueGetterParams<GetTableUsersResponse['data'][number]>) => {
                return params.row.profile?.id_number || '-'
              },
              searchable: true
            },
            {
              field: 'profile.full_name',
              headerName: 'Name',
              flex: 1,
              sortable: false,
              disableColumnMenu: true,
              valueGetter: (params: GridValueGetterParams<GetTableUsersResponse['data'][number]>) => {
                return params.row.profile?.full_name || '-'
              },
              searchable: true
            },
            {
              field: 'werk.name',
              headerName: 'Work Center',
              flex: 1,
              sortable: false,
              disableColumnMenu: true,
              valueGetter: (params: GridValueGetterParams<GetTableUsersResponse['data'][number]>) => {
                return params.row.werk?.name || '-'
              },
              searchable: true
            },
            {
              field: 'sto.name',
              headerName: 'Department',
              flex: 1,
              sortable: false,
              disableColumnMenu: true,
              valueGetter: (params: GridValueGetterParams<GetTableUsersResponse['data'][number]>) => {
                return params.row.sto?.name || '-'
              },
              searchable: true
            },
            {
              field: 'actions',
              headerName: 'Action',
              flex: 1,
              maxWidth: 126,
              sortable: false,
              disableColumnMenu: true,
              renderCell: (params: GridRenderCellParams<GetTableUsersResponse['data'][number]>) => {
                return (
                  <Box display='flex' alignItems='center' justifyContent='center' width='100%'>
                    <ActionButton user={params.row} />
                  </Box>
                )
              },
              headerAlign: 'center'
            }
          ]}
          dataFetchService={GetTableUsers}
          resultController={CONTROLLER as IResultController[]}
          type="inline"
        />
      </main>
    </>
  )
}
