import { PropsWithChildren, useState } from 'react'

import { Icon } from '@iconify/react'
import { Box, Card, CardContent, useMediaQuery } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { MouseEventHandler } from 'react'
import { SelectedCardProps } from './SelectedCard.type'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

const ActionButtonIcons = ({
  actionButton,
  onMoreClick,
  onEditClick,
  onDeleteClick
}: {
  actionButton: SelectedCardProps['actionButton']
  onMoreClick?: MouseEventHandler
  onEditClick?: MouseEventHandler
  onDeleteClick?: MouseEventHandler
}) => {
  const isSmScreen = useMediaQuery((theme: any) => theme.breakpoints.down('sm'))

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)

  const handleMoreClick = (event: any) => {
    setMenuAnchorEl(event.currentTarget)
    onMoreClick?.(event)
  }

  const handleEditClick = (event: React.MouseEvent) => {
    setMenuAnchorEl(null)
    onEditClick?.(event)
  }

  const handleDeleteClick = (event: React.MouseEvent) => {
    setMenuAnchorEl(null)
    onDeleteClick?.(event)
  }

  if (actionButton === 'more') {
    return (
      <Box onClick={onMoreClick} sx={{ cursor: 'pointer' }}>
        <Icon icon='mdi:dots-vertical' fontSize={'30px'} />
      </Box>
    )
  } else if (actionButton === 'editable') {
    return (
      <Box sx={{ display: 'flex', gap: 1 }}>
        {isSmScreen ? (
          <Box onClick={handleMoreClick} sx={{ cursor: 'pointer' }}>
            <Icon icon='mdi:dots-vertical' fontSize={'30px'} />
          </Box>
        ) : (
          <>
            <Box onClick={onEditClick} sx={{ cursor: 'pointer' }}>
              <Icon icon='mdi:pencil' fontSize={'25px'} />
            </Box>
            <Box onClick={onDeleteClick} sx={{ cursor: 'pointer' }}>
              <Icon icon='mdi:delete-outline' fontSize={'25px'} color={'red'} />
            </Box>
          </>
        )}
        {isSmScreen && (
          <Menu
            sx={{ borderRadius: '20px' }}
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={() => setMenuAnchorEl(null)}
          >
            <MenuItem onClick={handleEditClick} sx={{ gap: 1 }}>
              <Icon icon='mdi:pencil' fontSize={'25px'} />
              Edit
            </MenuItem>
            <MenuItem onClick={handleDeleteClick} sx={{ gap: 1 }}>
              <Icon icon='mdi:delete-outline' fontSize={'25px'} color={'red'} />
              Delete
            </MenuItem>
          </Menu>
        )}
      </Box>
    )
  } else if (actionButton === 'status') {
    return (
      <Box sx={{ backgroundColor: '#D9F2E4', p: '6px', borderRadius: '10px', paddingX: '12px' }}>
        <Typography color={'#1EB663'} fontWeight={'600'}>
          Done
        </Typography>
      </Box>
    )
  }
}

const renderIconOrImage = (cardType: SelectedCardProps['cardType'], imagePath: string, iconName: string) => {
  if (cardType === 'withImage') {
    return (
      <Box sx={{ width: '12%', display: 'flex', justifyContent: 'center' }}>
        <img src={imagePath} alt='image' width={'55px'} height={'55px'} style={{ borderRadius: '100px' }} />
      </Box>
    )
  } else if (cardType === 'withIcon') {
    return (
      <Box
        sx={{
          width: '12%',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '#D6E5FF',
            borderRadius: '360px',
            height: '55px',
            width: '55px',
            alignItems: 'center'
          }}
        >
          <Icon icon={iconName} fontSize={'30px'} color={'#4082FF'} />
        </Box>
      </Box>
    )
  }
}

export const SelectedCard = ({
  actionButton = 'more',
  color = 'light',
  variant = 'outlined',
  label = 'label',
  description = 'description',
  cardType = 'none',
  imagePath = 'https://www.w3schools.com/howto/img_avatar.png',
  iconName = 'mdi:account',

  // Props for custom styling
  cardStyles = {},
  labelStyles = {},
  descriptionStyles = {}
}: PropsWithChildren<SelectedCardProps>) => {
  const { palette } = useTheme()
  const isSmScreen = useMediaQuery((theme: any) => theme.breakpoints.down('sm'))

  // const backgroundColor = color !== 'light' ? palette[color]?.main : 'light'
  const outlineColor = color !== 'light' ? palette[color]?.main : palette.text.primary

  return (
    <Card
      variant={variant === 'filled' ? 'elevation' : variant}
      color={color}
      sx={{
        borderRadius: '6px',

        // backgroundColor: backgroundColor,
        borderColor: outlineColor,
        ...cardStyles
      }}
    >
      <CardContent>
        <Box
          sx={
            actionButton === 'editable'
              ? {
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                  height: '100%',
                  alignItems: 'center',
                  marginBottom: '-12px'
                }
              : null
          }
        >
          {cardType !== 'none' && <>{renderIconOrImage(cardType, imagePath, iconName)}</>}

          <Box sx={cardType !== 'none' ? { width: isSmScreen ? '45%' : '70%' } : null}>
            <Box
              sx={
                actionButton !== 'editable' ? { display: 'flex', width: '100%', justifyContent: 'space-between' } : null
              }
            >
              <Box>
                <Typography variant='h5' component='div' gutterBottom style={labelStyles}>
                  {label}
                </Typography>
              </Box>
              {actionButton !== 'editable' && <Box>{ActionButtonIcons({ actionButton })}</Box>}
            </Box>

            <Typography
              color='text.secondary'
              fontStyle={'italic'}
              style={{ ...descriptionStyles, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {description}
            </Typography>
          </Box>

          {actionButton === 'editable' && (
            <Box sx={cardType !== 'none' ? { width: '30%', display: 'flex', justifyContent: 'end' } : null}>
              {ActionButtonIcons({ actionButton })}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}
