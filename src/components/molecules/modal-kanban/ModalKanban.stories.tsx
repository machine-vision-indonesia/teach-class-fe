import { ComponentStory, ComponentMeta, type StoryObj } from '@storybook/react'
import { ModalKanban } from './ModalKanban'
import { useState } from 'react'
import { Button } from '@mui/material'

const ModalComponents = (props: any) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant='contained' onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <ModalKanban {...props} isOpen={open} onClose={() => setOpen(false)} textBanner='A - 108' />
    </>
  )
}

export default {
  title: 'Components/Molecules/ModalKanban',
  argTypes: {
    color: {
      defaultValue: 'success',
      options: ['primary', 'secondary', 'warning', 'error', 'success', 'info'],
      control: { type: 'select' }
    },
    textBanner: {
      defaultValue: 'A - 108',
      control: { type: 'text' }
    },
    textHeader: {
      defaultValue: [
        { title: 'PO - ALVA 3', description: 'No Production Order' },
        { title: 'Alva', description: 'Product Family' },
        { title: 'MAIN ASSEMBLY', description: 'Station' }
      ],
      control: { type: 'object' }
    },
    mainContent: {
      defaultValue: 'Main content here',
      control: { type: 'function' }
    },
    isOpen: {
      defaultValue: false,
      control: { type: 'boolean' }
    },
    isHeader: {
      defaultValue: false,
      control: { type: 'boolean' }
    },
    isFooter: {
      defaultValue: false,
      control: { type: 'boolean' }
    },
    isActionButtons: {
      defaultValue: false,
      control: { type: 'boolean' }
    },
    onClose: {
      defaultValue: () => {},
      control: { type: 'function' }
    }
  },
  component: ModalKanban
} as ComponentMeta<typeof ModalKanban>

const Template: ComponentStory<typeof ModalKanban> = args => <ModalComponents {...args} />

export const Default = Template.bind({})
Default.args = {
  color: 'success',
  footer: <div>Footer</div>,
  mainContent: <div>Main content here</div>
}

Default.parameters = {
  docs: {
    source: {
      code: `
import { Button } from 'src/@core/custom-components/button/Button'
import { ModalKanban } from './ModalKanban'

const ModalComponents = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant='contained' onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        color='success'
        textBanner='A - 108'
        isHeader={false}
        isFooter={false}
        isActionButtons={false}
        mainContent='Main content here'
      />
    </>
  );
};
    `
    }
  }
}

type Story = StoryObj<typeof ModalKanban>

const ModalTypeAComponent = (props: any) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant='contained' onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <ModalKanban
        {...props}
        isOpen={open}
        onClose={() => setOpen(false)}
        isHeader={true}
        isFooter={true}
        textHeader={[
          { title: 'PO - ALVA 3', description: 'No Production Order' },
          { title: 'Alva', description: 'Product Family' },
          { title: 'MAIN ASSEMBLY', description: 'Station' }
        ]}
        textBanner='Supernova Black'
        color='warning'
        mainContent={'Main content here'}
      />
    </>
  )
}

export const ModalTypeA: Story = {
  parameters: {
    docs: {
      source: {
        code: `
import { Button } from 'src/@core/custom-components/button/Button'
import { ModalKanban } from './ModalKanban'

const ModalComponents = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant='contained' onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <ModalKanban
        {...props}
        isOpen={open}
        onClose={() => setOpen(false)}
        isHeader={true}
        isFooter={true}
        textHeader={[
          { title: 'PO - ALVA 3', description: 'No Production Order' },
          { title: 'Alva', description: 'Product Family' },
          { title: 'MAIN ASSEMBLY', description: 'Station' }
        ]}
        textBanner='Supernova Black'
        color='warning'
        mainContent={'Main content here'}
      />
    </>
  );
};
        `,
        language: 'tsx'
      }
    }
  },
  render: () => <ModalTypeAComponent />
}

const ModalTypeBComponent = (props: any) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant='contained' onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <ModalKanban
        {...props}
        isOpen={open}
        onClose={() => setOpen(false)}
        isHeader={true}
        isFooter={true}
        isActionButtons={true}
        textHeader={[
          { title: 'PO - ALVA 3', description: 'No Production Order' },
          { title: 'Alva', description: 'Product Family' },
          { title: 'MAIN ASSEMBLY', description: 'Station' }
        ]}
        textBanner='Supernova Black'
        color='warning'
        mainContent={'Main content here'}
      />
    </>
  )
}

export const ModalTypeB: Story = {
  parameters: {
    docs: {
      source: {
        code: `
import { Button } from 'src/@core/custom-components/button/Button'
import { ModalKanban } from './ModalKanban'

const ModalComponents = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant='contained' onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <ModalKanban
        {...props}
        isOpen={open}
        onClose={() => setOpen(false)}
        isHeader={true}
        isFooter={true}
        isActionButtons={true}
        textHeader={[
          { title: 'PO - ALVA 3', description: 'No Production Order' },
          { title: 'Alva', description: 'Product Family' },
          { title: 'MAIN ASSEMBLY', description: 'Station' }
        ]}
        textBanner='Supernova Black'
        color='warning'
        mainContent={'Main content here'}
      />
    </>
  );
};
        `,
        language: 'tsx'
      }
    }
  },
  render: () => <ModalTypeBComponent />
}

const ModalTypeCComponent = (props: any) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant='contained' onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <ModalKanban
        {...props}
        isOpen={open}
        onClose={() => setOpen(false)}
        isHeader={true}
        isFooter={false}
        isActionButtons={true}
        textHeader={[
          { title: 'PO - ALVA 3', description: 'No Production Order' },
          { title: 'Alva', description: 'Product Family' },
          { title: 'MAIN ASSEMBLY', description: 'Station' }
        ]}
        textBanner='Supernova Black'
        color='warning'
        mainContent={'Main content here'}
      />
    </>
  )
}

export const ModalTypeC: Story = {
  parameters: {
    docs: {
      source: {
        code: `
import { Button } from 'src/@core/custom-components/button/Button'
import { ModalKanban } from './ModalKanban'

const ModalComponents = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant='contained' onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <ModalKanban
        {...props}
        isOpen={open}
        onClose={() => setOpen(false)}
        isHeader={true}
        isFooter={false}
        isActionButtons={true}
        textHeader={[
          { title: 'PO - ALVA 3', description: 'No Production Order' },
          { title: 'Alva', description: 'Product Family' },
          { title: 'MAIN ASSEMBLY', description: 'Station' }
        ]}
        textBanner='Supernova Black'
        color='warning'
        mainContent={'Main content here'}
      />
    </>
  );
};
        `,
        language: 'tsx'
      }
    }
  },
  render: () => <ModalTypeCComponent />
}
