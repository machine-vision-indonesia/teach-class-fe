import type { Meta, StoryObj } from '@storybook/react'
import { DropdownAsyncMultiple } from './DropdownAsyncMultiple'
import { GetTableUsers } from './GetUser.service'
import { useState } from 'react'

const meta: Meta<typeof DropdownAsyncMultiple> = {
  title: 'Components/Atoms/DropdownAsyncMultiple',
  component: DropdownAsyncMultiple,
  argTypes: {
    valueKey: {
      control: 'text'
    },
    valueLabel: {
      control: 'text'
    },
    placeholder: {
      control: 'text'
    },
    valueDropdown: {
      control: 'object'
    }
  },
  args: {
    valueKey: 'id',
    valueLabel: 'email',
    placeholder: 'Select users',
    paramFilter: {},
    valueDropdown: [],
    onChange: () => {}
  }
}

export default meta

type Story = StoryObj<typeof DropdownAsyncMultiple>

const DropdownWithHooks = () => {
  const [value, setValue] = useState([])

  return (
    <DropdownAsyncMultiple
      valueKey={'id'}
      valueLabel={'email'}
      placeholder={'Select users'}
      valueDropdown={value}
      dataFetchService={GetTableUsers}
      onChange={setValue}
    />
  )
}

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `
import { useState } from 'react'
import { GetTableUsers } from './GetUser.service'

export default function MyComponent() {
    const [value, setValue] = useState([])

    return (
        <DropdownAsyncMultiple
            valueKey={'id'}
            valueLabel={'email'}
            placeholder={'Select users'}
            valueDropdown={value}
            dataFetchService={GetTableUsers}
            onChange={setValue}
        />
    )
}`,
        language: 'tsx'
      }
    }
  },
  render: () => <DropdownWithHooks />
}
