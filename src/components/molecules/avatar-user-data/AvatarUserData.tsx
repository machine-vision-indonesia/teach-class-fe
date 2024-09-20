import {PropsAvatarUserData} from "./AvatarUserData.type";
import Typography from "@mui/material/Typography";
import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";

export const AvatarUserData = ({
  imageUrl,
  orientation = 'horizontal',
  userName,
  role
}: PropsAvatarUserData) => {
  let writtenUserName = ''
  if (userName) {
    if (orientation === 'horizontal') {
      writtenUserName = userName
    } else {
      writtenUserName = userName.split(" ")?.at(0) ?? ""
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: orientation === 'horizontal' ? 'row' : 'column',
        justifyContent: orientation === 'vertical' ? 'center' : 'start',
        alignItems: orientation === 'vertical' ? 'center' : 'start',
      }}
    >
      <Avatar
        src={imageUrl ?? "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"}
        sx={{ width: 48, height: 48 }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          ml: orientation === 'horizontal' ? '18px' : null,
          mt: orientation === 'vertical' ? '18px' : null,
          alignItems: orientation === 'vertical' ? 'center' : 'start',
        }}
      >
        <Typography variant='h6' sx={{ mb: '8px' }}>
          {writtenUserName}
        </Typography>
        {(orientation === 'horizontal' && role) && <Typography sx={{ color: 'text.secondary' }}>
          {role}
        </Typography>}
      </Box>
    </Box>
  )
}
