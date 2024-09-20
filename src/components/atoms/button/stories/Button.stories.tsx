import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../components/Button';
import type { ButtonProps } from '../types/button.types';

const meta = {
  title: 'Components/Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['solid', 'outlined', 'plain'],
      },
    },
    content: {
      control: {
        type: 'select',
        options: ['iconText', 'textOnly', 'iconOnly'],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    }
  }
} satisfies Meta<ButtonProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'solid',
    content: 'textOnly',
    text: 'Button',
    size: 'medium',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    content: 'textOnly',
    text: 'Button',
    size: 'medium',
  },
};

export const Plain: Story = {
  args: {
    variant: 'text',
    content: 'textOnly',
    text: 'Button',
    size: 'medium',
  },
};

export const Loading: Story = {
  args: {
    variant: 'solid',
    content: 'textOnly',
    text: 'Button',
    loading: true,
    size: 'medium',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'solid',
    content: 'textOnly',
    text: 'Button',
    disabled: true,
    size: 'medium',
  },
}

export const TextIcon: Story = {
  args: {
    variant: 'solid',
    content: 'iconText',
    text: 'Button',
    icon: 'carbon:logo-github',
    size: 'medium',
  },
};

export const IconOnly: Story = {
  args: {
    variant: 'solid',
    content: 'iconOnly',
    icon: 'carbon:logo-github',
    size: 'medium',
  },
};

export const Sizes: Story = {
  render: () => (
    <div>
      <Button content='textOnly' variant='solid' size="small" text="Small Button" />
      <Button content='textOnly' variant='solid' size="medium" text="Medium Button" style={{ marginTop: 10, marginBottom: 10 }} />
      <Button content='textOnly' variant='solid' size="large" text="Large Button" />
    </div>
  ),
  args: {
    variant: 'solid',
    content: 'textOnly',
    text: 'Button',
    size: 'medium',
  },
};
