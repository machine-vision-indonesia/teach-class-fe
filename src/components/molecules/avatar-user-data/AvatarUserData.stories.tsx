import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import {AvatarUserData} from "./AvatarUserData";

export default {
  title: 'Components/Molecules/AvatarUserData',
  component: AvatarUserData,
} as ComponentMeta<typeof AvatarUserData>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AvatarUserData> = args => <AvatarUserData {...args} />
export const AvatarHorizontal = Template.bind({})
AvatarHorizontal.args = {
  userName: "Name User",
  role: "Job Function",
  orientation: 'horizontal'
}

export const AvatarVertical = Template.bind({})
AvatarVertical.args = {
  userName: "Name User",
  role: "Software Engineer",
  orientation: 'vertical'
}
