import React from 'react'
import { ColorPicker } from '../components/ColorPicker'
import { Meta, StoryObj } from '@storybook/react'
import { PropsColorPicker } from '../types/colorPicker.types'

export default {
  title: 'Components/Molecules/ColorPicker',
  component: ColorPicker,
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: {
        type: 'select'
      }
    }
  }
} as Meta<typeof ColorPicker>
type Story = StoryObj<typeof ColorPicker>

export const Default: Story = (args: PropsColorPicker) => <ColorPicker {...args} />
Default.args = {
  nameText: 'Preview',
  isPreview: true,
  size: 'small'
}
