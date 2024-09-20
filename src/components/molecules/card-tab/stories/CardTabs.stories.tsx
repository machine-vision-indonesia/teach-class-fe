import React, { useState } from 'react';
import { StoryObj, Meta } from '@storybook/react';

import { CardTabs } from '../components/CardTabs';
import { Box, Skeleton, Stack } from '@mui/material';
import { Dropdown } from '@/components/atoms/dropdown';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CardTabs> = {
  title: 'Components/Molecules/CardTabs',
  component: CardTabs,
  argTypes: {
    title: {
      control: 'text',
      defaultValue: 'Default Title',
      type: 'string',
    },
    description: {
      control: 'text',
      defaultValue: 'Default Description',
      type: 'string'
    },
    activeSelected: {
      control: 'boolean',
      defaultValue: false,
      type: 'boolean'
    },
    onClick: { action: 'clicked' }
  }
};

export default meta;

type Story = StoryObj<typeof CardTabs>;

const CardTabsExample = () => {
  const [currentTab, setCurrentTab] = useState('Main Title 1');

  const tabs = [
    {
      title: 'Main Title 1',
      description: 'Additional Information 1',
      content: 'This is the content for Main Title 1'
    },
    {
      title: 'Main Title 2',
      description: 'Additional Information 2',
      content: 'This is the content for Main Title 2'
    },
    {
      title: 'Main Title 3',
      description: 'Additional Information 3',
      content: 'This is the content for Main Title 3'
    },
  ];

  const activeTab = tabs.find(tab => tab.title === currentTab);

  return (
    <Stack direction="row" gap={2}>
      <Box>
        {tabs.map((tab, index) => (
          <Box key={index} my={2} mx={2}>
            <CardTabs
              title={tab.title}
              description={tab.description}
              activeSelected={currentTab === tab.title}
              onClick={() => setCurrentTab(tab.title)}
            />
          </Box>
        ))}
      </Box>
      <Box>
        <p>{activeTab?.content}</p>
        <Skeleton height={60} width={300} />
        <Skeleton height={60} width={300} />
        <Skeleton height={60} width={300} />
      </Box>
    </Stack>
  );
};

const defaultProps = {
  title: 'Main Title',
  description: 'Additional Information',
  activeSelected: false,
};

const activeProps = {
  title: 'Main Title',
  description: 'Additional Information',
  activeSelected: true,
};

const iconCardProps = {
  title: 'Main Title',
  description: 'Additional Information',
  activeSelected: false,
  action: (
    <Dropdown
      label=""
      icon="mdi:dots-vertical"
      menu={[
        { content: 'item 1' },
        { content: 'item 2' },
        { content: 'item 3' },
        { content: 'item 4' },
        { content: 'item 5' },
      ]}
    />
  ),
  thumbnail: <img width={50} height={50} alt="add-role" src="/images/machine-vision.png" />,
};

export const Default: Story = {
  args: defaultProps,
  render: (args) => <CardTabs {...args} />,
};

export const ActiveCardTab: Story = {
  args: activeProps,
  render: (args) => <CardTabs {...args} />,
};

export const IconCardTab: Story = {
  args: iconCardProps,
  render: (args) => <CardTabs {...args} />,
};

export const PreviewCardTab: Story = {
  render: () => <CardTabsExample />,
};
