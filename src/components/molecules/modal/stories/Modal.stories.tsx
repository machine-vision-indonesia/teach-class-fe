import React, { useState } from 'react'
import { StoryFn, Meta, type StoryObj } from '@storybook/react'

import { Box, Stack, Typography } from '@mui/material'

import { Select, Table, Textarea, Button } from 'src/components/atoms'
import { Modal } from '../components/Modal'

const ModalComponents = (props: any) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button content='textOnly' variant='solid' onClick={() => setOpen(true)} text='Open Modal' />
      <Modal {...props} isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default {
  title: 'Components/Molecules/Modal',
  argTypes: {
    color: {
      defaultValue: 'primary',
      options: ['primary', 'secondary', 'warning', 'danger', 'success', 'info'],
      control: { type: 'select' }
    }
  },
  component: Modal
} as Meta<typeof Modal>

const Template: StoryFn<typeof Modal> = args => <ModalComponents {...args} />

export const Default = Template.bind({})
Default.args = {
  type: 'default',
  title: 'This is Modal',
  description: 'This is description of modal',
  position: 'left',
  closeable: true,
  positiveLabel: 'Submit',
  negativeLabel: 'Cancel',
  color: 'primary',
  maxWidth: 'xs',
  size: 'medium',
  positionActionButton: 'right'
}

Default.parameters = {
  docs: {
    source: {
      code: `
import { Button } from 'src/@core/custom-components/button/Button'
import { Modal } from 'src/@core/custom-components/modal/Modal'

const ModalComponents = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
        <Button content='textOnly' variant='solid' onClick={() => setOpen(true)} text='Open Modal' />
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title='${Default.args.title}'
        description='${Default.args.description}'
        position='${Default.args.position}'
        closeable={${Default.args.closeable}}
        positiveLabel='${Default.args.positiveLabel}'
        negativeLabel='${Default.args.negativeLabel}'
        color='${Default.args.color}'
        maxWidth='${Default.args.maxWidth}'
      />
    </>
  );
};
    `
    }
  }
}

type Story = StoryObj<typeof Modal>

const ModalImport = () => {
  const [open, setOpen] = useState(false)

  const data = [
    { code: '001', vendor: 'vendor 1', email: 'email@haha.com', phone: '08123456789', address: 'address 1' },
    { code: '002', vendor: 'vendor 2', email: 'email@haha.com', phone: '08123456789', address: 'address 2' },
    { code: '003', vendor: 'vendor 3', email: 'email@haha.com', phone: '08123456789', address: 'address 3' },
    { code: '004', vendor: 'vendor 4', email: 'email@haha.com', phone: '08123456789', address: 'address 4' },
    { code: '004', vendor: 'vendor 4', email: 'email@haha.com', phone: '08123456789', address: 'address 4' }
  ]

  return (
    <>
      <Button content='textOnly' variant='solid' onClick={() => setOpen(true)} text='Open Modal' />
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        color='warning'
        title='Are you sure to proceed the import file?'
        description='check the table before you proceed'
        position='left'
        positiveLabel='Import'
        maxWidth='md'
        closeable={false}
      >
        <Stack gap={2} bgcolor='#E4E4E4' p={2} borderRadius={2}>
          <Typography variant='labelMd' fontWeight='bold'>
            The preview of partial table to be proceed
          </Typography>
          <Table
            headers={[
              {
                key: 'code',
                label: 'CODE'
              },
              {
                key: 'vendor',
                label: 'VENDOR'
              },
              {
                key: 'email',
                label: 'EMAIL'
              },
              {
                key: 'phone',
                label: 'PHONE'
              },
              {
                key: 'address',
                label: 'ADDRESS'
              }
            ]}
            data={data}
          />
        </Stack>
      </Modal>
    </>
  )
}

export const ModalWithImportContent: Story = {
  parameters: {
    docs: {
      source: {
        code: `
import { Button } from 'src/@core/custom-components/button/Button'
import { Modal } from 'src/@core/custom-components/modal/Modal'

export default function Page() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button content='textOnly' variant='solid' onClick={() => setOpen(true)} text='Open Modal' />
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        color='warning'
        title='Are you sure to proceed the import file?'
        description='check the table before you proceed'
        position='left'
        icon='confirm'
        positiveLabel='Import'
        maxWidth='md'
        closeable={false}
      >
        <Box bgcolor='#E4E4E4' p={2} borderRadius={2}>
          <Table
            headers={[
              {
                key: 'code',
                label: 'CODE'
              },
              {
                key: 'vendor',
                label: 'VENDOR'
              },
              {
                key: 'email',
                label: 'EMAIL'
              },
              {
                key: 'phone',
                label: 'PHONE'
              },
              {
                key: 'address',
                label: 'ADDRESS'
              }
            ]}
            data={data}
          />
        </Box>
      </Modal>
    </>
  )
}
        `,
        language: 'tsx'
      }
    }
  },
  render: () => <ModalImport />
}

