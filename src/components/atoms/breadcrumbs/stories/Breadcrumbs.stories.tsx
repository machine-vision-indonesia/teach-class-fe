import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { PropsBreadcrumbs } from '../types/breadcrumbs.type'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Atoms/Breadcrumbs',
  component: Breadcrumbs
} as Meta<typeof Breadcrumbs>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
type Story = StoryObj<typeof Breadcrumbs>

export const Default: Story = (args: PropsBreadcrumbs) => <Breadcrumbs {...args} />
Default.args = {
  data: [
    { label: 'Home', path: 'xxxx', icon: 'tabler:briefcase' },
    { label: 'Home', path: 'xxxx' }
  ]
}
