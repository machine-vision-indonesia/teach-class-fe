import * as React from 'react'
import { Box } from '@mui/material'
import { Icon } from '@iconify/react'
import { TreeView } from '@mui/x-tree-view/TreeView'
import { TreeViewProps } from '../types/treeView.types'
import { StyledLabel } from './StyledLabel'
import { Button } from '@/components/atoms'
import { StyledTreeItem } from '../styles/styledTreeItem.styles'

/**
 * Tree View adalah elemen antarmuka pengguna (UI) yang menampilkan data hierarkis dalam struktur seperti pohon.
 * Setiap item dalam Tree View dapat memiliki beberapa sub-item, atau "cabang," yang dapat diperluas atau diciutkan
 * oleh pengguna untuk menampilkan atau menyembunyikan item di bawahnya. Tree View sering digunakan dalam aplikasi
 * perangkat lunak untuk menggambarkan struktur berkas, menu navigasi, hierarki objek, atau data terstruktur lainnya.
 */
export const CustomTreeView: React.FC<TreeViewProps> = ({ variant, data, children }) => {
  const [treeData, setTreeData] = React.useState(data)

  const renderTreeItems = (data: any[]) => {
    return data.map(item => (
      <StyledTreeItem
        key={item.id}
        nodeId={item.id}
        variants={variant}
        label={
          <StyledLabel
            variant={variant}
            label={item.label}
            icon={variant === 'basic' ? item.icon : undefined} // Pass isEditing state for each item
            onAddItem={handleAddItem}
            onDeleteItem={handleDeleteItem}
            onEditItem={handleEditItem}
            onCancelEdit={handleCancelEdit}
          >
            {children}
          </StyledLabel>
        }
      >
        {item.children && renderTreeItems(item.children)}
      </StyledTreeItem>
    ))
  }

  const handleAddItem = (parentId: string) => {
    // Find the parent node
    const parentNode = findNodeById(treeData, parentId)

    if (parentNode) {
      // Generate a unique ID for the new item
      const newItemId = generateUniqueId()

      // Create the new item
      const newItem = {
        id: newItemId,
        label: `New Item ${newItemId}`
      }

      // Update the parent node with the new item
      parentNode.children = parentNode.children || []
      parentNode.children.push(newItem)

      // Update the state to trigger a re-render
      setTreeData([...treeData])
    }
  }

  const handleDeleteItem = (itemId: string) => {
    // Find the node to delete
    const newTreeData = removeNodeById(treeData, itemId)

    // Update the state to trigger a re-render
    setTreeData(newTreeData)
  }

  const handleCreatePlant = () => {
    // Generate a unique ID for the new parent item
    const newParentItemId = generateUniqueId()

    // Create the new parent item
    const newParentItem = {
      id: newParentItemId,
      label: `New Plant ${newParentItemId}`,
      children: [] // Initialize with an empty children array
    }

    // Update the state to trigger a re-render
    setTreeData([...treeData, newParentItem])
  }

  const handleEditItem = (itemId: string, editedLabel: string) => {
    // Set editing state for the specific item
    const newTreeData = updateEditingState(treeData, itemId, true)

    // Update the state to trigger a re-render
    setTreeData(newTreeData)
  }

  const handleCancelEdit = (itemId: string) => {
    // Set editing state to false when editing is cancelled
    const newTreeData = updateEditingState(treeData, itemId, false)

    // Update the state to trigger a re-render
    setTreeData(newTreeData)
  }

  const updateEditingState = (tree: any[], id: string, isEditing: boolean): any[] => {
    return tree.map(node => {
      if (node.id === id) {
        return { ...node, isEditing }
      }
      if (node.children) {
        node.children = updateEditingState(node.children, id, isEditing)
      }

      return node
    })
  }

  const findNodeById = (tree: any[], id: string): any | null => {
    for (const node of tree) {
      if (node.id === id) {
        return node
      }
      if (node.children) {
        const foundNode = findNodeById(node.children, id)
        if (foundNode) {
          return foundNode
        }
      }
    }

    return null
  }

  // Utility function to generate a unique ID
  const generateUniqueId = (): string => {
    return Math.random().toString(36).substr(2, 9)
  }

  // Utility function to remove a node by ID from the tree
  const removeNodeById = (tree: any[], id: string): any[] => {
    return tree.filter(node => {
      if (node.id === id) {
        return false // Remove the node
      }
      if (node.children) {
        node.children = removeNodeById(node.children, id)
      }

      return true // Keep the node
    })
  }

  return (
    <>
      {variant === 'basic' && (
        <Box sx={{ width: '100%', height: '100%', padding: 2 }}>
          <TreeView
            aria-label='customized'
            defaultExpanded={['1']}
            defaultCollapseIcon={<Icon icon='mingcute:down-line' />}
            defaultExpandIcon={<Icon icon='mingcute:right-line' />}
            defaultEndIcon={<Icon icon='mingcute:down-line' />}
            sx={{ overflowX: 'hidden', flexGrow: 1, overflowY: 'auto' }}
          >
            {renderTreeItems(treeData)}
          </TreeView>

          <Box>
            <Button
              variant='outlined'
              content='textOnly'
              text='Create Plant'
              startIcon={<Icon icon='ic:outline-add' color='#5998FF' />}
            />
          </Box>
        </Box>
      )}

      {variant === 'line' && (
        <Box sx={{ width: '100%', height: '100%', padding: 2 }}>
          <TreeView
            aria-label='customized'
            defaultExpanded={['1']}
            defaultCollapseIcon={<Icon icon='mingcute:down-line' />}
            defaultExpandIcon={<Icon icon='mingcute:right-line' />}
            defaultEndIcon={<Icon icon='mingcute:down-line' />}
            sx={{ overflowX: 'hidden', flexGrow: 1, overflowY: 'auto' }}
          >
            {renderTreeItems(treeData)}
          </TreeView>

          <Box>
            <Button
              variant='outlined'
              content='textOnly'
              text='Create Plant'
              startIcon={<Icon icon='ic:outline-add' color='#5998FF' />}
            />
          </Box>
        </Box>
      )}
    </>
  )
}
