import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'
import NextLink from 'next/link'
import Link from '@mui/material/Link'
import { useTheme } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import { Input } from 'src/components/atoms/input'
import Divider from '@mui/material/Divider'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useGetRoleUsers } from '../../../../components/complexes/role/service/detail/useGetRoleUsers'
import { useState } from 'react'
import { useDebounce } from '../../../../hooks/useDebounce'
import { Pagination } from '../../../../components/atoms/pagination/Pagination'
import { useGetDepartments } from '../../../../components/complexes/role/service/detail/useGetDepartmentList'
import { CircularProgress } from 'src/components/atoms/circular-progress/CircularProgress'

export default function ManageRoleViewUserPage() {
  const theme = useTheme()
  const router = useRouter()

  const [page, setPage] = useState(1)
  const limit = 10

  const [departmentsSearch, setDepartmentsSearch] = useState('')
  const debouncedDepartmentsSearch = useDebounce(departmentsSearch, 1000)
  const departments = useGetDepartments({ search: debouncedDepartmentsSearch })

  const [selectedDepartments, setSelectedDepartments] = useState<NonNullable<(typeof departments)['data']>>([])

  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 1000)

  const users = useGetRoleUsers({
    search: debouncedSearch,
    stoIds: selectedDepartments.map(department => department.id),
    roleId: router.query.id as string,
    page,
    limit
  })

  return (
    <main>
      <Typography variant='h2'>View User</Typography>
      <Breadcrumbs
        aria-label='breadcrumb'
        sx={{ mt: '8px' }}
        separator={<Icon icon='mdi:chevron-right' color='#909094' />}
      >
        <Link component={NextLink} href='`/'>
          <Icon icon='mdi:home-outline' style={{ color: theme.palette.primary.main }} fontSize='20px' />
        </Link>
        <Link component={NextLink} href='/core/role'>
          <Typography variant='body1' color={`${theme.palette.primary.main} !important`}>
            Manage Role
          </Typography>
        </Link>
        <Typography variant='body1' color={`${theme.palette.text.primary} !important`}>
          View User
        </Typography>
      </Breadcrumbs>

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
        <div style={{ padding: '24px 20px 25.5px' }}>
          <Typography variant='body1' sx={{ fontSize: '13px' }}>
            No Filter
          </Typography>
        </div>

        <Divider sx={{ borderColor: theme.palette.grey[200] }} />

        {users.isLoading ? (
          <Box sx={{ textAlign: 'center', padding: '1rem 0' }}>
            <CircularProgress />
          </Box>
        ) : null}

        {users.isError ? (
          <Box sx={{ textAlign: 'center', padding: '1rem 0' }}>Something went wrong. Please try again later</Box>
        ) : null}

        {users.isSuccess ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead sx={{ backgroundColor: '#F5F8FF' }}>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Work Center</TableCell>
                  <TableCell>Department</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.data.data.map(user => (
                  <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{user.profile?.id_number ?? '-'}</TableCell>
                    <TableCell>
                      <div style={{ display: 'flex', alignItems: 'center', columnGap: '12px' }}>
                        <div
                          style={{
                            width: '34px',
                            height: '34px',
                            borderRadius: '9999px',
                            overflow: 'hidden',
                            position: 'relative',
                            ...(user.profile?.avatar
                              ? {}
                              : {
                                  backgroundColor: 'rgba(0, 94, 255, .16)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                })
                          }}
                        >
                          {user.profile?.avatar ? (
                            <Image
                              src={user.profile.avatar}
                              alt={user.profile.full_name}
                              fill
                              style={{ objectFit: 'cover' }}
                            />
                          ) : (
                            <Icon icon='mdi:account-outline' color='#005EFF' fontSize='20px' />
                          )}
                        </div>

                        {user.profile?.full_name ?? '-'}
                      </div>
                    </TableCell>
                    <TableCell>{user.privileges.at(0)?.role.name}</TableCell>
                    <TableCell>{user.werk?.name ?? '-'}</TableCell>
                    <TableCell>{user.sto?.name ?? '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : null}
        {users.isSuccess ? (
          <Box padding='20px' display='flex' alignItems='center' justifyContent='space-between'>
            <Typography fontSize='14px' letterSpacing='0.25px' sx={{ color: 'text.secondary' }}>
              Showing {users.data.data.length ? (page - 1) * limit + 1 : 0} to{' '}
              {(page - 1) * limit + users.data.data.length} of {users.data.meta.filter_count} entries
            </Typography>

            <Pagination
              count={Math.ceil(users.data.meta.filter_count / limit)}
              page={page}
              onChange={(_, value) => setPage(value)}
              shape='rounded'
            />
          </Box>
        ) : null}
      </div>
    </main>
  )
}
