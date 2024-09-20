import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { DatePicker } from './DatePicker'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Atoms/DatePicker',
  component: DatePicker
} as ComponentMeta<typeof DatePicker>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DatePicker> = args => (
  <DatePicker onChange={undefined} selected={null} {...args} />
)

export const Default = Template.bind({})
Default.args = {
  noWrapper: true
}

// export const MonthYear = Template.bind({})
// Default.args = {
//   variant: 'monthpicker'
// }
// export const TimePicker = Template.bind({})
// Default.args = {
//   variant: 'timepicker'
// }
