import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Pagination } from './Pagination'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Atoms/Pagination',
  component: Pagination
} as ComponentMeta<typeof Pagination>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Pagination> = args => <Pagination {...args} />

export const Default = Template.bind({})
Default.args = {
  count: 10,
  page: 1
}

// export const MonthYear = Template.bind({})
// Default.args = {
//   variant: 'monthpicker'
// }
// export const TimePicker = Template.bind({})
// Default.args = {
//   variant: 'timepicker'
// }
