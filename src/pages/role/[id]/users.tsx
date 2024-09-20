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

type Plant = {
  id: string
  label: string
}

const plants: Plant[] = [
  {
    id: '1',
    label: 'Plant 1'
  },
  {
    id: '2',
    label: 'Plant 2'
  },
  {
    id: '3',
    label: 'Plant 3'
  },
  {
    id: '4',
    label: 'Plant 4'
  },
  {
    id: '5',
    label: 'Plant 5'
  }
]

type Department = {
  id: string
  label: string
}

const departments: Department[] = [
  {
    id: '1',
    label: 'Department 1'
  },
  {
    id: '2',
    label: 'Department 2'
  },
  {
    id: '3',
    label: 'Department 3'
  },
  {
    id: '4',
    label: 'Department 4'
  },
  {
    id: '5',
    label: 'Department 5'
  }
]

type User = {
  id: string
  id_number: string
  name: string
  role: string
  plant: string
  department: string
}

const users: User[] = [
  {
    id: '1',
    id_number: '00001',
    name: 'User 1',
    role: 'Admin',
    plant: 'Plant 1',
    department: 'Department 1'
  },
  {
    id: '2',
    id_number: '00002',
    name: 'User 2',
    role: 'Admin',
    plant: 'Plant 2',
    department: 'Department 2'
  }
]

export default function ManageRoleViewUserPage() {
  const theme = useTheme()

  return (
    <main>
      <Typography variant='h2'>View User</Typography>
      <Breadcrumbs
        aria-label='breadcrumb'
        sx={{ mt: '8px' }}
        separator={<Icon icon='mdi:chevron-right' color='#909094' />}
      >
        <Link component={NextLink} href='/'>
          <Icon icon='mdi:home-outline' style={{ color: theme.palette.primary.main }} fontSize='20px' />
        </Link>
        <Link component={NextLink} href='/role'>
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
          />
        </div>
        <Divider sx={{ borderColor: theme.palette.grey[200] }} />
        <div style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', columnGap: '20px' }}>
          <Autocomplete
            sx={{ width: 130 }}
            options={plants}
            autoHighlight
            getOptionLabel={option => option.label}
            renderOption={(props, option) => (
              <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <Checkbox />
                {option.label}
              </Box>
            )}
            renderInput={params => (
              <TextField
                {...params}
                label='Plant'
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
              />
            )}
          />
          <Autocomplete
            sx={{ width: 130 }}
            options={departments}
            autoHighlight
            getOptionLabel={option => option.label}
            renderOption={(props, option) => (
              <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <Checkbox />
                {option.label}
              </Box>
            )}
            renderInput={params => (
              <TextField
                {...params}
                label='Department'
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

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: '#F5F8FF' }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Plant</TableCell>
                <TableCell>Department</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{user.id_number}</TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center', columnGap: '12px' }}>
                      <Image
                        src='/images/avatars/1.png'
                        alt={user.name}
                        width={34}
                        height={34}
                        style={{ borderRadius: '9999px' }}
                      />
                      {user.name}
                    </div>
                  </TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.plant}</TableCell>
                  <TableCell>{user.department}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </main>
  )
}
