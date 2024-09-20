import type { Meta, StoryObj } from '@storybook/react'
import { Filter } from '../components/Filter'
import { IFilter } from '../types/filter.types'
import { DataViewControllerType, FilterType } from '../constants'
import { fetchListData } from '../services/fetchListData.services'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Filter> = {
  title: 'Components/Organism/Filter',
  component: Filter,
  tags: ['autodocs']
}

export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Inline: StoryObj<typeof Filter> = (args: IFilter) => <Filter {...args} />
Inline.args = {
  type: 'inline',
  resultController: [
    {
      key: 'filename',
      name: 'Search File...',
      type: FilterType.SEARCH
    },
    {
      key: 'forwarder',
      name: 'Search Forwarder...',
      type: FilterType.SEARCH
    },
    {
      key: 'document_date',
      name: 'Document Date',
      type: FilterType.DATE
    },
    {
      key: 'created_at',
      name: 'Document Created At',
      type: FilterType.DATE_TIME
    },
    {
      key: 'document_period',
      name: 'Document Period',
      type: FilterType.DATE_RANGE
    },
    {
      key: 'factory_area',
      name: 'Factory Area',
      type: FilterType.CHECKBOX,
      options: [
        { id: 'mojokerto', label: 'Mojokerto' },
        { id: 'karawang', label: 'Karawang' },
        { id: 'solo', label: 'Solo' },
        { id: 'malang', label: 'Malang' }
      ],
      valueKey: 'id',
      labelKey: 'label'
    },
    {
      key: 'document_status',
      name: 'Document Status',
      type: FilterType.SELECT,
      options: [
        { id: 'active', text: 'Active' },
        { id: 'inactive', text: 'Inactive' },
        { id: 'deleted', text: 'Deleted' },
        { id: 'archived', text: 'Archived' }
      ],
      valueKey: 'id',
      labelKey: 'text'
    },
    {
      key: 'approval_status',
      name: 'Approval Status',
      type: FilterType.MULTI_SELECT,
      dataFetchService: fetchListData,
      valueKey: 'id',
      labelKey: 'title'
    },
    {
      key: 'approval_time',
      name: 'Approval Time',
      type: FilterType.TIME
    },
    {
      key: 'document_release',
      name: 'Document Release',
      type: FilterType.YEAR
    },
    {
      key: 'document_month',
      name: 'Document Month',
      type: FilterType.MONTH_YEAR
    }
  ],
  dataViewController: [
    {
      key: 'viewMode',
      name: 'View Mode',
      type: DataViewControllerType.BUTTON_GROUP,
      options: [
        {
          key: 'list',
          label: 'List',
          icon: 'tabler:layout-list'
        },
        {
          key: 'grid',
          label: 'Grid',
          icon: 'tabler:layout-grid'
        }
      ]
    },
    {
      key: 'groupBy',
      name: 'Group By',
      type: DataViewControllerType.SELECT,
      options: [
        { id: 'created_at', label: 'Created At' },
        { id: 'type', label: 'Type' },
        { id: 'status', label: 'Status' }
      ],
      valueKey: 'id',
      labelKey: 'label'
    },
    {
      key: 'sortBy',
      name: 'Sort By',
      type: DataViewControllerType.SELECT,
      options: [
        { id: 'name', label: 'Name' },
        { id: 'status', label: 'Status' },
        { id: 'created_at', label: 'Created At' },
        { id: 'type', label: 'Type' }
      ],
      valueKey: 'id',
      labelKey: 'label'
    }
  ]
}
