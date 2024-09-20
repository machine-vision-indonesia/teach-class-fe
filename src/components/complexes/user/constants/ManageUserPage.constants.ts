import { Gender, Religion } from "../types/ManageUserPage.types"

export const PRIMARY_QUERY_KEY_DEPARTMENTS = 'DEPARTMENTS'
export const PRIMARY_QUERY_KEY_USERS = 'USERS'
export const PRIMARY_QUERY_KEY_JOB_FUNCTION = 'JOB_FUNCTIONS'
export const PRIMARY_QUERY_KEY_ASSETS = 'ASSETS'

export const GENDERS: Gender[] = [
  {
    id: 'MALE',
    label: 'Male'
  },
  {
    id: 'FEMALE',
    label: 'Female'
  }
]

export const RELIGIONS: Religion[] = [
  {
    id: 'ISLAM',
    label: 'Islam'
  },
  {
    id: 'KRISTEN_PROTESTAN',
    label: 'Kristen Protestan'
  },
  {
    id: 'KRISTEN_KATOLIK',
    label: 'Kristen Katolik'
  },
  {
    id: 'HINDU',
    label: 'Hindu'
  },
  {
    id: 'BUDDHA',
    label: 'Buddha'
  },
  {
    id: 'KHONGHUCU',
    label: 'Khonghucu'
  }
]
