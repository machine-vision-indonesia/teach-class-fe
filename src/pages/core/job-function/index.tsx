import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import NextLink from 'next/link'
import Icon from 'src/@core/components/icon'
import { useTheme } from '@mui/material/styles'
import { Button } from 'src/components/atoms/button'
import { Input } from 'src/components/atoms/input'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useDebounce } from 'src/hooks/useDebounce'
import { CircularProgress } from 'src/components/atoms/circular-progress/CircularProgress'
import { Pagination } from 'src/components/atoms/pagination/Pagination'
import { useGetJobFunctions } from '../../../components/complexes/job-function/service/list/useGetJobFunctions'
import { Modal } from '../../../components/atoms/modal/Modal'
import { useDeleteJobFunctions } from '../../../components/complexes/job-function/service/list/useDeleteJobFunctions'
import { Alert } from '../../../components/atoms/alert/Alert'
import { isCreateSuccessAtom, isEditSuccessAtom } from '../../../components/complexes/job-function/atoms'
import { useAtom } from 'jotai'
import { useGetDepartments } from '../../../components/complexes/job-function/service/list/useGetDepartments'

export default function Page() {
  const theme = useTheme()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [isDeleteJobFuncFailed, setIsDeleteJobFuncFailed] = useState(false)
  const [isDeleteJobFuncSuccess, setIsDeleteJobFuncSuccess] = useState(false)
  const deleteJobFunction = useDeleteJobFunctions()
  const [page, setPage] = useState(1)
  const limit = 10
  const [departmentsSearch, setDepartmentsSearch] = useState('')
  const debouncedDepartmentsSearch = useDebounce(departmentsSearch, 1000)
  const departments = useGetDepartments({ search: debouncedDepartmentsSearch })
  const [selectedDepartments, setSelectedDepartments] = useState<NonNullable<(typeof departments)['data']>>([])
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 1000)
  const [isCreateSuccess, setIsCreateSuccess] = useAtom(isCreateSuccessAtom)
  const [isEditSuccess, setIsEditSuccess] = useAtom(isEditSuccessAtom)

  const jobFunctions = useGetJobFunctions({
    search: debouncedSearch,
    stoIds: selectedDepartments.map(department => department.id),
    page,
    limit
  })

  const [toBeDeletedJobFunction, setToBeDeletedJobFunction] = useState<NonNullable<string>>()

  const queryClient = useQueryClient()

  useEffect(() => {
    if (!isDeleteJobFuncFailed) {
      return
    }
    setTimeout(() => {
      setIsDeleteJobFuncFailed(false)
    }, 4000)
  }, [isDeleteJobFuncFailed])

  useEffect(() => {
    if (!isDeleteJobFuncSuccess) {
      return
    }
    setTimeout(() => {
      setIsDeleteJobFuncSuccess(false)
    }, 4000)
  }, [isDeleteJobFuncSuccess])

  useEffect(() => {
    if (!isCreateSuccess) {
      return
    }
    setTimeout(() => {
      setIsCreateSuccess(false)
    }, 4000)
  }, [isCreateSuccess])

  useEffect(() => {
    if (!isEditSuccess) {
      return
    }
    setTimeout(() => {
      setIsEditSuccess(false)
    }, 4000)
  }, [isEditSuccess])

  useEffect(() => {
    setPage(1)
  }, [selectedDepartments.length, debouncedDepartmentsSearch])

  return (
    <>
      <main>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flexGrow: 1 }}>
            <Typography variant='h2'>Job Function</Typography>
            <Breadcrumbs
              aria-label='breadcrumb'
              sx={{ mt: '8px' }}
              separator={<Icon icon='mdi:chevron-right' color='#909094' />}
            >
              <Link component={NextLink} href='/'>
                <Icon icon='mdi:home-outline' style={{ color: theme.palette.primary.main }} fontSize='20px' />
              </Link>
              <Typography variant='body1' color={`${theme.palette.text.primary} !important`}>
                Job Function
              </Typography>
            </Breadcrumbs>
          </div>
          <Button
            LinkComponent={NextLink}
            variant='contained'
            content='iconText'
            text='Add Job Function'
            icon='mdi:plus'
            size='large'
            startIcon={<Icon icon='mdi:plus' fontSize='18px' />}
            sx={{ height: '43px', padding: '8px 16px !important', borderRadius: '4px', fontSize: '1rem' }}
            href='/core/job-function/add'
          />
        </div>
        <div
          style={{
            backgroundColor: '#FEFEFE',
            borderRadius: '6px',
            boxShadow: '0px 2px 6px 0px rgba(0, 0, 0, 0.25)',
            marginTop: '24.5px'
          }}
        >
          <div style={{ padding: '10px 20px' }}>
            <Input
              placeholder='Search'
              variant='filled'
              fullWidth
              sx={{
                '& fieldset': { border: 'none' },
                '& .MuiOutlinedInput-root.Mui-focused': {
                  boxShadow: 'none'
                }
              }}
              InputProps={{
                style: {
                  paddingLeft: '0px'
                },
                startAdornment: (
                  <Icon fontSize='24px' icon='mdi:magnify' color='#6C7086' style={{ marginRight: '10px' }} />
                )
              }}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <Divider sx={{ borderColor: theme.palette.grey[200] }} />

          <div style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', columnGap: '20px' }}>
            <Autocomplete
              multiple
              value={selectedDepartments}
              onChange={(_, newValue) => {
                setSelectedDepartments(newValue)
                setPage(1)
              }}
              onInputChange={(_, value, reason) => {
                if (reason === 'input') {
                  setDepartmentsSearch(value)
                }
              }}
              sx={{ width: 300 }}
              options={departments.data ?? []}
              loading={departments.isLoading}
              autoHighlight
              getOptionLabel={option => option.label}
              renderTags={() => null}
              filterOptions={options => options}
              disableClearable
              disableCloseOnSelect
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderOption={(props, option, state) => (
                <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  <Checkbox checked={state.selected} />
                  {option.label}
                </Box>
              )}
              renderInput={params => (
                <TextField
                  {...params}
                  placeholder='Department'
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password' // disable autocomplete and autofill
                  }}
                  sx={{
                    '& fieldset': { border: 'none' },
                    '& .MuiOutlinedInput-root.Mui-focused': {
                      boxShadow: 'none'
                    }
                  }}
                  InputLabelProps={{
                    shrink: false
                  }}
                />
              )}
            />
          </div>

          <Divider sx={{ borderColor: theme.palette.grey[200] }} />

          <div
            style={{ display: 'flex', columnGap: '10px', height: '63px', alignItems: 'center', padding: '0px 20px' }}
          >
            {selectedDepartments.length ? (
              selectedDepartments.map(department => (
                <div
                  key={department.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: `1px solid ${theme.palette.grey[200]}`,
                    padding: '5px 10px',
                    borderRadius: '9999px',
                    columnGap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', columnGap: '6px' }}>
                    <Typography variant='PlaceholderSm' style={{ color: theme.palette.text.secondary }}>
                      Department :
                    </Typography>
                    <Typography variant='PlaceholderSm' style={{ color: theme.palette.text.primary }}>
                      {department.label}
                    </Typography>
                  </div>

                  <Button
                    content='iconOnly'
                    icon='material-symbols:cancel-outline'
                    type='button'
                    style={{ minWidth: 'unset', padding: 0 }}
                    onClick={() => {
                      setSelectedDepartments(prev => prev.filter(item => item.id !== department.id))
                    }}
                  />
                </div>
              ))
            ) : (
              <Typography variant='PlaceholderSm' style={{ color: theme.palette.text.primary }}>
                No Filter
              </Typography>
            )}
          </div>

          <Divider sx={{ borderColor: theme.palette.grey[200] }} />

          {jobFunctions.isLoading ? (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <CircularProgress />
            </div>
          ) : null}

          {jobFunctions.isError ? 'Something went wrong. Please try again later' : null}

          {jobFunctions.isSuccess ? (
            <>
              {jobFunctions.data.data.length ? (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead sx={{ backgroundColor: '#F5F8FF' }}>
                      <TableRow>
                        <TableCell sx={{ color: '#2F3033' }}>Code</TableCell>
                        <TableCell sx={{ color: '#2F3033' }}>Name</TableCell>
                        <TableCell sx={{ color: '#2F3033' }}>Department</TableCell>
                        <TableCell sx={{ color: '#2F3033' }}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {jobFunctions.data.data.map(jobFunction => (
                        <TableRow key={jobFunction.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell>{jobFunction.code}</TableCell>
                          <TableCell>{jobFunction.name}</TableCell>
                          {/* <TableCell>{jobFunction.department}</TableCell> */}
                          <TableCell>{jobFunction.sto?.name != null ? jobFunction.sto?.name : '-'}</TableCell>
                          <TableCell>
                            <Box display='flex' alignItems='center' columnGap='16px'>
                              <Button
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
                                href={`/core/job-function/${jobFunction.id}/edit`}
                              >
                                <Icon fontSize='22px' icon='ic:outline-mode' />
                              </Button>

                              <Button
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
                                href={`/core/job-function/${jobFunction.id}`}
                              >
                                <Icon fontSize='22px' icon='ic:outline-remove-red-eye' />
                              </Button>

                              <Button
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
                                  setToBeDeletedJobFunction(jobFunction.id)
                                  setDeleteModalOpen(true)
                                }}
                              >
                                <Icon fontSize='22px' icon='ic:outline-delete' />
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <Typography variant='PlaceholderSm' style={{ color: theme.palette.text.primary }}>
                    No Data
                  </Typography>
                </div>
              )}

              <Box padding='20px' display='flex' alignItems='center' justifyContent='space-between'>
                <Typography fontSize='14px' letterSpacing='0.25px' sx={{ color: 'text.secondary' }}>
                  Showing {jobFunctions.data.data.length ? (page - 1) * limit + 1 : 0} to{' '}
                  {(page - 1) * limit + jobFunctions.data.data.length} of {jobFunctions.data.meta.filter_count} entries
                </Typography>

                <Pagination
                  count={Math.ceil(jobFunctions.data.meta.filter_count / limit)}
                  page={page}
                  onChange={(_, value) => setPage(value)}
                  shape='rounded'
                />
              </Box>
            </>
          ) : null}
        </div>
      </main>

      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onOk={async () => {
          try {
            if (!toBeDeletedJobFunction) {
              return
            }

            await deleteJobFunction.mutateAsync({
              id: toBeDeletedJobFunction.toString()
            })
            await queryClient.invalidateQueries()
            setDeleteModalOpen(false)
            setIsDeleteJobFuncSuccess(true)
            deleteJobFunction.reset()
          } catch {
            setDeleteModalOpen(false)
            setIsDeleteJobFuncFailed(true)
          }
        }}
        variant='danger'
        title='Are you sure to delete job function?'
        loading={deleteJobFunction.isLoading || deleteJobFunction.isSuccess}
      />
      {isDeleteJobFuncFailed ? (
        <Box position='fixed' top='85px' right='220px'>
          <Alert
            variant='contained'
            content='Your job function was failed to deleted'
            color='error'
            title='Delete Failed'
            icon='ic:baseline-do-disturb'
            onClose={() => setIsDeleteJobFuncFailed(false)}
          />
        </Box>
      ) : null}
      {isDeleteJobFuncSuccess ? (
        <Box position='fixed' top='85px' right='220px'>
          <Alert
            variant='contained'
            content='Your job function was success to deleted'
            color='success'
            title='Delete Successful'
            icon='ic:baseline-check'
            onClose={() => setIsDeleteJobFuncSuccess(false)}
          />
        </Box>
      ) : null}
      {isCreateSuccess ? (
        <Box position='fixed' top='85px' right='220px'>
          <Alert
            variant='contained'
            content='Your job function was success to submitted'
            color='success'
            title='Submit Successful'
            icon='ic:baseline-check'
            onClose={() => setIsCreateSuccess(false)}
          />
        </Box>
      ) : null}
      {isEditSuccess ? (
        <Box position='fixed' top='85px' right='220px'>
          <Alert
            variant='contained'
            content='Your job function was success to edited'
            color='success'
            title='Edit Successful'
            icon='ic:baseline-check'
            onClose={() => setIsEditSuccess(false)}
          />
        </Box>
      ) : null}
    </>
  )
}
