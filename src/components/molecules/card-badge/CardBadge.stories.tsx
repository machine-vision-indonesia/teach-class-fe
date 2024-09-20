import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CardBadge } from './CardBadge'

export default {
  title: 'Components/Molecules/CardBadge',
  component: CardBadge,
  argTypes: {
    color: { defaultValue: 'primary' },
    style: { defaultValue: 'prefix' },
    variant: { defaultValue: 'dropdown' }
  }
} as ComponentMeta<typeof CardBadge>
const Template: ComponentStory<typeof CardBadge> = args => <CardBadge {...args} />
export const Default = Template.bind({})
Default.args = {
  style: 'outlined',
  name: 'Name',
  description: 'Description'
}
