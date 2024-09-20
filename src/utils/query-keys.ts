export const meKey = ['me'] as const

export const assetKeys = {
  all: ['assets'] as const,
  details: () => [...assetKeys.all, 'detail'] as const,
  detail: (id: string | null | undefined) => [...assetKeys.details(), id] as const
}

// export const roleKeys = {
//   all: ['roles'] as const,
//   lists: () => [...roleKeys.all, 'list'] as const,
//   list: (filter: ) => [...roleKeys.lists(), {  }] as const,
// }
