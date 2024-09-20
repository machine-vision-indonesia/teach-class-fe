import { ComponentMeta, ComponentStory } from '@storybook/react'
import { CardFile } from './CardFile'
import React, { MouseEvent, useState } from 'react'

export default {
  title: 'Components/Molecules/CardFile',
  component: CardFile
} as ComponentMeta<typeof CardFile>

const Template: ComponentStory<typeof CardFile> = args => <CardFile {...args} />
export const CardFileImage = Template.bind({})
CardFileImage.args = {
  file_name: 'File Name',
  description: '88 Kb',
  type: 'image',
  wrapperStyle: {
    width: '200px',
    height: '200px'
  }
}

export const CardFilePDF = Template.bind({})
CardFilePDF.args = {
  file_name: 'examples.pdf',
  description: '88 Kb',
  type: 'pdf',
  wrapperStyle: {
    width: '200px',
    height: '200px'
  }
}
