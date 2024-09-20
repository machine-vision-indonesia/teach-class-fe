import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { StripCard } from './StripCard'
import { Box, Typography } from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'

const StripCardComponent = (props: any) => {
  return (
    <StripCard {...props}>
      <Box
        sx={{
          width: 1,
          padding: '8px 16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <CustomChip
          rounded
          label='[no gatepass]'
          skin='light'
          color='info'
          sx={{
            width: 1,
            borderRadius: '4px',
            backgroundColor: '#005EFF29',
            color: '#005EFF'
           }}
        />
        <Typography variant='h3'>A - 108</Typography>
        <Box
          sx={{
            width: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant='h6' sx={{ color: '#909094' }}>[item number]</Typography>
          <Typography variant='h6'>Vendor A</Typography>
        </Box>
      </Box>
    </StripCard>
  )
}

const StripCardComponentOne = (props: any) => {
  return (
    <StripCard {...props}>
      <Box
        sx={{
          padding: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '0px'
        }}
      >
        <Box
          sx={{
            width: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: '6px'
          }}
        >
          <Typography variant='h6'>RFID Card</Typography>
          <Typography variant='h6' sx={{ color: '#909094' }}>20/08/2023</Typography>
        </Box>
        <Box
          sx={{
            width: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <CustomChip
            rounded
            label='10 Unit'
            skin='light'
            color='info'
            sx={{
              backgroundColor: '#005EFF29',
              color: '#005EFF'
            }}
          />
          <Typography variant='h6' sx={{ color: '#909094' }}>General/BMO/005</Typography>
        </Box>
      </Box>
    </StripCard>
  )
}

const StripCardComponentTwo = (props: any) => {
  return (
    <StripCard {...props}>
      <Box
        sx={{
          padding: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '0px'
        }}
      >
        <Box
          sx={{
            width: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: '6px'
          }}
        >
          <Typography variant='h3'>A1 - 108</Typography>
          <Typography variant='subtitle2' sx={{ color: '#909094' }}>[item number]</Typography>
        </Box>
        <Box
          sx={{
            width: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Typography
            variant='subtitle2'
            sx={{
              color: '#5D5E61'
            }}
          >
            Item Name
          </Typography>
          <Typography
            variant='h5'
            sx={{
              margin: '0px 4px',
              color: '#909094'
            }}
          >
            |
          </Typography>
          <CustomChip
            rounded
            label='[codeitem]'
            sx={{
              backgroundColor: '#FA732229',
              color: '#FA7322',
              padding: '0px',
              margin: '0px'
            }}
          />
        </Box>
      </Box>
    </StripCard>
  )
}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Molecules/StripCard',
  component: StripCard,
  argTypes: {
    color: { defaultValue: 'primary' },
    accent: { defaultValue: 'left' },
  }
} as ComponentMeta<typeof StripCard>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof StripCard> = args => <StripCardComponent {...args} />
export const PrimaryLeft = Template.bind({})
PrimaryLeft.args = {
  color: 'primary',
  accent: 'left',
}

export const PrimaryBottom = Template.bind({})
PrimaryBottom.args = {
  color: 'primary',
  accent: 'bottom',
}

const TemplateOne: ComponentStory<typeof StripCard> = args => <StripCardComponentOne {...args} />
export const PrimaryLeft1 = TemplateOne.bind({})
PrimaryLeft1.args = {
  color: 'primary',
  accent: 'left',
}

export const PrimaryRight = TemplateOne.bind({})
PrimaryRight.args = {
  color: 'primary',
  accent: 'right',
}

const TemplateTwo: ComponentStory<typeof StripCard> = args => <StripCardComponentTwo {...args} />
export const ErrorVertical = TemplateTwo.bind({})
ErrorVertical.args = {
  color: 'error',
  accent: 'vertical',
}
