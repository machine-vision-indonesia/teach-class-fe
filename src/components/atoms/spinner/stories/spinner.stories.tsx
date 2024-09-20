import type { Meta, StoryObj } from '@storybook/react'
import Spinner from '../components/Spinner'
import SpinnerProps from '../types/spinner.types'
import { COLOR_VARIANT } from '../constants/spinner.constant'

const meta: Meta<typeof Spinner> = {
  title: 'Components/Atoms/Spinner',
  component: Spinner,
  argTypes: {
    color: {
      control: 'select',
      options: Object.keys(COLOR_VARIANT),
      required: true,
      table: {
        defaultValue: {
          summary: 'Default',
          detail: 'default variant for using background dark mode, inverted variant for using background light mode'
        },
        type: {
          summary: 'string'
        }
      }
    },
    size: {
      control: 'text',
      table: {
        defaultValue: {
          summary: '50px',
          detail: 'default is 50px but you can change to percent 100%, component size follow container'
        },
        type: {
          summary: 'string'
        }
      }
    }
  }
}

export default meta

type Story = StoryObj<SpinnerProps>

export const Default: Story = {
  args: {
    color: 'default',
    size: '50px'
  }
}

export const Inverted: Story = {
  args: {
    color: 'inverted',
    size: '50px'
  }
}
