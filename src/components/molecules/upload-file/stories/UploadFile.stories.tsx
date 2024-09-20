import { type Meta, type StoryObj } from '@storybook/react'
import { UploadFile } from '../components/UploadFile'

const Template: React.FC<any> = args => <UploadFile {...args} />
export const DefaultuploadFile: React.FC<any> = args => <Template {...args} />
DefaultuploadFile.defaultProps = {
  variant: 'multiple',
  preview: false,
  selectOptions: ['option1', 'option2']
}

const meta: Meta<typeof UploadFile> = {
  title: 'Components/Organism/UploadFile',
  args: {
    variant: 'multiple',
    preview: false,
    helperText: 'Additional text information',
  },
  component: UploadFile,
  parameters: {
    docs: {
      source: {
        code: `
import { UploadFile } from '../components/UploadFile'


export default function Page() {
  return (
    <>
      <UploadFile variant='multiple' />
    </>
  )
}
        `,
        language: 'tsx'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof UploadFile>

export const UploadFileDragger: Story = {
  args: {
    type: 'dragndrop'
  },
  parameters: {
    docs: {
      source: {
        code: `
import { UploadFile } from '../components/UploadFile'

export default function Page() {
  return (
    <>
      <UploadFile style='dragger' />
    </>
  )
}
        `,
        language: 'tsx'
      }
    }
  }
}
