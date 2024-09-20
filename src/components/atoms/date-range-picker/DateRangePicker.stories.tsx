import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { DateRangePicker } from './DateRangePicker'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Atoms/DateRangePicker',
  component: DateRangePicker
} as ComponentMeta<typeof DateRangePicker>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DateRangePicker> = args => <DateRangePicker {...args} />

export const Default = Template.bind({})
Default.args = {
  noWrapper: true,
  startDate: new Date(),
  endDate: new Date()
}

// export const MonthYear = Template.bind({})
// Default.args = {
//   variant: 'monthpicker'
// }
// export const TimePicker = Template.bind({})
// Default.args = {
//   variant: 'timepicker'
// }
