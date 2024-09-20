import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import NextLink from 'next/link'
import Icon from 'src/@core/components/icon'
import { useTheme } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Button } from 'src/components/atoms/button'

export default function JobLevelsDetailPage() {
  const theme = useTheme()

  return (
    <main>
      <Typography variant='h2'>Detail Job Level</Typography>
      <Breadcrumbs
        aria-label='breadcrumb'
        sx={{ mt: '8px' }}
        separator={<Icon icon='mdi:chevron-right' color='#909094' />}
      >
        <Link component={NextLink} href='/'>
          <Icon icon='mdi:home-outline' style={{ color: theme.palette.primary.main }} fontSize='20px' />
        </Link>
        <Link component={NextLink} href='/job-levels'>
          <Typography variant='body1' color={`${theme.palette.primary.main} !important`}>
            Job Level
          </Typography>
        </Link>
        <Typography variant='body1' color={`${theme.palette.text.primary} !important`}>
          Detail Job Level
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
            Job Level Data
          </Typography>

          <Typography
            variant='caption'
            component='p'
            style={{ fontSize: '12px', letterSpacing: '.25px', color: '#485171' }}
          >
            Detail data from Job Level
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
              <div style={{ flexBasis: '100%' }}>
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
                  Department :
                </Typography>
                <Typography
                  variant='body1'
                  component='p'
                  style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                >
                  Department 1
                </Typography>
              </div>
              <div style={{ flexBasis: '50%' }}>
                <Typography
                  variant='body1'
                  component='p'
                  style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                >
                  Job Title :
                </Typography>
                <Typography
                  variant='body1'
                  component='p'
                  style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                >
                  Job Title 1
                </Typography>
              </div>
              <div style={{ flexBasis: '50%' }}>
                <Typography
                  variant='body1'
                  component='p'
                  style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                >
                  Job Level Code :
                </Typography>
                <Typography
                  variant='body1'
                  component='p'
                  style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                >
                  Job Level Code 1
                </Typography>
              </div>
              <div style={{ flexBasis: '50%' }}>
                <Typography
                  variant='body1'
                  component='p'
                  style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                >
                  Job Level Name :
                </Typography>
                <Typography
                  variant='body1'
                  component='p'
                  style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                >
                  Job Level Name 1
                </Typography>
              </div>
              <div style={{ flexBasis: '100%' }}>
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
            href='/job-levels'
          />
        </CardContent>
      </Card>
    </main>
  )
}
