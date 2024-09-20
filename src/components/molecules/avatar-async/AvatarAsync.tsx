import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import { GetUser, IUser } from './AvatarAsync.service'
import { PropsAvatarAsync } from './AvatarAsync.type'
import { env } from 'next-runtime-env'

export const AvatarAsync = ({
  fontSize = '1.5dvh',
  width = '48',
  height = '48',
  orientation = 'horizontal',
  userId,
  jobFunc = '-'
}: PropsAvatarAsync) => {
  let writtenUserName = ''

  const { data, isError, isFetching, isLoading } = GetUser<IUser>({ userId })

  if (isLoading || isFetching) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  if (orientation === 'horizontal') {
    writtenUserName = data.data.first_name + ' ' + data.data.last_name
  } else {
    writtenUserName = data.data.first_name ?? ''
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: orientation === 'horizontal' ? 'row' : 'column',
        justifyContent: orientation === 'vertical' ? 'center' : 'start',
        alignItems: orientation === 'vertical' ? 'center' : 'start'
      }}
    >
      <Avatar
        src={
          data.data.avatar
            ? `${env('NEXT_PUBLIC_REST_API_URL')}/assets/${
                data.data.avatar
              }?preview=true&access_token=${localStorage.getItem('accessToken')}`
            : 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg'
        }
        sx={{ width: width, height: height }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          ml: orientation === 'horizontal' ? '18px' : null,
          mt: orientation === 'vertical' ? '18px' : null,
          alignItems: orientation === 'vertical' ? 'center' : 'start'
        }}
      >
        <small>
          <Typography fontSize={fontSize} sx={{ mb: '8px' }} fontWeight={'bold'}>
            {writtenUserName}
          </Typography>
          <Typography fontSize={fontSize} sx={{ mb: '8px' }}>
            {jobFunc}
          </Typography>
        </small>
      </Box>
    </Box>
  )
}
