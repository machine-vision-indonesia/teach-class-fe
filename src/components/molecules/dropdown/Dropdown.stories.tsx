import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Dropdown } from './Dropdown'

export default {
  title: 'Components/Molecules/Dropdown',
  component: Dropdown
} as ComponentMeta<typeof Dropdown>

const Template: ComponentStory<typeof Dropdown> = args => <Dropdown {...args} />

export const Default = Template.bind({})
Default.args = {
  data: [{ content: 'xx' }, { content: 'xxx' }, { content: 'xxxx' }, { content: 'xxxxx' }, { content: 'xxxxxx' }],
  variant: 'default'
}

export const styledWithGrouped = Template.bind({})
styledWithGrouped.args = {
  data: [
    { content: 'xx', subHeader: 'Header 1' },
    { content: 'xxx', subHeader: 'Header 1' },
    { content: 'xxxx', subHeader: 'Header 1' },
    { content: 'xxxxx', subHeader: 'Header 1' },
    { content: 'zz', subHeader: 'Header 2' },
    { content: 'zzz', subHeader: 'Header 2' },
    { content: 'zzzz', subHeader: 'Header 2' },
    { content: 'zzzzz', subHeader: 'Header 2' },
    { content: 'yy', subHeader: 'Header 3' },
    { content: 'yyy', subHeader: 'Header 3' },
    { content: 'yyyy', subHeader: 'Header 3' },
    { content: 'yyyyy', subHeader: 'Header 3' },
    { content: 'ss', subHeader: 'Header 4' },
    { content: 'sss', subHeader: 'Header 4' },
    { content: 'ssss', subHeader: 'Header 4' },
    { content: 'sssss', subHeader: 'Header 4' }
  ],
  variant: 'grouped',
}

export const noDataAvailable = Template.bind({})
noDataAvailable.args = {
  data: [],
  variant: 'default'
}
