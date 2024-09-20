import type { Meta, StoryObj } from '@storybook/react'
import SwitchProps from '../types/switch.types'
import { SWITCH_COLOR_VARIANT } from '../constants/switch.constant'
import Switch from '../components/Switch'

const meta: Meta<typeof Switch> = {
  title: 'Components/Atoms/Switch',
  component: Switch,
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the switch'
    },
    color: {
      control: 'select',
      options: Object.keys(SWITCH_COLOR_VARIANT),
      description: 'Color of the switch',
      table: {
        defaultValue: {
          summary: 'primary',
          detail: 'primary'
        }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled',
      table: {
        defaultValue: {
          summary: 'false'
        }
      }
    },
    checked: {
      control: 'boolean',
      description: 'Whether the switch is checked',
      table: {
        defaultValue: {
          summary: 'false'
        }
      }
    }
  }
}

export default meta

type Story = StoryObj<SwitchProps>

export const Default: Story = {
  args: {
    label: 'Default',
    color: 'primary',
    disabled: false,
    checked: false
  }
}

export const Checked: Story = {
  args: {
    label: 'Checked',
    color: 'primary',
    disabled: false,
    checked: true
  }
}

export const Disabled: Story = {
  args: {
    label: 'Unchecked Disabled',
    color: 'primary',
    disabled: true,
    checked: false
  }
}

export const CheckedDisabled: Story = {
  args: {
    label: 'Checked Disabled',
    color: 'primary',
    disabled: true,
    checked: true
  }
}
