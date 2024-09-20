export interface IItem {
  id: string
  name: string
  type: 'file' | 'folder'
  children: IItem[]
  isOpen: boolean
  isFocus: boolean
  canRename: boolean
}

export type Action =
  | { type: 'TOGGLE_ITEM'; id: string }
  | { type: 'ADD_ITEM'; parentId: string; newItem: IItem }
  | { type: 'DELETE_ITEM'; id: string }
  | { type: 'FOCUS_ITEM'; id: string }
  | { type: 'RENAME_ITEM'; id: string; newName: string }

export interface FolderTreeProps {
  initialFiles?: IItem[]
  value: IItem[]
  onChange: (items: IItem[]) => void
}

export interface TreeViewProps {
  items: IItem[]
  level: number
  onToggle: (id: string) => void
  onAdd: (parentId: string, newItem: IItem) => void
  onDelete: (id: string) => void
  onFocus: (id: string) => void
  onRename: (id: string, newName: string) => void
}

export interface TreeItemProps {
  level: number
  item: IItem
  onToggle: (id: string) => void
  onAdd: (parentId: string, newItem: IItem) => void
  onDelete: (id: string) => void
  onFocus: (id: string) => void
  onRename: (id: string, newName: string) => void
}
