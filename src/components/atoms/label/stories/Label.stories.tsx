import { Avatar } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '../components/Label';
import LabelProps from '../types/Label.types';

const meta: Meta<typeof Label> = {
  title: 'Components/Atoms/Label',
  component: Label,
  argTypes: {
    children: {
      control: {
        type: 'text'
      }
    },
    size: {
      control: {
        type:'select',
        options: ['small','medium', 'large']
      }
    },
    weight: {
      control: {
        type:'select',
        options: ['bolder', 'normal']
      }
    },
    isRequired: {
      control: {
        type: 'boolean'
      }
    }
  }
};
export default meta;

type Story = StoryObj<LabelProps>;

const defaultProps: Partial<LabelProps> = {
  size:'medium',
  weight: 'normal',
  isRequired: true,
  children: 'This is Label'
};

export const Default: Story = {
  args: defaultProps
};

export const NotRequired: Story = {
  args: {
    ...defaultProps,
    isRequired: false,
    children: 'This is Label',
  },
};