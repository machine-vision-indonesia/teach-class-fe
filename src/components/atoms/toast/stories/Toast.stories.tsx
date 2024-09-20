import React from 'react'
import { Meta, StoryObj } from '@storybook/react'

import { Toast } from '../components/Toast'
import { PropsToast } from '../types/toast.type'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Atoms/Toast',
  component: Toast
} as Meta<typeof Toast>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
type Story = StoryObj<typeof Toast>

export const Default: Story = (args: PropsToast) => <Toast {...args} />
Default.args = {
  icon: 'mdi:bell-outline',
  title: 'Notifications',
  size: 'small',
  content: 'Give short additional message here. Maximum 2 line.',
  subTitle: '11 mins ago'
}

export const Succes: Story = (args: PropsToast) => <Toast {...args} />
Succes.args = {
  type: 'alert',
  variant: 'success',
  icon: 'material-symbols:check',
  title: 'Notifications',
  size: 'small',
  content: 'invoice.pdf was uploaded successfully'
}

export const Danger: Story = (args: PropsToast) => <Toast {...args} />
Danger.args = {
  type: 'alert',
  variant: 'danger',
  icon: 'tabler:alert-triangle',
  title: 'Failed Message',
  size: 'small',
  content: 'Give short additional message here. Maximum 2 line.'
}
