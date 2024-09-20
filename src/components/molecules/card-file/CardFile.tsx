import { PropsCardFile } from './CardFile.type'
import React, { ReactNode } from 'react'
import Card from '@mui/material/Card'
import { Box, CardMedia, Typography } from '@mui/material'
import { Icon } from '@iconify/react'

export const CardFile = ({ file_name, description, wrapperStyle, type = 'image' }: PropsCardFile) => {
  return (
    <Card
      sx={{
        p: 4,
        aspectRatio: '1/1',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        ...wrapperStyle
      }}
    >
      <Box
        sx={{
          width: '86px',
          height: '86px',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {
          {
            image: (
              <Icon icon='material-symbols:image-outline' color='#4368F5' fontSize={50} style={{ margin: 'auto' }} />
            ),
            pdf: <Icon icon='mingcute:pdf-line' color='#4368F5' fontSize={50} style={{ margin: 'auto' }} />,
            word: <Icon icon='ri:file-word-line' color='#4368F5' fontSize={50} style={{ margin: 'auto' }} />,
            other: <Icon icon='heroicons:link-20-solid' color='#4368F5' fontSize={50} style={{ margin: 'auto' }} />
          }[type]
        }
      </Box>

      <Typography
        sx={{
          fontSize: '24px',
          fontWeight: '700',
          lineHeight: '34px',
          color: '#4368F5'
        }}
      >
        {file_name}
      </Typography>

      <Typography
        sx={{
          fontSize: '20px',
          fontWeight: '400',
          lineHeight: '34px',
          color: '#4368F5'
        }}
      >
        {description}
      </Typography>
    </Card>
  )
}
