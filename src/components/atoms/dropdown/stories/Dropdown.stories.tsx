import { Meta, StoryObj } from '@storybook/react'
import { Dropdown } from '../components/Dropdown'
import ComponentDropdownProps from '../types/Dropdown.types'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Dropdown> = {
  title: 'Components/Atoms/Dropdown',
  component: Dropdown
}
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
type Story = StoryObj<ComponentDropdownProps>

const defaultProps: Partial<ComponentDropdownProps> = {
  label: 'Contoh Dropdown',
  menu: [
    { content: ' item 1' },
    { content: ' item 2' },
    { content: ' item 3' },
    { content: ' item 4' },
    { content: ' item 5' }
  ]
}

// Default story
export const Default: Story = {
  args: defaultProps
}

export const withIconInMenu: Story = {
  args: {
    ...defaultProps,
    label: 'With Icon',
    icon: 'basil:menu-outline'
  }
}

export const iconOnlyInMenu: Story = {
  args: {
    ...defaultProps,
    label: '',
    icon: 'basil:menu-outline'
  }
}

export const withIconInOptions: Story = {
  args: {
    ...defaultProps,
    label: 'With Icon in option',
    menu: [
      { content: ' item 1', icon: 'basil:menu-outline' },
      { content: ' item 2', icon: 'basil:menu-outline' },
      { content: ' item 3', icon: 'basil:menu-outline' },
      { content: ' item 4', icon: 'material-symbols-light:restaurant-menu' },
      { content: ' item 5', icon: 'material-symbols-light:restaurant-menu' }
    ]
  }
}
