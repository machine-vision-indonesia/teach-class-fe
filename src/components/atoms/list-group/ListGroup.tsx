import { Icon } from '@iconify/react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { type PropsAvatar } from '../avatar/Avatar'

interface TypeData {
  title: string
  icon?: string
}

interface PropsListGroup {
  variant?: 'default' | 'card' | 'outlined'
  color?: PropsAvatar['badgeColor']
  selectedIndex?: number
  onSelected?: (index: number) => void
  data: TypeData[]
  withNumber?: boolean
}

export const ListGroup = ({ color, data, selectedIndex, onSelected, withNumber, variant }: PropsListGroup) => {
  const colorUsed = color ?? 'primary'

  return (
    <List
      sx={{
        bgcolor: variant == 'card' ? 'background.paper' : undefined,
        borderRadius: '6px',
        border: thm => (variant == 'outlined' ? `1px solid ${(thm.palette?.[colorUsed] as any).main}` : undefined)
      }}
    >
      {data.map((v, i) => (
        <ListItem key={i}>
          <ListItemButton
            sx={{
              borderRadius: '6px',
              '&:not(.Mui-selected):hover': {
                backgroundColor: `${colorUsed}.100`,
                color: `${colorUsed}.main`
              },
              '&.Mui-selected': {
                '&:hover': {
                  backgroundColor: `${colorUsed}.main`
                },
                backgroundColor: `${colorUsed}.main`,
                '& *': {
                  color: 'white !important'
                }
              }
            }}
            selected={selectedIndex === i}
            onClick={() => onSelected?.(i)}
          >
            {v.icon && (
              <ListItemIcon>
                <Icon icon={v.icon} fontSize={18} />
              </ListItemIcon>
            )}
            <ListItemText primary={v.title} primaryTypographyProps={{ variant: 'menuActive' }} />
            {withNumber && (
              <ListItemIcon>
                <Box
                  width='24px'
                  height='24px'
                  bgcolor={`${colorUsed}.main`}
                  display='flex'
                  borderRadius='4px'
                  alignItems='center'
                  justifyContent='center'
                >
                  <Typography color='white' variant='labelSmBold'>
                    {i + 1}
                  </Typography>
                </Box>
              </ListItemIcon>
            )}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
