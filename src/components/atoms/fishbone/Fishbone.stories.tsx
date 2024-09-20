import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import FishboneDiagram from './Fishbone';

// Define the default export with the component metadata
export default {
  title: 'Components/Atoms/FishboneDiagram',
  component: FishboneDiagram,
  argTypes: {
    data: { type: 'object' },  // Define the data prop type
  },
} as ComponentMeta<typeof FishboneDiagram>;

// Define the template for the story
const Template: ComponentStory<typeof FishboneDiagram> = (args) => <FishboneDiagram {...args} />;

// Create the default story
export const Default = Template.bind({});
Default.args = {
  data: [{
    name: "Flaws",
    children: [
      {
        name: "Machines",
        children: [
          { name: "Speed" },
          { name: "Bits" },
          { name: "Sockets" }
        ]
      }
    ]
  }],
  head : 'Main Problem'
};
