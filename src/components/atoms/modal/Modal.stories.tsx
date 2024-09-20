import { type Meta, type StoryObj } from '@storybook/react'
import { Button } from '../button'
import { Modal } from './Modal'
import { useState } from 'react'

const DefaultModal = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant='contained' onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        This is modal
      </Modal>
    </>
  )
}

const meta: Meta<typeof Modal> = {
  title: 'Components/Atoms/Modal',
  component: Modal,
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
      <Button variant='contained' onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        This is modal
      </Modal>
    </>
  )
}
        `,
        language: 'tsx'
      }
    }
  },
  render: () => <DefaultModal />
}

export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
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
      <Button variant='contained' onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        This is modal
      </Modal>
    </>
  )
}
        `,
        language: 'tsx'
      }
    }
  },
  render: () => <DefaultModal />
}

const DefaultWithActionModal = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant='contained' onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} variant='default-button'>
        This is modal
      </Modal>
    </>
  )
}

export const DefaultWithAction: Story = {
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
      <Button variant='contained' onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} variant='default-button'>
        This is modal
      </Modal>
    </>
  )
}
        `,
        language: 'tsx'
      }
    }
  },
  render: () => <DefaultWithActionModal />
}

const SuccessModal = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant='contained' onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} variant='success'>
        This is modal
      </Modal>
    </>
  )
}

export const Success: Story = {
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
      <Button variant='contained' onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} variant='success'>
        This is modal
      </Modal>
    </>
  )
}
        `,
        language: 'tsx'
      }
    }
  },
  render: () => <SuccessModal />
}

const WarningModal = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant='contained' onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} variant='warning'>
        This is modal
      </Modal>
    </>
  )
}

export const Warning: Story = {
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
      <Button variant='contained' onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} variant='warning'>
        This is modal
      </Modal>
    </>
  )
}
        `,
        language: 'tsx'
      }
    }
  },
  render: () => <WarningModal />
}

const DangerModal = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant='contained' onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} variant='danger'>
        This is modal
      </Modal>
    </>
  )
}

export const Danger: Story = {
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
      <Button variant='contained' onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} variant='danger'>
        This is modal
      </Modal>
    </>
  )
}
        `,
        language: 'tsx'
      }
    }
  },
  render: () => <DangerModal />
}
