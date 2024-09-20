import {PropsButtonActionFile} from "./ButtonActionFile.type";

import Button from "@mui/material/Button";
import Icon from "../../../@core/components/icon";
import {useTheme} from "@mui/material";

export const ButtonActionFile = ({ style, showText = true, icon, text, onClick }: PropsButtonActionFile) => {
  const handleOnClick = (event: any) => {
    onClick?.(event)
  }

  const { palette } = useTheme()

  if (!showText) {
    return (
      <Button
        variant='contained'
        onClick={handleOnClick}
        color={style}
        sx={{
          color: palette.common.white
        }}
      >
        <Icon
          icon={icon as string}
          style={{
            'marginLeft': '0px',
            'marginRight': '0px',
          }}
        />
      </Button>
    )
  } else {
    return (
      <Button
        variant='contained'
        onClick={handleOnClick}
        color={style}
        sx={{
          color: palette.common.white
        }}
        startIcon={
          <Icon
            icon={icon as string}
            style={{
              'marginLeft': '0px',
              'marginRight': '0px',
            }}
          />
        }
      >
        {text}
      </Button>
    )
  }
}
