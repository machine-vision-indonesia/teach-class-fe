/** React imports */
import React, { ReactNode, useState } from 'react'

/** MUI importts */
import Menu, { MenuProps } from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import { CardActionArea } from '@mui/material'

/** Inconify imports */
import { Icon } from '@iconify/react'

/** Type imports */
import ComponentDropdownProps from '../types/Dropdown.types'

/**
 * Dropdown component is rendering a menu with selectable items.
 *
 * @param {Object} props - The props object for the Dropdown component.
 * @param {('small'|'medium'|'large')} [props.size='medium'] - The size of the dropdown. Can be 'small', 'medium', or 'large'.
 * @param {('select'|'more')} [props.type='select'] - The type of dropdown. Can be 'select' or 'more'.
 * @param {Array<Object>} props.menu - An array of menu items to be rendered in the dropdown.
 * @param {React.ReactNode} props.content - Custom content to be rendered inside the dropdown.
 * @param {string} props.menuWidth - The width of the menu.
 * @param {string} props.menuMinWidth - The minimum width of the menu.
 * @param {string} props.label - The label to be displayed in the dropdown button.
 * @param {string} props.icon - The icon to be displayed in the dropdown button.
 * @param {string} props.color - The color of the dropdown.
 * @param {('outlined'|'filled')} props.variant - The variant of the dropdown. Can be 'outlined' or 'filled'.
 * @param {boolean} props.disabled - If true, the dropdown will be disabled.
 * @returns {JSX.Element} The rendered Dropdown component.
 */
export const Dropdown = ({
  size = 'medium',
  type = 'select',
  menu,
  content,
  menuWidth,
  menuMinWidth,
  label,
  icon,
  color,
  variant,
  disabled
}: ComponentDropdownProps) => {
  /** Hooks */
  const { palette } = useTheme()

  /** States */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  /** Functions */
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (menu?.length || content) setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleUsingMenuSize = () => {
    // default size is medium
    const style = {
      height: '36px'
    }

    if (size === 'small') {
      return (style.height = '32px')
    }
    if (size === 'large') {
      return (style.height = '40px')
    }

    return style
  }

  const handleUsingMenuWidth = () => {
    // default type is select
    let style = {
      width: menuWidth ?? 'fit-content',
      menuMinWidth
    }

    if (type === 'more') {
      return (style = {
        ...style,
        menuMinWidth: menuMinWidth ?? '108px'
      })
    }

    return style
  }

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, menuItem: any, menuIndex: number | null) => {
    menuItem.onClick ? menuItem.onClick(menuIndex) : undefined
    setSelectedIndex(menuIndex)
    handleClose()
  }

  const colorUsed = !color ? palette.text.secondary : palette?.[color].main

  return (
    <>
      <CardActionArea
        disabled={disabled}
        onClick={handleClick}
        sx={{
          width: 'max-content',
          borderRadius: '6px',
          '&.Mui-disabled': {
            '& *': {
              color: palette.text.disabled
            },
            '& .content': {
              border: variant == 'outlined' ? `1px solid ${palette.text.disabled}` : undefined
            }
          }
        }}
      >
        <Stack
          sx={{
            backgroundColor: variant == 'outlined' ? undefined : palette.background.paper,
            border: variant == 'outlined' ? `1px solid ${colorUsed}` : undefined
          }}
          className='content'
          direction='row'
          alignItems='center'
          spacing='6px'
          width='max-content'
          p={size === 'large' ? '11px' : size === 'medium' ? '9.5px' : '7.5px'}
          borderRadius='6px'
        >
          {icon && <Icon icon={icon} color={colorUsed} fontSize='18px' />}
          {label && (
            <Typography variant='menuActive' color={colorUsed}>
              {label}
            </Typography>
          )}
        </Stack>
      </CardActionArea>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        sx={{
          '& .MuiPaper-root': handleUsingMenuWidth()
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        slotProps={{
          paper: {
            sx: {
              maxHeight: menu && menu.length > 5 ? '200px' : '100%'
            }
          }
        }}
      >
        {menu
          ? menu.map((menuItem, menuI) => (
              <MenuItem
                disabled={menuItem?.disabled}
                key={menuI}
                selected={menuI == selectedIndex}
                onClick={event => {
                  handleMenuItemClick(event, menuItem, menuI)
                }}
                sx={{
                  height: handleUsingMenuSize()
                }}
              >
                {menuItem.icon && (
                  <Icon icon={menuItem.icon} color={colorUsed} fontSize='18px' style={{ marginRight: '10px' }} />
                )}
                {menuItem.content}
              </MenuItem>
            ))
          : content}
      </Menu>
    </>
  )
}
