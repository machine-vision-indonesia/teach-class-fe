import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DateRangePicker } from '../components/DateRangePicker'
import { PropsDateRangePicker } from '../types/dateRangePicker.types'
import { DatePickerProps } from 'react-datepicker'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof DateRangePicker> = {
  title: 'Components/Molecules/DateRangePicker',
  component: DateRangePicker,
  argTypes: {
    disabled: {
      control: 'boolean'
    }
  }
}

export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: StoryObj<typeof DateRangePicker> = (args: PropsDateRangePicker & DatePickerProps) => (
  <DateRangePicker {...args} />
)
Default.args = {
  disabled: false,
  variant: 'default'
}
