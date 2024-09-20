import { IItem } from './FolderTree.types'

export const InitialFiles: IItem[] = [
  {
    id: 'a1',
    name: 'complexes',
    type: 'folder',
    isOpen: true,
    isFocus: false,
    canRename: false,
    children: [
      {
        id: 'a1b1',
        name: '<this-solution>',
        type: 'folder',
        isOpen: true,
        isFocus: false,
        canRename: true,
        children: [
          {
            id: 'a1b1c1',
            name: 'components',
            type: 'folder',
            isOpen: true,
            isFocus: false,
            canRename: true,
            children: [
              {
                id: 'a1b1c1d1',
                name: '<this-feature>',
                type: 'folder',
                isOpen: true,
                isFocus: false,
                canRename: true,
                children: [
                  {
                    id: 'a1b1c1d1e1',
                    name: 'index.tsx',
                    type: 'file',
                    children: [],
                    isOpen: true,
                    isFocus: false,
                    canRename: true
                  }
                ]
              }
            ]
          },
          {
            id: 'a1b1c2',
            name: 'service',
            type: 'folder',
            isOpen: true,
            isFocus: false,
            canRename: true,
            children: [
              {
                id: 'a1b1c2d1',
                name: 'action',
                type: 'folder',
                isOpen: true,
                isFocus: false,
                canRename: true,
                children: []
              },
              {
                id: 'a1b1c2d2',
                name: 'fetch',
                type: 'folder',
                isOpen: true,
                isFocus: false,
                canRename: true,
                children: []
              },
              {
                id: 'a1b1c2d3',
                name: 'table',
                type: 'folder',
                isOpen: true,
                isFocus: false,
                canRename: true,
                children: []
              },
              {
                id: 'a1b1c2d4',
                name: 'ddl',
                type: 'folder',
                isOpen: true,
                isFocus: false,
                canRename: true,
                children: []
              }
            ]
          },
          { id: 'a1b1c0', name: 'index.ts', type: 'file', children: [], isOpen: true, isFocus: false, canRename: true }
        ]
      },
      { id: 'a1b0', name: 'index.ts', type: 'file', children: [], isOpen: true, isFocus: false, canRename: true }
    ]
  }
]
