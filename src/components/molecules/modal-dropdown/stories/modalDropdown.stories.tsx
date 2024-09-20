import type { Meta, StoryObj } from '@storybook/react'
import ModalDropdown from '../components/ModalDropdown'
import { useState } from 'react'
import { Button } from '@/components/atoms/button'
import { IModalDropdown } from '../types/modalDropdown.types'

const meta: Meta<typeof ModalDropdown> = {
  title: 'Components/Molecules/ModalDropdown',
  component: ModalDropdown,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta

export const Default: StoryObj<typeof ModalDropdown> = (args: IModalDropdown) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button variant='contained' content='textOnly' text='Open Modal' onClick={() => setIsOpen(true)} size='medium' />
      <ModalDropdown
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={(item: string) => {
          console.log('selected item:', item)
          setIsOpen(false)
        }}
      />
    </>
  )
}

Default.args = {
  modalTitle: 'Which item would you like to choose?',
  modalInstruction: 'Please select the item below',
  modalFalseLabel: 'Cancel',
  modalTrueLabel: 'Submit',
  dropdownList: [
    {
      id: 1,
      label: 'item 1'
    },
    {
      id: 2,
      label: 'item 2'
    },
    {
      id: 3,
      label: 'item 3'
    }
  ],
  dropdownKey: 'id',
  dropdownLabel: 'label'
}
