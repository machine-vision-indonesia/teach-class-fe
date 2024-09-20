interface IKanbanStatus {
  name: string
  color: string
}

export interface IKanbanCardItem {
  id: string
  status: IKanbanStatus
}

export interface KanbanCardProps {
  data?: IKanbanCardItem[]
  statusOrder?: string[]
  onClick?: (item: IKanbanCardItem) => void
}
