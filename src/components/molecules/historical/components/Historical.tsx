// Import core MUI components for layout and styling
import { Box, useTheme, Card } from '@mui/material'

// Import MUI Lab components for creating timeline UI elements
import Timeline from '@mui/lab/Timeline'
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'

// Import custom types for handling historical data
import { ColorHistorical, PropsHistorical } from '../types/Historical.type'

// Import custom components for typography and avatars
import { MvTypography } from '@/components/atoms/mv-typography'
import { Avatar } from '@/components/atoms/avatar'

// Import utility functions for date formatting and style management
import { formatDate, getStyles } from '../utils'

// Import a custom icon component for use in the UI
import Icon from 'src/@core/components/icon'

// Import environment variables from Next.js runtime
import { env } from 'next-runtime-env'

export const Historical = ({ data = [], type = 'left', width, color, size = 'small' }: PropsHistorical) => {
  const theme = useTheme()
  const typeMap: { [key in NonNullable<PropsHistorical['type']>]: 'left' | 'right' | 'alternate' } = {
    middle: 'alternate',
    left: 'right',
    right: 'left'
  }

  const typeHistorical = typeMap[type] || 'right'

  return (
    <Box
      sx={{
        width: (type !== 'middle' ? width : (width as number) * 2) ?? 'auto'
      }}
    >
      <Timeline
        position={typeHistorical}
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: type !== 'middle' ? 0 : 'auto',
            padding: type !== 'middle' ? 0 : 'auto'
          }
        }}
      >
        {data?.map((v, i) => (
          <TimelineItem key={i}>
            <TimelineSeparator>
              <TimelineDot
                sx={{
                  width: v.state === 'success' || v.state === 'failed' ? 20 : 18,
                  height: v.state === 'success' || v.state === 'failed' ? 20 : 18,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: getStyles(color as ColorHistorical, theme).background,
                  boxShadow: 'none',
                  border:
                    v.state === 'success' || v.state === 'failed'
                      ? `2px solid ${getStyles(color as ColorHistorical, theme).border}`
                      : 'none'
                }}
              >
                {v.state === 'success' ? (
                  <Icon icon='material-symbols:check' fontSize={10} />
                ) : v.state === 'failed' ? (
                  <Icon icon='charm:cross' fontSize={10} />
                ) : (
                  <Box />
                )}
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Card
                variant='outlined'
                sx={{
                  backgroundColor: theme.colorToken.background.default,
                  padding: 3,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ textAlign: 'left' }}>
                  {v.child && <Box sx={{ mb: 2 }}>{v.child}</Box>}
                  <MvTypography typeSize='PX' size={size === 'small' ? 'LABEL_SM_BOLDEST' : 'LABEL_MD_BOLDEST'}>
                    {v.title}
                  </MvTypography>
                  <MvTypography
                    typeSize='PX'
                    size={size === 'small' ? 'LABEL_SM_NORMAL' : 'LABEL_MD_NORMAL'}
                    color={theme.colorToken.background.neutralInverted.subtle}
                  >
                    {v.subTitle}
                  </MvTypography>
                  {v.profile?.name && v?.profile?.name?.length > 0 ? (
                    <Box display={'flex'} gap={2} marginTop={3}>
                      <Avatar
                        type={v.profile.avatar ? 'image' : 'initial'}
                        size={size === 'small' ? 'xs' : 'sm'}
                        isAsync={false}
                        displayName={v.profile?.name}
                        src={`${env('NEXT_PUBLIC_REST_API_URL')}/assets/${v.profile?.avatar}`}
                      />
                      <Box>
                        <MvTypography
                          size={size === 'small' ? 'LABEL_SM_NORMAL' : 'LABEL_MD_NORMAL'}
                          my={1}
                          color={theme.colorToken.text.neutral.normal}
                          typeSize='PX'
                        >
                          {v.profile?.name}
                        </MvTypography>
                        <MvTypography
                          size={size === 'small' ? 'HELPER_TEXT_SM' : 'HELPER_TEXT_MD'}
                          my={1}
                          color={theme.colorToken.text.neutral.disabled}
                          typeSize='PX'
                        >
                          {v.profile?.position}
                        </MvTypography>
                      </Box>
                    </Box>
                  ) : null}
                </Box>
                <MvTypography
                  typeSize='PX'
                  size={size === 'small' ? 'HELPER_TEXT_SM' : 'HELPER_TEXT_MD'}
                  color={theme.colorToken.icon.neutral.disabled}
                  marginTop={1}
                >
                  {typeof v.date === 'string' ? v.date : formatDate(v.date)}
                </MvTypography>
              </Card>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  )
}
