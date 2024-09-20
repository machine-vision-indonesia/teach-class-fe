import { ComponentPropsWithoutRef } from 'react'

const icons = ['chevron-up', 'chevron-down', 'dots-horizontal'] as const

interface CustomIconProps extends ComponentPropsWithoutRef<'svg'> {
  iconId: (typeof icons)[number]
}

export function CustomIcon({ iconId, ...props }: CustomIconProps) {
  return (
    <svg {...props}>
      <use href={`/sprite.svg#${iconId}`} />
    </svg>
  )
}
