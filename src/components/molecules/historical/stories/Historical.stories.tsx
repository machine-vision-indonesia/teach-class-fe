import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@/components/atoms/badge';
import { Historical } from '../components/Historical';

// Meta Information
const meta: Meta<typeof Historical> = {
  title: 'Components/Organism/Historical',
  component: Historical,
  parameters: {
    docs: {
      description: {
        component: 'The Historical component displays a timeline with different types of states and optional profile details. It supports various layouts such as left, right, and alternate timelines.',
      },
    },
  },
};

export default meta;

// Default Story for the Historical component
export const Default: StoryObj<typeof Historical> = (args: any) => (
  <Historical {...args} />
);

// Default arguments for the Historical component
Default.args = {
  type: 'left',
  width: 400,
  size: 'small',
  data: [
    {
      date: new Date('2023-11-11'),
      title: 'Title 1',
      state: 'success',
      child: (
        <Badge
          color="primary"
          icon=""
          label="Storybook"
          size="medium"
          style="rect"
        />
      ),
      subTitle: 'Description of label',
      profile: {
        name: 'Machine Vision',
        position: 'Job Function',
      },
    },
    {
      date: new Date('2023-11-11'),
      title: 'Title 2',
      state: 'failed',
      subTitle: 'Description of label',
    },
    {
      date: new Date('2023-11-11'),
      title: 'Title 3',
      subTitle: 'Description of label',
    },
  ],
};

// Story for the "Left" layout of Historical component
export const LeftLayout: StoryObj<typeof Historical> = (args: any) => (
  <Historical {...args} />
);

LeftLayout.args = {
  type: 'left',
  color: 'success',
  data: [
    {
      date: new Date('2023-11-11'),
      title: 'Title 1',
      state: 'success',
      subTitle: 'Description of label',
      profile: {
        name: 'Machine Vision',
        position: 'Job Function',
      },
    },
    {
      date: new Date('2023-11-11'),
      title: 'Title 2',
      subTitle: 'Description of label',
    },
    {
      date: new Date('2023-11-11'),
      title: 'Title 3',
      subTitle: 'Description of label',
    },
  ],
};

// Story for the "Right" layout of Historical component
export const RightLayout: StoryObj<typeof Historical> = (args: any) => (
  <Historical {...args} />
);

RightLayout.args = {
  type: 'right',
  data: [
    {
      date: new Date('2023-11-11'),
      title: 'Title 1',
      subTitle: 'Description of label',
      profile: {
        name: 'Machine Vision',
        position: 'Job Function',
      },
    },
    {
      date: new Date('2023-11-11'),
      title: 'Title 2',
      subTitle: 'Description of label',
    },
    {
      date: new Date('2023-11-11'),
      title: 'Title 3',
      subTitle: 'Description of label',
    },
  ],
};
