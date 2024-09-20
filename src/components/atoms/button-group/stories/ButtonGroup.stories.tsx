import type { Meta, StoryObj } from '@storybook/react';

import { ButtonGroup } from '../components/ButtonGroup';
import { ButtonGroupProps } from '../types/buttonGroup.types';

const meta = {
  title: 'Components/Atoms/ButtonGroup',
  tags: ['autodocs'],
  component: ButtonGroup,
} satisfies Meta<ButtonGroupProps>;

export default meta;

type Story = StoryObj<ButtonGroupProps>;

export const Default: Story = {
  args: {
    label: 'Button Group',
    numOfButtons: 3,
    size: 'medium',
    hasIcon: false,
    hasLabel: true,
    activeIndex: 0,
    onClick: (index: number) => { console.log(index) },
  },
};
export const Small: Story = {
  args: {
    numOfButtons: 2,
    size: 'small',
    hasIcon: false,
    hasLabel: true,
    activeIndex: 0,
    label: 'Small'
  },
};

export const MediumWithIcon: Story = {
  args: {
    numOfButtons: 3,
    size: 'medium',
    hasIcon: true,
    hasLabel: true,
    activeIndex: 1,
    icon: 'ic:baseline-plus',
    label: 'Medium'
  },
};

export const LargeWithoutLabel: Story = {
  args: {
    numOfButtons: 4,
    size: 'large',
    hasIcon: true,
    hasLabel: false,
    activeIndex: 2,
    icon: 'ic:baseline-plus'
  },
};

export const AllDisabled: Story = {
  args: {
    numOfButtons: 4,
    size: 'medium',
    hasIcon: false,
    hasLabel: true,
    activeIndex: -1,
    label: 'No Active'
  },
};

export const CustomActiveButton: Story = {
  args: {
    numOfButtons: 3,
    size: 'medium',
    hasIcon: false,
    hasLabel: true,
    activeIndex: 2,
    label: 'Active Button',
  },
};