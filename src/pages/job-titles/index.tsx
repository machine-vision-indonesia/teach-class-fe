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
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Switch } from 'src/components/atoms/switch'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Fade, { type FadeProps } from '@mui/material/Fade'
import { OrgChart } from 'd3-org-chart'
import { type ReactElement, type Ref, forwardRef, useEffect, useRef, useState } from 'react'
import { renderToString } from 'react-dom/server'
import { Button } from 'src/components/atoms/button'
import { CustomIcon } from 'src/components/atoms'
import IconButton from '@mui/material/IconButton'

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

type JobTitle = {
  id: string
  code: string
  name: string
  department: string
  plant: string
  status: boolean
}

const jobTitles: JobTitle[] = [
  {
    id: '1',
    code: '00001',
    name: 'Job Title 1',
    department: 'Department 1',
    plant: 'Plant 1',
    status: true
  },
  {
    id: '2',
    code: '00002',
    name: 'Job Title 2',
    department: 'Department 2',
    plant: 'Plant 2',
    status: false
  }
]

type Employee = {
  id: string
  name: string
  department: string
  jobTitle: string
  parentId?: string
}

const employees: Employee[] = [
  {
    id: 'A1',
    name: 'John Doe',
    department: 'Department A',
    jobTitle: 'Jabatan 1'
  },
  {
    id: 'A2',
    name: 'Jane Doe',
    department: 'Department A',
    jobTitle: 'Jabatan 2',
    parentId: 'A1'
  },
  {
    id: 'A3',
    name: 'John Smith',
    department: 'Department A',
    jobTitle: 'Jabatan 3',
    parentId: 'A1'
  },
  {
    id: 'A4',
    name: 'Jill Doe',
    department: 'Department A',
    jobTitle: 'Jabatan 4',
    parentId: 'A2'
  },
  {
    id: 'A5',
    name: 'Jake Doe',
    department: 'Department A',
    jobTitle: 'Jabatan 5',
    parentId: 'A2'
  }
]

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