const ModalDelete = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button content='textOnly' variant='solid' onClick={() => setOpen(true)} text='Open Modal' />
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        color='error'
        title='Are you sure to delete [sKU Name] all related data?'
        position='left'
        positiveLabel='Yes, delete it'
        closeable={false}
      >
        <Stack bgcolor='#E4E4E4' p={2} borderRadius={2} height={300}>
          <Typography variant='labelMd' fontWeight='bold'>
            The related data are
          </Typography>
          <Typography variant='labelMd'>[R]</Typography>
        </Stack>
      </Modal>
    </>
  )
}

export const ModalWithDeleteContent: Story = {
  parameters: {
    docs: {
      source: {
        code: `
import { Button } from 'src/@core/custom-components/button/Button'
import { Modal } from 'src/@core/custom-components/modal/Modal'

export default function Page() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button content='textOnly' variant='solid' onClick={() => setOpen(true)} text='Open Modal' />
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        color='error'
        title='Are you sure to delete [sKU Name] all related data?'
        position='left'
        positiveLabel='Yes, delete it'
        closeable={false}
      >
        <Stack bgcolor='#E4E4E4' p={2} borderRadius={2} height={300}>
          <Typography variant='labelMd' fontWeight='bold'>
            The related data are
          </Typography>
          <Typography variant='labelMd'>[R]</Typography>
        </Stack>
      </Modal>
    </>
  )
}
        `,
        language: 'tsx'
      }
    }
  },
  render: () => <ModalDelete />
}

const ModalSelected = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button content='textOnly' variant='solid' onClick={() => setOpen(true)} text='Open Modal' />
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        color='warning'
        title='Are you sure to duplicate from [name product] you have choose?'
        description='[name product] has 10 [component], 10 part, 10 sub part'
        position='left'
        positiveLabel='Duplicate'
        closeable
      >
        <Stack>
          <Typography variant='labelMd' color='secondary'>
            Choose product to create the duplicate
          </Typography>
          <Typography variant='labelMd' mt={1}>
            Duplicate Form <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Select
            data={[
              { id: '12', text: 'Product 1' },
              { id: '13', text: 'Product 2' }
            ]}
            labelKey='text'
            valueKey='id'
            selected={[{ id: '12', text: 'Product 1' }]}
          />
        </Stack>
      </Modal>
    </>
  )
}

export const ModalWithSelectedContent: Story = {
  parameters: {
    docs: {
      source: {
        code: `
import { Button } from 'src/@core/custom-components/button/Button'
import { Modal } from 'src/@core/custom-components/modal/Modal'

export default function Page() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button content='textOnly' variant='solid' onClick={() => setOpen(true)} text='Open Modal' />
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        color='warning'
        title='Are you sure to duplicate from [name product] you have choose?'
        description='[name product] has 10 [component], 10 part, 10 sub part'
        position='left'
        positiveLabel='Duplicate'
        closeable
      >
        <Stack>
          <Typography variant='labelMd' color='secondary'>
            Choose product to create the duplicate
          </Typography>
          <Typography variant='labelMd' mt={1}>
            Duplicate Form <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Select
            data={[
              { id: '12', text: 'Product 1' },
              { id: '13', text: 'Product 2' }
            ]}
            labelKey='text'
            valueKey='id'
            selected={[{ id: '12', text: 'Product 1' }]}
          />
        </Stack>
      </Modal>
    </>
  )
}
        `,
        language: 'tsx'
      }
    }
  },
  render: () => <ModalSelected />
}

const ModalLeave = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button content='textOnly' variant='solid' onClick={() => setOpen(true)} text='Open Modal' />
      <Modal
        type='confirmation'
        status='warning'
        isOpen={open}
        onClose={() => setOpen(false)}
        color='error'
        title='Are you sure to leave the page?'
        description='You want be able to revert this!'
        position='left'
        positiveLabel='Leave'
        closeable
      />
    </>
  )
}

