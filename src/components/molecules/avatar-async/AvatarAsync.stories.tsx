import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { AvatarAsync } from './AvatarAsync'

export default {
  title: 'Components/Molecules/AvatarAsync',
  component: AvatarAsync
} as ComponentMeta<typeof AvatarAsync>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AvatarAsync> = args => <AvatarAsync {...args} />
export const AvatarHorizontal = Template.bind({})
AvatarHorizontal.args = {
  userId: 'd56c4604-a707-4de1-9aae-a86d329ff79d',
  orientation: 'horizontal'
}

export const AvatarVertical = Template.bind({})
AvatarVertical.args = {
  userId: 'd56c4604-a707-4de1-9aae-a86d329ff79d',
  orientation: 'vertical'
}
