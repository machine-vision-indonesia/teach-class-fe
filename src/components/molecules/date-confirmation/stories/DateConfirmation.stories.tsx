import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { DateConfirmation } from '../components/DateConfirmation'
import { ValuesState } from '../types/dateSection.types'

const meta: Meta<typeof DateConfirmation> = {
  title: 'Components/Organism/DateConfirmation',
  component: DateConfirmation
}

export default meta

type Story = StoryObj<typeof DateConfirmation>

const Template: Story = {
  args: {
    sectionTitles: ['Supply Chain', 'Production', 'Delivery'],
    initialValues: {
      supplyChain: { date: null, selectedOption: '' },
      production: { date: null, selectedOption: '' },
      delivery: { date: null, selectedOption: '' }
    },
    disabledSections: {
      supplyChain: false,
      production: true,
      delivery: true
    },
    onChange: (updatedValues: ValuesState) => {
      console.log('Values updated:', updatedValues)
    }
  }
}

export const Default: Story = {
  ...Template
}

export const CustomSections: Story = {
  ...Template,
  args: {
    sectionTitles: ['Deliverys', 'Chain Suplly', 'Productions'],
    initialValues: {
      deliverys: { date: new Date('2024-08-24'), selectedOption: 'option1' },
      chainSupply: { date: null, selectedOption: '' },
      productions: { date: null, selectedOption: '' }
    },
    disabledSections: {
      deliverys: false,
      chainSupply: true,
      productions: true
    }
  }
}
