import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DateTimePicker as MvDateTimePicker } from '../components/DateTimePicker'
import { PropsDateTimePicker } from '../types/dateTimePicker.types'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof MvDateTimePicker> = {
  title: 'Components/Molecules/DateTimePicker',
  component: MvDateTimePicker
}

export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const DateTimePicker: StoryObj<typeof MvDateTimePicker> = (args: PropsDateTimePicker) => (
  <MvDateTimePicker {...args} />
)
DateTimePicker.args = {
  type: 'dateTimePicker',
  variant: 'default',
  highlightedDays: [
    new Date(2024, 5, 2, 10, 0, 0),
    new Date(2024, 5, 17, 14, 30, 0),
    new Date(2024, 5, 23, 9, 15, 0),
    new Date(2024, 6, 5, 12, 0, 0),
    new Date(2024, 6, 10, 8, 0, 0),
    new Date(2024, 6, 10, 10, 0, 0),
    new Date(2024, 6, 10, 15, 0, 0),
    new Date(2024, 6, 10, 17, 0, 0),
    new Date(2024, 6, 10, 18, 0, 0),
    new Date(2024, 6, 10, 18, 30, 0),
    new Date(2024, 6, 15, 11, 0, 0),
    new Date(2024, 7, 7, 13, 45, 0),
    new Date(2024, 7, 12, 10, 30, 0),
    new Date(2024, 7, 26, 16, 0, 0)
  ],
  highlightColor: 'primary'
}

export const DatePicker: StoryObj<typeof MvDateTimePicker> = (args: PropsDateTimePicker) => (
  <MvDateTimePicker {...args} />
)
DatePicker.args = {
  type: 'datePicker',
  variant: 'default',
  highlightedDays: [
    new Date(Date.UTC(2024, 5, 2)),
    new Date(Date.UTC(2024, 5, 17)),
    new Date(Date.UTC(2024, 5, 23)),
    new Date(Date.UTC(2024, 6, 5)),
    new Date(Date.UTC(2024, 6, 10)),
    new Date(Date.UTC(2024, 6, 15)),
    new Date(Date.UTC(2024, 7, 7)),
    new Date(Date.UTC(2024, 7, 12)),
    new Date(Date.UTC(2024, 7, 26))
  ],
  highlightColor: 'danger'
}

export const TimePicker: StoryObj<typeof MvDateTimePicker> = (args: PropsDateTimePicker) => (
  <MvDateTimePicker {...args} />
)
TimePicker.args = {
  type: 'timePicker',
  variant: 'default'
}

export const YearPicker: StoryObj<typeof MvDateTimePicker> = (args: PropsDateTimePicker) => (
  <MvDateTimePicker {...args} />
)
YearPicker.args = {
  type: 'yearPicker',
  variant: 'default'
}

export const MonthYearPicker: StoryObj<typeof MvDateTimePicker> = (args: PropsDateTimePicker) => (
  <MvDateTimePicker {...args} />
)
MonthYearPicker.args = {
  type: 'monthYearPicker',
  variant: 'default'
}
