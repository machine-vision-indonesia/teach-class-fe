import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Table } from './Table'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Atoms/Table',
  component: Table
} as ComponentMeta<typeof Table>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Table> = args => <Table {...args} />

export const Default = Template.bind({})
Default.args = {
  headers: [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nama' }
  ],
  data: [{ id: 1, name: 'xxx' }]
}

// export const MonthYear = Template.bind({})
// Default.args = {
//   variant: 'monthpicker'
// }
// export const TimePicker = Template.bind({})
// Default.args = {
//   variant: 'timepicker'
// }