export default function JobTitlesPage() {
  const theme = useTheme()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [value, setValue] = useState<'table' | 'diagram'>('table')
  const d3Container = useRef(null)
  const [orgChart, setOrgChart] = useState<OrgChart<Employee> | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (value === 'diagram' && d3Container.current) {
      if (!orgChart) {
        const chart = new OrgChart<Employee>()
        setOrgChart(chart)
      }

      if (orgChart) {
        orgChart
          .container(d3Container.current)
          .data(employees)

          // .onNodeClick(nodeId => {
          //   setOpen(true)

          //   const relatedEmployee = employees.find(employee => employee.id === nodeId)
          //   if (!relatedEmployee) {
          //     return
          //   }

          //   setSelectedEmployee(relatedEmployee)
          // })
          .nodeHeight(() => 84)
          .nodeContent(data => {
            return renderToString(
              <>
                <div style={{ borderRadius: '6px', position: 'relative' }}>
                  <div
                    style={{
                      backgroundColor: theme.palette.grey[700],
                      color: theme.palette.brand.white,
                      display: 'grid',
                      gridTemplateColumns: '1fr auto 1fr',
                      gridTemplateAreas: `'. column2 column3'`,
                      alignItems: 'center',
                      padding: '8px'
                    }}
                  >
                    <span style={{ gridArea: 'column2' }}>{data.data.department}</span>
                    <div style={{ gridArea: 'column3', display: 'flex', justifyContent: 'flex-end' }}>
                      <button
                        type='button'
                        style={{
                          backgroundColor: 'transparent',
                          border: 0,
                          padding: 0,
                          display: 'flex'
                        }}
                      >
                        <CustomIcon iconId='dots-horizontal' style={{ color: 'white' }} width='15' height='15' />
                      </button>
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundColor: theme.palette.brand.white,
                      padding: '10px',
                      textAlign: 'center'
                    }}
                  >
                    <p style={{ margin: 0 }}>{data.data.jobTitle}</p>
                    <p style={{ marginTop: '5px', marginBottom: 0 }}>{data.data.name}</p>
                  </div>
                </div>
              </>
            )
          })
          .buttonContent(value => {
            return renderToString(
              <button
                type='button'
                style={{
                  margin: '12px auto',
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#005EFF',
                  border: 0,
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '16px'
                }}
              >
                <CustomIcon iconId={value.node.children ? 'chevron-up' : 'chevron-down'} style={{ color: 'white' }} />
              </button>
            )
          })
          .render()
      }
    }
  }, [theme.palette.brand.white, theme.palette.grey, orgChart, value])

  return (
    <>
      <main>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flexGrow: 1 }}>
            <Typography variant='h2'>Job Title</Typography>
            <Breadcrumbs
              aria-label='breadcrumb'
              sx={{ mt: '8px' }}
              separator={<Icon icon='mdi:chevron-right' color='#909094' />}
            >
              <Link component={NextLink} href='/'>
                <Icon icon='mdi:home-outline' style={{ color: theme.palette.primary.main }} fontSize='20px' />
              </Link>
              <Typography variant='body1' color={`${theme.palette.text.primary} !important`}>
                Job Title
              </Typography>
            </Breadcrumbs>
          </div>
          <Button
            LinkComponent={NextLink}
            variant='contained'
            content='iconText'
            text='Add Job Title'
            icon='mdi:plus'
            size='large'
            startIcon={<Icon icon='mdi:plus' fontSize='18px' />}
            sx={{ height: '43px', padding: '8px 16px !important', borderRadius: '4px', fontSize: '1rem' }}
            href='/job-titles/add'
          />
        </div>

        <div
          style={{
            borderRadius: '6px',
            boxShadow: '0px 2px 6px 0px rgba(0, 0, 0, 0.25)',
            marginTop: '24.5px'
          }}
        >
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: theme.palette.grey[200], backgroundColor: '#FEFEFE' }}>
                <TabList
                  onChange={(_: React.SyntheticEvent, newValue: typeof value) => {
                    setValue(newValue)
                  }}
                  style={{ padding: '10px 20px' }}
                >
                  <Tab label='Table Job Title' value='table' />
                  <Tab label='Organization Diagram' value='diagram' />
                </TabList>
              </Box>
              <TabPanel value='table' style={{ padding: 0 }}>
                <div style={{ padding: '10px 20px', backgroundColor: '#FEFEFE' }}>
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
                <div
                  style={{
                    padding: '10px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: '20px',
                    backgroundColor: '#FEFEFE'
                  }}
                >
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
                <div style={{ padding: '24px 20px 25.5px', backgroundColor: '#FEFEFE' }}>
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
                        <TableCell style={{ color: theme.palette.text.secondary }}>Department</TableCell>
                        <TableCell style={{ color: theme.palette.text.secondary }}>Plant</TableCell>
                        <TableCell style={{ color: theme.palette.text.secondary }}>Status</TableCell>
                        <TableCell style={{ textAlign: 'center', color: theme.palette.text.secondary }}>
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {jobTitles.map(jobTitle => (
                        <TableRow key={jobTitle.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell style={{ color: theme.palette.text.primary }}>{jobTitle.code}</TableCell>
                          <TableCell style={{ color: theme.palette.text.primary }}>{jobTitle.name}</TableCell>
                          <TableCell style={{ color: theme.palette.text.primary }}>{jobTitle.department}</TableCell>
                          <TableCell style={{ color: theme.palette.text.primary }}>{jobTitle.plant}</TableCell>
                          <TableCell>
                            <Switch checked={jobTitle.status} />
                          </TableCell>
                          <TableCell style={{ width: '1px', whiteSpace: 'nowrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', columnGap: '16px' }}>
                              <Button
                                style={{ padding: 0, minWidth: 'auto', color: theme.palette.brand.second }}
                                type='button'
                                content='iconOnly'
                                icon='mdi:pencil-outline'
                                LinkComponent={NextLink}
                                href={`/job-titles/${jobTitle.id}/edit`}
                              />
                              <Button
                                style={{ padding: 0, minWidth: 'auto', color: theme.palette.primary.main }}
                                type='button'
                                content='iconOnly'
                                icon='mdi:eye-outline'
                                LinkComponent={NextLink}
                                href={`/job-titles/${jobTitle.id}`}
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
              </TabPanel>
              <TabPanel value='diagram' style={{ backgroundColor: theme.palette.grey[100], padding: 0 }}>
                <div
                  style={{
                    textAlign: 'center',
                    padding: '20px 0',
                    backgroundColor: '#FEFEFE',
                    boxShadow: '0px 2px 6px 0px rgba(0, 0, 0, 0.25)'
                  }}
                >
                  <Typography variant='subtitle1Medium' style={{ color: theme.palette.text.secondary }}>
                    Organization Structure Diagram
                  </Typography>
                </div>
                <div style={{ backgroundColor: '#F7F8FA', marginTop: '20px' }} ref={d3Container} />
                <Dialog open={open} scroll='body' onClose={() => setOpen(false)} TransitionComponent={Transition}>
                  <Button
                    sx={{ position: 'absolute', top: '16px', right: '16px', color: '#95969C' }}
                    onClick={() => setOpen(false)}
                    variant='text'
                    content='iconOnly'
                    icon='tabler:x'
                  />
                </Dialog>
              </TabPanel>
            </TabContext>
          </Box>
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
