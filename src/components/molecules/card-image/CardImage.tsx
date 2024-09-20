import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Theme } from "@mui/material/styles";
import { env } from 'next-runtime-env';
import { ReactNode } from 'react';
import { PropsCardImage } from "./CardImage.type";

const renderActionChild = (actions: ReactNode, actionPosition: any) => {
  const getActionButtonPosition = () => {
    switch (actionPosition) {
      case 'topRight':
        return {
          position: 'absolute',
          top: '4px',
          right: '4px'
        }
      case 'topLeft':
        return {
          position: 'absolute',
          top: '4px',
          left: '4px'
        }
      case 'bottomRight':
        return {
          position: 'absolute',
          bottom: '4px',
          right: '4px'
        }
      case 'bottomLeft':
        return {
          position: 'absolute',
          bottom: '4px',
          left: '4px'
        }
      default:
        return {
          position: 'absolute',
          top: '4px',
          right: '4px'
        }
    }
  }

  return (
    <Box
      sx={getActionButtonPosition() as SxProps<Theme>}
    >
      {actions}
    </Box>
  )
}

export const CardImage = ({
  imageUrl,
  actions,
  actionPosition = 'topRight',
  title,
  imageId,
  width = '15rem',
  height = '15rem',
  fitImage = 'cover' // Prop baru untuk mengatur bagaimana gambar diatur dalam CardMedia
}: PropsCardImage) => {

  if (imageId) {
    imageUrl = `${env(
      'NEXT_PUBLIC_REST_API_URL'
    )}/assets/${imageId}?downloadable=true&preview=true&access_token=${localStorage.getItem('accessToken')}`
  }

  return (
    <Card
      sx={{
        width: width
      }}
    >
      <Box
        sx={{
          position: 'relative',
          padding: 1
        }}
      >
        <CardMedia
          sx={{
            height: height,
            objectFit: fitImage // Menggunakan prop baru untuk mengatur object-fit
          }}
          component="img"
          image={imageUrl ?? 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg'}
        />
        {actions && renderActionChild(actions, actionPosition)}
      </Box>
      {title}
    </Card>
  )
}
