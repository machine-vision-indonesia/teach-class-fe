import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import NextLink from 'next/link'
import { useTheme } from '@mui/material/styles'
import Link from '@mui/material/Link'
import Icon from 'src/@core/components/icon'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Image from 'next/image'
import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { Button } from 'src/components/atoms/button'

export default function ManagePlantsDetailPage() {
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [paddingTop, setPaddingTop] = useState('0')
  const theme = useTheme()

  return (
    <>
      <main>
        <Typography variant='h2'>View Detail</Typography>
        <Breadcrumbs
          aria-label='breadcrumb'
          sx={{ mt: '8px' }}
          separator={<Icon icon='mdi:chevron-right' color='#909094' />}
        >
          <Link component={NextLink} href='/'>
            <Icon icon='mdi:home-outline' style={{ color: theme.palette.primary.main }} fontSize='20px' />
          </Link>
          <Link component={NextLink} href='/plants'>
            <Typography variant='body1' color={`${theme.palette.primary.main} !important`}>
              Manage Plant
            </Typography>
          </Link>
          <Typography variant='body1' color={`${theme.palette.text.primary} !important`}>
            View Detail
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
          <CardContent style={{ display: 'flex', flexDirection: 'column', rowGap: '20px', padding: 0 }}>
            <div
              style={{
                border: `1px solid ${theme.palette.grey[300]}`,
                borderRadius: '6px',
                padding: '20px',
                display: 'flex',
                columnGap: '16px',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  width: '88px',
                  height: '88px',
                  position: 'relative'
                }}
              >
                <Image src='/images/machine-vision.png' alt='Plant logo' fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', rowGap: '5px' }}>
                <Typography variant='h5' component='h2' style={{ fontSize: '18px' }}>
                  Plant 1
                </Typography>
                <Typography
                  variant='labelMd'
                  component='p'
                  style={{ color: theme.palette.text.disabled, lineHeight: 'normal' }}
                >
                  machinevision@mail.com
                </Typography>
                <Typography
                  variant='labelSm'
                  component='p'
                  style={{ color: theme.palette.text.disabled, lineHeight: 'normal' }}
                >
                  Baruk Utara X No.37, Kedung Baruk, Kec. Rungkut, Surabaya, Jawa Timur 60298
                </Typography>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#FEFEFE',
                border: `1px solid ${theme.palette.grey[300]}`,
                borderRadius: '6px',
                padding: '20px'
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', rowGap: '12px' }}>
                <div style={{ flexBasis: '100%', display: 'flex' }}>
                  <Typography variant='h5' component='h2' style={{ fontSize: '18px' }}>
                    Plant Detail
                  </Typography>
                </div>
                <div style={{ flexBasis: '50%' }}>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                  >
                    Plant Name :
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
                    Plant Code :
                  </Typography>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                  >
                    PLANT1
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
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum, dignissimos!
                  </Typography>
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#FEFEFE',
                border: `1px solid ${theme.palette.grey[300]}`,
                borderRadius: '6px',
                padding: '20px'
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', rowGap: '12px' }}>
                <div style={{ flexBasis: '100%', display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant='h5' component='h2' style={{ fontSize: '18px' }}>
                    Contact & Location
                  </Typography>
                </div>
                <div style={{ flexBasis: '100%' }}>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                  >
                    Email :
                  </Typography>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                  >
                    machinevision@mail.com
                  </Typography>
                </div>
                <div style={{ flexBasis: '50%' }}>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                  >
                    Company Phone Number :
                  </Typography>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                  >
                    +62123456789
                  </Typography>
                </div>
                <div style={{ flexBasis: '50%' }}>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                  >
                    Postal Code :
                  </Typography>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                  >
                    12345
                  </Typography>
                </div>
                <div style={{ flexBasis: '50%' }}>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                  >
                    Longitude :
                  </Typography>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                  >
                    17.77
                  </Typography>
                </div>
                <div style={{ flexBasis: '50%' }}>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                  >
                    Latitude :
                  </Typography>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                  >
                    27.77
                  </Typography>
                </div>
                <div style={{ flexBasis: '100%' }}>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                  >
                    Address :
                  </Typography>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                  >
                    Baruk Utara X No.37, Kedung Baruk, Kec. Rungkut, Surabaya, Jawa Timur 60298
                  </Typography>
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#FEFEFE',
                border: `1px solid ${theme.palette.grey[300]}`,
                borderRadius: '6px',
                padding: '20px'
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', rowGap: '12px' }}>
                <div style={{ flexBasis: '100%', display: 'flex' }}>
                  <Typography variant='h5' component='h2'>
                    Image Plant
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
                      <Image src={'/images/plant-2.jpg'} alt='Plant picture' fill style={{ objectFit: 'cover' }} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '7px' }}>
                      <Typography variant='PlaceholderSm' component='p' style={{ color: theme.palette.text.secondary }}>
                        Plant 1
                      </Typography>

                      <Typography variant='PlaceholderSm' component='p' style={{ color: theme.palette.text.disabled }}>
                        2 Mb
                      </Typography>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <Button
              variant='contained'
              color='primary'
              size='large'
              sx={{
                height: '44px',
                padding: '12.5px 20px !important',
                borderRadius: '4px',
                fontSize: '16px',
                border: `1.5px solid ${theme.palette.primary.main}`,
                width: 'auto',
                alignSelf: 'flex-start'
              }}
              content='iconText'
              text='Back'
              icon='material-symbols:chevron-left'
              type='button'
              LinkComponent={NextLink}
              href='/plants'
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
              src='/images/plant-1.jpg'
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
          style={{ position: 'absolute', right: 0, top: 0 }}
          onClick={() => setImageModalOpen(false)}
          content='iconOnly'
          icon='material-symbols:close'
        />
      </Dialog>
    </>
  )
}
