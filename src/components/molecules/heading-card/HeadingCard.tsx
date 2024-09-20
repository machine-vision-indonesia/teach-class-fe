import {PropsHeadingCard} from "./HeadingCard.type";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import {Icon} from "@iconify/react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

export const HeadingCard = ({ color = 'primary', label, iconName, children, onIconClick }: PropsHeadingCard) => {
  const getHeaderBackground = () => {
    switch(color) {
      case 'primary':
        return 'primary.main'
      case 'secondary':
        return 'secondary.main'
      case 'error':
        return 'error.main'
      case 'warning':
        return 'warning.main'
      case 'success':
        return 'success.main'
      case 'info':
        return 'info.main'
      case 'accent':
        return 'transparent'
      default:
        return 'primary.main'
    }
  }

  const newIconName: string = iconName as string;

  return (
    <Card>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: getHeaderBackground(),
          padding: newIconName ? '4px' : '8px'
        }}
      >
        <Box
          sx={{
            width: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Typography
            sx={{
              fontSize: '18px',
              fontWeight: 600,
              color: 'primary.contrastText'
            }}
          >
            {label}
          </Typography>
        </Box>
        {newIconName && <Box
          sx={{
            width: '24px',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <IconButton
            aria-label='more'
            aria-controls='long-menu'
            aria-haspopup='true'
            color='secondary'
            size='small'
            onClick={onIconClick}
            style={{
              'marginLeft': 'auto',
              'color': 'white'
            }}
          >
            <Icon
              icon={newIconName}
              fontSize={'20'}
            />
          </IconButton>
        </Box>}
      </Box>
      {children}
    </Card>
  );
}
