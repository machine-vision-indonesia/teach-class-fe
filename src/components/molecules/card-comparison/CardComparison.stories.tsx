import { ComponentMeta, ComponentStory } from '@storybook/react'
import { CardComparison } from './CardComparison'
import React, { MouseEvent, useState } from 'react'

export default {
  title: 'Components/Molecules/CardComparison',
  component: CardComparison
} as ComponentMeta<typeof CardComparison>

const Template: ComponentStory<typeof CardComparison> = args => <CardComparison {...args} />
export const Default = Template.bind({})
Default.args = {
  title: 'Issue Status Comparison',
  subTitle: 'The data show in 2 status of issue',
  data: [
    {
      name: 'Report',
      color: ['#2186D826', '#2286D8'],
      icon: 'mdi:check-circle-outline',
      mainValue: '16,2%',
      subValue: '1234'
    },
    {
      name: 'Closed',
      color: ['#A575FF33', '#8340FF'],
      icon: 'uis:layers-alt',
      mainValue: '162%',
      subValue: '321'
    }
  ],
  comparisonText: 'VS'
}
