import { StoryObj, Meta } from '@storybook/react'
import { TreeViewProps } from '../types/treeView.types'
import { CustomTreeView } from '../components/TreeView'
import { Button } from '@/components/atoms'

const TreeViewComponent = (props: any) => {
  return (
    <>
      <CustomTreeView
        {...props}
        data={[
          {
            id: '1',
            label: 'Plant 1',
            icon: 'prime:folder',
            children: [
              {
                id: '2',
                label: 'Area 1',
                children: [
                  {
                    id: '3',
                    label: 'Line 1',
                    children: [
                      { id: '4', label: 'Station 1' },
                      { id: '5', label: 'Station 2' },
                      { id: '6', label: 'Station 3' }
                    ]
                  }
                ]
              },
              { id: '7', label: 'Area 2' },
              { id: '8', label: 'Area 3' },
              { id: '9', label: 'Area 4' }
            ]
          },
          {
            id: '10',
            label: 'Plant 2',
            icon: 'tabler:notes'
          }
        ]}
      />
    </>
  )
}

export default {
  title: 'Components/Molecules/TreeView',
  argTypes: {
    variant: {
      defaultValue: 'basic',
      options: ['basic', 'line'],
      control: { type: 'select' }
    }
  },
  parameters: {
    layout: 'fullscreen'
  },
  component: CustomTreeView
} as Meta<typeof CustomTreeView>

type Story = StoryObj<typeof CustomTreeView>

export const Basic: Story = (args: TreeViewProps) => <TreeViewComponent {...args} />

Basic.args = {
  variant: 'basic',
  data: [
    {
      id: '1',
      label: 'Plant 1',
      children: [
        {
          id: '2',
          label: 'Area 1',
          children: [
            {
              id: '3',
              label: 'Line 1',
              children: [
                { id: '4', label: 'Station 1' },
                { id: '5', label: 'Station 2' },
                { id: '6', label: 'Station 3' }
              ]
            }
          ]
        },
        { id: '7', label: 'Area 2' },
        { id: '8', label: 'Area 3' },
        { id: '9', label: 'Area 4' }
      ]
    }
  ],
  children: <Button content='iconOnly' variant='outlined' icon='mdi:delete-outline' color='error' />
}
Basic.parameters = {
  docs: {
    source: {
      code: `
const TreeViewComponent = (props: any) => {
  return (
    <>
      <CustomTreeView
        {...props}
        data={[
          {
            id: '1',
            label: 'Plant 1',
            icon: 'prime:folder',
            children: [
              {
                id: '2',
                label: 'Area 1',
                children: [
                  {
                    id: '3',
                    label: 'Line 1',
                    children: [
                      { id: '4', label: 'Station 1' },
                      { id: '5', label: 'Station 2' },
                      { id: '6', label: 'Station 3' }
                    ]
                  }
                ]
              },
              { id: '7', label: 'Area 2' },
              { id: '8', label: 'Area 3' },
              { id: '9', label: 'Area 4' }
            ]
          },
          {
            id: '10',
            label: 'Plant 2',
            icon: 'tabler:notes'
          }
        ]}
        >
        {/* Action Button as children */}
        <Button content='iconOnly' variant='outlined' icon='mdi:delete-outline' color='error' />
        </CustomTreeView>
    </>
  )
}`
    }
  }
}

export const Line: Story = (args: TreeViewProps) => <TreeViewComponent {...args} />
Line.args = {
  variant: 'line',
  data: [
    {
      id: '1',
      label: 'Plant 1',
      children: [
        {
          id: '2',
          label: 'Area 1',
          children: [
            {
              id: '3',
              label: 'Line 1',
              children: [
                { id: '4', label: 'Station 1' },
                { id: '5', label: 'Station 2' },
                { id: '6', label: 'Station 3' }
              ]
            }
          ]
        },
        { id: '7', label: 'Area 2' },
        { id: '8', label: 'Area 3' },
        { id: '9', label: 'Area 4' }
      ]
    }
  ]
}

Line.parameters = {
  docs: {
    source: {
      code: `
import { Button } from 'src/@core/custom-components/button/Button'
import { ModalKanban } from './ModalKanban'

const ModalComponents = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant='contained' onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        color='success'
        textBanner='A - 108'
        isHeader={false}
        isFooter={false}
        isActionButtons={false}
        mainContent='Main content here'
      />
    </>
  );
};
    `
    }
  }
}
