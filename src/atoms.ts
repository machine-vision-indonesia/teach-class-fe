import { atom } from 'jotai'
import { type VerticalNavItemsType } from './@core/layouts/types'
import { type Page, type Capability, type Role } from 'src/types/directus/current-user'

export const navItemsAtom = atom<VerticalNavItemsType>([])

export const roleOptionsAtom = atom<(Pick<Role, 'id' | 'code'> & { label: Role['name'] })[]>([])

export type CapabilityWithPage = Omit<Capability, 'page'> & {
  page: Page
}

export const capabilitiesAtom = atom<CapabilityWithPage[]>([])

export const selectedRoleAtom = atom<(Pick<Role, 'id' | 'code'> & { label: Role['name'] }) | null>(null)

export const loadingAtom = atom(true)
