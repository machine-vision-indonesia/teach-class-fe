import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Chip } from '../components/Chip'
import { PropsMvChip } from '../types/chip.types'
import { Avatar } from '../../avatar'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Atoms/Chip',
  component: Chip,
  argTypes: {
    onDelete: {
      control: 'object'
    },
    size: {
      control: 'select'
    }
  }
} as Meta<typeof Chip>

type Story = StoryObj<typeof Chip>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: Story = (args: PropsMvChip) => <Chip {...args} />
Default.args = {
  label: 'Text',
  onDelete: () => console.log('tes'),
  size: 'small',
  shape: 'circular'
}
export const IconContent: Story = (args: PropsMvChip) => <Chip {...args} />
IconContent.args = {
  label: 'Text',
  size: 'medium',
  avatar: <Avatar src='https://picsum.photos/200' isAsync={false} size='xs' type='image' />,
  onDelete: () => console.log('tes')
}

IconContent.parameters = {
  docs: {
    source: {
      code: `
        <Chip
          label='Text'
          size='medium'
          onDelete={undefined}
          avatar={
          // Use avatar from Stroybook
          <Avatar src='https://picsum.photos/200' isAsync={false} size='xs' type='image' />
          }
        />
      `
    }
  }
}
