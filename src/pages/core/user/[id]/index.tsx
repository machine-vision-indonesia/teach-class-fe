import { useTheme } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Icon from 'src/@core/components/icon'
import Image from 'next/image'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'
import { titleCase } from 'src/utils/general'
import { MvTypography } from '@/components/atoms/mv-typography'
import InfoProfile from '@/components/complexes/user/components/InfoProfile'
import { useGetUser, useGetAsset } from '@/components/complexes/user'
import { Breadcrumbs } from '@/components/atoms/breadcrumbs'

export default function ManageUserDetailPage() {
  const theme = useTheme()
  const router = useRouter()

  const user = useGetUser({ id: router.query.id as string, enabled: router.isReady })

  const cover = useGetAsset({
    id: user.data?.data?.profile?.cover ?? null,
    enabled: Boolean(user.data?.data?.profile?.cover)
  })

  const photo = useGetAsset({
    id: user.data?.data?.profile?.photo ?? null,
    enabled: Boolean(user.data?.data.profile?.photo)
  })

  return (
    <main>
      <MvTypography size='TITLE_MD' typeSize='PX'>View Detail</MvTypography>

      <Breadcrumbs
        data={[
          {
            icon: 'tabler:briefcase',
            label: 'Manage User',
            path: '/core/user'
          },
          {
            label: 'View Detail',
            path: '/core/user'
          }
        ]}
      />


      {!router.isReady || user.isInitialLoading || cover.isInitialLoading || photo.isInitialLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : null}

      {user.isError || cover.isError || photo.isError ? (
        <MvTypography size='BODY_MD_NORMAL' typeSize='PX' sx={{ textAlign: 'center' }}>
          Something went wrong. Please try again later
        </MvTypography>
      ) : null}

      {user.isSuccess ? (
        <div style={{ display: 'flex', marginTop: '24.5px', columnGap: '24px' }}>
          <Card
            sx={{
              boxShadow: '0px 2px 6px 0px rgba(0, 0, 0, 0.25)',
              padding: '20px',
              flex: '1 1 0%'
            }}
          >
            <CardContent style={{ display: 'flex', flexDirection: 'column', rowGap: '20px', padding: 0 }}>
              <div
                style={{
                  backgroundColor: theme.palette.grey[100],
                  borderRadius: '6px',
                  overflow: 'hidden',
                  position: 'relative',
                  height: '328px'
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '250px',
                    position: 'relative',
                    backgroundColor: cover.data ? undefined : 'rgba(0, 94, 255, .16)'
                  }}
                >
                  {cover.data ? (
                    <Image src={cover.data} alt='Header photo' fill style={{ objectFit: 'cover' }} />
                  ) : null}
                </div>
                <div
                  style={{
                    display: 'flex',
                    position: 'absolute',
                    left: '20px',
                    bottom: '20px',
                    columnGap: '15px'
                  }}
                >
                  <div
                    style={{
                      width: '88px',
                      height: '88px',
                      borderRadius: '9999px',
                      overflow: 'hidden',
                      position: 'relative',
                      ...(photo.data
                        ? {}
                        : {
                          backgroundColor: theme.colorToken.background.default,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        })
                    }}
                  >
                    {photo.data ? (
                      <Image src={photo.data} alt='Profile photo' fill style={{ objectFit: 'cover' }} />
                    ) : (
                      <Icon icon='mdi:account-outline' color='#005EFF' fontSize='48px' />
                    )}
                  </div>
                  <div style={{ alignSelf: 'flex-end' }}>
                    <MvTypography size="TITLE_XS" typeSize="PX">
                      {user.data?.data.profile?.full_name}
                    </MvTypography>
                    <div style={{ display: 'flex', alignItems: 'center', columnGap: '13px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', columnGap: '5px', marginTop: '5px' }}>
                        <Icon icon='mdi:email-outline' color='#5D5E61' fontSize='20px' />
                        <MvTypography size="BODY_SM_NORMAL" typeSize="PX">
                          {user?.data?.data.email}
                        </MvTypography>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', columnGap: '5px', marginTop: '5px' }}>
                        <Icon icon='mdi:map-marker-outline' color='#5D5E61' fontSize='20px' />
                        <MvTypography size="BODY_SM_NORMAL" typeSize="PX" marginTop="5px">
                          {user.data?.data.profile?.address}
                        </MvTypography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <InfoProfile
                title="Personal Data"
                fields={[
                  {
                    label: 'ID Number',
                    value: user.data?.data.profile?.id_number ?? '-'
                  },
                  {
                    label: 'First Name',
                    value: user.data?.data.profile?.first_name ?? '-'
                  },
                  {
                    label: 'Last Name',
                    value: user.data?.data.profile?.last_name ?? '-'
                  },
                  {
                    label: 'Gender',
                    value: user.data?.data.profile?.gender ? titleCase(user.data?.data.profile?.gender ?? '-') : '-'
                  },
                  {
                    label: 'Religion',
                    value: user.data?.data.profile?.religion
                      ? titleCase(user.data?.data.profile?.religion?.replaceAll('_', ' '))
                      : '-'
                  }
                ]}
              />

              <InfoProfile
                title="Auth & Field"
                fields={[
                  {
                    label: 'Email',
                    value: user?.data?.data.email
                  },
                  {
                    label: 'Roles',
                    value: user?.data?.data.privileges.map(privilege => privilege.role.name)
                  },
                  {
                    label: 'Work Center',
                    value: user?.data?.data.werk?.name
                  },
                  {
                    label: 'Department',
                    value: user?.data?.data.sto?.name
                  },
                  {
                    label: 'Job Function',
                    value: user?.data?.data?.job_function?.name
                  },
                  {
                    label: 'Job Level',
                    value: user?.data?.data?.job_function?.job_level.name
                  },
                  {
                    label: 'Job Title',
                    value: user?.data?.data.job_title ?? ''
                  }
                ]}
              />

              <InfoProfile
                title="Address & Contact"
                fields={[
                  { label: 'Address', value: user.data?.data.profile?.address ?? '-' },
                  { label: 'Phone', value: user.data?.data.profile?.phone ?? '-' },
                  { label: 'Postal Code', value: user.data?.data.profile?.post_code ?? '-' }
                ]}
              />

            </CardContent>
          </Card>

          {/* <Card
            sx={{
              boxShadow: '0px 2px 6px 0px rgba(0, 0, 0, 0.25)',
              padding: '20px',
              flexShrink: 0
            }}
          >
            <Typography variant='h5' component='h2'>
              History User
            </Typography>

            <Button
              style={{
                marginTop: '20px',
                width: '289px',
                display: 'block',
                border: `1px solid ${theme.palette.grey[300]}`,
                padding: '20px',
                borderRadius: '6px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}>
                  <Typography
                    variant='inputMd'
                    component='h2'
                    style={{ color: theme.palette.primary.main, letterSpacing: 'normal', lineHeight: 'normal' }}
                  >
                    Revision
                  </Typography>
                  <Typography
                    variant='labelSm'
                    component='span'
                    style={{
                      color: theme.palette.brand.white,
                      letterSpacing: 'normal',
                      lineHeight: 'normal',
                      fontWeight: '700',
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: '9999px',
                      padding: '2px 4px'
                    }}
                  >
                    4
                  </Typography>
                </div>
                <Icon fontSize='16px' icon={collapse ? 'tabler:chevron-up' : 'tabler:chevron-down'} />
              </div>
              <Collapse in={collapse}>
                <Typography
                  variant='labelSm'
                  style={{
                    color: theme.palette.text.secondary,
                    letterSpacing: 'normal',
                    textAlign: 'left',
                    lineHeight: 'normal',
                    marginTop: '30px',
                    marginBottom: '10px'
                  }}
                  component='h3'
                >
                  12 Juni 2023
                </Typography>
                <Timeline
                  sx={{
                    padding: 0,
                    margin: 0,
                    [`& .${timelineItemClasses.root}:before`]: {
                      flex: 0,
                      padding: 0
                    }
                  }}
                >
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot color='primary' />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent style={{ marginBottom: 0 }}>
                      <Typography variant='labelMd'>Update 1 Field</Typography>
                      <div style={{ display: 'flex', columnGap: '10px', marginTop: '16px' }}>
                        <Typography variant='inputSm' style={{ color: theme.palette.text.disabled }}>
                          Name
                        </Typography>
                        <Divider flexItem orientation='vertical' sx={{ borderColor: theme.palette.text.disabled }} />
                        <Typography variant='inputSm' style={{ color: theme.palette.text.disabled }}>
                          03:14:39pm
                        </Typography>
                      </div>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot color='error' />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant='labelMd'>Delete 1 Field</Typography>
                      <div style={{ display: 'flex', columnGap: '10px', marginTop: '16px' }}>
                        <Typography variant='inputSm' style={{ color: theme.palette.text.disabled }}>
                          Name
                        </Typography>
                        <Divider flexItem orientation='vertical' sx={{ borderColor: theme.palette.text.disabled }} />
                        <Typography variant='inputSm' style={{ color: theme.palette.text.disabled }}>
                          02:16:27pm
                        </Typography>
                      </div>
                    </TimelineContent>
                  </TimelineItem>
                </Timeline>
              </Collapse>
            </Button>
          </Card> */}
        </div>
      ) : null}
    </main>
  )
}
