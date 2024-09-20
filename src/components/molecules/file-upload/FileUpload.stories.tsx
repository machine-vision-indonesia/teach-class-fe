import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { FileUpload } from './FileUpload'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Molecules/FileUpload',
  component: FileUpload
} as ComponentMeta<typeof FileUpload>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FileUpload> = args => <FileUpload {...args} />

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
