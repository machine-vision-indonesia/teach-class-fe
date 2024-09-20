interface IAvatarList {
  type: 'image' | 'initial' | 'placeholder'
  src?: string
  alt?: string
  displayName?: string
}

export interface PropsAvatarGroup {
  size?: 'sm' | 'md' | 'lg'
  avatars?: IAvatarList[]
}
