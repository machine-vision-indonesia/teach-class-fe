const status = ['published', 'draft', 'archived'] as const
export type Status = (typeof status)[number]

const userStatus = ['draft', 'invited', 'active', 'suspended', 'archived'] as const
export type UserStatus = (typeof userStatus)[number]
