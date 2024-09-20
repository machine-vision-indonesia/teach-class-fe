import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from '../components/Avatar'
import { PropsAvatar } from '../types/avatar.types'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Avatar> = {
  title: 'Components/Atoms/Avatar',
  component: Avatar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  argTypes: {
    isAsync: {
      control: 'boolean'
    }
  },
  tags: ['autodocs']
}

export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: StoryObj<typeof Avatar> = (args: PropsAvatar) => <Avatar {...args} />
Default.args = {
  size: 'xl',
  src: 'https://picsum.photos/200',
  type: 'image',
  isAsync: false
}

export const Placeholder: StoryObj<typeof Avatar> = (args: PropsAvatar) => <Avatar {...args} />
Placeholder.args = {
  size: 'xl',
  type: 'placeholder',
  isAsync: false
}

export const Async: StoryObj<typeof Avatar> = (args: PropsAvatar) => <Avatar {...args} />
Async.args = {
  size: 'xl',
  type: 'image',
  isAsync: true,
  userId: '94b519eb-6163-45a0-b3fb-7a84b6dedee1'
}

export const Initial: StoryObj<typeof Avatar> = (args: PropsAvatar) => <Avatar {...args} />
Initial.args = {
  size: 'xl',
  type: 'initial',
  isAsync: false,
  displayName: 'Machine Vision'
}

export const More: StoryObj<typeof Avatar> = (args: PropsAvatar) => <Avatar {...args} />
More.args = {
  src: 'https://picsum.photos/200',
  size: 'xl',
  type: 'more',
  isAsync: false,
  displayName: 'Machine Vision'
}
