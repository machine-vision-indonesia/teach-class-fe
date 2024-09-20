import {PropsGroupLabel} from "./GroupLabel.type";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Icon from "../../../@core/components/icon";

export const GroupLabel = ({ children, rightHeader, iconName, label, color, style }: PropsGroupLabel) => {
  const resolveHeaderBackground = () => {
    switch(color) {
      case 'primary':
        return '#005EFF29'
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

  const resolveLabelColor = () => {
    if (style === 'text') {
      return '#5D5E61'
    }

    if (color === 'accent') {
      return '#5D5E61'
    } else if (color === 'primary') {
      return '#005EFF'
    } else {
      return '#fff'
    }
  }

  const newIconName: string = iconName as string;

  const renderHeaderContent = () => {
    if (typeof newIconName != 'undefined') {
      return (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                marginRight: '10px',
                color: resolveHeaderBackground(),
              }}
            >
              <Icon
                color={resolveLabelColor()}
                icon={newIconName}
                fontSize={'22'}
                style={{
                  'padding': '0',
                  'margin': '0',
                  'marginTop': '4px'
                }}
              ></Icon>
            </Box>
            <Typography
              sx={{
                color: resolveLabelColor(),
                fontSize: '18px'
              }}
            >
              {label}
            </Typography>
          </Box>
          {typeof rightHeader != 'undefined' && rightHeader}
        </>
      )
    } else {
      return (
        <>
          <Typography
            sx={{
              color: resolveLabelColor(),
              fontSize: '18px'
            }}
          >
            {label}
          </Typography>
          {typeof rightHeader != 'undefined' && rightHeader}
        </>
      )
    }
  }

  if (style === 'header') {
    return (
      <Card
        sx={{
          borderRadius: '6px',
          padding: '0px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            bgcolor: resolveHeaderBackground(),
            padding: '12px 18px',
            borderTopLeftRadius: '6px',
            borderTopRightRadius: '6px',
            borderBottom: color === 'accent'
              ? '1px solid #DBDADE'
              : null
          }}
        >
          {renderHeaderContent()}
        </Box>
        <Box>{children}</Box>
      </Card>
    );
  } else {
    return (
      <Box
        sx={{
          borderRadius: '6px',
          padding: '0px',
          backgroundColor: 'transparent'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '16px',
            paddingX: '16px',
            borderTopLeftRadius: '6px',
            borderTopRightRadius: '6px',
          }}
        >
          {renderHeaderContent()}
        </Box>
        <Box>{children}</Box>
      </Box>
    );
  }
}
