export interface PropsAvatar {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  src?: string
  alt?: string
  type: 'initial' | 'image' | 'more' | 'placeholder'
  isAsync: boolean
  userId?: string
  displayName?: string
}
