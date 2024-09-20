import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import NextLink from 'next/link'
import Icon from 'src/@core/components/icon'
import { useTheme } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Button } from 'src/components/atoms/button'
import { useRouter } from 'next/router'
import { CircularProgress } from '../../../../components/atoms/circular-progress/CircularProgress'
import { useGetJobFunction } from '../../../../components/complexes/job-function/service/detail/useGetJobFuction'

export default function Index() {
  const theme = useTheme()
  const router = useRouter()

  function useURL(url: string, prefix = '/core'): string {
    return [prefix, url].join('')
  }

  const jobfunction = useGetJobFunction({ jobId: router.query.id as string })
  console.log('jobfunction : ', jobfunction)

  return (
    <main>
      <Typography variant='h2'>Detail Job Function</Typography>
      <Breadcrumbs
        aria-label='breadcrumb'
        sx={{ mt: '8px' }}
        separator={<Icon icon='mdi:chevron-right' color='#909094' />}
      >
        <Link component={NextLink} href='/'>
          <Icon icon='mdi:home-outline' style={{ color: theme.palette.primary.main }} fontSize='20px' />
        </Link>
        <Link component={NextLink} href={useURL('/job-function')}>
          <Typography variant='body1' color={`${theme.palette.primary.main} !important`}>
            Manage Job Function
          </Typography>
        </Link>
        <Typography variant='body1' color={`${theme.palette.text.primary} !important`}>
          Detail Data Job function
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
            Job Function Data
          </Typography>

          <Typography
            variant='caption'
            component='p'
            style={{ fontSize: '12px', letterSpacing: '.25px', color: '#485171' }}
          >
            Detail data from Manage Job Function
          </Typography>

          {jobfunction?.isLoading && !jobfunction?.isSuccess ? (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <CircularProgress />
            </div>
          ) : (
            typeof jobfunction?.data !== 'undefined' &&
            typeof jobfunction?.data?.data !== 'undefined' && (
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
                      Department :
                    </Typography>
                    <Typography
                      variant='body1'
                      component='p'
                      style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                    >
                      {jobfunction.data.data.map(jobfunct => (jobfunct.sto?.name != null ? jobfunct.sto?.name : '-'))}
                    </Typography>
                  </div>
                  <div style={{ flexBasis: '50%' }}>
                    <Typography
                      variant='body1'
                      component='p'
                      style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                    >
                      Job Function Code :
                    </Typography>
                    <Typography
                      variant='body1'
                      component='p'
                      style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                    >
                      {jobfunction.data.data.map(jobfunct => jobfunct.code)}
                    </Typography>
                  </div>
                  <div style={{ flexBasis: '50%' }}>
                    <Typography
                      variant='body1'
                      component='p'
                      style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                    >
                      Job Function Name :
                    </Typography>
                    <Typography
                      variant='body1'
                      component='p'
                      style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                    >
                      {jobfunction.data.data.map(jobfunct => jobfunct.name)}
                    </Typography>
                  </div>
                  <div style={{ flexBasis: '50%' }}>
                    <Typography
                      variant='body1'
                      component='p'
                      style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                    >
                      Job Level :
                    </Typography>
                    <Typography
                      variant='body1'
                      component='p'
                      style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                    >
                      {jobfunction.data.data.map(jobfunct => jobfunct.job_level.name)}
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
                      {jobfunction.data.data.map(jobfunct => jobfunct.description)}
                    </Typography>
                  </div>
                </div>
              </div>
            )
          )}

          <Button
            LinkComponent={NextLink}
            variant='contained'
            content='textOnly'
            text='Back'
            size='large'
            startIcon={<Icon icon='mdi:chevron-left' fontSize='18px' />}
            sx={{
              height: '43px',
              padding: '8px 16px !important',
              borderRadius: '4px',
              fontSize: '1rem',
              marginTop: '30px'
            }}
            href={useURL('/job-function')}
          />
        </CardContent>
      </Card>
    </main>
  )
}
