import React from 'react'
import { Icon } from '@iconify/react'
import { Card, CardMedia, IconButton, Paper, Stack, Typography } from '@mui/material'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Accordion } from './Accordion'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Atoms/Accordion',
  component: Accordion,
  argTypes: {
    variant: { defaultValue: 'default', type: 'string', control: 'select', options: ['default', 'stripped'] },
    data: {
      defaultValue: [],
      description: `
    title   : string
    content : ReactNode | string
    bagde   : ReactNode (optional)
    image   : ReactNode (optional)
    buttons : ReactNode (optional)
    `
    }
  }
} as ComponentMeta<typeof Accordion>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Accordion> = args => <Accordion {...args} />

const dummyData = Array(3)
  .fill({})
  .map((_, i) => ({ content: `Accordion Content ${i + 1}`, title: `Accordion Title ${i + 1}` }))
const dummyBadge = (
  <Paper elevation={3} sx={{ width: 24, aspectRatio: 1, borderRadius: '50%', display: 'grid', placeContent: 'center' }}>
    <Typography variant='h6'>2</Typography>
  </Paper>
)
const dummyImage = (
  <Card sx={{ width: 24, aspectRatio: 1, borderRadius: '50%' }}>
    <CardMedia sx={{ width: 24, aspectRatio: 1, borderRadius: '50%' }} image='https://picsum.photos/200' />
  </Card>
)
const dummyButtons = (
  <Stack direction='row' alignItems='center'>
    <IconButton sx={{ borderRadius: 0 }} color='primary'>
      <Icon icon='tabler:settings' />
    </IconButton>
    <IconButton sx={{ borderRadius: 0 }} color='error'>
      <Icon icon='tabler:trash' />
    </IconButton>
  </Stack>
)

export const Default = Template.bind({})
Default.args = {
  data: dummyData
}

export const Stripped = Template.bind({})
Stripped.args = {
  variant: 'stripped',
  data: dummyData
}

export const WithCustomIcon = Template.bind({})
WithCustomIcon.args = {
  data: dummyData?.map(v => ({ ...v, icon: 'tabler:briefcase' }))
}

export const WithTitleBadge = Template.bind({})
WithTitleBadge.args = {
  data: dummyData?.map(v => ({ ...v, badge: dummyBadge }))
}

export const WithTitleImage = Template.bind({})
WithTitleImage.args = {
  data: dummyData?.map(v => ({ ...v, image: dummyImage }))
}

export const WithTitleButton = Template.bind({})
WithTitleButton.args = {
  data: dummyData?.map(v => ({ ...v, buttons: dummyButtons }))
}
