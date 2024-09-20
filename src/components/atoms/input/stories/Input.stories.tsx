import { Meta, StoryObj } from '@storybook/react'

import { Input } from '../components/Input'
import ComponentInputProps from '../types/Input.types'

const meta: Meta<typeof Input> = {
  title: 'Components/Atoms/Input',
  component: Input,
  argTypes: {
    label: { type: 'string' }
  }
}

export default meta

type Story = StoryObj<ComponentInputProps>

const defaultProps: Partial<ComponentInputProps> = {
  type: 'text',
  children: <Input />
}

export const Default: Story = {
  args: defaultProps
}

export const InputWithIcon: Story = {
  render: () => <Input iconStartAdornment='iconamoon:eye-off-light' iconEndAdornment='iconamoon:eye-off-light' />
}

export const Number: Story = {
  args: {
    ...defaultProps,
    type: 'number'
  }
}

export const Password: Story = {
  args: {
    ...defaultProps,
    type: 'password'
  }
}

export const withErrorAndHelperText: Story = {
  args: {
    ...defaultProps,
    error: true,
    helperText: 'Required'
  }
}

export const InputUnit: Story = {
  args: {
    ...defaultProps,
    type: 'number',
    rightUnit: 'minute',
    numberNoArrow: true
  }
}
export const InputUnitLeft: Story = {
  args: {
    ...defaultProps,
    type: 'number',
    leftUnit: 'minute',
    numberNoArrow: false
  }
}

export const BothUnit: Story = {
  args: {
    ...defaultProps,
    type: 'number',
    leftUnit: '+62',
    rightUnit: 'IND',
    numberNoArrow: true
  }
}
