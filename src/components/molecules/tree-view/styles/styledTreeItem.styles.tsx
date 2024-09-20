import { styled } from '@mui/material/styles'
import { TreeItem, TreeItemProps, treeItemClasses } from '@mui/x-tree-view/TreeItem'
import { forwardRef } from 'react'

type TreeItemNode = {
  rootNode?: boolean
  variants?: 'basic' | 'line'
}

const CustomTreeItem = forwardRef((props: TreeItemProps, ref: React.Ref<HTMLLIElement>) => (
  <TreeItem {...props} ref={ref} />
))

export const StyledTreeItem = styled(CustomTreeItem)<TreeItemNode>(({ theme, rootNode, variants }) => ({
  [`& .${treeItemClasses.root}`]: {
    borderRadius: theme.shape.borderRadius,
    alignItems: 'center'
  },
  position: 'relative',
  '&:before':
    variants === 'line'
      ? {
          pointerEvents: 'none',
          content: '""',
          position: 'absolute',
          width: 18,
          left: -18,
          top: '20px',
          borderBottom:
            // only display if the TreeItem is not root node
            !rootNode ? `1px solid ${theme.palette.grey[300]}` : 'none'
        }
      : undefined,
  [`& .${treeItemClasses.iconContainer}`]:
    variants === 'line'
      ? {
          backgroundColor: theme.palette.grey[200],
          height: '40px',
          width: '4.2% !important',
          borderTopLeftRadius: '4.2px',
          borderBottomLeftRadius: '4.2px',
          display: 'flex',
          alignItems: 'center',
          '& .close': {
            opacity: 0.3
          },
          '&:hover': {
            backgroundColor: theme.colorToken.background.primary.subtlest,
            transition: '0.2s'
          }
        }
      : {
          display: 'flex',
          alignItems: 'center',
          '& .close': {
            opacity: 0.3
          }
        },
  [`& .${treeItemClasses.group}`]:
    variants === 'line'
      ? {
          marginLeft: 15,
          paddingLeft: 18,
          borderLeft: '1px solid ' + theme.palette.grey[300] + ' !important'
        }
      : undefined,
  [`& .${treeItemClasses.content}`]: {
    background: theme.palette.grey[100],
    borderRadius: '5px',
    padding: variants === 'basic' ? '10px' : '0 0',
    border: variants === 'line' ? '1px solid #EDEEF0' : undefined,
    marginBottom: variants === 'basic' ? '8px' : '4px',
    marginTop: variants === 'basic' ? undefined : '4px',
    '&:hover':
      variants === 'basic'
        ? {
            backgroundColor: theme.colorToken.background.primary.subtlest,
            transition: '0.2s'
          }
        : {
            backgroundColor: theme.palette.grey[100] + ' !important'
          }
  },

  [`& .${treeItemClasses.selected}`]:
    variants === 'basic'
      ? {
          background: theme.colorToken.background.primary.normal + '!important',
          color: 'white !important'
        }
      : {
          background: theme.palette.grey[100] + ' !important'
        },

  [`& .${treeItemClasses.selected} > .${treeItemClasses.label}`]:
    variants === 'basic'
      ? {
          color: 'white'
        }
      : undefined,

  [`& .${treeItemClasses.selected} > .${treeItemClasses.iconContainer}`]:
    variants === 'line'
      ? {
          backgroundColor: theme.colorToken.background.primary.normal,
          color: 'white'
        }
      : undefined
}))
