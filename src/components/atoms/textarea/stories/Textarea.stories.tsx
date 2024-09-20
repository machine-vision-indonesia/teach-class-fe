import { Meta, StoryObj } from '@storybook/react'
import { PropsTextarea } from '../types/textarea.types'
import { Textarea } from '../components/Textarea'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Atoms/Textarea',
  component: Textarea
} as Meta<typeof Textarea>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
type Story = StoryObj<typeof Textarea>

export const Default: Story = (args: PropsTextarea) => <Textarea {...args} />
Default.args = {
  placeholder: 'Placeholder'
}
