import { Meta, StoryObj } from '@storybook/react'
import { ButtonCopy } from '../components/ButtonCopy'

const meta = {
  title: 'Components/Atoms/ButtonCopy',
  component: ButtonCopy,
  tags: ['autodocs'],
  argTypes: {
    title: { type: 'string' },
    variant: {
      control: { type: 'radio' },
      options: ['icon-only', 'contained']
    },
    value: { type: 'string' },
    color: {
      control: { type: 'radio' },
      options: ['primary', 'success', 'error', 'warning']
    },
    disabled: { type: 'boolean' }
  },
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof ButtonCopy>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'DP Number',
    value: '5432',
    color: 'warning',
    disabled: false,
    variant: 'icon-only'
  }
}

export const Contained: Story = {
  args: {
    title: 'DP Number',
    value: '5432',
    color: 'warning',
    disabled: false,
    variant: 'contained'
  }
}
