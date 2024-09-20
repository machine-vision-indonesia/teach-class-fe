import { Avatar } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { Example } from '../components/Example';
import ExampleProps from '../types/Example.types';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Example> = {
  title: 'Components/Atoms/_Example',
  component: Example
};
export default meta;

type Story = StoryObj<ExampleProps>;

// Define a default set of props for a filled badge
const defaultProps: Partial<ExampleProps> = {
  badgeStyle: 'rect',
  size: 'medium',
  content: 'all',
  color: 'primary',
  badgeContent: 'Label',
  children: <Avatar sx={{ bgcolor: 'gray' }}>N</Avatar>,
};

// Default story
export const Default: Story = {
  args: defaultProps
};

// Optional story to showcase different variations (uncomment if needed)
export const UnfilledBadge: Story = {
  args: {
    ...defaultProps,
    children: <Avatar sx={{ bgcolor: 'orange' }}>N</Avatar>,
    badgeContent: 'Storybook',
  },
};