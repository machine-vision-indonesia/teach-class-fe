import {Tabbing} from "./Tabbing";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";

export default {
  title: 'Components/Atoms/Tabbing',
  component: Tabbing,
  argTypes: {}
} as ComponentMeta<typeof Tabbing>
const Template: ComponentStory<typeof Tabbing> = args => <Tabbing {...args} />
export const Default = Template.bind({})
Default.args = {
  data: [{title: 'Visitor'},
    {title: 'Employee'},
    {title: 'Internship'}],
}
export const TabbingWithCountData = Template.bind({})
TabbingWithCountData.args = {
  data: [{title: 'Visitor', countData: 20},
    {title: 'Employee', countData: 10},
    {title: 'Internship', countData: 8, disabled: true}],
}

export const TabbingWithIcon = Template.bind({})
TabbingWithIcon.args = {
  data: [{title: 'Visitor', iconName: 'material-symbols:nest-doorbell-visitor'},
    {title: 'Employee', iconName: 'raphael:employee'},
    {title: 'Internship', iconName: 'clarity:employee-line', disabled: true}],
}

export const TabbingWithIconAndCountData = Template.bind({})
TabbingWithIconAndCountData.args = {
  data: [{title: 'Visitor', iconName: 'material-symbols:nest-doorbell-visitor', countData: 10},
    {title: 'Employee', iconName: 'raphael:employee', countData: 15},
    {title: 'Internship', iconName: 'clarity:employee-line', countData: 8, disabled: true}],
}
