import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Alert } from './Alert'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Atoms/Alert',
  component: Alert,
  argTypes: {
    content: { type: 'string' }
  }
} as ComponentMeta<typeof Alert>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Alert> = args => <Alert {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'xxxx',
  icon: 'tabler:briefcase'
}
