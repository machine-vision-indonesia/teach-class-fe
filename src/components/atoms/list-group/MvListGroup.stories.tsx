import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ListGroup } from './ListGroup'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Atoms/ListGroup',
  component: ListGroup,
  argTypes: {
    withNumber: { type: 'boolean' }
  }
} as ComponentMeta<typeof ListGroup>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ListGroup> = args => <ListGroup {...args} />

export const Default = Template.bind({})
Default.args = {
  selectedIndex: 0,
  data: [
    { title: 'xxx', icon: 'tabler:briefcase' },
    { title: 'xxx', icon: 'tabler:briefcase' }
  ]
}

export const NoIcon = Template.bind({})
NoIcon.args = {
  selectedIndex: 0,
  data: [{ title: 'xxx' }, { title: 'xxx' }]
}

// export const MonthYear = Template.bind({})
// Default.args = {
//   variant: 'monthpicker'
// }
// export const TimePicker = Template.bind({})
// Default.args = {
//   variant: 'timepicker'
// }
