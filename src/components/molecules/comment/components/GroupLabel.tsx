// this component is taken from the atom folder, I need a custom GroupLabel to temporarily put it here first
import { PropsGroupLabel } from "../types/GroupLabel.type";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Icon from "../../../../@core/components/icon";
import { useTheme } from "@mui/material";
import { resolveHeaderBackground, resolveLabelColor } from "../utils/Comment.utils";

export const GroupLabel = ({ children, rightHeader, iconName, label, color, style }: PropsGroupLabel) => {
  const theme = useTheme()

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
                color: resolveHeaderBackground(color, theme),
              }}
            >
              <Icon
                color={resolveLabelColor(style, color, theme)}
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
                color: resolveLabelColor(style, color, theme),
                fontSize: '18px',
                fontWeight: 'bold'
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
              color: resolveLabelColor(style, color, theme),
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
            bgcolor: resolveHeaderBackground(color, theme),
            padding: '12px 18px',
            borderTopLeftRadius: '6px',
            borderTopRightRadius: '6px',
            borderBottom: color === 'accent'
              ? '1px solid'
              : null,
            borderBottomColor: color === 'accent' ? theme.colorToken.border.neutral.bold : null
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
