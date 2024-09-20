import {ComponentMeta, ComponentStory} from '@storybook/react'
import {ButtonActionFile} from "./ButtonActionFile";
import Box from "@mui/material/Box";

export default {
  title: 'Components/Molecules/ButtonActionFile',
  component: ButtonActionFile
} as ComponentMeta<typeof ButtonActionFile>

const Template: ComponentStory<typeof ButtonActionFile> = arg => <ButtonActionFile {...arg} />
export const Default = Template.bind({})
Default.args = {
  text: 'Detail',
  icon: 'tabler:send',
  style: 'primary',
}