export const ModalConfirmLeave: Story = {
  parameters: {
    docs: {
      source: {
        code: `
import { Button } from 'src/@core/custom-components/button/Button'
import { Modal } from 'src/@core/custom-components/modal/Modal'

export default function Page() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button content='textOnly' variant='solid' onClick={() => setOpen(true)} text='Open Modal' />
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        color='error'
        title='Are you sure to leave the page?'
        description='You want be able to revert this!'
        position='center'
        positiveLabel='Leave'
        icon='leave'
        closeable
      />
    </>
  )
}
        `,
        language: 'tsx'
      }
    }
  },
  render: () => <ModalLeave />
}

const ModalCreate = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button content='textOnly' variant='solid' onClick={() => setOpen(true)} text='Open Modal' />
      <Modal
        closeable={false}
        isOpen={open}
        onClose={() => setOpen(false)}
        color='warning'
        title='Are you sure to create clasification?'
        description='You want be able to revert this!'
        position='center'
        positiveLabel='Yes'
      />
    </>
  )
}

export const ModalConfirmCreate: Story = {
  parameters: {
    docs: {
      source: {
        code: `
import { Button } from 'src/@core/custom-components/button/Button'
import { Modal } from 'src/@core/custom-components/modal/Modal'

export default function Page() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button content='textOnly' variant='solid' onClick={() => setOpen(true)} text='Open Modal' />
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        color='warning'
        title='Are you sure to create clasification?'
        description='You want be able to revert this!'
        position='center'
        positiveLabel='Yes'
        icon='warning'
        closeable={false}
      />
    </>
  )
}
        `,
        language: 'tsx'
      }
    }
  },
  render: () => <ModalCreate />
}

const ModalInput = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button content='textOnly' variant='solid' onClick={() => setOpen(true)} text='Open Modal' />
      <Modal isOpen={open} onClose={() => setOpen(false)} color='primary' title='Remark' position='center' closeable>
        <Stack>
          <Typography variant='labelMd' fontWeight='bold'>
            Remark
          </Typography>
          <Textarea fullWidth placeholder='Input Remark' />
        </Stack>
      </Modal>
    </>
  )
}

export const ModalInputSection: Story = {
  parameters: {
    docs: {
      source: {
        code: `
import { Button } from 'src/@core/custom-components/button/Button'
import { Modal } from 'src/@core/custom-components/modal/Modal'

export default function Page() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button content='textOnly' variant='solid' onClick={() => setOpen(true)} text='Open Modal' />
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        color='primary'
        title='Remark'
        position='center'
        closeable
      >
        <Textarea fullwidth placeholder='Input Remark' />
      </Modal
    </>
  )
}
        `,
        language: 'tsx'
      }
    }
  },
  render: () => <ModalInput />
}

const ModalData = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button content='textOnly' variant='solid' onClick={() => setOpen(true)} text='Open Modal' />
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        color='primary'
        title='Please scan your ID card to verify gate pass'
        description='your name and ID will be racapped for verified'
        position='left'
        closeable
      >
        <Box display='flex' justifyContent='end'>
          <Stack width={350} gap={1} p={1} border='1px solid #eaeaea' borderRadius={2}>
            <Typography variant='labelMd' fontWeight='bold'>
              Security Information
            </Typography>
            <Typography variant='labelMd'>Security Name: Jhon Doe</Typography>
            <Typography variant='labelMd'>ID Security: 63524765</Typography>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}

export const ModalWithData: Story = {
  parameters: {
    docs: {
      source: {
        code: `
import { Button } from 'src/@core/custom-components/button/Button'
import { Modal } from 'src/@core/custom-components/modal/Modal'

export default function Page() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button content='textOnly' variant='solid' onClick={() => setOpen(true)} text='Open Modal' />
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        color='primary'
        title='Please scan your ID card to verify gate pass'
        description='your name and ID will be racapped for verified'
        position='left'
        icon='scan'
        closeable
      >
        <Box display='flex' justifyContent='end'>
          <Stack width={350} gap={1} p={1} border='1px solid #eaeaea' borderRadius={2}>
            <Typography variant='labelMd' fontWeight='bold'>
              Security Information
            </Typography>
            <Typography variant='labelMd'>Security Name: Jhon Doe</Typography>
            <Typography variant='labelMd'>ID Security: 63524765</Typography>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}
        `,
        language: 'tsx'
      }
    }
  },
  render: () => <ModalData />
}
