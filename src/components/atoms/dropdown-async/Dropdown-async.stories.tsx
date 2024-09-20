import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { DropdownAsync } from './Dropdown-async'
import {GetTableUsers} from './GetUser.service'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Atoms/DropdownAsync',
  component: DropdownAsync
} as ComponentMeta<typeof DropdownAsync>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DropdownAsync> = args => <DropdownAsync {...args} />

export const Default = Template.bind({})
Default.args = {
    placeholder: 'xxxx',
    valueKey: 'id',
    valueLabel: 'email',
    fullWidth: true,
    disabled: false,
    isError: false,
    defaultValue: null,
    dataFetchService: GetTableUsers
}
