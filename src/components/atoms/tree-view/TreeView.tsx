import { TreeView as MuiTreeView, TreeViewProps } from '@mui/x-tree-view'
import { Icon } from '@iconify/react'
import { PropsWithChildren } from 'react'

interface PropsTreeView extends TreeViewProps<true> {
  direction?: 'ltr' | 'rtl'
  expandedIcon?: string
  expandedIconRtl?: string
  collapseIcon?: string
}

export const TreeView = ({
  direction,
  expandedIcon,
  expandedIconRtl,
  collapseIcon,
  ...props
}: PropsWithChildren<PropsTreeView>) => {
  const ExpandIconUsed =
    direction === 'rtl' ? expandedIconRtl ?? 'tabler:chevron-left' : expandedIcon ?? 'tabler:chevron-right'

  return (
    <MuiTreeView
      defaultExpandIcon={<Icon icon={ExpandIconUsed} />}
      defaultCollapseIcon={<Icon icon={collapseIcon ?? 'tabler:chevron-down'} />}
      {...props}
    >
      {props.children}
    </MuiTreeView>
  )
}
