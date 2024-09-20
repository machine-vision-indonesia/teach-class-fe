import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { AuthDev } from './AuthDev'

export default {
  title: 'Tools/AuthDev',
  component: AuthDev
} as ComponentMeta<typeof AuthDev>

const Template: ComponentStory<typeof AuthDev> = (args: any) => <AuthDev {...args} />

export const Default = Template.bind({})
