import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Select } from '../components/Select'
import { PropsSelect } from '../types/Select.type'
import { SelectProps } from '@mui/material'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Atoms/Select',
  component: Select
} as Meta<typeof Select>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
type Story = StoryObj<typeof Select>

export const Multiple: Story = (args: PropsSelect<SelectProps>) => <Select {...args} />
Multiple.args = {
  labelKey: 'text',
  valueKey: 'id',
  placeholder: '--Select Option',
  variant: 'multiple',
  data: [
    { id: '12', text: 'xxxx', icon: 'tabler:code' },
    { id: '13', text: 'xx', icon: 'tabler:code' }
  ],
  selected: [{ id: '12', text: 'xxxx', icon: 'tabler:code' }]
}

export const Default: Story = (args: PropsSelect<SelectProps>) => <Select {...args} />
Default.args = {
  labelKey: 'text',
  valueKey: 'id',
  size: 'small',
  variant: 'default',
  data: [
    { id: '12', text: 'xxxx' },
    { id: '13', text: 'xx' }
  ],
  selected: { id: '12', text: 'xxxx' },
}
