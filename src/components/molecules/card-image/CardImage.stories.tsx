import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CardImage } from "./CardImage";
import React, { MouseEvent, useState } from "react";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CustomChip from "../../../@core/components/mui/chip";
import { Button } from "@mui/material";
import { Icon } from "@iconify/react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const MenuItems = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        aria-label='more'
        aria-controls='long-menu'
        aria-haspopup='true'
        color='secondary'
        size='medium'
        onClick={handleClick}
      >
        <Icon icon='iconamoon:menu-kebab-vertical-fill' fontSize='inherit' />
      </IconButton>
      <Menu
        keepMounted
        id='long-menu'
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
      >
        <MenuItem
          onClick={
            handleClose
          }
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={
            handleClose
          }
        >
          Hapus
        </MenuItem>
      </Menu>
    </>
  )
}

export default {
  title: 'Components/Molecules/CardImage',
  component: CardImage,
  argTypes: {
    imageUrl: { defaultValue: '' },
    imageId: { defaultValue: '', description: 'Directus attachment file id' },
    width: { defaultValue: '15rem' },
    height: { defaultValue: '15rem' },
    fitImage: { defaultValue: 'cover' },
    actions: { defaultValue: [] },
    actionPosition: { defaultValue: 'topRight' },
  }
} as ComponentMeta<typeof CardImage>

const Template: ComponentStory<typeof CardImage> = args => <CardImage {...args} />
export const Default = Template.bind({})
Default.args = {
  imageUrl: 'https://ik.imagekit.io/zlt25mb52fx/ahmcdn/uploads/product-draft/colors/varian-warna-pcx160-matte-silver-515x504-tr-1-21112023-055239.png',
  title: <>
    <CardContent
      sx={{
        padding: '0px',
      }}
      style={{
        paddingBottom: '0px',
        padding: '12px 10px',
      }}
    >
      <Typography variant='h5' sx={{ mb: '10px' }}>
        Component Name
      </Typography>
      <Typography sx={{ color: 'text.secondary' }}>
        Code: Component A
      </Typography>
    </CardContent>
  </>
}

export const WithAction = Template.bind({})
WithAction.args = {
  imageUrl: 'https://ik.imagekit.io/zlt25mb52fx/ahmcdn/uploads/product-draft/colors/varian-warna-pcx160-matte-silver-515x504-tr-1-21112023-055239.png',
  actions: <IconButton
    color='secondary'
    size='medium'
  >
    <Icon icon='mdi:delete' fontSize='inherit' />
  </IconButton>,
  title: <>
    <CardContent
      sx={{
        padding: '0px',
      }}
      style={{
        paddingBottom: '0px',
        padding: '12px 10px',
      }}
    >
      <Typography variant='h5' sx={{ mb: '10px' }}>
        Component A
      </Typography>
      <Typography sx={{ color: 'text.secondary' }}>
        Unit: pcs
      </Typography>
    </CardContent>
  </>
}

export const WithActions = Template.bind({})
WithActions.args = {
  imageUrl: 'https://ik.imagekit.io/zlt25mb52fx/ahmcdn/uploads/product-draft/colors/varian-warna-pcx160-matte-silver-515x504-tr-1-21112023-055239.png',
  actions: <MenuItems />,
  title: <>
    <CardContent
      sx={{
        padding: '0px',
      }}
      style={{
        paddingBottom: '0px',
        padding: '12px 10px',
      }}
    >
      <CustomChip
        size='small'
        skin='light'
        label='Active'
        color='success'
        sx={{ mb: '8px' }}
      />
      <Typography variant='h5' sx={{ mb: '8px' }}>
        Red font fender
      </Typography>
      <Typography sx={{ color: 'text.secondary' }}>
        Lorem ipsum dolor sit amet, lorem ipsum
      </Typography>
    </CardContent>
  </>
}

export const NoImage = Template.bind({})
NoImage.args = {
  title: <>
    <CardContent
      sx={{
        padding: '0px',
        display: 'flex',
        flexDirection: 'column'
      }}
      style={{
        paddingBottom: '0px',
        padding: '12px 10px',
      }}
    >
      <Button
        variant='contained'
        startIcon={<Icon icon='tabler:send' />}
        sx={{
          mb: '8px',
        }}
      >
        Add Component & Defect
      </Button>
      <CustomChip
        size='small'
        skin='light'
        label='[Product Family]'
        color='success'
        sx={{
          alignSelf: 'start'
        }}
      />
    </CardContent>
  </>
}
