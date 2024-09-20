import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { CircularProgress } from './CircularProgress'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Atoms/CircularProgress',
  component: CircularProgress
} as ComponentMeta<typeof CircularProgress>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CircularProgress> = args => <CircularProgress {...args} />

export const Default = Template.bind({})
Default.args = {}

// export const MonthYear = Template.bind({})
// Default.args = {
//   variant: 'monthpicker'
// }
// export const TimePicker = Template.bind({})
// Default.args = {
//   variant: 'timepicker'
// }
