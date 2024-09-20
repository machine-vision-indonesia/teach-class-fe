export type GetCurrentUserResponse = {
  success: boolean
  data: User | null
}

export type Profile = {
  address: string
  date_created: string
  date_updated: any
  first_name: string
  full_name: string
  id: string
  last_name: string
  phone: string
  post_code: string
  sort: any
  status: string
  user_created: string
  user_updated: any
  id_number: string
  photo: string | null
  cover: string | null
  gender: string
  religion: string
}

export type User = {
  id: string
  first_name: string
  last_name: string
  email: string
  password: string
  location: any
  title: any
  description: any
  tags: any
  avatar: any
  language: any
  tfa_secret: any
  status: string
  role: string
  token: any
  last_access: string
  last_page: string
  provider: string
  external_identifier: any
  auth_data: any
  email_notifications: boolean
  appearance: any
  theme_dark: any
  theme_light: any
  theme_light_overrides: any
  theme_dark_overrides: any
  company: any
  sto: any
  werk: any
  job_title: any
  job_function: any
  is_verified: boolean
  job_placements: any[]
  stos: any[]
  profile: Profile | null
  products: Product[]
  roles: Role[]
}

export type Product = {
  code: string
  date_created: any
  date_updated: string
  description: string
  id: string
  is_active: boolean
  name: string
  sort: number
  status: string
  user_created: any
  user_updated: string
  main_page: string
  image: any
  background_color: string
}

export type Role = {
  id: string
  name: string
  code: string
  products: Product2[]
}

export type Product2 = {
  code: string
  date_created: any
  date_updated: string
  description: string
  id: string
  is_active: boolean
  name: string
  sort: number
  status: string
  user_created: any
  user_updated: string
  main_page: string
  image: any
  background_color: string
  modules: Module[]
  generalPages: GeneralPage[]
}

export type Module = {
  code: string
  date_created: any
  date_updated: string
  description: string
  icon: string
  id: string
  is_default: boolean
  name: string
  order: number
  sort: any
  status: string
  user_created: any
  user_updated: string
  clusters: Cluster[]
}

export type Cluster = {
  code: string
  date_created: any
  date_updated: string
  id: string
  is_active: boolean
  is_collapse: boolean
  is_default: boolean
  name: string
  order: number
  sort: any
  status: string
  user_created: any
  user_updated: string
  pages: Page[]
}

export type Page = {
  code: string
  date_created: any
  date_updated: string
  description: any
  icon: string
  id: string
  is_active: boolean
  is_default: boolean
  is_external_src: boolean
  name: string
  order: number
  platforms: any
  sort: any
  status: string
  type: string
  url: string
  user_created: any
  user_updated: string
  parent: any
  capabilities: Capability[]
}

export type GeneralPage = {
  code: string
  date_created: string
  date_updated: string
  description: any
  icon: string
  id: string
  is_active: boolean
  is_default: boolean
  is_external_src: boolean
  name: string
  order: number
  platforms: any
  sort: any
  status: string
  type: string
  url: string
  user_created: string
  user_updated: string
  parent: any
  capabilities: Capability[]
  cluster: any
}

export type Capability = {
  accessbility: any
  create: boolean
  date_created: string
  date_updated: any
  delete: boolean
  id: string
  page: string
  role: string
  sort: any
  status: string
  update: boolean
  user_created: string
  user_updated: any
}
