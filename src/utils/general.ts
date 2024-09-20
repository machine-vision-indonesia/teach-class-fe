import { type NextRouter } from 'next/router'
import type { VerticalNavItemsType, NavGroup, NavLink } from 'src/@core/layouts/types'
import { type CapabilityWithPage } from 'src/atoms'
import type { GeneralPage, Module, Role, User } from 'src/types/directus/current-user'

type GetPageCapabilityParams = {
  capabilities: CapabilityWithPage[]
  pathname: NextRouter['pathname']
}

export function getPageCapabilities(params: GetPageCapabilityParams) {
  return params.capabilities.filter(capability => capability.page.url === params.pathname)
}

type GetNavItemsParams = {
  data: User | null
  roleIds: Role['id'][]
  selectedRoleId: Role['id']
  uiConfigs: {
    code: string
    value: string
  }[]
}

type ModifiedModule = Module & {
  additional_type: 'module'
}

type ModifiedPage = GeneralPage & {
  additional_type: 'page'
}

const isModifiedModule = (mod: ModifiedModule | ModifiedPage): mod is ModifiedModule => mod.additional_type === 'module'

export const getNavItems = (params: GetNavItemsParams) => {
  const selectedRole = params.data?.roles.find(role => role.id === params.selectedRoleId)
  if (!selectedRole) {
    return []
  }

  const adminProduct = selectedRole.products.find(product => product.code === 'ADMIN' && product.status === 'published')
  if (!adminProduct) {
    return []
  }

  const modules = adminProduct.modules
    .filter(mod => mod.status === 'published')
    .map<ModifiedModule>(mod => {
      const clusters = mod.clusters
        .filter(cluster => cluster.status === 'published')
        .map(cluster => {
          const pages = cluster.pages
            .sort((a, b) => {
              if (a.order === null || a.order === undefined) {
                return 1
              }

              if (b.order === null || b.order === undefined) {
                return -1
              }

              return a.order - b.order
            })
            .filter(page => {
              const relatedCapability = page.capabilities.find(capability => {
                return (
                  capability.role === selectedRole.id &&
                  capability.page === page.id &&
                  capability.status === 'published'
                )
              })

              const hasCapability =
                relatedCapability && (relatedCapability.create || relatedCapability.update || relatedCapability.delete)

              if (page.status !== 'published' || page.type === 'sub-page' || !hasCapability) {
                return false
              }

              return true
            })

          return {
            ...cluster,
            pages
          }
        })
        .sort((a, b) => {
          if (a.order === null || a.order === undefined) {
            return 1
          }

          if (b.order === null || b.order === undefined) {
            return -1
          }

          return a.order - b.order
        })
        .filter(cluster => cluster.pages.length)

      return {
        ...mod,
        clusters,
        additional_type: 'module'
      }
    })
    .filter(mod => mod.clusters.length)

  const generalPages = adminProduct.generalPages
    .map<ModifiedPage>(page => ({
      ...page,
      additional_type: 'page'
    }))
    .filter(page => {
      const relatedCapability = page.capabilities.find(capability => {
        return capability.role === selectedRole.id && capability.page === page.id && capability.status === 'published'
      })

      const hasCapability =
        relatedCapability && (relatedCapability.create || relatedCapability.update || relatedCapability.delete)

      if (page.status !== 'published' || page.type === 'sub-page' || !hasCapability) {
        return false
      }

      return true
    })

  const modulesAndPages: (ModifiedModule | ModifiedPage)[] = [...modules, ...generalPages].sort((before, after) => {
    if (before.order === null || before.order === undefined) {
      return 1
    }

    if (after.order === null || after.order === undefined) {
      return -1
    }

    return before.order - after.order
  })

  const navItems = modulesAndPages.map<VerticalNavItemsType[number]>(mod => {
    if (isModifiedModule(mod)) {
      const navItem: NavGroup = {
        title: mod.name
      }

      if (mod.icon) {
        navItem.icon = mod.icon
      }

      navItem.children = mod.clusters
        .map(cluster => {
          const pages = cluster.pages.map(page => {
            const regex = /\[([^\]]+)\]/g
            const matches = page.name.match(regex)
            let title = page.name
            if (matches) {
              const codes = params.uiConfigs.map(item => item.code)

              title = page.name.replace(/\[([^\]]+)\]/g, (match, p1) => {
                const codeIndex = codes.indexOf(p1)

                return codeIndex !== -1 ? params.uiConfigs[codeIndex].value : match
              })
            }

            const subNavItem: NavLink = {
              title,
              path: page.is_external_src ? `/embed/${page.id}` : page.url
            }

            if (page.icon) {
              subNavItem.icon = page.icon
            }

            return subNavItem
          })

          return [
            {
              sectionTitle: cluster.name
            },
            ...pages
          ]
        })
        .flat()

      return navItem
    }

    return {
      title: mod.name,
      path: mod.is_external_src ? `/embed/${mod.id}` : mod.url,
      icon: mod.icon
    }
  })

  return navItems
}

export function isValidHttpUrl(urlString: string) {
  let url

  try {
    url = new URL(urlString)
  } catch {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}

export function titleCase(str: string) {
  return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase())
}

export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes'

  const k = 1000
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
