import type { Meta, StoryObj } from '@storybook/react'
import { PropsStepper } from '../types/stepper.type'
import { Stepper } from '../components/Stepper'

const meta: Meta<typeof Stepper> = {
  title: 'Components/Molecules/Stepper',
  component: Stepper,
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      type: { name: 'string', required: true },
      table: {
        defaultValue: {
          summary: 'horizontal'
        }
      }
    },
    size: {
      type: { name: 'string', required: true },
      control: 'select',
      options: ['small', 'medium', 'large'],
      table: {
        defaultValue: {
          summary: 'small'
        }
      }
    }
  }
}

const defaultData = [
  {
    title: 'Title 1',
    label: '1',
    active: false,
    passed: true
  },
  {
    title: 'Title 2',
    label: '2',
    active: true,
    passed: false
  },
  {
    title: 'Title 3',
    label: '3',
    active: false,
    passed: false
  },
  {
    title: 'Title 4',
    label: '4',
    active: false,
    passed: false
  }
]

export default meta

type Story = StoryObj<PropsStepper>

export const Horizontal: Story = {
  args: {
    data: defaultData?.map((v, i) => ({ ...v, subtitle: `Description ${i}` })),
    orientation: 'horizontal',
    size: 'small'
  }
}
export const Vertical: Story = {
  args: {
    data: defaultData?.map((v, i) => ({ ...v, subtitle: `Description ${i}` })),
    orientation: 'vertical',
    size: 'small'
  }
}
