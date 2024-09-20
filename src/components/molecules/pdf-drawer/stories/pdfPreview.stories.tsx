import type { Meta, StoryObj } from '@storybook/react'
import { PDFDrawer } from '../components/PdfDrawer'
import IPdfPreview from '../types/mainAnnotation.types'

const meta: Meta<typeof PDFDrawer> = {
  title: 'Components/Organism/PDFDrawer',
  component: PDFDrawer,
  argTypes: {
    url: {
      control: 'text'
    },
    attachmentId: {
      control: 'text'
    },
    editable: {
      control: 'boolean'
    },
    downloadable: {
      control: 'boolean'
    }
  }
}

export default meta

export const Default: StoryObj<typeof PDFDrawer> = (args: IPdfPreview) => <PDFDrawer {...args} />
Default.args = {
  url: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
  attachmentId: '',
  editable: true,
  downloadable: true
}
Default.parameters = {
  layout: 'padded'
}
