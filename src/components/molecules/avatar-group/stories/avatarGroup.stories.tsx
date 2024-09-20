import type { Meta, StoryObj } from '@storybook/react'
import { AvatarGroup } from '../components/AvatarGroup'
import { PropsAvatarGroup } from '../types/avatar-group.types'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AvatarGroup> = {
  title: 'Components/Molecules/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs']
}

export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: StoryObj<typeof AvatarGroup> = (args: PropsAvatarGroup) => <AvatarGroup {...args} />
Default.args = {
  size: 'lg',
  avatars: [
    {
      type: 'image',
      src: 'https://avatar.iran.liara.run/public/boy?username=frans',
      alt: 'dummy 1',
      displayName: 'Frans AHW'
    },
    {
      type: 'image',
      src: 'https://avatar.iran.liara.run/public/girl?username=marie',
      alt: 'dummy 2',
      displayName: 'Anne Marie'
    },
    {
      type: 'image',
      src: 'https://avatar.iran.liara.run/public/boy?username=david',
      alt: 'dummy 3',
      displayName: 'David Scott'
    },
    {
      type: 'image',
      src: 'https://avatar.iran.liara.run/public/girl?username=jessy',
      alt: 'dummy 4',
      displayName: 'Jessy Cho'
    }
  ]
}

export const WithMore: StoryObj<typeof AvatarGroup> = (args: PropsAvatarGroup) => <AvatarGroup {...args} />
WithMore.args = {
  size: 'lg',
  avatars: [
    {
      type: 'image',
      src: 'https://avatar.iran.liara.run/public/boy?username=frans',
      alt: 'dummy 1',
      displayName: 'Frans AHW'
    },
    {
      type: 'image',
      src: 'https://avatar.iran.liara.run/public/girl?username=marie',
      alt: 'dummy 2',
      displayName: 'Anne Marie'
    },
    {
      type: 'image',
      src: 'https://avatar.iran.liara.run/public/boy?username=david',
      alt: 'dummy 3',
      displayName: 'David Scott'
    },
    {
      type: 'image',
      src: 'https://avatar.iran.liara.run/public/girl?username=jessy',
      alt: 'dummy 4',
      displayName: 'Jessy Cho'
    },
    {
      type: 'image',
      src: 'https://avatar.iran.liara.run/public/boy?username=brad',
      alt: 'dummy 5',
      displayName: 'Brad Pitt'
    },
    {
      type: 'image',
      src: 'https://avatar.iran.liara.run/public/girl?username=Zoe',
      alt: 'dummy 6',
      displayName: 'Zoe Hudson'
    },
    {
      type: 'image',
      src: 'https://avatar.iran.liara.run/public/boy?username=Tim',
      alt: 'dummy 7',
      displayName: 'Tim Mollow Davidson'
    },
    {
      type: 'image',
      src: 'https://avatar.iran.liara.run/public/girl?username=Vinny',
      alt: 'dummy 8',
      displayName: 'Vinny Laruso'
    }
  ]
}
