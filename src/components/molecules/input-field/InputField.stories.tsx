import React from 'react'
import {ComponentStory, ComponentMeta,} from '@storybook/react'
import {InputField} from './InputField'
import {Dropdown} from "../../atoms/dropdown";
import Button from "@mui/material/Button";
import Icon from "../../../@core/components/icon";

export default {
  title: 'Components/Molecules/InputField',
  component: InputField,
  argTypes: {}
} as ComponentMeta<typeof InputField>

const InputFieldWithDropdown = (props: any) => {
  return (
    <InputField {...props}>
      <Dropdown label={'+62'}/>
    </InputField>
  )
}

const InputFieldWithIcon = (props: any) => {
  return (
    <InputField {...props}>
      <Button size={'medium'} sx={{backgroundColor:'#0069ff',color:'#FFF', marginBottom:2}} endIcon={<Icon
        icon={'material-symbols:search'}></Icon>}>KG</Button>
    </InputField>
  )
}

const InputFieldWithDropdownAndIcon = (props: any) => {
  return (
    <InputField {...props} children2={
      <Button size={'medium'} sx={{backgroundColor:'#0069ff',color:'#FFF', marginBottom:2}} endIcon={<Icon
        icon={'material-symbols:search'}></Icon>}>KG</Button>
    }>
      <Dropdown label={'+62'}/>
    </InputField>
  )
}
const InputFieldWithDropdownAndIconDisabled = (props: any) => {
  return (
    <InputField {...props} children2={
      <Button disabled={true} size={'medium'} sx={{backgroundColor:'#EBEBE4',color:'#c9c9cb', marginBottom:2}} endIcon={<Icon
        icon={'material-symbols:search'}></Icon>}>KG</Button>
    }>
      <Dropdown disabled label={'+62'}/>
    </InputField>
  )
}
const TemplateDropdownPrefix: ComponentStory<typeof InputField> = args => <InputFieldWithDropdown {...args} />
const TemplateIconSuffix: ComponentStory<typeof InputField> = args => <InputFieldWithIcon {...args} />
const TemplateDropdownIconCustom: ComponentStory<typeof InputField> = args => <InputFieldWithDropdownAndIcon {...args} />
const TemplateDropdownIconCustomDisabled: ComponentStory<typeof InputField> = args => <InputFieldWithDropdownAndIconDisabled {...args} />
export const Default = TemplateDropdownPrefix.bind({})
Default.args = {
  label:'Label',
  state:'default',
  size:'small',
  inlineIcon:'material-symbols:lock-outline'
}

export const InputFieldWithDropdownPrefix = TemplateDropdownPrefix.bind({})
InputFieldWithDropdownPrefix.args = {
  label:'Label',
  state:'default',
  size:'small',
  inlineIcon:'material-symbols:lock-outline'
}
export const InputFieldWithIconSuffix = TemplateIconSuffix.bind({})
InputFieldWithIconSuffix.args = {
  label:'Label',
  state:'default',
  size:'small',
  inlineIcon:'material-symbols:lock-outline',
  style:'suffix'
}
export const InputFieldWithDropdownAndIconCustom = TemplateDropdownIconCustom.bind({})
InputFieldWithDropdownAndIconCustom.args = {
  label:'Label',
  state:'default',
  size:'small',
  inlineIcon:'material-symbols:lock-outline',
  style:'custom'
}
export const InputFieldWithDropdownAndIconCustomDefault = TemplateDropdownIconCustom.bind({})
InputFieldWithDropdownAndIconCustomDefault.args = {
  label:'Label',
  state:'default',
  size:'small',
  inlineIcon:'material-symbols:lock-outline',
  style:'custom'
}
export const InputFieldWithDropdownAndIconCustomDisabled = TemplateDropdownIconCustomDisabled.bind({})
InputFieldWithDropdownAndIconCustomDisabled.args = {
  label:'Label',
  state:'disabled',
  size:'small',
  inlineIcon:'material-symbols:lock-outline',
  style:'custom'
}
export const InputFieldWithDropdownAndIconCustomActive = TemplateDropdownIconCustom.bind({})
InputFieldWithDropdownAndIconCustomActive.args = {
  label:'Label',
  state:'active',
  size:'small',
  inlineIcon:'material-symbols:lock-outline',
  style:'custom'
}
export const InputFieldWithDropdownAndIconCustomSuccess = TemplateDropdownIconCustom.bind({})
InputFieldWithDropdownAndIconCustomSuccess.args = {
  label:'Label',
  state:'success',
  size:'small',
  inlineIcon:'material-symbols:lock-outline',
  style:'custom'
}
export const InputFieldWithDropdownAndIconCustomError = TemplateDropdownIconCustom.bind({})
InputFieldWithDropdownAndIconCustomError.args = {
  label:'Label',
  state:'error',
  size:'small',
  inlineIcon:'material-symbols:lock-outline',
  style:'custom'
}



