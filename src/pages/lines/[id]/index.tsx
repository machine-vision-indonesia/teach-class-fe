import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import NextLink from 'next/link'
import Icon from 'src/@core/components/icon'
import { useTheme } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Button } from 'src/components/atoms/button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { useState } from 'react'
import Image from 'next/image'

export default function ManageLinesDetailPage() {
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [paddingTop, setPaddingTop] = useState('0')
  const theme = useTheme()

  return (
    <>
      <main>
        <Typography variant='h2'>Detail Line</Typography>
        <Breadcrumbs
          aria-label='breadcrumb'
          sx={{ mt: '8px' }}
          separator={<Icon icon='mdi:chevron-right' color='#909094' />}
        >
          <Link component={NextLink} href='/'>
            <Icon icon='mdi:home-outline' style={{ color: theme.palette.primary.main }} fontSize='20px' />
          </Link>
          <Link component={NextLink} href='/lines'>
            <Typography variant='body1' color={`${theme.palette.primary.main} !important`}>
              Manage Line
            </Typography>
          </Link>
          <Typography variant='body1' color={`${theme.palette.text.primary} !important`}>
            Detail Line
          </Typography>
        </Breadcrumbs>

        <Card
          sx={{
            boxShadow: '0px 2px 6px 0px rgba(0, 0, 0, 0.25)',
            padding: '20px',
            flex: '1 1 0%',
            marginTop: '24.5px'
          }}
        >
          <CardContent style={{ padding: 0 }}>
            <Typography variant='h6' sx={{ fontWeight: 500, lineHeight: '26px', fontSize: '16px' }} component='h2'>
              Line Data
            </Typography>

            <Typography
              variant='caption'
              component='p'
              style={{ fontSize: '12px', letterSpacing: '.25px', color: '#485171' }}
            >
              Detail data from Manage Line
            </Typography>

            <div
              style={{
                backgroundColor: '#FEFEFE',
                border: `1px solid ${theme.palette.grey[300]}`,
                borderRadius: '6px',
                padding: '20px',
                marginTop: '20px'
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', rowGap: '12px' }}>
                <div style={{ flexBasis: '50%' }}>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                  >
                    Plant :
                  </Typography>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                  >
                    Plant 1
                  </Typography>
                </div>
                <div style={{ flexBasis: '50%' }}>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                  >
                    Sector :
                  </Typography>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                  >
                    Sector 1
                  </Typography>
                </div>
                <div style={{ flexBasis: '50%' }}>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                  >
                    Line Code :
                  </Typography>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                  >
                    c231
                  </Typography>
                </div>
                <div style={{ flexBasis: '50%' }}>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                  >
                    Line Name :
                  </Typography>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                  >
                    Line 2
                  </Typography>
                </div>
                <div style={{ flexBasis: '50%' }}>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                  >
                    Description :
                  </Typography>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, cumque?
                  </Typography>
                </div>
                <div style={{ flexBasis: '50%' }}>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                  >
                    Picture :
                  </Typography>
                  <button
                    type='button'
                    style={{
                      marginTop: '5px',
                      backgroundColor: theme.palette.grey[100],
                      borderRadius: '6px',
                      padding: '10px',
                      display: 'flex',
                      columnGap: '20px',
                      alignItems: 'center',
                      border: 0,
                      width: '100%',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                    onClick={() => setImageModalOpen(true)}
                  >
                    <div
                      style={{
                        width: '71px',
                        height: '71px',
                        position: 'relative',
                        borderRadius: '6px',
                        overflow: 'hidden'
                      }}
                    >
                      <Image src='/images/plant-2.jpg' alt='Plant picture' fill style={{ objectFit: 'cover' }} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '7px' }}>
                      <Typography variant='PlaceholderSm' component='p' style={{ color: theme.palette.text.secondary }}>
                        Picture.png
                      </Typography>

                      <Typography variant='PlaceholderSm' component='p' style={{ color: theme.palette.text.disabled }}>
                        0.8 Mb
                      </Typography>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <Button
              LinkComponent={NextLink}
              variant='contained'
              content='iconText'
              text='Back'
              icon='mdi:chevron-left'
              size='large'
              sx={{
                height: '43px',
                padding: '8px 16px !important',
                borderRadius: '4px',
                fontSize: '1rem',
                marginTop: '30px'
              }}
              href='/lines'
            />
          </CardContent>
        </Card>
      </main>

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
        <DialogContent sx={{ padding: '0 !important' }}>
          <div style={{ position: 'relative', paddingTop }}>
            <Image
              src='/images/plant-2.jpg'
              alt='Plant 1'
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
          content='iconOnly'
          icon='material-symbols:close'
          style={{ position: 'absolute', right: 0, top: 0 }}
          onClick={() => setImageModalOpen(false)}
        />
      </Dialog>
    </>
  )
}
