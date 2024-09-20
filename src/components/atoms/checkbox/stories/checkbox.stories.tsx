import type { Meta, StoryObj } from '@storybook/react'
import CheckboxProps from '../types/checkbox.types'
import Checkbox from '../components/Checkbox'
import { CHECKBOX_COLOR_VARIANT } from '../constants/checkbox.constant'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Atoms/Checkbox',
  component: Checkbox,
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the checkbox'
    },
    color: {
      control: 'select',
      options: Object.keys(CHECKBOX_COLOR_VARIANT),
      description: 'Color of the checkbox',
      table: {
        defaultValue: {
          summary: 'primary',
          detail: 'primary'
        }
      }
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
      description: 'Size of the checkbox',
      table: {
        defaultValue: {
          summary: 'small'
        }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
      table: {
        defaultValue: {
          summary: 'false'
        }
      }
    },
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
      table: {
        defaultValue: {
          summary: 'false'
        }
      }
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is indeterminate',
      table: {
        defaultValue: {
          summary: 'false'
        }
      }
    },
    hover: {
      control: 'boolean',
      description: 'Whether the checkbox is hover',
      table: {
        defaultValue: {
          summary: 'true'
        }
      }
    }
  }
}

export default meta

type Story = StoryObj<CheckboxProps>

export const Default: Story = {
  args: {
    label: 'Default',
    color: 'primary',
    size: 'small',
    disabled: false,
    checked: false,
    hover: true,
    indeterminate: false
  }
}

export const Checked: Story = {
  args: {
    label: 'Checked',
    color: 'primary',
    size: 'small',
    disabled: false,
    checked: true,
    hover: true,
    indeterminate: false
  }
}

export const Disabled: Story = {
  args: {
    label: 'Unchecked Disabled',
    color: 'primary',
    size: 'small',
    disabled: true,
    checked: false,
    hover: false,
    indeterminate: false
  }
}

export const CheckedDisabled: Story = {
  args: {
    label: 'Checked Disabled',
    color: 'primary',
    size: 'small',
    disabled: true,
    checked: true,
    hover: false,
    indeterminate: false
  }
}

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate',
    color: 'primary',
    size: 'small',
    disabled: false,
    checked: false,
    hover: true,
    indeterminate: true
  }
}
