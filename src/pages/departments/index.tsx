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
import { Switch } from 'src/components/atoms/switch'
import { Button } from 'src/components/atoms/button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import { useState } from 'react'

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
  code: string
  name: string
  plant: string
  status: boolean
}

const departments: Department[] = [
  {
    id: '1',
    code: '00001',
    name: 'Department 1',
    plant: 'Plant 1',
    status: true
  },
  {
    id: '2',
    code: '00002',
    name: 'Department 2',
    plant: 'Plant 2',
    status: false
  }
]

export default function ManageDepartments() {
  const theme = useTheme()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  return (
    <>
      <main>
        <div style={{ display: 'flex', alignItems: 'center' }}>
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
          <Button
            LinkComponent={NextLink}
            variant='contained'
            content='iconText'
            text='Add Department'
            icon='mdi:plus'
            size='large'
            sx={{ height: '43px', padding: '8px 16px !important', borderRadius: '4px', fontSize: '1rem' }}
            href='/departments/add'
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
                  <TableCell style={{ color: theme.palette.text.secondary }}>Code</TableCell>
                  <TableCell style={{ color: theme.palette.text.secondary }}>Name</TableCell>
                  <TableCell style={{ color: theme.palette.text.secondary }}>Plant</TableCell>
                  <TableCell style={{ color: theme.palette.text.secondary }}>Status</TableCell>
                  <TableCell style={{ textAlign: 'center', color: theme.palette.text.secondary }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {departments.map(department => (
                  <TableRow key={department.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell style={{ color: theme.palette.text.primary }}>{department.code}</TableCell>
                    <TableCell style={{ color: theme.palette.text.primary }}>{department.name}</TableCell>
                    <TableCell style={{ color: theme.palette.text.primary }}>{department.plant}</TableCell>
                    <TableCell>
                      <Switch checked={department.status} />
                    </TableCell>
                    <TableCell style={{ width: '1px', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', columnGap: '16px' }}>
                        <Button
                          style={{ padding: 0, minWidth: 'auto', color: theme.palette.brand.second }}
                          type='button'
                          content='iconOnly'
                          icon='mdi:pencil-outline'
                          LinkComponent={NextLink}
                          href={`/departments/${department.id}/edit`}
                        />
                        <Button
                          style={{ padding: 0, minWidth: 'auto', color: theme.palette.primary.main }}
                          type='button'
                          content='iconOnly'
                          icon='mdi:eye-outline'
                          LinkComponent={NextLink}
                          href={`/departments/${department.id}`}
                        />
                        <Button
                          style={{ padding: 0, minWidth: 'auto', color: theme.palette.error.main }}
                          type='button'
                          content='iconOnly'
                          icon='mdi:delete-outline'
                          onClick={() => setDeleteModalOpen(true)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </main>

      <Dialog
        fullWidth
        open={deleteModalOpen}
        maxWidth='xs'
        scroll='body'
        onClose={() => setDeleteModalOpen(false)}
        PaperProps={{
          style: {
            maxWidth: '512px'
          }
        }}
      >
        <DialogContent
          sx={{
            position: 'relative',
            paddingTop: '43px 0 42px 0 !important'
          }}
        >
          <IconButton
            size='small'
            onClick={() => setDeleteModalOpen(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='tabler:x' />
          </IconButton>

          <div style={{ textAlign: 'center' }}>
            <Icon icon='mdi:cancel-circle-outline' fontSize='80px' color={theme.palette.error[200]} />
            <Typography variant='h4' sx={{ mt: 3 }}>
              Are you sure?
            </Typography>
            <Typography variant='labelMd' sx={{ mt: 1, display: 'block' }}>
              You won’t be able to revert this!
            </Typography>
            <DialogActions
              sx={{
                justifyContent: 'center',
                mt: '31px'
              }}
            >
              <Button
                variant='outlined'
                content='textOnly'
                text='Cancel'
                color='secondary'
                size='medium'
                onClick={() => setDeleteModalOpen(false)}
              />
              <Button variant='contained' content='textOnly' text='Yes, delete it' color='error' size='medium' />
            </DialogActions>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
