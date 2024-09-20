import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ChipAsync } from './Chip-async'
import { Icon } from '@iconify/react'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Atoms/Chip-async',
  component: ChipAsync,
  argTypes: {}
} as ComponentMeta<typeof ChipAsync>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ChipAsync> = args => <ChipAsync {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'Text',
  onDelete: undefined
}
export const IconContent = Template.bind({})
IconContent.args = {
  label: <Icon icon='tabler:briefcase' fontSize='16px'></Icon>,
  onDelete: undefined
}
