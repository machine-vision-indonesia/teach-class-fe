import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'
import NextLink from 'next/link'
import Link from '@mui/material/Link'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { Button } from 'src/components/atoms/button'
import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import client from '../../../client'
import { Modal } from '../../../components/atoms/modal/Modal'
import { useAtom } from 'jotai'
import { Alert } from '../../../components/atoms/alert/Alert'
import { TableAsync } from 'src/components/molecules/table-async/TableAsync'
import {
  GetTableDepartments,
  type GetTableDepartmentsResponse
} from 'src/components/complexes/department/service/list/GetTableDepartments.service'
import { GetDropdownDepartments } from 'src/components/complexes/department/service/list/GetDropdownDepartments.service'
import { departmentAlertAtom } from 'src/components/complexes/department/atoms'
import { useRouter } from 'next/router'
import { type GridRenderCellParams, type GridValueGetterParams } from '@mui/x-data-grid'

function useDeleteDepartment() {
  type Data = {
    id: string
  }

  return useMutation({
    async mutationFn(data: Data) {
      return client.api.patch(`/items/mt_departments/${data.id}`, {
        status: 'archived'
      })
    }
  })
}

export default function ManageDepartments() {
  const theme = useTheme()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [toBeDeletedDepartment, setToBeDeletedDepartment] = useState<GetTableDepartmentsResponse['data'][number]>()

  const deleteDepartment = useDeleteDepartment()
  const queryClient = useQueryClient()

  async function onDeleteRow() {
    try {
      if (!toBeDeletedDepartment) {
        return
      }

      await deleteDepartment.mutateAsync({ id: toBeDeletedDepartment.id })
      await queryClient.invalidateQueries()

      setDepartmentAlert({
        title: 'Delete Successful',
        content: 'Your department was success to delete',
        color: 'success',
        icon: 'ic:baseline-check',
        pathname: '/core/department',
        open: true
      })
    } catch {
      setDepartmentAlert({
        title: 'Delete Failed',
        content: 'Your department was failed to delete',
        color: 'error',
        icon: 'ic:baseline-do-disturb',
        pathname: '/core/department',
        open: true
      })
    }

    setDeleteModalOpen(false)
    deleteDepartment.reset()

    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)
  }

  const router = useRouter()
  const [departmentAlert, setDepartmentAlert] = useAtom(departmentAlertAtom)

  useEffect(() => {
    if (!departmentAlert.open) {
      return
    }

    setTimeout(() => {
      setDepartmentAlert({
        ...departmentAlert,
        open: false
      })
    }, 4000)
  }, [setDepartmentAlert, departmentAlert])

  return (
    <>
      <main>
        <div style={{ display: 'flex', alignItems: 'center', columnGap: '24px' }}>
          <div style={{ flexGrow: 1 }}>
            <Typography variant='h2'>Manage Department</Typography>
            <Breadcrumbs
              aria-label='breadcrumb'
              sx={{ mt: '8px' }}
              separator={<Icon icon='mdi:chevron-right' color='#909094' />}
            >
              <Link component={NextLink} href='/'>
                <Icon icon='mdi:home-outline' style={{ color: theme.palette.primary.main }} fontSize='20px' />
              </Link>
              <Typography variant='body1' color={`${theme.palette.text.primary} !important`}>
                Manage Department
              </Typography>
            </Breadcrumbs>
          </div>

          {departmentAlert.pathname === router.pathname && departmentAlert.open ? (
            <Alert
              variant='contained'
              content={departmentAlert.content}
              color={departmentAlert.color}
              title={departmentAlert.title}
              icon={departmentAlert.icon}
              onClose={() => setDepartmentAlert({ ...departmentAlert, open: false })}
            />
          ) : null}

          <Button
            LinkComponent={NextLink}
            variant='contained'
            content='textOnly'
            text='Add Department'
            size='large'
            startIcon={<Icon icon='mdi:plus' fontSize='18px' />}
            sx={{ height: '43px', padding: '8px 16px !important', borderRadius: '4px', fontSize: '1rem' }}
            href='/core/department/add'
          />
        </div>

        <TableAsync
          isStripped
          maxWidth='100%'
          columns={[
            {
              field: 'code',
              headerName: 'Code',
              flex: 1,
              sortable: false,
              disableColumnMenu: true,
              searchable: true
            },
            {
              field: 'name',
              headerName: 'Name',
              flex: 1,
              sortable: false,
              disableColumnMenu: true,
              searchable: true
            },
            {
              field: 'parent.name',
              headerName: 'Parent Department',
              flex: 1,
              sortable: false,
              disableColumnMenu: true,
              valueGetter: (params: GridValueGetterParams<GetTableDepartmentsResponse['data'][number]>) => {
                return params.row.parent?.name ?? '-'
              },
              searchable: true
            },
            {
              field: 'actions',
              headerName: 'Action',
              flex: 1,
              maxWidth: 146,
              sortable: false,
              disableColumnMenu: true,
              renderCell: (params: GridRenderCellParams<GetTableDepartmentsResponse['data'][number]>) => {
                return (
                  <Box display='flex' alignItems='center' columnGap='16px' justifyContent='center' width='100%'>
                    <Button
                      content='iconOnly'
                      icon='ic:outline-mode'
                      sx={{
                        aspectRatio: '1/1',
                        minWidth: 'unset',
                        color: '#1E4480',
                        padding: 0,
                        '&:hover': {
                          background: 'transparent'
                        }
                      }}
                      LinkComponent={NextLink}
                      href={`/core/department/${params.row.id}/edit`}
                    />

                    <Button
                      content='iconOnly'
                      icon='ic:outline-remove-red-eye'
                      sx={{
                        aspectRatio: '1/1',
                        minWidth: 'unset',
                        color: '#005EFF',
                        padding: 0,
                        '&:hover': {
                          background: 'transparent'
                        }
                      }}
                      LinkComponent={NextLink}
                      href={`/core/department/${params.row.id}`}
                    />

                    <Button
                      content='iconOnly'
                      icon='ic:outline-delete'
                      sx={{
                        aspectRatio: '1/1',
                        minWidth: 'unset',
                        color: '#DA1631',
                        padding: 0,
                        '&:hover': {
                          background: 'transparent'
                        }
                      }}
                      onClick={() => {
                        setToBeDeletedDepartment(params.row)
                        setDeleteModalOpen(true)
                      }}
                    />
                  </Box>
                )
              },
              headerAlign: 'center'
            }
          ]}
          dataFetchService={GetTableDepartments}
          filters={[
            {
              type: 'dropdown-multiple',
              name: 'Parent Department',
              labelKey: 'name',
              field: 'parent',
              dataFetchService: GetDropdownDepartments
            }
          ]}
        />
      </main>

      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title={'Are you sure you want to delete department?'}
        onOk={onDeleteRow}
        variant='danger'
        loading={(deleteDepartment.isLoading || deleteDepartment.isSuccess) && !deleteDepartment.isPaused}
      />
    </>
  )
}
