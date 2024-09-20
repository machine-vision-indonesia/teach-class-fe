import { Button } from '@/components/atoms/button'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import ModalRemark from '../components/ModalRemark'
import { IModalRemark } from '../types/modalRemark.types'

const meta: Meta<typeof ModalRemark> = {
  title: 'Components/Molecules/ModalRemark',
  component: ModalRemark,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta

export const Default: StoryObj<typeof ModalRemark> = (args: IModalRemark) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button variant='contained' content='textOnly' text='Open Modal' onClick={() => setIsOpen(true)} size='medium' />
      <ModalRemark
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={(remark: string) => {
          console.log('remark:', remark)
          setIsOpen(false)
        }}
      />
    </>
  )
}

Default.args = {
  modalTitle: "Remarks Title",
  modalDescription: "Remarks Description Remarks Description Remarks Description",
  confirmationStatus: 'danger'
}
