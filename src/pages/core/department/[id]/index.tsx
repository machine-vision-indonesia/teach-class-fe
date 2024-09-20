import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import NextLink from 'next/link'
import Icon from 'src/@core/components/icon'
import { useTheme } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Button } from 'src/components/atoms/button'
import { PREFIX_KEY } from '../../../../constant/common'
import { useQuery } from '@tanstack/react-query'
import client from '../../../../client'
import { useRouter } from 'next/router'
import { CircularProgress } from '../../../../components/atoms/circular-progress/CircularProgress'

type Properties = {
  id: string
}
function useGetDepartment(properties: Properties): any {
  const baseQueryParams = {
    fields: [
      'id',
      'name',
      'code',
      'company',
      'parent.id',
      'parent.code',
      'parent.name',
      'department_level.id',
      'department_level.code',
      'department_level.name',
      'status',
      'description',
      'childrens.id',
      'childrens.status',
      'childrens.name',
      'childrens.company',
      'childrens.parent.name',
      'childrens.parent.id',
      'childrens.parent.code'
    ]
  }

  const key = [PREFIX_KEY.GET, 'DEPARTMENTS', 'detail', properties.id, baseQueryParams]
  type Department = {
    id: string
    name: string
  }
  type GetResponse = {
    data: Department
  }

  return useQuery({
    queryKey: key,
    async queryFn() {
      const response = await client.api.get<GetResponse>(`/items/mt_departments/${properties.id}`, {
        params: baseQueryParams
      })

      return response.data
    }
  })
}
export default function ManageDepartmentsDetailPage() {
  const theme = useTheme()
  const router = useRouter()

  function useURL(url: string, prefix = '/core'): string {
    return [prefix, url].join('')
  }

  const department = useGetDepartment({ id: router.query.id as string })

  return (
    <main>
      <Typography variant='h2'>Detail Department</Typography>
      <Breadcrumbs
        aria-label='breadcrumb'
        sx={{ mt: '8px' }}
        separator={<Icon icon='mdi:chevron-right' color='#909094' />}
      >
        <Link component={NextLink} href='/'>
          <Icon icon='mdi:home-outline' style={{ color: theme.palette.primary.main }} fontSize='20px' />
        </Link>
        <Link component={NextLink} href={useURL('/department')}>
          <Typography variant='body1' color={`${theme.palette.primary.main} !important`}>
            Manage Department
          </Typography>
        </Link>
        <Typography variant='body1' color={`${theme.palette.text.primary} !important`}>
          Detail Department
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
            Department Data
          </Typography>

          <Typography
            variant='caption'
            component='p'
            style={{ fontSize: '12px', letterSpacing: '.25px', color: '#485171' }}
          >
            Detail data from Manage Department
          </Typography>

          {department?.isLoading && !department?.isSuccess ? (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <CircularProgress />
            </div>
          ) : (
            typeof department?.data !== 'undefined' &&
            typeof department?.data?.data !== 'undefined' && (
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
                      Department Code :
                    </Typography>
                    <Typography
                      variant='body1'
                      component='p'
                      style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                    >
                      {department.data?.data?.code ?? '-'}
                    </Typography>
                  </div>
                  <div style={{ flexBasis: '50%' }}>
                    <Typography
                      variant='body1'
                      component='p'
                      style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                    >
                      Department Name :
                    </Typography>
                    <Typography
                      variant='body1'
                      component='p'
                      style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                    >
                      {department.data?.data?.name ?? '-'}
                    </Typography>
                  </div>
                  <div style={{ flexBasis: '50%' }}>
                    <Typography
                      variant='body1'
                      component='p'
                      style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                    >
                      Parent Department :
                    </Typography>
                    <Typography
                      variant='body1'
                      component='p'
                      style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                    >
                      {department.data?.data?.parent?.name ?? '-'}
                    </Typography>
                  </div>
                  <div style={{ flexBasis: '50%' }}>
                    <Typography
                      variant='body1'
                      component='p'
                      style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                    >
                      Level Department :
                    </Typography>
                    <Typography
                      variant='body1'
                      component='p'
                      style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                    >
                      {department.data?.data?.department_level?.name ?? '-'}
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
                      {department.data?.data?.description ?? '-'}
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
            href={useURL('/department')}
          />
        </CardContent>
      </Card>
    </main>
  )
}
