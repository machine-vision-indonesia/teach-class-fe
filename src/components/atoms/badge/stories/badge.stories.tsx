import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '../components/Badge'
import { PropsBadge } from '../types/badge.types'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Badge> = {
  title: 'Components/Atoms/Badge',
  component: Badge,
  argTypes: {
    isTransparent: {
      control: 'boolean'
    }
  }
}

export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const TextOnly: StoryObj<typeof Badge> = (args: PropsBadge) => <Badge {...args} />
TextOnly.args = {
  color: 'primary',
  style: 'rect',
  isTransparent: false,
  size: 'medium',
  icon: '',
  label: 'Storybook'
}

export const IconOnly: StoryObj<typeof Badge> = (args: PropsBadge) => <Badge {...args} />
IconOnly.args = {
  color: 'danger',
  style: 'rect',
  isTransparent: false,
  size: 'medium',
  icon: 'tabler:brand-storybook',
  label: ''
}

export const TextAndIcon: StoryObj<typeof Badge> = (args: PropsBadge) => <Badge {...args} />
TextAndIcon.args = {
  color: 'success',
  style: 'rect',
  isTransparent: false,
  size: 'medium',
  icon: 'tabler:brand-storybook',
  label: 'Storybook'
}

export const WithHex: StoryObj<typeof Badge> = (args: PropsBadge) => <Badge {...args} />
WithHex.args = {
  color: '#8521B0',
  style: 'rect',
  isTransparent: false,
  size: 'medium',
  icon: 'tabler:brand-storybook',
  label: 'Storybook'
}
