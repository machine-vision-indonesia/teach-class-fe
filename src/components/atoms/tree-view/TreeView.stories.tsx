import type { Meta, StoryObj } from '@storybook/react'
import { TreeItem } from '@mui/x-tree-view'
import { TreeView } from './TreeView'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TreeView> = {
  title: 'Components/Atoms/TreeView',
  component: TreeView
}

export default meta

type Story = StoryObj<typeof TreeView>

export const Default: Story = {
  args: {
    children: (
      <>
        <TreeItem nodeId='1' label='Applications'>
          <TreeItem nodeId='2' label='Calendar' />
          <TreeItem nodeId='3' label='Chrome' />
          <TreeItem nodeId='4' label='Webstorm' />
        </TreeItem>
        <TreeItem nodeId='5' label='Documents'>
          <TreeItem nodeId='10' label='OSS' />
          <TreeItem nodeId='6' label='MUI'>
            <TreeItem nodeId='7' label='src'>
              <TreeItem nodeId='8' label='index.js' />
              <TreeItem nodeId='9' label='tree-view.js' />
            </TreeItem>
          </TreeItem>
        </TreeItem>
      </>
    )
  }
}
