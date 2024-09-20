import type { Meta, StoryObj } from '@storybook/react'
import { PropsPagination } from '../types/pagination.type'
import { Pagination } from '../components/Pagination'
import { PAGINATION_VARIANT, PAGINATION_SIZE } from '../constants/pagination.constant'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Molecules/Pagination',
  component: Pagination,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(PAGINATION_SIZE),
      defaultValue: 'small'
    },
    shape: {
      control: 'select',
      options: ['square', 'rounded'],
      defaultValue: 'square'
    }
  }
}

export default meta

type Story = StoryObj<PropsPagination>

export const Square: Story = {
  args: {
    page: 1,
    limit: 5,
    count: 10,
    size: 'small',
    shape: 'square',
    width: '90dvh'
  }
}

export const Rounded: Story = {
  args: {
    page: 1,
    limit: 5,
    count: 10,
    size: 'small',
    shape: 'rounded',
    width: '90dvh'
  }
}
