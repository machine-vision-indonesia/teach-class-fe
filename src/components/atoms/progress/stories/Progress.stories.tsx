import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Progress } from '../components/Progress'
import { ProgressProps } from '../types/progress.types'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Atoms/Progress',
  component: Progress
} as Meta<typeof Progress>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
type Story = StoryObj<typeof Progress>

export const Default: Story = (args: ProgressProps) => <Progress {...args} />
Default.args = {
  variant: 'determinate',
  value: 50,
  isFailed: false
}

// export const MonthYear = Template.bind({})
// Default.args = {
//   variant: 'monthpicker'
// }
// export const TimePicker = Template.bind({})
// Default.args = {
//   variant: 'timepicker'
// }
