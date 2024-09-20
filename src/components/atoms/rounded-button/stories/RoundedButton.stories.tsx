import type { Meta, StoryObj } from '@storybook/react';
import { RoundedButton } from '../components/RoundedButton';
import RoundedButtonProps from '../types/roundedButton.types';
import { Box } from '@mui/material';


const meta: Meta<RoundedButtonProps> = {
  title: 'Components/Atoms/RoundedButton',
  component: RoundedButton,
  tags: ['autodocs'],
  argTypes: {
    style: {
      control: {
        type: 'select',
        options: ['solid', 'outlined', 'plain'],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
    },
    loading: {
      control: {
        type: 'boolean',
      }
    },
    onClick: {
      type: 'function'
    },
    disabled: {
      type: 'boolean',
    }
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: 'solid',
    size: 'medium',
  },
};

export const Outlined: Story = {
  args: {
    style: 'outlined',
    size: 'medium',
  },
};

export const Plain: Story = {
  args: {
    style: 'plain',
    size: 'medium',
  },
};

export const Loading: Story = {
  args: {
    style: 'solid',
    size: 'medium',
    loading: true
  },
};

export const Disabled: Story = {
  args: {
    style: 'solid',
    size: 'medium',
    disabled: true
  }
}

export const Sizes: Story = {
  render: (args) => (
    <Box display="flex" gap={4}>
      <RoundedButton style='solid' size="small" />
      <RoundedButton style='solid' size="medium" />
      <RoundedButton style='solid' size="large" />
    </Box>
  ),
  args: {
    style: 'solid',
    size: 'medium',
  },
};
