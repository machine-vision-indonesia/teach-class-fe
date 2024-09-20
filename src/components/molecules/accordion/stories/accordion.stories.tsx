import type { Meta, StoryObj } from '@storybook/react'
import Accordion from '../components/Accordion'
import { PropsAccordion } from '../types/accordion.types'
import { Stack, IconButton } from '@mui/material'
import Icon from '@/@core/components/icon'

const meta: Meta<typeof Accordion> = {
  title: 'Components/Molecules/Accordion',
  component: Accordion,
  argTypes: {
    variant: {
      defaultValue: 'default',
      type: 'string',
      control: 'select',
      options: ['default', 'stripped']
    },
    bgColor: {
      defaultValue: 'white',
      control: 'color'
    },
    data: {
      required: true,
      defaultValue: [],
      description: `
      title   : string
      content : ReactNode | string
      bagde   : ReactNode (optional)
      image   : ReactNode (optional)
      buttons : ReactNode (optional)
      `
    },
    disabled: {
      defaultValue: false,
      control: 'boolean'
    },
    hover: {
      defaultValue: false,
      control: 'boolean'
    },
    strippedColor: {
      defaultValue: 'primary',
      type: 'string',
      control: 'select',
      options: ['primary', 'success', 'danger', 'warning']
    }
  }
}

const dummyData = Array(3)
  .fill({})
  .map((_, i) => ({ content: `Accordion Content ${i + 1}`, title: `Accordion Title ${i + 1}`, disabled: false }))

const dummyButtons = (
  <Stack direction='row' alignItems='center'>
    <IconButton sx={{ borderRadius: 0 }} color='primary'>
      <Icon icon='tabler:settings' />
    </IconButton>
    <IconButton sx={{ borderRadius: 0 }} color='error'>
      <Icon icon='tabler:trash' />
    </IconButton>
  </Stack>
)

export default meta

type Story = StoryObj<PropsAccordion>

export const Default: Story = {
  args: {
    variant: 'default',
    data: dummyData,
    disabled: false,
    hover: true,
    bgColor: '#FFF',
    strippedColor: 'primary'
  }
}
export const Stripped: Story = {
  args: {
    variant: 'stripped',
    data: dummyData,
    disabled: false,
    hover: true,
    bgColor: '#FFF',
    strippedColor: 'primary'
  }
}

export const WithTitleButton: Story = {
  args: {
    variant: 'withButton',
    data: dummyData?.map(v => ({ ...v, buttons: dummyButtons })),
    disabled: false,
    hover: true,
    bgColor: '#FFF'
  }
}

export const WithTitleAditionalButton: Story = {
  args: {
    variant: 'withButtonAdditional',
    data: dummyData?.map(v => ({ ...v, additional: 'tambahan aditional', buttons: dummyButtons })),
    disabled: false,
    hover: true,
    bgColor: '#FFF'
  }
}
