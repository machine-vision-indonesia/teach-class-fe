import { Meta, StoryObj } from '@storybook/react'

import { Alert } from '../components/Alert'
import { Button, useTheme } from '@mui/material'
import { Icon } from '@iconify/react'

const meta = {
  title: 'Components/Molecules/Alert',
  component: Alert,
  argTypes: {
    content: { type: 'string' },
    size: {
      options: ['small', 'large'],
      control: { type: 'radio' }
    },
    variant: {
      options: ['primary', 'danger', 'warning', 'success'],
      control: { type: 'radio' }
    }
  }
} satisfies Meta<typeof Alert>

export default meta

type Story = StoryObj<typeof meta>

export const WithoutButton: Story = {
  args: {
    title: 'This Title',
    size: 'small',
    content:
      'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet'
  }
}

export const WithButton: Story = {
  args: {
    title: 'This Title',
    size: 'small',
    variant: 'primary',
    content:
      'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet'
  },
  render: args => {
    const theme = useTheme()
    return (
      <Alert {...args}>
        <Button
          variant='contained'
          sx={{
            backgroundColor: theme.colorToken.background[args.variant ?? 'primary'].normal,
            '&:hover': {
              backgroundColor: theme.colorToken.background[args.variant ?? 'primary'].hover
            }
          }}
          size={args.size == 'small' ? 'small' : 'medium'}
          startIcon={<Icon icon={'tabler:plus'} fontSize='16px' />}
        >
          Label
        </Button>
      </Alert>
    )
  }
}
