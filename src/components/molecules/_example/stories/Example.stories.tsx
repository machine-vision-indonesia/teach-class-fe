import { Avatar } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react'
import { Example } from '../components/Example'
import ExampleProps from '../types/Example.types'

import { ListExample } from '../components/ListExample'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Example> = {
  title: 'Components/Template/_Example',
  component: Example
}
export default meta

type Story = StoryObj<ExampleProps>

// Define a default set of props for a filled badge
const defaultProps: Partial<ExampleProps> = {
  type: 'all'
}

// Default story
export const Default: Story = {
  args: defaultProps
}

// Optional story to showcase different variations (uncomment if needed)
export const OneColumn: Story = {
  args: {
    type: 'one'
  },
  render: () => {
    return <Example type='one' />
  }
}

// Optional story to showcase different variations (uncomment if needed)
export const TwoColumn: Story = {
  args: {
    type: 'two'
  }
}

// Optional story to showcase different variations (uncomment if needed)
export const StepperColumn: Story = {
  args: {
    type: 'step'
  }
}

// Optional story to showcase different variations (uncomment if needed)
export const TabColumn: Story = {
  args: {
    type: 'tab'
  }
}

// Optional story to showcase different variations (uncomment if needed)
export const AccordionColumn: Story = {
  args: {
    type: 'accordion'
  }
}

export const ListExampleTemplate: Story = {
  args: {},
  render: () => {
    return <ListExample />
  }
}
