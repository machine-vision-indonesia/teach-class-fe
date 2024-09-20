import type { Meta, StoryObj } from '@storybook/react'
import RadioProps from '../types/radio.types'
import { RADIO_COLOR_VARIANT } from '../constants/radio.constant'
import Radio from '../components/Radio'

const meta: Meta<typeof Radio> = {
  title: 'Components/Atoms/Radio',
  component: Radio,
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the radio'
    },
    color: {
      control: 'select',
      options: Object.keys(RADIO_COLOR_VARIANT),
      description: 'Color of the radio',
      table: {
        defaultValue: {
          summary: 'primary',
          detail: 'primary'
        }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio is disabled',
      table: {
        defaultValue: {
          summary: 'false'
        }
      }
    },
    checked: {
      control: 'boolean',
      description: 'Whether the radio is checked',
      table: {
        defaultValue: {
          summary: 'false'
        }
      }
    },
    hover: {
      control: 'boolean',
      description: 'Whether the radio is hover',
      table: {
        defaultValue: {
          summary: 'true'
        }
      }
    }
  }
}

export default meta

type Story = StoryObj<RadioProps>

export const Default: Story = {
  args: {
    label: 'Default',
    color: 'primary',
    disabled: false,
    checked: false,
    hover: true
  }
}

export const Checked: Story = {
  args: {
    label: 'Checked',
    color: 'primary',
    disabled: false,
    checked: true,
    hover: true
  }
}

export const Disabled: Story = {
  args: {
    label: 'Unchecked Disabled',
    color: 'primary',
    disabled: true,
    checked: false,
    hover: false
  }
}

export const CheckedDisabled: Story = {
  args: {
    label: 'Checked Disabled',
    color: 'primary',
    disabled: true,
    checked: true,
    hover: false
  }
}
