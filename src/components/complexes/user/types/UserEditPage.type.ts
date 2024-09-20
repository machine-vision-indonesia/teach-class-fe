import { UseQueryOptions } from "@tanstack/react-query"
import { schemaAddressContact, schemaAuthField, schemaFile, schemaPersonalData } from "../validations"
import * as yup from 'yup'
import { GenericFormData } from "axios"

export type Params = Pick<UseQueryOptions, 'enabled'> & {
  id: string | null
}

type Profile = {
  id: string
  photo: string | null
  cover: string | null
  full_name: string | null
  address: string | null
  id_number: string | null
  first_name: string | null
  last_name: string | null
  gender: string | null
  religion: string | null
  phone: string | null
  post_code: string | null
}

type Role = {
  id: string
  name: string
}

export type Privilege = {
  id: string
  role: Role
}

type JobLevel = {
  name: string
}

type JobFunction = {
  name: string
  job_level: JobLevel
  id: string
}

type Sto = {
  name: string
  id: string
}

type Werk = {
  name: string
  id?: string
}

type Data = {
  email: string
  job_title: string | null
  profile: Profile | null
  privileges: Privilege[]
  werk: Werk | null
  sto: Sto | null
  job_function: JobFunction | null
}

export type GetUserResponse = {
  data: Data
}

export type SchemaPersonalData = yup.InferType<typeof schemaPersonalData>

export type SchemaAuthField = yup.InferType<typeof schemaAuthField>

export type SchemaFile = yup.InferType<typeof schemaFile>

export type SchemaAddressContact = yup.InferType<typeof schemaAddressContact>


type GetUserResponseData = {
  email: string
  job_title: string
  privileges: Privilege[]
  werk: Werk
  sto: Sto
  job_function: JobFunction
}

export type GetUserQueryResponse = {
  data: GetUserResponseData
}


export type UpdateMutationData = Pick<SchemaAuthField, 'email' | 'job_title'> & {
  currentPrivilegeIds: Privilege['id'][]
  roleIds: SchemaAuthField['roles'][number]['id'][]
  werk: SchemaAuthField['work_center']['id']
  sto: SchemaAuthField['department']['id']
  job_function: SchemaAuthField['job_function']['id']
}

export type PersonalData = {
  id: string
  id_number: string
  first_name: string
  last_name: string
  gender: string
  religion: string
  email: string
}

type Metadata = {}

export type UploadData = {
  id: string
  storage: string
  filename_disk: string
  filename_download: string
  title: string
  type: string
  folder: any
  uploaded_by: string
  uploaded_on: string
  modified_by: any
  modified_on: string
  charset: any
  filesize: string
  width: number
  height: number
  duration: any
  embed: any
  description: any
  location: any
  tags: any
  metadata: Metadata
}

export type UploadFileResponse = {
  data: UploadData
}

export type MutationData = {
  file: GenericFormData
  userId: string
  profileId?: string
  idPhoto?: string
}
