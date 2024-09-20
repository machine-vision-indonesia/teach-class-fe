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
import { Switch } from 'src/components/atoms/switch'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { useState } from 'react'
import { Button } from 'src/components/atoms/button'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import QRCode from 'qrcode'
import Image from 'next/image'
import { env } from 'next-runtime-env'

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
  }
]

type Sector = {
  id: string
  label: string
}

const sectors: Sector[] = [
  {
    id: '1',
    label: 'Sector 1'
  },
  {
    id: '2',
    label: 'Sector 2'
  }
]

type Line = {
  id: string
  code: string
  name: string
  sector: string
  plant: string
  picture: string
  status: boolean
}

const lines: Line[] = [
  {
    id: '1',
    code: '00001',
    name: 'Line 1',
    sector: 'Sector 1',
    plant: 'Plant 1',
    picture: '/images/plant-1.jpg',
    status: true
  },
  {
    id: '2',
    code: '00002',
    name: 'Line 2',
    sector: 'Sector 2',
    plant: 'Plant 2',
    picture: '/images/plant-2.jpg',
    status: true
  }
]

export default function ManageLinesPage() {
  const theme = useTheme()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [qrModalOpen, setQrModalOpen] = useState(false)
  const [qr, setQr] = useState<string>()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedLine, setSelectedLine] = useState<Line>()
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [paddingTop, setPaddingTop] = useState('0')

  return (
    <>
      <main>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flexGrow: 1 }}>
            <Typography variant='h2'>Manage Line</Typography>
            <Breadcrumbs
              aria-label='breadcrumb'
              sx={{ mt: '8px' }}
              separator={<Icon icon='mdi:chevron-right' color='#909094' />}
            >
              <Link component={NextLink} href='/'>
                <Icon icon='mdi:home-outline' style={{ color: theme.palette.primary.main }} fontSize='20px' />
              </Link>
              <Typography variant='body1' color={`${theme.palette.text.primary} !important`}>
                Manage Line
              </Typography>
            </Breadcrumbs>
          </div>
          <Button
            variant='contained'
            size='large'
            content='iconText'
            text='Add New'
            icon='material-symbols:keyboard-arrow-down'
            sx={{ height: '43px', padding: '8px 16px !important', borderRadius: '4px', fontSize: '1rem' }}
            onClick={event => setAnchorEl(event.currentTarget)}
            aria-controls='add-menu'
            aria-haspopup='true'
          />
          <Menu
            keepMounted
            id='add-menu'
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            open={Boolean(anchorEl)}
            sx={{ mt: 2 }}
            transformOrigin={{
              horizontal: 10,
              vertical: 'top'
            }}
            MenuListProps={{
              style: {
                padding: '5px',
                width: '174px'
              }
            }}
          >
            <MenuItem
              style={{ padding: '8px 16px', margin: 0, justifyContent: 'space-between' }}
              component={NextLink}
              href='/lines/add'
            >
              <span style={{ fontWeight: 500, fontSize: '14px', letterSpacing: '0.43px' }}>Data Line</span>
              <Icon fontSize='16px' icon='material-symbols:add' />
            </MenuItem>
            <MenuItem
              style={{ padding: '8px 16px', margin: 0, justifyContent: 'space-between' }}
              component={NextLink}
              href='/lines/add/bulk'
            >
              <span style={{ fontWeight: 500, fontSize: '14px', letterSpacing: '0.43px' }}>Bulk Data Line</span>
              <Icon fontSize='16px' icon='material-symbols:playlist-add' />
            </MenuItem>
          </Menu>
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
            <Autocomplete
              sx={{ width: 130 }}
              options={sectors}
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
                  label='Sector'
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
                  <TableCell style={{ color: theme.palette.text.secondary }}>Sector</TableCell>
                  <TableCell style={{ color: theme.palette.text.secondary }}>Plant</TableCell>
                  <TableCell style={{ color: theme.palette.text.secondary }}>Picture</TableCell>
                  <TableCell style={{ color: theme.palette.text.secondary }}>QR Code</TableCell>
                  <TableCell style={{ color: theme.palette.text.secondary }}>Status</TableCell>
                  <TableCell style={{ textAlign: 'center', color: theme.palette.text.secondary }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lines.map(line => (
                  <TableRow key={line.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell style={{ color: theme.palette.text.primary }}>{line.code}</TableCell>
                    <TableCell style={{ color: theme.palette.text.primary }}>{line.name}</TableCell>
                    <TableCell style={{ color: theme.palette.text.primary }}>{line.sector}</TableCell>
                    <TableCell style={{ color: theme.palette.text.primary }}>{line.plant}</TableCell>
                    <TableCell style={{ color: theme.palette.text.primary }}>
                      <Button
                        type='button'
                        content='textOnly'
                        text='View'
                        variant='text'
                        onClick={() => {
                          setSelectedLine(line)
                          setImageModalOpen(true)
                        }}
                      />
                    </TableCell>
                    <TableCell style={{ color: theme.palette.text.primary }}>
                      <Button
                        type='button'
                        variant='text'
                        content='textOnly'
                        text='View'
                        onClick={async () => {
                          try {
                            const qrValue = await QRCode.toDataURL(`${env('NEXT_PUBLIC_BASE_URL')}/lines/${line.id}`, {
                              width: 256
                            })
                            setQr(qrValue)
                            setQrModalOpen(true)
                          } catch (err) {
                            console.log('generate QR error', err)
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Switch checked={line.status} />
                    </TableCell>
                    <TableCell style={{ width: '1px', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', columnGap: '16px' }}>
                        <Button
                          style={{ padding: 0, minWidth: 'auto', color: theme.palette.brand.second }}
                          type='button'
                          content='iconOnly'
                          icon='mdi:pencil-outline'
                          LinkComponent={NextLink}
                          href={`/lines/${line.id}/edit`}
                        />
                        <Button
                          style={{ padding: 0, minWidth: 'auto', color: theme.palette.primary.main }}
                          type='button'
                          content='iconOnly'
                          icon='mdi:eye-outline'
                          LinkComponent={NextLink}
                          href={`/lines/${line.id}`}
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

      <Dialog fullWidth open={qrModalOpen} maxWidth='xs' scroll='body' onClose={() => setQrModalOpen(false)}>
        <DialogContent style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <IconButton
            onClick={() => setQrModalOpen(false)}
            style={{ padding: '6px', position: 'absolute', top: '10px', right: '15px' }}
          >
            <Icon icon='mdi:close' color={theme.palette.secondary.main} />
          </IconButton>
          {qr ? <Image src={qr} alt='QR Code' width={256} height={256} /> : null}
        </DialogContent>
      </Dialog>

      <Dialog
        fullWidth
        open={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            borderRadius: 0
          }
        }}
        maxWidth='md'
      >
        {selectedLine ? (
          <>
            <DialogContent sx={{ padding: '0 !important' }}>
              <div style={{ position: 'relative', paddingTop }}>
                <Image
                  src={selectedLine.picture}
                  alt={selectedLine.name}
                  fill
                  style={{ objectFit: 'contain' }}
                  onLoadingComplete={img => {
                    setPaddingTop(`calc(100% / (${img.naturalWidth} / ${img.naturalHeight}))`)
                  }}
                />
              </div>
            </DialogContent>

            <Button
              type='button'
              style={{ position: 'absolute', right: 0, top: 0 }}
              onClick={() => setImageModalOpen(false)}
              content='iconOnly'
              icon='material-symbols:close'
            />
          </>
        ) : null}
      </Dialog>
    </>
  )
}
