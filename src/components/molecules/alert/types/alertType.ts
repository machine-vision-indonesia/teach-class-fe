export interface PropsAlert {
    title: string
    content?: string
    variant?: 'primary' | 'danger' | 'warning' | 'success'
    size?: 'small' | 'large'
    children?: React.ReactNode
  }