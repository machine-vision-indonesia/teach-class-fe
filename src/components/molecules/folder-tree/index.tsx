import React, { useEffect, useReducer } from 'react'
import { FolderTreeReducer } from './FolderTree.reducer'
import { TreeView } from './TreeView'
import { Box } from '@mui/material'
import { FolderTreeProps, IItem } from './FolderTree.types'

const FolderTreeComponent: React.FC<FolderTreeProps> = ({ value, onChange }) => {
  const [items, dispatch] = useReducer(FolderTreeReducer, value)

  const handleToggle = (id: string) => {
    dispatch({ type: 'TOGGLE_ITEM', id })
  }

  const handleAdd = (parentId: string, newItem: IItem) => {
    dispatch({ type: 'ADD_ITEM', parentId, newItem })
  }

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE_ITEM', id })
  }

  const handleRename = (id: string, newName: string) => {
    dispatch({ type: 'RENAME_ITEM', id, newName })
  }

  const handleFocus = (id: string) => {
    dispatch({ type: 'FOCUS_ITEM', id })
  }

  useEffect(() => {
    onChange(items)
  }, [items])

  return (
    <Box>
      <TreeView
        level={0}
        items={items}
        onToggle={handleToggle}
        onAdd={handleAdd}
        onDelete={handleDelete}
        onRename={handleRename}
        onFocus={handleFocus}
      />
    </Box>
  )
}

export default FolderTreeComponent
