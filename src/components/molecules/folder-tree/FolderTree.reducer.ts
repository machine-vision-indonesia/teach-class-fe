import { Action, IItem } from './FolderTree.types'

export const FolderTreeReducer = (state: IItem[], action: Action): IItem[] => {
  switch (action.type) {
    case 'TOGGLE_ITEM':
      return toggleOpen(state, action.id)
    case 'ADD_ITEM':
      return addItemToTree(state, action.parentId, action.newItem)
    case 'DELETE_ITEM':
      return deleteItemFromTree(state, action.id)
    case 'RENAME_ITEM':
      return renameItemInTree(state, action.id, action.newName)
    case 'FOCUS_ITEM':
      return focusItemInTree(state, action.id)
    default:
      return state
  }
}

const toggleOpen = (items: IItem[], id: string): IItem[] => {
  return items.map(item => {
    if (item.id === id) {
      return { ...item, isOpen: !item.isOpen }
    }
    if (item.children.length > 0) {
      return { ...item, children: toggleOpen(item.children, id) }
    }
    return item
  })
}

const focusItemInTree = (items: IItem[], id: string): IItem[] => {
  return items.map(item => {
    if (item.id === id) {
      // Focus the current item
      return { ...item, isFocus: true, children: focusItemInTree(item.children, '') }
    } else {
      // Unfocus the current item
      return { ...item, isFocus: false, children: focusItemInTree(item.children, id) }
    }
  })
}

const addItemToTree = (items: IItem[], parentId: string, newItem: IItem): IItem[] => {
  return items.map(item => {
    if (item.id === parentId) {
      return { ...item, children: [...item.children, newItem] }
    }
    if (item.children.length > 0) {
      return { ...item, children: addItemToTree(item.children, parentId, newItem) }
    }
    return item
  })
}

const deleteItemFromTree = (items: IItem[], id: string): IItem[] => {
  return items
    .filter(item => item.id !== id)
    .map(item => ({
      ...item,
      children: deleteItemFromTree(item.children, id)
    }))
}

const renameItemInTree = (items: IItem[], id: string, newName: string): IItem[] => {
  return items.map(item => {
    if (item.id === id) {
      return { ...item, name: newName }
    }
    if (item.children.length > 0) {
      return { ...item, children: renameItemInTree(item.children, id, newName) }
    }
    return item
  })
}
