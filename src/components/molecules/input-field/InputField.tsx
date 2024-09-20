import {Box, CardContent} from '@mui/material'
import {PropsInputField} from './InputField.type'
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Icon from "../../../@core/components/icon";

const renderStyle = (
  inlineIconStyle: string,
  inlineIcon?: string,
  inlineIconSuffix?: string,
  size?: string,
  state?: string
) => {
  const newInlineIcon: string = inlineIcon as string;
  const newInlineIconSuffix: string = inlineIconSuffix as string;
  let newSize: "small" | "medium" | undefined
  if (size == 'small') {
    newSize = 'small'
  } else {
    newSize = 'medium'
  }

  if (inlineIconStyle == 'prefix') {
    if (state == 'disabled') {
      return (
        <TextField
          disabled
          size={newSize}
          variant="standard"
          sx={{bgcolor: '#EBEBE4'}}
          InputProps={{
            startAdornment: <InputAdornment position='start'><Icon
              icon={newInlineIconSuffix != null ? newInlineIconSuffix : newInlineIcon}></Icon></InputAdornment>
          }}
        />
      )
    } else if (state == 'success' || state == 'active' || state == 'error') {
      return (
        <TextField
          size={newSize}
          variant="standard"
          color={state == 'success' ? 'success' : `${state == 'error' ? 'error' : 'primary'}`}
          focused
          InputProps={{
            startAdornment: <InputAdornment position='start'><Icon
              icon={newInlineIconSuffix != null ? newInlineIconSuffix : newInlineIcon}></Icon></InputAdornment>
          }}
        />
      )
    }

    return (
      <TextField
        size={newSize}
        variant="standard"
        InputProps={{
          startAdornment: <InputAdornment position='start'><Icon
            icon={newInlineIconSuffix != null ? newInlineIconSuffix : newInlineIcon}></Icon></InputAdornment>
        }}
      />
    )
  } else if (inlineIconStyle == 'suffix') {
    if (state == 'disabled') {
      return (
        <TextField
          disabled
          size={newSize}
          variant="standard"
          sx={{bgcolor: '#EBEBE4'}}
          InputProps={{
            endAdornment: <InputAdornment position='end'><Icon
              icon={newInlineIconSuffix != null ? newInlineIconSuffix : newInlineIcon}></Icon></InputAdornment>
          }}
        />
      )
    } else if (state == 'success' || state == 'active' || state == 'error') {
      return (
        <TextField
          variant="standard"
          size={newSize}
          color={state == 'success' ? 'success' : `${state == 'error' ? 'error' : 'primary'}`}
          focused
          InputProps={{
            endAdornment: <InputAdornment position='end'><Icon
              icon={newInlineIconSuffix != null ? newInlineIconSuffix : newInlineIcon}></Icon></InputAdornment>
          }}
        />
      )
    }

    return (
      <TextField
        size={newSize}
        variant="standard"
        InputProps={{
          endAdornment: <InputAdornment position='end'><Icon
            icon={newInlineIconSuffix != null ? newInlineIconSuffix : newInlineIcon}></Icon></InputAdornment>
        }}
      />
    )
  }

  if (state == 'disabled') {
    return (
      <TextField
        disabled
        size={newSize}
        variant="standard"
        sx={{bgcolor: '#EBEBE4'}}
        InputProps={{
          startAdornment: <InputAdornment position='start'><Icon
            icon={newInlineIconSuffix != null ? newInlineIconSuffix : newInlineIcon}></Icon></InputAdornment>,
          endAdornment: <InputAdornment position='end'><Icon
            icon={newInlineIconSuffix != null ? newInlineIconSuffix : newInlineIcon}></Icon></InputAdornment>
        }}
      />
    )
  } else if (state == 'success' || state == 'active' || state == 'error') {
    return (
      <TextField
        size={newSize}
        variant="standard"
        color={state == 'success' ? 'success' : `${state == 'error' ? 'error' : 'primary'}`}
        focused
        InputProps={{
          startAdornment: <InputAdornment position='start'><Icon
            icon={newInlineIconSuffix != null ? newInlineIconSuffix : newInlineIcon}></Icon></InputAdornment>,
          endAdornment: <InputAdornment position='end'><Icon
            icon={newInlineIconSuffix != null ? newInlineIconSuffix : newInlineIcon}></Icon></InputAdornment>
        }}
      />
    )
  }

  return (
    <TextField
      size={newSize}
      variant="standard"
      InputProps={{
        startAdornment: <InputAdornment position='start'><Icon
          icon={newInlineIconSuffix != null ? newInlineIconSuffix : newInlineIcon}></Icon></InputAdornment>,
        endAdornment: <InputAdornment position='end'><Icon
          icon={newInlineIconSuffix != null ? newInlineIconSuffix : newInlineIcon}></Icon></InputAdornment>
      }}
    />
  )
}

const renderInputField = (
  inlineIconStyle: string,
  inlineIcon?: string,
  inlineIconSuffix?: string,
  size?: string,
  state?: string,
) => {
  return (
    <Stack
      sx={{
        width: 1,
      }}
    >
      {renderStyle(inlineIconStyle, inlineIcon, inlineIconSuffix, size, state)}
      <Typography variant='body2'>
        Hint Text
      </Typography>
    </Stack>
  )
}


export const InputField = ({
                             inlineIconStyle = 'custom',
                             inlineIcon,
                             inlineIconSuffix,
                             label,
                             size = 'medium',
                             state = 'default',
                             style = 'prefix',
                             children,
                             children2
                           }: PropsInputField) => {
  if (style == 'suffix') {
    return (
      <Card>
        <CardContent>
          <Typography variant='labelMd' fontWeight='bold'>
            {label}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}>
            {renderInputField(inlineIconStyle, inlineIcon, inlineIconSuffix, size, state)}
            {children}
          </Box>
        </CardContent>
      </Card>
    )
  } else if (style == 'custom') {
    return (
      <Card>
        <CardContent>
          <Typography variant='labelMd' fontWeight='bold'>
            {label}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              height: '100%',
              alignItems: 'center'
            }}>
            {children}
            {renderInputField(inlineIconStyle, inlineIcon, inlineIconSuffix, size, state)}
            {children2}
          </Box>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='labelMd' fontWeight='bold'>
          {label}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: '100%'
          }}>
          {children}
          {renderInputField(inlineIconStyle, inlineIcon, inlineIconSuffix, size, state)}
        </Box>
      </CardContent>
    </Card>
  )
}
