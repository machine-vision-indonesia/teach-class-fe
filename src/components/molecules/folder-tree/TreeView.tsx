import * as uuid from 'uuid'
import { IItem, TreeItemProps, TreeViewProps } from './FolderTree.types'
import { Box, Collapse, IconButton, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material'
import Icon from '@/@core/components/icon'
import { Input } from '@/components/atoms/input'

export const TreeView: React.FC<TreeViewProps> = ({ items, onToggle, onAdd, onDelete, onRename, onFocus, level }) => {
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }} component='nav' aria-labelledby='nested-list-subheader'>
      {items.map(item => (
        <TreeItem
          level={level}
          key={item.id}
          item={item}
          onToggle={onToggle}
          onAdd={onAdd}
          onDelete={onDelete}
          onRename={onRename}
          onFocus={onFocus}
        />
      ))}
    </Box>
  )
}

export const TreeItem: React.FC<TreeItemProps> = ({ item, onToggle, onAdd, onDelete, onRename, onFocus, level }) => {
  const newItemId = uuid.v4()
  const theme = useTheme()

  const handleAddChild = (type: 'file' | 'folder') => {
    const newItem: IItem = {
      id: newItemId,
      name: type === 'file' ? 'New File' : 'New Folder',
      type,
      children: [],
      isOpen: true,
      isFocus: false,
      canRename: true
    }
    onAdd(item.id, newItem)
  }

  const renderFileIcon = (item: IItem) => {
    const isTsx = item.name.includes('.tsx')
    const isTs = item.name.includes('.ts') && !isTsx

    if (isTs) return <Icon icon='tabler:file-type-ts' color={theme.palette.info.main} />
    if (isTsx) return <Icon icon='tabler:file-type-tsx' color={theme.palette.primary.main} />
    return <Icon icon='tabler:file' />
  }

  return (
    <List disablePadding={true}>
      {item.type === 'file' && (
        <ListItemButton
          key={item.id}
          onClick={() => onFocus(item.id)}
          className={item.isFocus ? 'Mui-focusVisible' : ''}
        >
          <ListItemIcon sx={{ ml: level * 5 }}>
            <IconButton aria-label='capture screenshot'>{renderFileIcon(item)}</IconButton>
          </ListItemIcon>
          {!item.isFocus && <ListItemText primary={item.name} />}
          {item.isFocus && (
            <>
              <ListItemText>
                <Input
                  type='text'
                  value={item.name}
                  onChange={e => onRename(item.id, e.target.value)}
                  placeholder='Rename'
                  disabled={!item.canRename}
                />
              </ListItemText>
              <IconButton aria-label='capture screenshot' onClick={() => onDelete(item.id)}>
                <Icon icon='tabler:trash' color={theme.palette.warning.main} />
              </IconButton>
            </>
          )}
        </ListItemButton>
      )}
      {item.type === 'folder' && (
        <ListItemButton
          key={item.id}
          onClick={() => onFocus(item.id)}
          className={item.isFocus ? 'Mui-focusVisible' : ''}
        >
          <ListItemIcon sx={{ ml: level * 5 }}>
            <IconButton aria-label='capture screenshot' onClick={() => onToggle(item.id)}>
              {item.isOpen ? (
                <Icon icon='tabler:folder-open' color={theme.palette.warning.light} />
              ) : (
                <Icon icon='tabler:folder' color={theme.palette.warning.light} />
              )}
            </IconButton>
          </ListItemIcon>
          {!item.isFocus && <ListItemText primary={item.name} />}
          {item.isFocus && (
            <>
              <ListItemText>
                <Input
                  type='text'
                  value={item.name}
                  onChange={e => onRename(item.id, e.target.value)}
                  placeholder='Rename'
                  disabled={!item.canRename}
                />
              </ListItemText>
              <IconButton aria-label='capture screenshot' onClick={() => handleAddChild('folder')}>
                <Icon icon='tabler:folder-plus' />
              </IconButton>
              <IconButton aria-label='capture screenshot' onClick={() => handleAddChild('file')}>
                <Icon icon='tabler:file-plus' />
              </IconButton>
              <IconButton aria-label='capture screenshot' onClick={() => onDelete(item.id)}>
                <Icon icon='tabler:trash' color={theme.palette.warning.main} />
              </IconButton>
            </>
          )}
          <IconButton aria-label='capture screenshot' onClick={() => onToggle(item.id)}>
            {item.isOpen ? <Icon icon='tabler:chevron-down' /> : <Icon icon='tabler:chevron-right' />}
          </IconButton>
        </ListItemButton>
      )}
      <Collapse in={item.isOpen} timeout='auto' unmountOnExit>
        {item.isOpen && item.children.length > 0 && (
          <TreeView
            level={level + 1}
            items={item.children}
            onToggle={onToggle}
            onAdd={onAdd}
            onDelete={onDelete}
            onRename={onRename}
            onFocus={onFocus}
          />
        )}
      </Collapse>
    </List>
  )
}
