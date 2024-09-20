import type { Meta, StoryObj } from '@storybook/react';
import { Template } from '../components/Template';
import TemplateProps from '../types/Template.types';

// Define a default set of props
const defaultProps: Partial<TemplateProps> = {
  // default here
  children: <div></div>,
};

const meta: Meta<typeof Template> = {
  title: 'Components/Atoms/_Template',
  component: Template,
};

export default meta;

type Story = StoryObj<TemplateProps>;

// Default story
export const Default: Story = {
  args: defaultProps
};

// Optional story to showcase different variations (uncomment if needed)
// export const UnfilledBadge: Story = {
//   args: {
//     ...defaultProps,
//     backgroundColor: undefined, // Remove background color for unfilled badge
//   },
// };