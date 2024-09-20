import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { PropsSelect } from '../types/Select.type'
import { SelectProps } from '@mui/material'
import { SelectAsync } from '../components/SelectAsync'
import { fetchListData } from '../services/fetchListData.services'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Molecules/SelectAsync',
  component: SelectAsync
} as Meta<typeof SelectAsync>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
type Story = StoryObj<typeof SelectAsync>


export const Multiple: Story = (args: PropsSelect<SelectProps>) => <SelectAsync {...args} />

Multiple.args = {
  labelKey: 'title',
  dataFetchService: fetchListData,
  valueKey: 'id',
  placeholder: '--Select Option',
  variant: 'multiple',
  data: [
    { id: '04a8194f-fd65-4d5a-a536-548b56a379bd', text: 'ok' },
    { id: '04a8194f-fd65-4d5a-a536-548b56a379ba', text: 'testing' }
  ],
  selected: [{ id: '04a8194f-fd65-4d5a-a536-548b56a379bd', text: 'ok' }]
}

export const Default: Story = (args: PropsSelect<SelectProps>) => <SelectAsync {...args} />

Default.args = {
  dataFetchService: fetchListData,
  labelKey: 'title',
  valueKey: 'id',
  variant: 'default',
  data: [
    { id: '04a8194f-fd65-4d5a-a536-548b56a379bd', text: 'ok' },
    { id: '04a8194f-fd65-4d5a-a536-548b56a379ba', text: 'testing' }
  ],
  selected: [{ id: '04a8194f-fd65-4d5a-a536-548b56a379bd', text: 'ok' }]
}
