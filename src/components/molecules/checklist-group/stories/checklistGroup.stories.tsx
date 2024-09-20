import type { Meta, StoryObj } from '@storybook/react'
import { ChecklistGroup } from '../components/ChecklistGroup'
import { ChecklistGroupProps } from '../types/checklistGroup.types'
import { ChecklistRequest } from '../../checklist-request'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ChecklistGroup> = {
  title: 'Components/Organism/ChecklistGroup',
  component: ChecklistGroup,
  argTypes: {
    disabled: {
      control: 'boolean'
    }
  },
  tags: ['autodocs']
}

export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: StoryObj<typeof ChecklistGroup> = (args: ChecklistGroupProps) => <ChecklistGroup {...args} />
Default.args = {
  title: 'Order Request Checklist',
  checklistRequests: [
    <ChecklistRequest
      title='Document/Label/Stiker'
      options={[
        { id: 'surat_jalan', label: 'Surat Jalan' },
        { id: 'coa', label: 'COA' },
        { id: 'msds', label: 'MSDS' },
        { id: 'packing_list', label: 'Packing List' },
        { id: 'surat_pernyataan_bermaterai', label: 'Surat Pernyataan Bermaterai' },
        { id: 'po', label: 'PO' },
        { id: 'titipan_dokumen', label: 'Titipan Dokumen' },
        { id: 'label_product', label: 'Label Product' },
        { id: 'hazzard_nfpa', label: 'Hazzard + NFPA' }
      ]}
      valueKey='id'
      labelKey='label'
      value={[
        { id: 'surat_jalan', label: 'Surat Jalan' },
        { id: 'surat_pernyataan_bermaterai', label: 'Surat Pernyataan Bermaterai' },
        { id: 'hazzard_nfpa', label: 'Hazzard + NFPA' }
      ]}
    />,
    <ChecklistRequest
      title='Packing'
      options={[
        { id: 'strapping', label: 'Strapping' },
        { id: 'wrapping', label: 'Wrapping' },
        { id: 'shipping_marks', label: 'Shipping Marks' },
        { id: 'hazzard_nfpa', label: 'Hazzard + NFPA' },
        { id: 'label_product', label: 'Label Product' },
        { id: 'msds', label: 'MSDS' },
        { id: 'pallet', label: 'Pallet' },
        { id: 'ibc_frame', label: 'IBC Frame' }
      ]}
      valueKey='id'
      labelKey='label'
      value={[
        { id: 'shipping_marks', label: 'Shipping Marks' },
        { id: 'msds', label: 'MSDS' }
      ]}
    />
  ],
  onChange: value => console.log(value),
  disabled: false
}
