import type { Meta, StoryObj } from '@storybook/react'
import { ChecklistRequest } from '../components/ChecklistRequest'
import { ChecklistRequestProps } from '../types/checklistRequest.types'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ChecklistRequest> = {
  title: 'Components/Molecules/ChecklistRequest',
  component: ChecklistRequest,
  argTypes: {
    disabled: {
      control: 'boolean'
    }
  },
  tags: ['autodocs']
}

export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: StoryObj<typeof ChecklistRequest> = (args: ChecklistRequestProps) => (
  <ChecklistRequest {...args} />
)
Default.args = {
  title: 'Default',
  options: [
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' },
    { id: 'option4', label: 'Option 4' },
    { id: 'option5', label: 'Option 5' },
    { id: 'option6', label: 'Option 6' }
  ],
  disabled: false,
  labelKey: 'label',
  valueKey: 'id',
  onChange: value => {
    console.log(value)
  },
  value: []
}

export const AcceptValue: StoryObj<typeof ChecklistRequest> = (args: ChecklistRequestProps) => (
  <ChecklistRequest {...args} />
)

AcceptValue.args = {
  title: 'With Value',
  options: [
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' },
    { id: 'option4', label: 'Option 4' },
    { id: 'option5', label: 'Option 5' },
    { id: 'option6', label: 'Option 6' }
  ],
  disabled: false,
  labelKey: 'label',
  valueKey: 'id',
  onChange: value => {
    console.log(value)
  },
  value: [
    { id: 'option1', text: 'Option 1' },
    { id: 'option2', text: 'Option 2' },
    { id: 'option3', text: 'Option 3' }
  ]
}
