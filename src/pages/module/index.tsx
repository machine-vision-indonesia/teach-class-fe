import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  type UniqueIdentifier,
  closestCenter,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { yupResolver } from '@hookform/resolvers/yup'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import MuiCheckbox from '@mui/material/Checkbox'
import Collapse from '@mui/material/Collapse'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Tab from '@mui/material/Tab'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow, { type TableRowProps } from '@mui/material/TableRow'
import Tabs from '@mui/material/Tabs'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { atom, useAtom } from 'jotai'
import Link from 'next/link'
import { Fragment, useEffect, useState } from 'react'
import { Controller, FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form'
import Icon from 'src/@core/components/icon'
import client from 'src/client'
import { Button } from 'src/components/atoms/button'
import { Chip } from 'src/components/atoms/chip'
import { CircularProgress } from 'src/components/atoms/circular-progress/CircularProgress'
import { Input } from 'src/components/atoms/input'
import { Switch } from 'src/components/atoms/switch'
import { Textarea } from 'src/components/atoms/textarea'
import { useDebounce } from 'src/hooks/useDebounce'
import { useGetProducts } from 'src/service/module/useGetProducts'
import { useUpdateMainPages } from 'src/service/module/useUpdateMainPage'
import { type Module as CurrentUserModule } from 'src/types/directus/current-user'
import { type Status } from 'src/types/directus/general'
import { isValidHttpUrl } from 'src/utils/general'
import * as yup from 'yup'
import { queryClient } from '../_app'

const moduleSchema = yup.object().shape({
  code: yup.string().required().min(1),
  name: yup.string().required().min(1),
  description: yup.string(),
  icon: yup.string().default(null).nullable()
})

type ModuleSchema = yup.InferType<typeof moduleSchema>

const clusterSchema = yup.object().shape({
  code: yup.string().required().min(1),
  name: yup.string().required().min(1)
})

type ClusterSchema = yup.InferType<typeof clusterSchema>

const pageSchema = yup.object().shape({
  code: yup.string().required().min(1),
  name: yup.string().required().min(1),
  icon: yup.string().nullable(),
  type: yup.string().required().min(1),
  products: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().required(),
        label: yup.string().required()
      })
    )
    .required()
    .min(1),
  url: yup.string().required(),
  is_external_src: yup.boolean().default(false),
  is_main_page: yup.boolean().default(false)
})

type PageSchema = yup.InferType<typeof pageSchema>

type GetRolesResponse = {
  data: Role[]
}

type Role = {
  id: string
  name: string
  modules: Module3[]
}

type Module3 = {
  module: number
}

type GetPagesResponse = {
  data: Page[]
}

type GetModulesResponse = {
  data: Module2[]
}

type Module2 = {
  id: string
  code: string
  name: string
  description: string
  base_path: string
  order: number
  icon: string | null
  clusters: Cluster[]
}

type Cluster = {
  id: string
  code: string
  name: string
  is_active: boolean
  order: number
  pages: Page[]
  module: Module
}

type Product = {
  id: string
  product: Product2
}

type Product2 = {
  id: string
  name: string
  main_page: string | null
}

type Page = {
  id: string
  code: string
  name: string
  description: string | null
  icon: string | null
  url: string
  type: string | null
  status: boolean
  products: Product[]
  order: number
  is_external_src: boolean
  capabilities: Capability[]
}

type Capability = {
  id: string
  role: string
  page: string
  create: boolean
  update: boolean
  delete: boolean
}

type Module = {
  id: string
}

type ModifiedModule = Module2 & {
  additional_type: 'module'
}

type ModifiedPage = Page & {
  additional_type: 'page'
}

const isModifiedModule = (mod: ModifiedModule | ModifiedPage): mod is ModifiedModule => mod.additional_type === 'module'
const isModifiedPage = (mod: ModifiedModule | ModifiedPage): mod is ModifiedPage => mod.additional_type === 'page'

async function getModulesAndGeneralPages() {
  type ModulesQueryParams = {
    fields: string[]
    filter: {
      code: {
        _neq: string
      }
      name?: {
        _icontains: string
      }
      status: {
        _eq: Status
      }
    }
    sort: string[]
    deep: {
      clusters: {
        _filter: {
          status: {
            _eq: Status
          }
        }
        _sort: string[]
        pages: {
          _filter: {
            status: {
              _eq: Status
            }
          }
          _sort: string[]
          products: {
            _filter: {
              status: {
                _eq: Status
              }
            }
          }
        }
      }
    }
  }

  const modulesQueryParams: ModulesQueryParams = {
    fields: [
      'id',
      'code',
      'name',
      'description',
      'base_path',
      'order',
      'icon',
      'clusters.id',
      'clusters.code',
      'clusters.name',
      'clusters.is_active',
      'clusters.order',
      'clusters.pages.id',
      'clusters.pages.code',
      'clusters.pages.name',
      'clusters.pages.description',
      'clusters.pages.icon',
      'clusters.pages.url',
      'clusters.pages.type',
      'clusters.pages.status',
      'clusters.pages.products.id',
      'clusters.pages.products.product.id',
      'clusters.pages.products.product.name',
      'clusters.pages.products.product.main_page',
      'clusters.pages.order',
      'clusters.pages.is_external_src',
      'clusters.module.id',
      'clusters.pages.capabilities.id',
      'clusters.pages.capabilities.role',
      'clusters.pages.capabilities.page',
      'clusters.pages.capabilities.create',
      'clusters.pages.capabilities.update',
      'clusters.pages.capabilities.delete'
    ],
    filter: { code: { _neq: 'GE' }, status: { _eq: 'published' } },
    sort: ['order'],
    deep: {
      clusters: {
        _filter: {
          status: {
            _eq: 'published'
          }
        },
        _sort: ['order'],
        pages: {
          _filter: {
            status: {
              _eq: 'published'
            }
          },
          _sort: ['order'],
          products: {
            _filter: {
              status: {
                _eq: 'published'
              }
            }
          }
        }
      }
    }
  }

  const modulesResponse = await client.api.get<GetModulesResponse>('/items/mt_modules', {
    params: modulesQueryParams
  })

  const modules = modulesResponse.data.data.map<ModifiedModule>(mod => ({
    ...mod,
    additional_type: 'module'
  }))

  type PagesQueryParams = {
    fields: string[]
    filter: {
      cluster: {
        _null: boolean
      }
      name?: {
        _icontains: string
      }
      status: {
        _eq: Status
      }
    }
    deep: {
      products: {
        _filter: {
          status: {
            _eq: Status
          }
        }
      }
    }
  }

  const pagesQueryParams: PagesQueryParams = {
    filter: {
      cluster: {
        _null: true
      },
      status: {
        _eq: 'published'
      }
    },
    fields: [
      'id',
      'code',
      'name',
      'description',
      'icon',
      'url',
      'type',
      'status',
      'products.id',
      'products.product.id',
      'products.product.name',
      'products.product.main_page',
      'order',
      'is_external_src',
      'capabilities.id',
      'capabilities.role',
      'capabilities.page',
      'capabilities.create',
      'capabilities.update',
      'capabilities.delete'
    ],
    deep: {
      products: {
        _filter: {
          status: {
            _eq: 'published'
          }
        }
      }
    }
  }

  const pagesResponse = await client.api.get<GetPagesResponse>(`/items/mt_pages`, {
    params: pagesQueryParams
  })

  const pages = pagesResponse.data.data.map<ModifiedPage>(page => ({
    ...page,
    additional_type: 'page'
  }))

  const modulesAndPages = [...modules, ...pages].sort((a, b) => {
    if (a.order === null || a.order === undefined) {
      return 1
    }

    if (b.order === null || b.order === undefined) {
      return -1
    }

    return a.order - b.order
  })

  return modulesAndPages
}

async function getRoles() {
  const queryParams = {
    fields: ['id', 'name', 'modules.module']
  }

  const response = await client.api.get<GetRolesResponse>('/items/mt_roles', {
    params: queryParams
  })

  return response.data
}

const editModuleModalOpenAtom = atom(false)

const selectedModuleIdAtom = atom<Module['id'] | null>(null)
const selectedClusterIdAtom = atom<Cluster['id'] | null>(null)
const selectedGeneralPageIdAtom = atom<Page['id'] | null>(null)
const createClusterModalOpenAtom = atom(false)
const createPageModalOpenAtom = atom(false)

const assignToRoleRoleSchema: yup.ObjectSchema<Pick<Role, 'id' | 'name'>> = yup.object({
  id: yup.string().required(),
  name: yup.string().required()
})

const assignToRoleClusterSchema: yup.ObjectSchema<Pick<Cluster, 'id' | 'name'>> = yup.object({
  id: yup.string().required(),
  name: yup.string().required()
})

const assignToRolePageSchema: yup.ObjectSchema<Pick<Page, 'id' | 'name'>> = yup.object({
  id: yup.string().required(),
  name: yup.string().required()
})

const assignToRoleSchema = yup.object().shape({
  rows: yup.array().of(
    yup.object().shape({
      role: assignToRoleRoleSchema,
      capabilities: yup.array().of(
        yup.object().shape({
          cluster: assignToRoleClusterSchema,
          page: assignToRolePageSchema,
          create: yup.boolean().required(),
          update: yup.boolean().required(),
          delete: yup.boolean().required()
        })
      )
    })
  )
})

type AssignToRoleSchema = yup.InferType<typeof assignToRoleSchema>

const editClusterModalOpenAtom = atom(false)
const detailPageModalOpenAtom = atom(false)
const selectedPageIdAtom = atom<Page['id'] | null>(null)
const editPageModalOpenAtom = atom(false)
const deletePageModalOpenAtom = atom(false)

type ModuleTabPanelProps = {
  value: number
  index: number
}

function ModuleTabPanel(props: ModuleTabPanelProps) {
  const form = useFormContext<AssignToRoleSchema>()
  const fieldArray = useFieldArray({
    control: form.control,
    name: `rows.${props.index}.capabilities` as 'rows.0.capabilities'
  })

  return (
    <div
      role='tabpanel'
      hidden={props.value !== props.index}
      id={`simple-tabpanel-${props.index}`}
      aria-labelledby={`simple-tab-${props.index}`}
    >
      {props.value === props.index ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Cluster</TableCell>
                <TableCell>Page</TableCell>
                <TableCell>Create</TableCell>
                <TableCell>Update</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fieldArray.fields.map((field, index) => (
                <TableRow key={field.id}>
                  <TableCell>{field.cluster.name}</TableCell>
                  <TableCell>{field.page.name}</TableCell>
                  <TableCell>
                    <Controller
                      control={form.control}
                      name={`rows.${props.index}.capabilities.${index}.create`}
                      defaultValue={field.create}
                      render={({ field }) => (
                        <MuiCheckbox
                          {...field}
                          checked={field.value}
                          onChange={e => field.onChange(e.target.checked)}
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Controller
                      control={form.control}
                      name={`rows.${props.index}.capabilities.${index}.update`}
                      defaultValue={field.update}
                      render={({ field }) => (
                        <MuiCheckbox
                          {...field}
                          checked={field.value}
                          onChange={e => field.onChange(e.target.checked)}
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Controller
                      control={form.control}
                      name={`rows.${props.index}.capabilities.${index}.delete`}
                      defaultValue={field.delete}
                      render={({ field }) => (
                        <MuiCheckbox
                          {...field}
                          checked={field.value}
                          onChange={e => field.onChange(e.target.checked)}
                        />
                      )}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </div>
  )
}

type GetCapabilityRolesResponse = {
  data: {
    role: Pick<Role, 'id' | 'name'>
  }[]
}

type GetCapabilityRolesParams = {
  moduleId: Module['id'] | null
}

async function getCapabilityRoles(params: GetCapabilityRolesParams) {
  const queryParams = {
    filter: {
      page: {
        cluster: {
          module: {
            _eq: params.moduleId
          }
        }
      }
    },
    fields: ['role.id', 'role.name']
  }

  const response = await client.api.get<GetCapabilityRolesResponse>('/items/mt_capabilities', {
    params: queryParams
  })

  return response.data.data
}

interface SortableTableRowProps extends TableRowProps {
  sortableId: UniqueIdentifier
}

function SortableTableRow(props: SortableTableRowProps) {
  const { style, sortableId, ...rest } = props

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: sortableId })

  return (
    <TableRow
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        ...style
      }}
      {...attributes}
      {...listeners}
      {...rest}
    >
      {props.children}
    </TableRow>
  )
}

function useUpdateModuleOrders() {
  return useMutation({
    mutationFn: async (params: { data: Awaited<ReturnType<typeof getModulesAndGeneralPages>>; search: string }) => {
      return client.api.post(`/modules/bulk`, params.data)
    },
    onMutate: async params => {
      await queryClient.cancelQueries({ queryKey: ['modules'] })

      const previousModules = queryClient.getQueryData<Awaited<ReturnType<typeof getModulesAndGeneralPages>>>([
        'modules'
      ])
      if (previousModules) {
        queryClient.setQueryData<Awaited<ReturnType<typeof getModulesAndGeneralPages>>>(['modules'], params.data)
      }

      return { previousModules }
    },
    onError: (_, variables, context) => {
      if (context?.previousModules) {
        queryClient.setQueryData(['modules'], context.previousModules)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries()
    }
  })
}

type ClusterCardProps = {
  cluster: Cluster
}

const ClusterCard = (props: ClusterCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.cluster.id })
  const [collapse, setCollapse] = useState(false)
  const [, setCreatePageModalOpen] = useAtom(createPageModalOpenAtom)
  const [, setSelectedClusterId] = useAtom(selectedClusterIdAtom)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [, setEditClusterModalOpen] = useAtom(editClusterModalOpenAtom)
  const [, setDeleteClusterModalOpen] = useAtom(deleteClusterModalOpenAtom)
  const [, setSelectedPageId] = useAtom(selectedPageIdAtom)
  const [, setDetailPageModalOpen] = useAtom(detailPageModalOpenAtom)
  const [, setEditPageModalOpen] = useAtom(editPageModalOpenAtom)
  const [, setDeletePageModalOpen] = useAtom(deletePageModalOpenAtom)
  const queryClient = useQueryClient()
  const [debouncedSearch] = useAtom(debouncedSearchAtom)

  type ChangePageStatusMutationFnParams = Pick<Page, 'id'> & {
    status: boolean
  }

  const changePageStatusMutation = useMutation({
    mutationFn: async (params: ChangePageStatusMutationFnParams) =>
      client.api.patch(`/items/mt_pages/${params.id}`, { status: params.status }),
    onMutate: async params => {
      await queryClient.cancelQueries({ queryKey: ['modules'] })

      const previousModules = queryClient.getQueryData<GetModulesResponse>(['modules'])
      if (previousModules) {
        const previousModulesCopy = previousModules
        const relatedModuleIndex = previousModulesCopy.data.findIndex(module => module.id === props.cluster.module.id)

        previousModulesCopy.data[relatedModuleIndex].clusters = previousModulesCopy.data[
          relatedModuleIndex
        ].clusters.map(cluster => {
          const relatedPageIndex = cluster.pages.findIndex(page => page.id === params.id)
          if (relatedPageIndex !== -1) {
            cluster.pages[relatedPageIndex].status = params.status
          }

          return cluster
        })

        queryClient.setQueryData<GetModulesResponse>(['modules'], previousModulesCopy)
      }

      return { previousModules }
    },
    onError: (_, __, context) => {
      if (context?.previousModules) {
        queryClient.setQueryData(['modules'], context.previousModules)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries()
    }
  })

  const updateModuleOrdersMutation = useUpdateModuleOrders()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          ml: 8,

          transform: CSS.Transform.toString(transform),
          transition,
          touchAction: 'none'
        }}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 2, py: 3 }}>
          <Icon icon='mdi:drag' />
          <Button
            content='iconOnly'
            icon={collapse ? 'tabler:chevron-up' : 'tabler:chevron-down'}
            onClick={() => setCollapse(prev => !prev)}
          />
          <Typography>{props.cluster.name}</Typography>
        </Box>
        <Button
          variant='text'
          aria-controls={`menu-${props.cluster.id}`}
          aria-haspopup='true'
          content='iconOnly'
          icon='tabler:dots-vertical'
          onClick={event => setAnchorEl(event.currentTarget)}
        />
        <Menu
          keepMounted
          id={`menu-${props.cluster.id}`}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          open={Boolean(anchorEl)}
        >
          <MenuItem
            onClick={() => {
              setSelectedClusterId(props.cluster.id)
              setEditClusterModalOpen(true)
            }}
          >
            Edit
          </MenuItem>
          <MenuItem
            sx={{ color: 'error.main' }}
            onClick={() => {
              setSelectedClusterId(props.cluster.id)
              setDeleteClusterModalOpen(true)
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </Box>
      <Collapse in={collapse}>
        <CardContent sx={{ pl: 20 }}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={event => {
              if (event.active.id !== event.over?.id) {
                const from = props.cluster.pages.findIndex(page => page.id === event.active.id)
                const to = props.cluster.pages.findIndex(page => page.id === event.over?.id)

                const newPages = arrayMove(props.cluster.pages, from, to).map((page, index) => ({
                  ...page,
                  order: index + 1
                }))

                const modules = queryClient.getQueryData<Awaited<ReturnType<typeof getModulesAndGeneralPages>>>([
                  'modules'
                ])

                if (!modules) {
                  return
                }

                const newModules = modules.map(mod => {
                  if (isModifiedPage(mod)) {
                    return mod
                  }

                  if (mod.id !== props.cluster.module.id) {
                    return mod
                  }

                  const clusters = mod.clusters.map(cluster => {
                    if (cluster.id !== props.cluster.id) {
                      return cluster
                    }

                    cluster.pages = newPages

                    return cluster
                  })

                  return {
                    ...mod,
                    clusters
                  }
                })

                updateModuleOrdersMutation.mutate(
                  {
                    data: newModules,
                    search: debouncedSearch
                  },
                  {
                    onSuccess: async () => {
                      await queryClient.invalidateQueries()
                    }
                  }
                )
              }
            }}
          >
            {props.cluster.pages.length ? (
              <SortableContext items={props.cluster.pages} strategy={verticalListSortingStrategy}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align='center'>DISPLAY NAME</TableCell>
                        <TableCell style={{ width: '1px', whiteSpace: 'nowrap' }}>TYPE</TableCell>
                        <TableCell align='center'>PRODUCTS</TableCell>
                        <TableCell align='center'>ACTIONS</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.cluster.pages.map(page => (
                        <SortableTableRow sortableId={page.id} key={page.id}>
                          <TableCell style={{ paddingLeft: 0, lineHeight: 'normal' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <span>
                                <Icon icon='mdi:drag' style={{ display: 'block' }} />
                              </span>
                              <span style={{ marginLeft: '1.5rem' }}>{page.name}</span>
                            </div>
                          </TableCell>
                          <TableCell style={{ width: '1px', whiteSpace: 'nowrap' }}>{page.type}</TableCell>
                          <TableCell>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                columnGap: '.7rem'
                              }}
                            >
                              {page.products.map(product => (
                                <Chip key={product.id} label={product.product.name} variant='transparent' />
                              ))}
                            </div>
                          </TableCell>

                          <TableCell>
                            <div
                              style={{
                                display: 'flex',
                                columnGap: '1.5rem',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <Button
                                sx={{
                                  aspectRatio: '1/1',
                                  minWidth: '26px',
                                  p: '4px'
                                }}
                                content='iconOnly'
                                icon='tabler:info-circle'
                              />
                              <Button
                                sx={{
                                  aspectRatio: '1/1',
                                  minWidth: '26px',
                                  p: '4px'
                                }}
                                content='iconOnly'
                                icon='tabler:pencil'
                                onClick={() => {
                                  setSelectedPageId(page.id)
                                  setEditPageModalOpen(true)
                                }}
                              />
                              <Button
                                sx={{
                                  aspectRatio: '1/1',
                                  minWidth: '26px',
                                  p: '4px',
                                  color: 'error.main'
                                }}
                                content='iconOnly'
                                icon='tabler:trash-filled'
                                onClick={() => {
                                  setSelectedPageId(page.id)
                                  setDeletePageModalOpen(true)
                                }}
                              />
                            </div>
                          </TableCell>
                        </SortableTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </SortableContext>
            ) : (
              <Typography variant='body1' sx={{ textAlign: 'center', padding: '1rem 0' }}>
                No pages found
              </Typography>
            )}
          </DndContext>
          <Button
            content='iconText'
            text='Add Page'
            icon='tabler:plus'
            onClick={() => {
              setSelectedClusterId(props.cluster.id)
              setCreatePageModalOpen(true)
            }}
            size='medium'
          />
        </CardContent>
      </Collapse>
    </>
  )
}

type ModuleCardProps = {
  module: ModifiedModule
}

const deleteClusterModalOpenAtom = atom(false)

const getAutocompleteRoleData = (roles: Role[]) => {
  return roles.map(role => ({
    id: role.id,
    label: role.name
  }))
}

type UseGetRolesParams = {
  moduleId: Module['id'] | null
  generalPageId: Page['id'] | null
  content: 'default' | 'assign_to_role'
}

function useGetRoles(params: UseGetRolesParams) {
  return useQuery({
    queryKey: ['roles'],
    queryFn: getRoles,
    enabled: (params.moduleId !== null || params.generalPageId !== null) && params.content === 'assign_to_role'
  })
}

function useDeleteCapabilities() {
  return useMutation({
    mutationFn: async (ids: Capability['id'][]) => client.api.delete('/items/mt_capabilities', { data: ids })
  })
}

type CapabilityCreateData = {
  role: Role['id']
  page: Page['id']
  create: boolean
  update: boolean
  delete: boolean
  status: Status
}

function useCreateCapabilities() {
  return useMutation({
    mutationFn: async (capabilities: CapabilityCreateData[]) => client.api.post('/items/mt_capabilities', capabilities)
  })
}

const ModuleCard = (props: ModuleCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.module.id })
  const queryClient = useQueryClient()
  const [tabValue, setTabValue] = useState(0)
  const [collapse, setCollapse] = useState(false)
  const [, setCreateClusterModalOpen] = useAtom(createClusterModalOpenAtom)
  const [selectedModuleId, setSelectedModuleId] = useAtom(selectedModuleIdAtom)
  const [, setEditModuleModalOpen] = useAtom(editModuleModalOpenAtom)
  const [, setDeleteModuleModalOpen] = useAtom(deleteModuleModalOpenAtom)
  const [selectedGeneralPageId] = useAtom(selectedGeneralPageIdAtom)
  const [selectedRoles, setSelectedRoles] = useState<(Pick<Role, 'id'> & { label: Role['name'] })[]>([])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [debouncedSearch] = useAtom(debouncedSearchAtom)

  const [content, setContent] = useState<'default' | 'assign_to_role'>('default')

  const assignToRoleForm = useForm<AssignToRoleSchema>({
    resolver: yupResolver(assignToRoleSchema)
  })

  const { append, fields, remove } = useFieldArray({
    control: assignToRoleForm.control,
    name: 'rows'
  })

  const getRolesQuery = useGetRoles({ moduleId: selectedModuleId, generalPageId: selectedGeneralPageId, content })

  const getCapabilityRolesQuery = useQuery({
    queryKey: ['capability_roles', { moduleId: selectedModuleId }],
    queryFn: () => getCapabilityRoles({ moduleId: selectedModuleId }),
    enabled: selectedModuleId !== null && content === 'assign_to_role'
  })

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  useEffect(() => {
    if (!getCapabilityRolesQuery.isSuccess) {
      return
    }

    const roles = getCapabilityRolesQuery.data
      .filter((capability, index, self) => self.findIndex(c => c.role.id === capability.role.id) === index)
      .map(capability => ({
        id: capability.role.id,
        label: capability.role.name
      }))

    setSelectedRoles(roles)

    if (props.module.id === selectedModuleId) {
      for (const role of roles) {
        const pages = props.module.clusters.flatMap(cluster => cluster.pages.map(page => ({ ...page, cluster })))

        append({
          role: {
            id: role.id,
            name: role.label
          },
          capabilities: pages.map(page => {
            const relatedCapability = page.capabilities.find(capability => capability.role === role.id)
            if (relatedCapability) {
              return {
                cluster: {
                  id: page.cluster.id,
                  name: page.cluster.name
                },
                page: {
                  id: page.id,
                  name: page.name
                },
                create: relatedCapability.create,
                update: relatedCapability.update,
                delete: relatedCapability.delete
              }
            }
            useCreateCapabilities

            return {
              cluster: {
                id: page.cluster.id,
                name: page.cluster.name
              },
              page: {
                id: page.id,
                name: page.name
              },
              create: false,
              update: false,
              delete: false
            }
          })
        })
      }
    }
  }, [
    getCapabilityRolesQuery.data,
    getCapabilityRolesQuery.isSuccess,
    append,
    props.module.clusters,
    props.module.id,
    selectedModuleId
  ])

  type CapabilityCreateData = {
    role: Role['id']
    page: Page['id']
    create: boolean
    update: boolean
    delete: boolean
    status: Status
  }

  const createCapabilitiesMutation = useMutation({
    mutationFn: async (capabilities: CapabilityCreateData[]) => client.api.post('/items/mt_capabilities', capabilities)
  })

  const deleteCapabilitiesMutation = useDeleteCapabilities()

  const updateModuleOrdersMutation = useUpdateModuleOrders()

  const onSubmit = async (data: AssignToRoleSchema) => {
    try {
      if (!data.rows || !selectedModuleId) {
        return
      }

      const prevCapabilityIds = props.module.clusters
        .flatMap(cluster => cluster.pages.map(page => ({ ...page, cluster })))
        .flatMap(page => page.capabilities)
        .map(capability => capability.id)

      if (prevCapabilityIds.length) {
        await deleteCapabilitiesMutation.mutateAsync(prevCapabilityIds)
      }

      const capabilities: CapabilityCreateData[] = []
      for (const row of data.rows) {
        if (!row.capabilities) {
          continue
        }

        for (const capability of row.capabilities) {
          capabilities.push({
            role: row.role.id,
            page: capability.page.id,
            create: capability.create,
            update: capability.update,
            delete: capability.delete,
            status: 'published'
          })
        }
      }

      if (capabilities.length) {
        await createCapabilitiesMutation.mutateAsync(capabilities)
      }

      await queryClient.invalidateQueries()
      setSelectedModuleId(null)
      setContent('default')
      assignToRoleForm.reset({
        rows: []
      })
    } catch {}
  }

  return (
    <Card
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        touchAction: 'none'
      }}
      {...attributes}
      {...listeners}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 2 }}>
          {content === 'default' ? (
            <>
              <Icon icon='mdi:drag' />
              <Button
                onClick={() => setCollapse(prev => !prev)}
                content='iconOnly'
                icon={collapse ? 'tabler:chevron-up' : 'tabler:chevron-down'}
              />
            </>
          ) : null}
          <Typography>{props.module.name}</Typography>
        </Box>
        {content === 'default' ? (
          <Button
            variant='text'
            aria-controls={`menu-${props.module.id}`}
            aria-haspopup='true'
            onClick={event => setAnchorEl(event.currentTarget)}
            content='iconOnly'
            icon='tabler:dots-vertical'
          />
        ) : null}
        <Menu
          keepMounted
          id={`menu-${props.module.id}`}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          open={Boolean(anchorEl)}
        >
          <MenuItem disabled>Preview Sidebar</MenuItem>
          <MenuItem
            onClick={() => {
              setSelectedModuleId(props.module.id)
              setContent('assign_to_role')
              setAnchorEl(null)
            }}
          >
            Assign to Role
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSelectedModuleId(props.module.id)
              setEditModuleModalOpen(true)
            }}
          >
            Edit
          </MenuItem>
          <MenuItem
            sx={{ color: 'error.main' }}
            onClick={() => {
              setSelectedModuleId(props.module.id)
              setDeleteModuleModalOpen(true)
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </CardContent>
      {content === 'default' ? (
        <Collapse in={collapse} sx={{ pr: 6, pl: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', rowGap: 4 }}>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={event => {
                if (event.active.id !== event.over?.id) {
                  const from = props.module.clusters.findIndex(cluster => cluster.id === event.active.id)
                  const to = props.module.clusters.findIndex(cluster => cluster.id === event.over?.id)

                  const newClusters = arrayMove(props.module.clusters, from, to).map((cluster, index) => ({
                    ...cluster,
                    order: index + 1
                  }))

                  const modules = queryClient.getQueryData<Awaited<ReturnType<typeof getModulesAndGeneralPages>>>([
                    'modules'
                  ])
                  if (!modules) {
                    return
                  }

                  const newModules = modules.map(mod => {
                    if (isModifiedPage(mod)) {
                      return mod
                    }

                    if (mod.id !== props.module.id) {
                      return mod
                    }

                    return {
                      ...mod,
                      clusters: newClusters
                    }
                  })

                  updateModuleOrdersMutation.mutate(
                    {
                      data: newModules,
                      search: debouncedSearch
                    },
                    {
                      onSuccess: async () => {
                        await queryClient.invalidateQueries()
                      }
                    }
                  )
                }
              }}
            >
              <SortableContext items={props.module.clusters} strategy={verticalListSortingStrategy}>
                {props.module.clusters.map(cluster => (
                  <ClusterCard key={cluster.id} cluster={cluster} />
                ))}
              </SortableContext>
            </DndContext>
          </div>
          <Button
            size='medium'
            startIcon={<Icon fontSize='16px' icon='tabler:plus' />}
            onClick={() => {
              setSelectedModuleId(props.module.id)
              setCreateClusterModalOpen(true)
            }}
            sx={{ my: 4, ml: 8 }}
            content='iconText'
            text='Add Cluster'
            icon='tabler:plus'
          />
        </Collapse>
      ) : null}
      {content === 'assign_to_role' && selectedModuleId === props.module.id ? (
        <>
          {getRolesQuery.isLoading || getCapabilityRolesQuery.isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
              <CircularProgress />
            </Box>
          ) : null}

          {getRolesQuery.isError || getCapabilityRolesQuery.isError ? (
            <Typography variant='body1' sx={{ mb: 6, textAlign: 'center' }}>
              Something went wrong. Please try again later
            </Typography>
          ) : null}

          {getRolesQuery.isSuccess && getCapabilityRolesQuery.isSuccess ? (
            <FormProvider {...assignToRoleForm}>
              <Box sx={{ px: 6, mb: 6 }}>
                <form onSubmit={assignToRoleForm.handleSubmit(onSubmit)}>
                  <Box>
                    <label htmlFor='roles'>Choose roles</label>
                    <Autocomplete<ReturnType<typeof getAutocompleteRoleData>[number], true>
                      options={getAutocompleteRoleData(getRolesQuery.data.data)}
                      size='small'
                      multiple
                      id='roles'
                      sx={{ mt: 1 }}
                      value={selectedRoles}
                      onChange={(_, roles) => {
                        setSelectedRoles(roles)
                        if (roles.length === 0) {
                          remove(0)

                          return
                        }
                        if (roles.length < selectedRoles.length) {
                          const roleIds = roles.map(role => role.id)
                          const removedRole = selectedRoles.find(role => !roleIds.includes(role.id))
                          if (!removedRole) {
                            return
                          }
                          const removedIndex = fields.findIndex(field => field.role.id === removedRole.id)
                          if (removedIndex === -1) {
                            return
                          }
                          remove(removedIndex)

                          return
                        }

                        const roleIds = selectedRoles.map(role => role.id)
                        const newRole = roles.find(role => !roleIds?.includes(role.id)) ?? roles[0]

                        const pages = props.module.clusters.flatMap(cluster =>
                          cluster.pages.map(page => ({ ...page, cluster }))
                        )
                        append({
                          role: {
                            id: newRole.id,
                            name: newRole.label
                          },
                          capabilities: pages.map(page => {
                            const relatedCapability = page.capabilities.find(
                              capability => capability.role === newRole.id
                            )
                            if (relatedCapability) {
                              return {
                                cluster: {
                                  id: page.cluster.id,
                                  name: page.cluster.name
                                },
                                page: {
                                  id: page.id,
                                  name: page.name
                                },
                                create: relatedCapability.create,
                                update: relatedCapability.update,
                                delete: relatedCapability.delete
                              }
                            }

                            return {
                              cluster: {
                                id: page.cluster.id,
                                name: page.cluster.name
                              },
                              page: {
                                id: page.id,
                                name: page.name
                              },
                              create: false,
                              update: false,
                              delete: false
                            }
                          })
                        })
                      }}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      renderInput={params => <TextField {...params} />}
                    />
                  </Box>

                  {fields.length ? (
                    <>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
                        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
                          {fields.map(field => (
                            <Tab key={field.id} label={field.role.name} />
                          ))}
                        </Tabs>
                      </Box>
                      {fields.map((field, index) => (
                        <ModuleTabPanel key={field.id} value={tabValue} index={index} />
                      ))}
                    </>
                  ) : null}

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      columnGap: 2,
                      my: 4,
                      justifyContent: 'end'
                    }}
                  >
                    <Button
                      type='button'
                      variant='outlined'
                      size='medium'
                      color='secondary'
                      content='textOnly'
                      text='Cancel'
                      onClick={() => {
                        setSelectedModuleId(null)
                        setContent('default')
                        assignToRoleForm.reset({
                          rows: []
                        })
                      }}
                    />
                    <Button
                      type='submit'
                      size='medium'
                      variant='contained'
                      content='textOnly'
                      text='Save'
                      color='primary'
                      disabled={assignToRoleForm.formState.isLoading || assignToRoleForm.formState.isSubmitSuccessful}
                      loading={assignToRoleForm.formState.isLoading || assignToRoleForm.formState.isSubmitSuccessful}
                    />
                  </Box>
                </form>
              </Box>
            </FormProvider>
          ) : null}
        </>
      ) : null}
    </Card>
  )
}

const icons: string[] = [
  'tabler:123',
  'tabler:24-hours',
  'tabler:2fa',
  'tabler:360',
  'tabler:360-view',
  'tabler:3d-cube-sphere',
  'tabler:3d-cube-sphere-off',
  'tabler:3d-rotate',
  'tabler:a-b',
  'tabler:a-b-2',
  'tabler:a-b-off',
  'tabler:abacus'
]

type GetGeneralPagesResponse = {
  data: Page[]
}

async function getGeneralPages() {
  const response = await client.api.get<GetGeneralPagesResponse>(`/items/mt_pages`, {
    params: {
      filter: {
        cluster: {
          _null: true
        }
      },
      fields: [
        'id',
        'code',
        'name',
        'description',
        'icon',
        'url',
        'type',
        'status',
        'products.id',
        'products.product.id',
        'products.product.name',
        'products.product.main_page',
        'order',
        'is_external_src'
      ]
    }
  })

  return response.data
}

type GetCapabilitiesByPageIdResponse = {
  data: {
    role: Pick<Role, 'id' | 'name'>
  }[]
}

type GetCapabilitiesByPageIdParams = {
  pageId: Page['id'] | null
}

async function getCapabilitiesByPageId(params: GetCapabilitiesByPageIdParams) {
  if (!params.pageId) {
    return Promise.reject(new Error('Invalid page ID'))
  }

  const queryParams = {
    filter: {
      page: {
        _eq: params.pageId
      }
    },
    fields: ['role.id', 'role.name']
  }

  const response = await client.api.get<GetCapabilitiesByPageIdResponse>('/items/mt_capabilities', {
    params: queryParams
  })

  return response.data.data
}

const assignToRoleGeneralPageSchema = yup.object().shape({
  rows: yup.array().of(
    yup.object().shape({
      role: assignToRoleRoleSchema,
      create: yup.boolean().required(),
      update: yup.boolean().required(),
      delete: yup.boolean().required()
    })
  )
})

type AssignToRoleGeneralPageSchema = yup.InferType<typeof assignToRoleGeneralPageSchema>

type GeneralPageCardProps = {
  page: ModifiedPage
}

function GeneralPageCard(props: GeneralPageCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.page.id })
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [, setEditPageModalOpen] = useAtom(editPageModalOpenAtom)
  const [, setDeletePageModalOpen] = useAtom(deletePageModalOpenAtom)
  const [, setSelectedPageId] = useAtom(selectedPageIdAtom)
  const [content, setContent] = useState<'default' | 'assign_to_role'>('default')
  const [selectedModuleId] = useAtom(selectedModuleIdAtom)
  const [selectedGeneralPageId, setSelectedGeneralPageId] = useAtom(selectedGeneralPageIdAtom)
  const getRolesQuery = useGetRoles({ moduleId: selectedModuleId, generalPageId: selectedGeneralPageId, content })
  const [selectedRoles, setSelectedRoles] = useState<(Pick<Role, 'id'> & { label: Role['name'] })[]>([])
  const [tabValue, setTabValue] = useState(0)

  const getCapabilitiesByPageIdQuery = useQuery({
    queryKey: ['capabilities', { pageId: selectedGeneralPageId }],
    queryFn: () => getCapabilitiesByPageId({ pageId: selectedGeneralPageId }),
    enabled: !!selectedGeneralPageId
  })

  const assignToRoleForm = useForm<AssignToRoleGeneralPageSchema>({
    resolver: yupResolver(assignToRoleGeneralPageSchema)
  })

  const { append, fields, remove } = useFieldArray({
    control: assignToRoleForm.control,
    name: 'rows'
  })

  const deleteCapabilitiesMutation = useDeleteCapabilities()

  const createCapabilitiesMutation = useCreateCapabilities()

  const onAssignToRoleSubmit = async (data: AssignToRoleGeneralPageSchema) => {
    try {
      if (!data.rows || !selectedGeneralPageId) {
        return
      }

      const prevCapabilityIds = props.page.capabilities.map(capability => capability.id)

      if (prevCapabilityIds.length) {
        await deleteCapabilitiesMutation.mutateAsync(prevCapabilityIds)
      }

      const capabilities: CapabilityCreateData[] = []
      for (const row of data.rows) {
        capabilities.push({
          role: row.role.id,
          page: selectedGeneralPageId,
          create: row.create,
          update: row.update,
          delete: row.delete,
          status: 'published'
        })
      }

      if (capabilities.length) {
        await createCapabilitiesMutation.mutateAsync(capabilities)
      }

      await queryClient.invalidateQueries()
      setSelectedGeneralPageId(null)
      setContent('default')
      assignToRoleForm.reset({
        rows: []
      })
    } catch {}
  }

  useEffect(() => {
    if (!getCapabilitiesByPageIdQuery.isSuccess) {
      return
    }

    const roles = getCapabilitiesByPageIdQuery.data
      .filter((capability, index, self) => self.findIndex(c => c.role.id === capability.role.id) === index)
      .map(capability => ({
        id: capability.role.id,
        label: capability.role.name
      }))

    setSelectedRoles(roles)

    if (props.page.id === selectedGeneralPageId) {
      for (const role of roles) {
        const relatedCapability = props.page.capabilities.find(capability => capability.role === role.id)

        if (relatedCapability) {
          append({
            role: {
              id: role.id,
              name: role.label
            },
            create: relatedCapability.create,
            update: relatedCapability.update,
            delete: relatedCapability.delete
          })
        }
      }
    }
  }, [
    append,
    getCapabilitiesByPageIdQuery.data,
    getCapabilitiesByPageIdQuery.isSuccess,
    props.page.capabilities,
    props.page.id,
    selectedGeneralPageId
  ])

  return (
    <Card
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        touchAction: 'none'
      }}
      {...attributes}
      {...listeners}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 2 }}>
          {content === 'default' ? <Icon icon='mdi:drag' /> : null}
          <Typography>{props.page.name}</Typography>
        </Box>
        {content === 'default' ? (
          <Button
            variant='text'
            aria-controls={`general-page-${props.page.id}-menu`}
            aria-haspopup='true'
            onClick={event => setAnchorEl(event.currentTarget)}
            content='iconOnly'
            icon='tabler:dots-vertical'
          />
        ) : null}
        <Menu
          keepMounted
          id={`general-page-${props.page.id}-menu`}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          open={Boolean(anchorEl)}
        >
          <MenuItem
            onClick={() => {
              setSelectedGeneralPageId(props.page.id)
              setContent('assign_to_role')
              setAnchorEl(null)
            }}
          >
            Assign to Role
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSelectedPageId(props.page.id)
              setEditPageModalOpen(true)
            }}
          >
            Edit
          </MenuItem>
          <MenuItem
            sx={{ color: 'error.main' }}
            onClick={() => {
              setSelectedPageId(props.page.id)
              setDeletePageModalOpen(true)
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </CardContent>
      {content === 'assign_to_role' ? (
        <>
          {getRolesQuery.isLoading || getCapabilitiesByPageIdQuery.isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
              <CircularProgress />
            </Box>
          ) : null}

          {getRolesQuery.isError || getCapabilitiesByPageIdQuery.isError ? (
            <Typography variant='body1' sx={{ mb: 6, textAlign: 'center' }}>
              Something went wrong. Please try again later
            </Typography>
          ) : null}

          {getRolesQuery.isSuccess && getCapabilitiesByPageIdQuery.isSuccess ? (
            <FormProvider {...assignToRoleForm}>
              <Box sx={{ px: 6, mb: 6 }}>
                <form onSubmit={assignToRoleForm.handleSubmit(onAssignToRoleSubmit)}>
                  <Box>
                    <label htmlFor='roles'>Choose roles</label>
                    <Autocomplete<ReturnType<typeof getAutocompleteRoleData>[number], true>
                      options={getAutocompleteRoleData(getRolesQuery.data.data)}
                      size='small'
                      multiple
                      id='roles'
                      sx={{ mt: 1 }}
                      value={selectedRoles}
                      onChange={(_, roles) => {
                        setSelectedRoles(roles)
                        if (roles.length === 0) {
                          remove(0)

                          return
                        }

                        if (roles.length < selectedRoles.length) {
                          const roleIds = roles.map(role => role.id)
                          const removedRole = selectedRoles.find(role => !roleIds.includes(role.id))
                          if (!removedRole) {
                            return
                          }

                          const removedIndex = fields.findIndex(field => field.role.id === removedRole.id)
                          if (removedIndex === -1) {
                            return
                          }

                          remove(removedIndex)

                          return
                        }

                        const roleIds = selectedRoles.map(role => role.id)
                        const newRole = roles.find(role => !roleIds?.includes(role.id)) ?? roles[0]

                        const relatedCapability = props.page.capabilities.find(
                          capability => capability.role === newRole.id
                        )

                        if (relatedCapability) {
                          return append({
                            role: {
                              id: newRole.id,
                              name: newRole.label
                            },
                            create: relatedCapability.create,
                            update: relatedCapability.update,
                            delete: relatedCapability.delete
                          })
                        }

                        return append({
                          role: {
                            id: newRole.id,
                            name: newRole.label
                          },
                          create: false,
                          update: false,
                          delete: false
                        })
                      }}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      renderInput={params => <TextField {...params} />}
                    />
                  </Box>

                  {fields.length ? (
                    <>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
                        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
                          {fields.map(field => (
                            <Tab key={field.id} label={field.role.name} />
                          ))}
                        </Tabs>
                      </Box>
                      {fields.map((field, index) => (
                        <div
                          key={field.id}
                          role='tabpanel'
                          hidden={tabValue !== index}
                          id={`assign-to-role-general-page-${field.id}-tabpanel`}
                        >
                          {tabValue === index ? (
                            <TableContainer component={Paper}>
                              <Table sx={{ minWidth: 650 }}>
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Create</TableCell>
                                    <TableCell>Update</TableCell>
                                    <TableCell>Delete</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  <TableRow key={field.id}>
                                    <TableCell>
                                      <Controller
                                        control={assignToRoleForm.control}
                                        name={`rows.${index}.create`}
                                        defaultValue={field.create}
                                        render={({ field }) => (
                                          <MuiCheckbox
                                            {...field}
                                            checked={field.value}
                                            onChange={e => field.onChange(e.target.checked)}
                                          />
                                        )}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Controller
                                        control={assignToRoleForm.control}
                                        name={`rows.${index}.update`}
                                        defaultValue={field.update}
                                        render={({ field }) => (
                                          <MuiCheckbox
                                            {...field}
                                            checked={field.value}
                                            onChange={e => field.onChange(e.target.checked)}
                                          />
                                        )}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Controller
                                        control={assignToRoleForm.control}
                                        name={`rows.${index}.delete`}
                                        defaultValue={field.delete}
                                        render={({ field }) => (
                                          <MuiCheckbox
                                            {...field}
                                            checked={field.value}
                                            onChange={e => field.onChange(e.target.checked)}
                                          />
                                        )}
                                      />
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>
                          ) : null}
                        </div>
                      ))}
                    </>
                  ) : null}

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      columnGap: 2,
                      my: 4,
                      justifyContent: 'end'
                    }}
                  >
                    <Button
                      type='button'
                      variant='outlined'
                      size='medium'
                      color='secondary'
                      content='textOnly'
                      text='Cancel'
                      onClick={() => {
                        setSelectedGeneralPageId(null)
                        setContent('default')
                        assignToRoleForm.reset({
                          rows: []
                        })
                      }}
                    />
                    <Button
                      type='submit'
                      size='medium'
                      variant='contained'
                      content='textOnly'
                      text='Save'
                      loading={assignToRoleForm.formState.isLoading || assignToRoleForm.formState.isSubmitSuccessful}
                      color='primary'
                      disabled={assignToRoleForm.formState.isLoading || assignToRoleForm.formState.isSubmitSuccessful}
                    />
                  </Box>
                </form>
              </Box>
            </FormProvider>
          ) : null}
        </>
      ) : null}
    </Card>
  )
}

const deleteModuleModalOpenAtom = atom(false)
const debouncedSearchAtom = atom('')

const ModulePage = () => {
  const { palette } = useTheme()
  const queryClient = useQueryClient()

  const products = useGetProducts()
  const productOptions =
    products.data?.data.map(product => ({
      id: product.id,
      label: product.name
    })) ?? []

  const [search, setSearch] = useState('')
  const localDebouncedSearch = useDebounce(search, 1000)
  const [debouncedSearch, setDebouncedSearch] = useAtom(debouncedSearchAtom)
  useEffect(() => {
    setDebouncedSearch(localDebouncedSearch)
  }, [localDebouncedSearch, setDebouncedSearch])

  const [createModuleModalOpen, setCreateModuleModalOpen] = useState(false)
  const [createClusterModalOpen, setCreateClusterModalOpen] = useAtom(createClusterModalOpenAtom)
  const [editClusterModalOpen, setEditClusterModalOpen] = useAtom(editClusterModalOpenAtom)
  const [createPageModalOpen, setCreatePageModalOpen] = useAtom(createPageModalOpenAtom)
  const [selectedModuleId, setSelectedModuleId] = useAtom(selectedModuleIdAtom)
  const [selectedClusterId, setSelectedClusterId] = useAtom(selectedClusterIdAtom)
  const [editModuleModalOpen, setEditModuleModalOpen] = useAtom(editModuleModalOpenAtom)
  const [deleteModuleModalOpen, setDeleteModuleModalOpen] = useAtom(deleteModuleModalOpenAtom)
  const [deleteClusterModalOpen, setDeleteClusterModalOpen] = useAtom(deleteClusterModalOpenAtom)
  const [detailPageModalOpen, setDetailPageModalOpen] = useAtom(detailPageModalOpenAtom)
  const [editPageModalOpen, setEditPageModalOpen] = useAtom(editPageModalOpenAtom)
  const [selectedPageId, setSelectedPageId] = useAtom(selectedPageIdAtom)
  const [deletePageModalOpen, setDeletePageModalOpen] = useAtom(deletePageModalOpenAtom)
  const [chooseAnotherIconModuleCreateChecked, setChooseAnotherIconModuleCreateChecked] = useState(false)
  const [chooseAnotherIconModuleEditChecked, setChooseAnotherIconModuleEditChecked] = useState(false)
  const [chooseAnotherIconPageCreateChecked, setChooseAnotherIconPageCreateChecked] = useState(false)
  const [chooseAnotherIconPageEditChecked, setChooseAnotherIconPageEditChecked] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const createModuleForm = useForm<ModuleSchema>({
    resolver: yupResolver(moduleSchema),
    defaultValues: {
      icon: null
    }
  })

  const moduleIconCreate = createModuleForm.watch('icon', null)

  const createClusterForm = useForm<ClusterSchema>({
    resolver: yupResolver(clusterSchema)
  })

  const createPageForm = useForm<PageSchema>({
    resolver: yupResolver(pageSchema),
    defaultValues: {
      is_external_src: false,
      is_main_page: false
    }
  })

  const editPageForm = useForm<PageSchema>({
    resolver: yupResolver(pageSchema),
    defaultValues: {
      is_external_src: false
    }
  })

  const editModuleForm = useForm<ModuleSchema>({
    resolver: yupResolver(moduleSchema),
    defaultValues: {
      icon: null
    }
  })

  const moduleIconEdit = editModuleForm.watch('icon', null)

  const editClusterForm = useForm<ClusterSchema>({
    resolver: yupResolver(clusterSchema)
  })

  const pageIconCreate = createPageForm.watch('icon', null)
  const pageIconEdit = editPageForm.watch('icon', null)

  const createModuleMutation = useMutation({
    mutationFn: async (
      newModule: ModuleSchema &
        Pick<CurrentUserModule, 'order'> & {
          status: Status
        }
    ) => client.api.post('/items/mt_modules', newModule)
  })

  type EditModuleMutationFnParams = {
    id: Module['id']
  } & ModuleSchema

  const editModuleMutation = useMutation({
    mutationFn: async (params: EditModuleMutationFnParams) => {
      const { id, ...rest } = params

      return client.api.patch(`/items/mt_modules/${id}`, rest)
    }
  })

  const deleteModuleMutation = useMutation({
    mutationFn: async (id: Module['id']) => {
      return client.api.patch(`/items/mt_modules/${id}`, {
        status: 'archived'
      })
    }
  })

  const deleteClusterMutation = useMutation({
    mutationFn: async (id: Cluster['id']) => {
      return client.api.patch(`/items/mt_clusters/${id}`, {
        status: 'archived'
      })
    }
  })

  const createClusterMutation = useMutation({
    mutationFn: async (
      data: ClusterSchema & {
        module: Module['id']
        order: CurrentUserModule['clusters'][number]['order']
        status: Status
      }
    ) =>
      client.api.post('/items/mt_clusters', {
        ...data,
        is_active: true
      })
  })

  type EditClusterMutationFnParams = {
    id: Cluster['id']
  } & ClusterSchema

  const editClusterMutation = useMutation({
    mutationFn: async (params: EditClusterMutationFnParams) => {
      const { id, ...rest } = params

      return client.api.patch(`/items/mt_clusters/${id}`, rest)
    }
  })

  const createPageMutation = useMutation({
    mutationFn: async (
      data: Omit<PageSchema, 'products' | 'is_main_page'> & {
        products: {
          product: PageSchema['products'][number]['id']
          status: Status
        }[]
        cluster: CurrentUserModule['clusters'][number]['id'] | null
        order: CurrentUserModule['clusters'][number]['pages'][number]['order']
        status: Status
      }
    ) =>
      client.api.post('/items/mt_pages', data, {
        params: {
          fields: ['id']
        }
      })
  })

  type EditPageMutationFnParams = Omit<PageSchema, 'products' | 'is_main_page'> & {
    id: Page['id']
    products: {
      create: {
        product: PageSchema['products'][number]['id']
        page: Page['id']
        status: Status
      }[]
      update: {
        id: Product['id']
        status: Status
      }[]
    }
  }

  const updatePageMutation = useMutation({
    mutationFn: async (params: EditPageMutationFnParams) => {
      const { id, ...rest } = params

      return client.api.patch(`/items/mt_pages/${id}`, rest)
    }
  })

  const deletePageMutation = useMutation({
    mutationFn: async (id: Page['id']) => {
      return client.api.patch<any, any, { status: Status }>(`/items/mt_pages/${id}`, {
        status: 'archived'
      })
    }
  })

  const getModulesAndGeneralPagesQuery = useQuery({
    queryKey: ['modules'],
    queryFn: () => getModulesAndGeneralPages()
  })

  const getGeneralPagesQuery = useQuery({
    queryKey: ['generalPages'],
    queryFn: getGeneralPages
  })

  const updateModuleOrdersMutation = useUpdateModuleOrders()

  const selectedPage = selectedPageId
    ? [
        ...(getModulesAndGeneralPagesQuery.data
          ?.filter(isModifiedModule)
          .flatMap(mod => mod.clusters)
          .flatMap(cl => cl.pages) ?? []),
        ...(getModulesAndGeneralPagesQuery.data?.filter(isModifiedPage) ?? [])
      ].find(p => p.id === selectedPageId)
    : undefined

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  useEffect(() => {
    if (editModuleModalOpen) {
      const relatedModule = getModulesAndGeneralPagesQuery.data
        ?.filter(isModifiedModule)
        .find(m => m.id === selectedModuleId)

      if (!relatedModule) {
        return
      }

      editModuleForm.reset({
        code: relatedModule.code,
        name: relatedModule.name,
        description: relatedModule.description,
        icon: relatedModule.icon
      })

      if (relatedModule.icon && !icons.includes(relatedModule.icon)) {
        setChooseAnotherIconModuleEditChecked(true)
      }
    }
  }, [editModuleForm, editModuleModalOpen, getModulesAndGeneralPagesQuery.data, selectedModuleId])

  useEffect(() => {
    if (editClusterModalOpen) {
      const relatedCluster = getModulesAndGeneralPagesQuery.data
        ?.filter(isModifiedModule)
        .flatMap(mod => mod.clusters)
        .find(c => c.id === selectedClusterId)

      if (!relatedCluster) {
        return
      }

      editClusterForm.reset({
        code: relatedCluster.code,
        name: relatedCluster.name
      })
    }
  }, [editClusterForm, editClusterModalOpen, getModulesAndGeneralPagesQuery.data, selectedClusterId])

  useEffect(() => {
    if (editPageModalOpen) {
      const pages = [
        ...(getModulesAndGeneralPagesQuery.data
          ?.filter(isModifiedModule)
          .flatMap(mod => mod.clusters)
          .flatMap(cl => cl.pages) ?? []),
        ...(getModulesAndGeneralPagesQuery.data?.filter(isModifiedPage) ?? [])
      ]

      const relatedPage = pages.find(p => p.id === selectedPageId)

      if (!relatedPage) {
        return
      }

      editPageForm.reset({
        code: relatedPage.code,
        name: relatedPage.name,
        icon: relatedPage.icon,
        type: relatedPage.type ?? undefined,
        products: relatedPage.products.map(p => ({ id: p.product.id, label: p.product.name })),
        url: relatedPage.url,
        is_external_src: relatedPage.is_external_src,
        is_main_page: Boolean(relatedPage.products.map(p => p.product.main_page).find(p => p === selectedPageId))
      })

      if (relatedPage.icon && !icons.includes(relatedPage.icon)) {
        setChooseAnotherIconPageEditChecked(true)
      }
    }
  }, [editPageForm, editPageModalOpen, getModulesAndGeneralPagesQuery.data, selectedPageId])

  const onCreateModuleSubmit = async (data: ModuleSchema) => {
    try {
      let maxModuleOrder = 0

      if (getModulesAndGeneralPagesQuery.data?.length) {
        maxModuleOrder = getModulesAndGeneralPagesQuery.data.reduce((prev, curr) =>
          curr.order > prev.order ? curr : prev
        ).order
      }

      await createModuleMutation.mutateAsync({
        ...data,
        order: maxModuleOrder ? maxModuleOrder + 1 : 1,
        status: 'published'
      })

      await queryClient.invalidateQueries()
      setCreateModuleModalOpen(false)

      createModuleForm.reset({
        code: '',
        name: '',
        description: '',
        icon: ''
      })

      setChooseAnotherIconModuleCreateChecked(false)
    } catch {}
  }

  const onCreateClusterSubmit = async (data: ClusterSchema) => {
    try {
      if (!selectedModuleId) {
        return
      }

      const relatedModule = getModulesAndGeneralPagesQuery.data
        ?.filter(isModifiedModule)
        .find(mod => mod.id === selectedModuleId)

      if (!relatedModule) {
        return
      }

      const maxClusterOrder = relatedModule.clusters.length
        ? relatedModule.clusters.reduce((prev, curr) => {
            return curr.order > prev.order ? curr : prev
          }).order
        : 0

      await createClusterMutation.mutateAsync({
        ...data,
        module: selectedModuleId,
        order: maxClusterOrder + 1,
        status: 'published'
      })

      await queryClient.invalidateQueries()
      setCreateClusterModalOpen(false)

      createClusterForm.reset({
        code: '',
        name: ''
      })
    } catch {}
  }

  const updateMainPages = useUpdateMainPages()

  const onCreatePageSubmit = async (data: PageSchema) => {
    try {
      let maxPageOrder = 0

      if (selectedClusterId) {
        const relatedCluster = getModulesAndGeneralPagesQuery.data
          ?.filter(isModifiedModule)
          .flatMap(mod => mod.clusters)
          .find(cl => cl.id === selectedClusterId)

        if (!relatedCluster) {
          return
        }

        if (relatedCluster.pages.length) {
          maxPageOrder = relatedCluster.pages.reduce((prev, curr) => {
            return curr.order > prev.order ? curr : prev
          }).order
        }
      } else {
        const lastModule = getModulesAndGeneralPagesQuery.data?.reduce((prev, curr) => {
          return curr.order > prev.order ? curr : prev
        })

        if (!lastModule) {
          return
        }

        maxPageOrder = lastModule.order
      }

      const response = await createPageMutation.mutateAsync({
        is_external_src: data.is_external_src,
        code: data.code,
        name: data.name,
        type: data.type,
        url: data.url,
        icon: data.icon,
        products: data.products.map(product => ({
          product: product.id,
          status: 'published'
        })),
        cluster: selectedClusterId,
        order: maxPageOrder + 1,
        status: 'published'
      })

      if (data.is_main_page) {
        await updateMainPages.mutateAsync({
          productIds: data.products.map(product => product.id),
          pageId: response.data.data.id
        })
      }

      await queryClient.invalidateQueries()
      setCreatePageModalOpen(false)

      createPageForm.reset({
        code: '',
        name: '',
        icon: null,
        type: undefined,
        products: [],
        url: '',
        is_external_src: false,
        is_main_page: false
      })

      setChooseAnotherIconPageCreateChecked(false)
    } catch {}
  }

  const onEditPageSubmit = async (data: PageSchema) => {
    try {
      if (!selectedPageId) {
        return
      }

      const pages = [
        ...(getModulesAndGeneralPagesQuery.data
          ?.filter(isModifiedModule)
          .flatMap(mod => mod.clusters)
          .flatMap(cl => cl.pages) ?? []),
        ...(getModulesAndGeneralPagesQuery.data?.filter(isModifiedPage) ?? [])
      ]

      const relatedPage = pages.find(p => p.id === selectedPageId)
      if (!relatedPage) {
        return
      }

      await updatePageMutation.mutateAsync({
        id: selectedPageId,
        is_external_src: data.is_external_src,
        code: data.code,
        name: data.name,
        type: data.type,
        url: data.url,
        icon: data.icon,
        products: {
          create: data.products.map(p => ({
            product: p.id,
            page: selectedPageId,
            status: 'published'
          })),
          update: relatedPage.products.map(p => ({
            id: p.id,
            status: 'archived'
          }))
        }
      })

      if (data.is_main_page) {
        await updateMainPages.mutateAsync({
          productIds: data.products.map(product => product.id),
          pageId: selectedPageId
        })
      }

      if (!data.is_main_page && products.isSuccess && products.data.data.length) {
        const relatedProducts = products.data.data.filter(product => product.main_page === selectedPageId)
        if (relatedProducts.length) {
          await updateMainPages.mutateAsync({
            productIds: data.products.map(product => product.id),
            pageId: null
          })
        }
      }

      await queryClient.invalidateQueries()
      setEditPageModalOpen(false)

      editPageForm.reset({
        code: '',
        name: '',
        icon: null,
        type: undefined,
        products: [],
        url: '',
        is_external_src: false,
        is_main_page: false
      })

      setChooseAnotherIconPageEditChecked(false)
    } catch {}
  }

  const onEditModuleSubmit = async (data: ModuleSchema) => {
    try {
      if (!selectedModuleId) {
        return
      }

      await editModuleMutation.mutateAsync({ ...data, id: selectedModuleId })

      await queryClient.invalidateQueries()
      setEditModuleModalOpen(false)

      editModuleForm.reset({
        code: '',
        name: '',
        description: '',
        icon: ''
      })

      setChooseAnotherIconModuleEditChecked(false)
    } catch {}
  }

  const onEditClusterSubmit = async (data: ClusterSchema) => {
    try {
      if (!selectedClusterId) {
        return
      }

      await editClusterMutation.mutateAsync({ ...data, id: selectedClusterId })

      await queryClient.invalidateQueries()
      setEditClusterModalOpen(false)

      editClusterForm.reset({
        code: '',
        name: ''
      })
    } catch {}
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', columnGap: 2 }}>
          {/* <Input variant='filled' placeholder='Search module' onChange={e => setSearch(e.target.value)} /> */}
          <Button
            variant='contained'
            size='medium'
            aria-controls='add-menu'
            aria-haspopup='true'
            onClick={event => setAnchorEl(event.currentTarget)}
            endIcon={<Icon icon='tabler:chevron-down' />}
            content='iconText'
            text='Add New...'
            icon='tabler:chevron-down'
          />
          <Menu
            keepMounted
            id='add-menu'
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            open={Boolean(anchorEl)}
            sx={{ mt: 2 }}
            transformOrigin={{
              horizontal: 10,
              vertical: 'top'
            }}
          >
            <MenuItem onClick={() => setCreateModuleModalOpen(true)}>Module</MenuItem>
            <MenuItem
              onClick={() => {
                setSelectedClusterId(null)
                setCreatePageModalOpen(true)
              }}
            >
              General Page
            </MenuItem>
          </Menu>
        </Box>

        {getModulesAndGeneralPagesQuery.isLoading || getGeneralPagesQuery.isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : null}

        {getModulesAndGeneralPagesQuery.isError || getGeneralPagesQuery.isError ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Typography variant='body1'>Something went wrong. Please try to refresh the page</Typography>
          </Box>
        ) : null}

        {getModulesAndGeneralPagesQuery.isSuccess ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={event => {
              if (event.active.id !== event.over?.id) {
                const from = getModulesAndGeneralPagesQuery.data.findIndex(mod => mod.id === event.active.id)
                const to = getModulesAndGeneralPagesQuery.data.findIndex(mod => mod.id === event.over?.id)
                const data = arrayMove(getModulesAndGeneralPagesQuery.data, from, to).map((mod, index) => ({
                  ...mod,
                  order: index + 1
                }))

                updateModuleOrdersMutation.mutate(
                  {
                    data,
                    search: debouncedSearch
                  },
                  {
                    onSuccess: () => {
                      queryClient.invalidateQueries()
                    }
                  }
                )
              }
            }}
          >
            <SortableContext items={getModulesAndGeneralPagesQuery.data} strategy={verticalListSortingStrategy}>
              {getModulesAndGeneralPagesQuery.data.map(mod =>
                mod.additional_type === 'module' ? (
                  <ModuleCard key={mod.id} module={mod} />
                ) : (
                  <GeneralPageCard key={mod.id} page={mod} />
                )
              )}
            </SortableContext>
          </DndContext>
        ) : null}
      </Box>
      <Dialog
        fullWidth
        open={createModuleModalOpen}
        maxWidth='md'
        scroll='body'
        onClose={() => setCreateModuleModalOpen(false)}
      >
        <form onSubmit={createModuleForm.handleSubmit(onCreateModuleSubmit)}>
          <DialogContent
            sx={{
              position: 'relative',
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <IconButton
              size='small'
              onClick={() => setCreateModuleModalOpen(false)}
              sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
            >
              <Icon icon='tabler:x' />
            </IconButton>
            <Box sx={{ mb: 8, textAlign: 'center' }}>
              <Typography variant='h5' sx={{ mb: 3 }}>
                Create Module
              </Typography>
              <Typography variant='body2'>Create Module for Manufacturing Data Platform</Typography>
            </Box>
            <Box>
              <label htmlFor='code' style={{ display: 'block' }}>
                Module Code
              </label>
              <Controller
                control={createModuleForm.control}
                name='code'
                render={({ field: { value, onChange } }) => (
                  <Input
                    fullWidth
                    id='code'
                    defaultValue={value}
                    onChange={onChange}
                    placeholder='Module Code'
                    variant='filled'
                    style={{ marginTop: '4px' }}
                  />
                )}
              />
              {createModuleForm.formState.errors.code && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {createModuleForm.formState.errors.code.message}
                </FormHelperText>
              )}
            </Box>
            <Box sx={{ marginTop: 5 }}>
              <label htmlFor='name' style={{ display: 'block' }}>
                Module Name
              </label>
              <Controller
                control={createModuleForm.control}
                name='name'
                render={({ field: { value, onChange } }) => (
                  <Input
                    fullWidth
                    id='name'
                    defaultValue={value}
                    onChange={onChange}
                    placeholder='Module Name'
                    variant='filled'
                    style={{ marginTop: '4px' }}
                  />
                )}
              />
              {createModuleForm.formState.errors.name && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {createModuleForm.formState.errors.name.message}
                </FormHelperText>
              )}
            </Box>
            <Box sx={{ marginTop: 5 }}>
              <label htmlFor='description' style={{ display: 'block' }}>
                Description
              </label>
              <Controller
                control={createModuleForm.control}
                name='description'
                render={({ field: { value, onChange } }) => (
                  <Textarea
                    id='description'
                    defaultValue={value}
                    onChange={onChange}
                    placeholder='Module Description'
                    style={{ marginTop: '4px' }}
                    fullWidth
                  />
                )}
              />
              {createModuleForm.formState.errors.description && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {createModuleForm.formState.errors.description.message}
                </FormHelperText>
              )}
            </Box>
            <Box sx={{ marginTop: 5 }}>
              <label style={{ display: 'block' }}>Icon</label>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                  maxHeight: 300,
                  overflowY: 'auto',
                  gap: 4,
                  mt: 2
                }}
              >
                {icons.map(icon => (
                  <Button
                    key={icon}
                    variant={moduleIconCreate === icon ? 'contained' : 'outlined'}
                    size='large'
                    onClick={() => {
                      setChooseAnotherIconModuleCreateChecked(false)
                      createModuleForm.setValue('icon', icon)
                    }}
                    content='iconOnly'
                    icon={icon}
                  />
                ))}
              </Box>
              <FormControlLabel
                control={
                  <MuiCheckbox
                    onChange={(_, checked) => {
                      if (checked) {
                        createModuleForm.setValue('icon', '')
                      }

                      setChooseAnotherIconModuleCreateChecked(checked)
                    }}
                  />
                }
                label='I want to choose different icon'
                checked={chooseAnotherIconModuleCreateChecked}
              />

              {chooseAnotherIconModuleCreateChecked ? (
                <>
                  <Controller
                    control={createModuleForm.control}
                    name='icon'
                    render={({ field: { value, onChange } }) => (
                      <Input
                        fullWidth
                        defaultValue={value}
                        onChange={onChange}
                        placeholder='icon-prefix:icon-name'
                        variant='filled'
                        style={{ marginTop: '4px' }}
                      />
                    )}
                  />
                  <Typography variant='body2' sx={{ mt: 2 }}>
                    You can find icon prefixes and names in{' '}
                    <Link href='https://icon-sets.iconify.design' target='_blank'>
                      here
                    </Link>
                  </Typography>
                </>
              ) : null}
            </Box>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'center',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <Button
              variant='outlined'
              content='textOnly'
              text='Cancel'
              size='medium'
              color='secondary'
              onClick={() => setCreateModuleModalOpen(false)}
            />
            <Button
              variant='contained'
              content='textOnly'
              text='Submit'
              size='medium'
              type='submit'
              disabled={createModuleForm.formState.isSubmitting}
              loading={createModuleForm.formState.isSubmitting}
            />
          </DialogActions>
        </form>
      </Dialog>
      <Dialog
        fullWidth
        open={createClusterModalOpen}
        maxWidth='md'
        scroll='body'
        onClose={() => setCreateClusterModalOpen(false)}
      >
        <form onSubmit={createClusterForm.handleSubmit(onCreateClusterSubmit)}>
          <DialogContent
            sx={{
              position: 'relative',
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <IconButton
              size='small'
              onClick={() => setCreateClusterModalOpen(false)}
              sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
            >
              <Icon icon='tabler:x' />
            </IconButton>
            <Box sx={{ mb: 8, textAlign: 'center' }}>
              <Typography variant='h5' sx={{ mb: 3 }}>
                Create Cluster
              </Typography>
              <Typography variant='body2'>Create Cluster for Manufacturing Data Platform</Typography>
            </Box>
            <Box>
              <label htmlFor='code' style={{ display: 'block' }}>
                Cluster Code
              </label>
              <Controller
                control={createClusterForm.control}
                name='code'
                render={({ field: { value, onChange } }) => (
                  <Input
                    fullWidth
                    id='code'
                    defaultValue={value}
                    onChange={onChange}
                    placeholder='Cluster Code'
                    variant='filled'
                    style={{ marginTop: '4px' }}
                  />
                )}
              />
              {createClusterForm.formState.errors.code && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {createClusterForm.formState.errors.code.message}
                </FormHelperText>
              )}
            </Box>
            <Box sx={{ marginTop: 5 }}>
              <label htmlFor='name' style={{ display: 'block' }}>
                Cluster Name
              </label>
              <Controller
                control={createClusterForm.control}
                name='name'
                render={({ field: { value, onChange } }) => (
                  <Input
                    fullWidth
                    id='name'
                    defaultValue={value}
                    onChange={onChange}
                    placeholder='Cluster Name'
                    variant='filled'
                    style={{ marginTop: '4px' }}
                  />
                )}
              />
              {createClusterForm.formState.errors.name && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {createClusterForm.formState.errors.name.message}
                </FormHelperText>
              )}
            </Box>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'center',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <Button
              variant='outlined'
              content='textOnly'
              text='Cancel'
              color='secondary'
              size='medium'
              onClick={() => setCreateClusterModalOpen(false)}
            />
            <Button
              size='medium'
              variant='contained'
              content='textOnly'
              text='Submit'
              type='submit'
              disabled={createClusterForm.formState.isSubmitting}
              loading={createClusterForm.formState.isSubmitting}
            />
          </DialogActions>
        </form>
      </Dialog>
      <Dialog
        fullWidth
        open={createPageModalOpen}
        maxWidth='md'
        scroll='body'
        onClose={() => setCreatePageModalOpen(false)}
      >
        <form onSubmit={createPageForm.handleSubmit(onCreatePageSubmit)}>
          <DialogContent
            sx={{
              position: 'relative',
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <IconButton
              size='small'
              onClick={() => setCreatePageModalOpen(false)}
              sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
            >
              <Icon icon='tabler:x' />
            </IconButton>
            <Box sx={{ mb: 8, textAlign: 'center' }}>
              <Typography variant='h5' sx={{ mb: 3 }}>
                Create Page
              </Typography>
              <Typography variant='body2'>Create Page for Manufacturing Data Platform</Typography>
            </Box>
            <Box>
              <label htmlFor='code' style={{ display: 'block' }}>
                Page Code
              </label>
              <Controller
                control={createPageForm.control}
                name='code'
                render={({ field: { value, onChange } }) => (
                  <Input
                    fullWidth
                    id='code'
                    defaultValue={value}
                    onChange={onChange}
                    placeholder='Page Code'
                    variant='filled'
                    style={{ marginTop: '4px' }}
                  />
                )}
              />
              {createPageForm.formState.errors.code && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {createPageForm.formState.errors.code.message}
                </FormHelperText>
              )}
            </Box>
            <Box sx={{ marginTop: 5 }}>
              <label htmlFor='name' style={{ display: 'block' }}>
                Display Name
              </label>
              <Controller
                control={createPageForm.control}
                name='name'
                render={({ field: { value, onChange } }) => (
                  <Input
                    fullWidth
                    id='name'
                    defaultValue={value}
                    onChange={onChange}
                    placeholder='Display Name'
                    variant='filled'
                    style={{ marginTop: '4px' }}
                  />
                )}
              />
              {createPageForm.formState.errors.name && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {createPageForm.formState.errors.name.message}
                </FormHelperText>
              )}
            </Box>
            <Box sx={{ marginTop: 5 }}>
              <label style={{ display: 'block' }}>Icon</label>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                  maxHeight: 300,
                  overflowY: 'auto',
                  gap: 4,
                  mt: 2
                }}
              >
                {icons.map(icon => (
                  <Button
                    key={icon}
                    variant={pageIconCreate === icon ? 'contained' : 'outlined'}
                    size='large'
                    onClick={() => {
                      setChooseAnotherIconPageCreateChecked(false)
                      createPageForm.setValue('icon', icon)
                    }}
                    content='iconOnly'
                    icon={icon}
                  />
                ))}
              </Box>
              <FormControlLabel
                control={
                  <MuiCheckbox
                    onChange={(_, checked) => {
                      if (checked) {
                        createPageForm.setValue('icon', '')
                      }

                      setChooseAnotherIconPageCreateChecked(checked)
                    }}
                  />
                }
                label='I want to choose different icon'
                checked={chooseAnotherIconPageCreateChecked}
              />

              {chooseAnotherIconPageCreateChecked ? (
                <>
                  <Controller
                    control={createPageForm.control}
                    name='icon'
                    render={({ field: { value, onChange } }) => (
                      <Input
                        fullWidth
                        defaultValue={value}
                        onChange={onChange}
                        placeholder='icon-prefix:icon-name'
                        variant='filled'
                        style={{ marginTop: '4px' }}
                      />
                    )}
                  />
                  <Typography variant='body2' sx={{ mt: 2 }}>
                    You can find icon prefixes and names in{' '}
                    <Link href='https://icon-sets.iconify.design' target='_blank'>
                      here
                    </Link>
                  </Typography>
                </>
              ) : null}
            </Box>
            <Box sx={{ marginTop: 5 }}>
              <label htmlFor='type' style={{ display: 'block' }}>
                Type
              </label>
              <Controller
                control={createPageForm.control}
                name='type'
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    id='type'
                    options={['page', 'sub-page']}
                    value={value}
                    onChange={(_, selectedValue) => onChange(selectedValue)}
                    style={{ marginTop: '4px' }}
                    renderInput={params => <Input {...params} variant='filled' placeholder='Type' />}
                  />
                )}
              />
              {createPageForm.formState.errors.type && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {createPageForm.formState.errors.type.message}
                </FormHelperText>
              )}
            </Box>

            <Controller
              control={createPageForm.control}
              name='products'
              defaultValue={[]}
              render={({ field: { onChange, ...restField }, fieldState }) => (
                <Box sx={{ marginTop: 5 }}>
                  <label htmlFor={restField.name} style={{ display: 'block' }}>
                    Products
                  </label>

                  <Autocomplete
                    multiple
                    loading={products.isLoading}
                    options={productOptions}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    style={{ marginTop: '4px' }}
                    renderInput={params => <Input {...params} variant='filled' placeholder='Products' />}
                    id={restField.name}
                    {...restField}
                    onChange={(_, selectedValue) => onChange(selectedValue)}
                  />

                  {fieldState.invalid ? (
                    <FormHelperText sx={{ color: 'error.main' }}>{fieldState.error?.message}</FormHelperText>
                  ) : null}
                </Box>
              )}
            />
            <Box sx={{ marginTop: 5 }}>
              <label htmlFor='url' style={{ display: 'block' }}>
                Link (Next.js pathname / URL)
              </label>
              <Controller
                control={createPageForm.control}
                name='url'
                render={({ field: { value, onChange } }) => (
                  <>
                    <Input
                      fullWidth
                      id='url'
                      defaultValue={value}
                      onChange={onChange}
                      placeholder='Link'
                      variant='filled'
                      style={{ marginTop: '4px' }}
                    />

                    {value && isValidHttpUrl(value) ? (
                      <iframe src={value} style={{ marginTop: '10px', width: '100%', height: '300px', border: 0 }} />
                    ) : null}
                  </>
                )}
              />
              {createPageForm.formState.errors.url && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {createPageForm.formState.errors.url.message}
                </FormHelperText>
              )}
            </Box>

            <Box sx={{ marginTop: 5 }}>
              <Controller
                control={createPageForm.control}
                name='is_external_src'
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <MuiCheckbox {...field} checked={field.value} onChange={e => field.onChange(e.target.checked)} />
                    }
                    label='Use External Source'
                  />
                )}
              />
            </Box>

            <Box>
              <Controller
                control={createPageForm.control}
                name='is_main_page'
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <MuiCheckbox {...field} checked={field.value} onChange={e => field.onChange(e.target.checked)} />
                    }
                    label='Set as the main page for the selected products'
                  />
                )}
              />
            </Box>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'center',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <Button
              variant='outlined'
              content='textOnly'
              text='Cancel'
              color='secondary'
              size='medium'
              onClick={() => setCreatePageModalOpen(false)}
            />
            <Button
              variant='contained'
              content='textOnly'
              text='Submit'
              size='medium'
              type='submit'
              disabled={createPageForm.formState.isSubmitting}
              loading={createPageForm.formState.isSubmitting}
            />
          </DialogActions>
        </form>
      </Dialog>
      <Dialog
        fullWidth
        open={editModuleModalOpen}
        maxWidth='md'
        scroll='body'
        onClose={() => setEditModuleModalOpen(false)}
      >
        <form onSubmit={editModuleForm.handleSubmit(onEditModuleSubmit)}>
          <DialogContent
            sx={{
              position: 'relative',
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <IconButton
              size='small'
              onClick={() => setEditModuleModalOpen(false)}
              sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
            >
              <Icon icon='tabler:x' />
            </IconButton>
            <Box sx={{ mb: 8, textAlign: 'center' }}>
              <Typography variant='h5' sx={{ mb: 3 }}>
                Edit Module
              </Typography>
              <Typography variant='body2'>Edit Module for Manufacturing Data Platform</Typography>
            </Box>
            <Box>
              <label htmlFor='code' style={{ display: 'block' }}>
                Module Code
              </label>
              <Controller
                control={editModuleForm.control}
                name='code'
                render={({ field: { value, onChange } }) => (
                  <Input
                    fullWidth
                    id='code'
                    defaultValue={value}
                    onChange={onChange}
                    placeholder='Module Code'
                    variant='filled'
                    style={{ marginTop: '4px' }}
                  />
                )}
              />
              {editModuleForm.formState.errors.code && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {editModuleForm.formState.errors.code.message}
                </FormHelperText>
              )}
            </Box>
            <Box sx={{ marginTop: 5 }}>
              <label htmlFor='name' style={{ display: 'block' }}>
                Module Name
              </label>
              <Controller
                control={editModuleForm.control}
                name='name'
                render={({ field: { value, onChange } }) => (
                  <Input
                    fullWidth
                    id='name'
                    defaultValue={value}
                    onChange={onChange}
                    placeholder='Module Name'
                    variant='filled'
                    style={{ marginTop: '4px' }}
                  />
                )}
              />
              {editModuleForm.formState.errors.name && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {editModuleForm.formState.errors.name.message}
                </FormHelperText>
              )}
            </Box>
            <Box sx={{ marginTop: 5 }}>
              <label htmlFor='description' style={{ display: 'block' }}>
                Description
              </label>
              <Controller
                control={editModuleForm.control}
                name='description'
                render={({ field: { value, onChange } }) => (
                  <Textarea
                    id='description'
                    defaultValue={value}
                    onChange={onChange}
                    placeholder='Module Description'
                    style={{ marginTop: '4px' }}
                    fullWidth
                  />
                )}
              />
              {editModuleForm.formState.errors.description && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {editModuleForm.formState.errors.description.message}
                </FormHelperText>
              )}
            </Box>
            <Box sx={{ marginTop: 5 }}>
              <label style={{ display: 'block' }}>Icon</label>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                  maxHeight: 300,
                  overflowY: 'auto',
                  gap: 4,
                  mt: 2
                }}
              >
                {icons.map(icon => (
                  <Button
                    key={icon}
                    variant={moduleIconEdit === icon ? 'contained' : 'outlined'}
                    size='large'
                    onClick={() => {
                      setChooseAnotherIconModuleEditChecked(false)
                      editModuleForm.setValue('icon', icon)
                    }}
                    content='iconOnly'
                    icon={icon}
                  />
                ))}
              </Box>
              <FormControlLabel
                control={
                  <MuiCheckbox
                    onChange={(_, checked) => {
                      if (checked) {
                        editModuleForm.setValue('icon', '')
                      }

                      setChooseAnotherIconModuleEditChecked(checked)
                    }}
                  />
                }
                label='I want to choose different icon'
                checked={chooseAnotherIconModuleEditChecked}
              />

              {chooseAnotherIconModuleEditChecked ? (
                <>
                  <Controller
                    control={editModuleForm.control}
                    name='icon'
                    render={({ field: { value, onChange } }) => (
                      <Input
                        fullWidth
                        defaultValue={value}
                        onChange={onChange}
                        placeholder='icon-prefix:icon-name'
                        variant='filled'
                        style={{ marginTop: '4px' }}
                      />
                    )}
                  />
                  <Typography variant='body2' sx={{ mt: 2 }}>
                    You can find icon prefixes and names in{' '}
                    <Link href='https://icon-sets.iconify.design' target='_blank'>
                      here
                    </Link>
                  </Typography>
                </>
              ) : null}
            </Box>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'center',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <Button
              variant='outlined'
              content='textOnly'
              text='Cancel'
              size='medium'
              color='secondary'
              onClick={() => setEditModuleModalOpen(false)}
            />
            <Button
              variant='contained'
              content='textOnly'
              text='Submit'
              size='medium'
              type='submit'
              disabled={editModuleForm.formState.isSubmitting}
              loading={editModuleForm.formState.isSubmitting}
            />
          </DialogActions>
        </form>
      </Dialog>
      <Dialog
        fullWidth
        open={deleteModuleModalOpen}
        maxWidth='xs'
        scroll='body'
        onClose={() => setDeleteModuleModalOpen(false)}
      >
        <DialogContent
          sx={{
            position: 'relative',
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <IconButton
            size='small'
            onClick={() => setDeleteModuleModalOpen(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='tabler:x' />
          </IconButton>

          <div style={{ textAlign: 'center' }}>
            <Icon icon='mdi:cancel-circle-outline' fontSize='80px' color={palette.error[200]} />
            <Typography variant='h4' sx={{ mt: 3 }}>
              Are you sure?
            </Typography>
            <Typography variant='labelMd' sx={{ mt: 1, display: 'block' }}>
              You won’t be able to revert this!
            </Typography>
            <DialogActions
              sx={{
                justifyContent: 'center',
                mt: '31px'
              }}
            >
              <Button
                variant='outlined'
                content='textOnly'
                text='Cancel'
                color='secondary'
                size='medium'
                onClick={() => setDeleteModuleModalOpen(false)}
              />
              <Button
                variant='contained'
                content='textOnly'
                text='Yes, delete it'
                color='error'
                size='medium'
                disabled={deleteModuleMutation.isLoading || deleteModuleMutation.isSuccess}
                onClick={() => {
                  if (!selectedModuleId) {
                    return
                  }

                  deleteModuleMutation.mutate(selectedModuleId, {
                    onSuccess: async () => {
                      await queryClient.invalidateQueries()
                      setDeleteModuleModalOpen(false)
                      setSelectedModuleId(null)
                      deleteModuleMutation.reset()
                    }
                  })
                }}
                loading={deleteModuleMutation.isLoading || deleteModuleMutation.isSuccess}
              />
            </DialogActions>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth
        open={editClusterModalOpen}
        maxWidth='md'
        scroll='body'
        onClose={() => setEditClusterModalOpen(false)}
      >
        <form onSubmit={editClusterForm.handleSubmit(onEditClusterSubmit)}>
          <DialogContent
            sx={{
              position: 'relative',
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <IconButton
              size='small'
              onClick={() => setEditClusterModalOpen(false)}
              sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
            >
              <Icon icon='tabler:x' />
            </IconButton>
            <Box sx={{ mb: 8, textAlign: 'center' }}>
              <Typography variant='h5' sx={{ mb: 3 }}>
                Edit Cluster
              </Typography>
              <Typography variant='body2'>Edit Cluster for Manufacturing Data Platform</Typography>
            </Box>
            <Box>
              <label htmlFor='code' style={{ display: 'block' }}>
                Cluster Code
              </label>
              <Controller
                control={editClusterForm.control}
                name='code'
                render={({ field: { value, onChange } }) => (
                  <Input
                    fullWidth
                    id='code'
                    defaultValue={value}
                    onChange={onChange}
                    placeholder='Cluster Code'
                    variant='filled'
                    style={{ marginTop: '4px' }}
                  />
                )}
              />
              {editClusterForm.formState.errors.code && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {editClusterForm.formState.errors.code.message}
                </FormHelperText>
              )}
            </Box>
            <Box sx={{ marginTop: 5 }}>
              <label htmlFor='name' style={{ display: 'block' }}>
                Cluster Name
              </label>
              <Controller
                control={editClusterForm.control}
                name='name'
                render={({ field: { value, onChange } }) => (
                  <Input
                    fullWidth
                    id='name'
                    defaultValue={value}
                    onChange={onChange}
                    placeholder='Cluster Name'
                    variant='filled'
                    style={{ marginTop: '4px' }}
                  />
                )}
              />
              {editClusterForm.formState.errors.name && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {editClusterForm.formState.errors.name.message}
                </FormHelperText>
              )}
            </Box>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'center',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <Button
              variant='outlined'
              content='textOnly'
              text='Cancel'
              color='secondary'
              size='medium'
              onClick={() => setEditClusterModalOpen(false)}
            />
            <Button
              variant='contained'
              content='textOnly'
              text='Submit'
              size='medium'
              type='submit'
              disabled={editClusterForm.formState.isSubmitting}
              loading={editClusterForm.formState.isSubmitting}
            />
          </DialogActions>
        </form>
      </Dialog>
      <Dialog
        fullWidth
        open={deleteClusterModalOpen}
        maxWidth='xs'
        scroll='body'
        onClose={() => setDeleteClusterModalOpen(false)}
      >
        <DialogContent
          sx={{
            position: 'relative',
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <IconButton
            size='small'
            onClick={() => setDeleteClusterModalOpen(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='tabler:x' />
          </IconButton>

          <div style={{ textAlign: 'center' }}>
            <Icon icon='mdi:cancel-circle-outline' fontSize='80px' color={palette.error[200]} />
            <Typography variant='h4' sx={{ mt: 3 }}>
              Are you sure?
            </Typography>
            <Typography variant='labelMd' sx={{ mt: 1, display: 'block' }}>
              You won’t be able to revert this!
            </Typography>
            <DialogActions
              sx={{
                justifyContent: 'center',
                mt: '31px'
              }}
            >
              <Button
                variant='outlined'
                content='textOnly'
                text='Cancel'
                color='secondary'
                size='medium'
                onClick={() => setDeleteClusterModalOpen(false)}
              />
              <Button
                variant='contained'
                content='textOnly'
                text='Yes, delete it'
                color='error'
                size='medium'
                disabled={deleteClusterMutation.isLoading || deleteClusterMutation.isSuccess}
                onClick={() => {
                  if (!selectedClusterId) {
                    return
                  }

                  deleteClusterMutation.mutate(selectedClusterId, {
                    onSuccess: async () => {
                      await queryClient.invalidateQueries()
                      setDeleteClusterModalOpen(false)
                      setSelectedClusterId(null)
                      deleteClusterMutation.reset()
                    }
                  })
                }}
                loading={deleteClusterMutation.isLoading || deleteClusterMutation.isSuccess}
              />
            </DialogActions>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth
        open={detailPageModalOpen}
        maxWidth='md'
        scroll='body'
        onClose={() => setDetailPageModalOpen(false)}
      >
        <DialogContent
          sx={{
            position: 'relative',
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <IconButton
            size='small'
            onClick={() => setDetailPageModalOpen(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='tabler:x' />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Page Detail
            </Typography>
          </Box>
          <Box>
            <label htmlFor='code' style={{ display: 'block' }}>
              Page Code
            </label>
            <Input
              fullWidth
              id='code'
              value={selectedPage?.code}
              disabled
              placeholder='Page Code'
              variant='filled'
              style={{ marginTop: '4px' }}
            />
          </Box>
          <Box sx={{ marginTop: 5 }}>
            <label htmlFor='name' style={{ display: 'block' }}>
              Display Name
            </label>
            <Input
              fullWidth
              id='name'
              value={selectedPage?.name}
              disabled
              placeholder='Display Name'
              variant='filled'
              style={{ marginTop: '4px' }}
            />
          </Box>
          <Box sx={{ marginTop: 5 }}>
            <label style={{ display: 'block' }}>Icon</label>
            {selectedPage?.icon ? (
              <Box sx={{ mt: 2 }}>
                <Icon icon={selectedPage.icon} fontSize='1.75rem' />
              </Box>
            ) : null}
          </Box>
          <Box sx={{ marginTop: 5 }}>
            <label htmlFor='type' style={{ display: 'block' }}>
              Type
            </label>

            <Autocomplete
              id='type'
              options={['page', 'sub-page']}
              value={selectedPage?.type}
              style={{ marginTop: '4px' }}
              disabled
              renderInput={params => <Input {...params} variant='filled' placeholder='Type' />}
            />
          </Box>
          <Box sx={{ marginTop: 5 }}>
            <label htmlFor='products' style={{ display: 'block' }}>
              Products
            </label>
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', columnGap: 1 }}>
              {selectedPage
                ? selectedPage.products.map(product => (
                    <Chip key={product.id} label={product.product.name} variant='filled' color='primary' />
                  ))
                : null}
            </Box>
          </Box>
          <Box sx={{ marginTop: 5 }}>
            <label htmlFor='url' style={{ display: 'block' }}>
              Link (Next.js pathname / URL)
            </label>
            <Input
              fullWidth
              id='url'
              value={selectedPage?.url}
              disabled
              placeholder='Link'
              variant='filled'
              style={{ marginTop: '4px' }}
            />

            {selectedPage?.url && isValidHttpUrl(selectedPage.url) ? (
              <iframe src={selectedPage.url} style={{ marginTop: '10px', width: '100%', height: '300px', border: 0 }} />
            ) : null}
          </Box>
          <Box sx={{ marginTop: 5 }}>
            <FormControlLabel
              disabled
              control={<MuiCheckbox />}
              checked={selectedPage?.is_external_src}
              label='Use External Source'
            />
          </Box>

          <Box>
            <FormControlLabel
              disabled
              control={<MuiCheckbox />}
              checked={Boolean(selectedPage?.products.map(p => p.product.main_page).find(p => p === selectedPageId))}
              label='Set as the main page for the selected products'
            />
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth
        open={editPageModalOpen}
        maxWidth='md'
        scroll='body'
        onClose={() => setEditPageModalOpen(false)}
      >
        <form onSubmit={editPageForm.handleSubmit(onEditPageSubmit)}>
          <DialogContent
            sx={{
              position: 'relative',
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <IconButton
              size='small'
              onClick={() => setEditPageModalOpen(false)}
              sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
            >
              <Icon icon='tabler:x' />
            </IconButton>
            <Box sx={{ mb: 8, textAlign: 'center' }}>
              <Typography variant='h5' sx={{ mb: 3 }}>
                Edit Page
              </Typography>
              <Typography variant='body2'>Edit Page for Manufacturing Data Platform</Typography>
            </Box>
            <Box>
              <label htmlFor='code' style={{ display: 'block' }}>
                Page Code
              </label>
              <Controller
                control={editPageForm.control}
                name='code'
                render={({ field: { value, onChange } }) => (
                  <Input
                    fullWidth
                    id='code'
                    defaultValue={value}
                    onChange={onChange}
                    placeholder='Page Code'
                    variant='filled'
                    style={{ marginTop: '4px' }}
                  />
                )}
              />
              {editPageForm.formState.errors.code && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {editPageForm.formState.errors.code.message}
                </FormHelperText>
              )}
            </Box>
            <Box sx={{ marginTop: 5 }}>
              <label htmlFor='name' style={{ display: 'block' }}>
                Display Name
              </label>
              <Controller
                control={editPageForm.control}
                name='name'
                render={({ field: { value, onChange } }) => (
                  <Input
                    fullWidth
                    id='name'
                    defaultValue={value}
                    onChange={onChange}
                    placeholder='Display Name'
                    variant='filled'
                    style={{ marginTop: '4px' }}
                  />
                )}
              />
              {editPageForm.formState.errors.name && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {editPageForm.formState.errors.name.message}
                </FormHelperText>
              )}
            </Box>
            <Box sx={{ marginTop: 5 }}>
              <label style={{ display: 'block' }}>Menu Icon</label>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                  maxHeight: 300,
                  overflowY: 'auto',
                  gap: 4,
                  mt: 2
                }}
              >
                {icons.map(icon => (
                  <Button
                    key={icon}
                    variant={pageIconEdit === icon ? 'contained' : 'outlined'}
                    size='large'
                    onClick={() => {
                      setChooseAnotherIconPageEditChecked(false)
                      editPageForm.setValue('icon', icon)
                    }}
                    content='iconOnly'
                    icon={icon}
                  />
                ))}
              </Box>
              <FormControlLabel
                control={
                  <MuiCheckbox
                    onChange={(_, checked) => {
                      if (checked) {
                        editPageForm.setValue('icon', '')
                      }

                      setChooseAnotherIconPageEditChecked(checked)
                    }}
                  />
                }
                label='I want to choose different icon'
                checked={chooseAnotherIconPageEditChecked}
              />

              {chooseAnotherIconPageEditChecked ? (
                <>
                  <Controller
                    control={editPageForm.control}
                    name='icon'
                    render={({ field: { value, onChange } }) => (
                      <Input
                        fullWidth
                        defaultValue={value}
                        onChange={onChange}
                        placeholder='icon-prefix:icon-name'
                        variant='filled'
                        style={{ marginTop: '4px' }}
                      />
                    )}
                  />
                  <Typography variant='body2' sx={{ mt: 2 }}>
                    You can find icon prefixes and names in{' '}
                    <Link href='https://icon-sets.iconify.design' target='_blank'>
                      here
                    </Link>
                  </Typography>
                </>
              ) : null}
            </Box>
            <Box sx={{ marginTop: 5 }}>
              <label htmlFor='type' style={{ display: 'block' }}>
                Type
              </label>
              <Controller
                control={editPageForm.control}
                name='type'
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    id='type'
                    options={['page', 'sub-page']}
                    value={value}
                    onChange={(_, selectedValue) => onChange(selectedValue)}
                    style={{ marginTop: '4px' }}
                    renderInput={params => <Input {...params} variant='filled' placeholder='Type' />}
                  />
                )}
              />
              {editPageForm.formState.errors.type && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {editPageForm.formState.errors.type.message}
                </FormHelperText>
              )}
            </Box>

            <Controller
              control={editPageForm.control}
              name='products'
              defaultValue={[]}
              render={({ field: { onChange, ...restField }, fieldState }) => (
                <Box sx={{ marginTop: 5 }}>
                  <label htmlFor={restField.name} style={{ display: 'block' }}>
                    Products
                  </label>

                  <Autocomplete
                    multiple
                    loading={products.isLoading}
                    options={productOptions}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    style={{ marginTop: '4px' }}
                    renderInput={params => <Input {...params} variant='filled' placeholder='Products' />}
                    id={restField.name}
                    {...restField}
                    onChange={(_, selectedValue) => onChange(selectedValue)}
                  />

                  {fieldState.invalid ? (
                    <FormHelperText sx={{ color: 'error.main' }}>{fieldState.error?.message}</FormHelperText>
                  ) : null}
                </Box>
              )}
            />

            <Box sx={{ marginTop: 5 }}>
              <label htmlFor='url' style={{ display: 'block' }}>
                Link (Next.js pathname / URL)
              </label>
              <Controller
                control={editPageForm.control}
                name='url'
                render={({ field: { value, onChange } }) => (
                  <>
                    <Input
                      fullWidth
                      id='url'
                      defaultValue={value}
                      onChange={onChange}
                      placeholder='Link'
                      variant='filled'
                      style={{ marginTop: '4px' }}
                    />

                    {value && isValidHttpUrl(value) ? (
                      <iframe src={value} style={{ marginTop: '10px', width: '100%', height: '300px', border: 0 }} />
                    ) : null}
                  </>
                )}
              />
              {editPageForm.formState.errors.url && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {editPageForm.formState.errors.url.message}
                </FormHelperText>
              )}
            </Box>
            <Box sx={{ marginTop: 5 }}>
              <Controller
                control={editPageForm.control}
                name='is_external_src'
                render={({ field }) => (
                  <>
                    <FormControlLabel
                      control={
                        <MuiCheckbox
                          {...field}
                          checked={field.value}
                          onChange={e => field.onChange(e.target.checked)}
                        />
                      }
                      label='Use External Source'
                    />
                  </>
                )}
              />
            </Box>

            <Box>
              <Controller
                control={editPageForm.control}
                name='is_main_page'
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <MuiCheckbox {...field} checked={field.value} onChange={e => field.onChange(e.target.checked)} />
                    }
                    label='Set as the main page for the selected products'
                  />
                )}
              />
            </Box>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'center',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <Button
              variant='outlined'
              content='textOnly'
              text='Cancel'
              color='secondary'
              size='medium'
              onClick={() => setEditPageModalOpen(false)}
            />
            <Button
              variant='contained'
              content='textOnly'
              text='Submit'
              type='submit'
              size='medium'
              disabled={editPageForm.formState.isSubmitting}
              loading={editPageForm.formState.isSubmitting}
            />
          </DialogActions>
        </form>
      </Dialog>
      <Dialog
        fullWidth
        open={deletePageModalOpen}
        maxWidth='xs'
        scroll='body'
        onClose={() => setDeletePageModalOpen(false)}
      >
        <DialogContent
          sx={{
            position: 'relative',
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <IconButton
            size='small'
            onClick={() => setDeletePageModalOpen(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='tabler:x' />
          </IconButton>

          <div style={{ textAlign: 'center' }}>
            <Icon icon='mdi:cancel-circle-outline' fontSize='80px' color={palette.error[200]} />
            <Typography variant='h4' sx={{ mt: 3 }}>
              Are you sure?
            </Typography>
            <Typography variant='labelMd' sx={{ mt: 1, display: 'block' }}>
              You won’t be able to revert this!
            </Typography>
            <DialogActions
              sx={{
                justifyContent: 'center',
                mt: '31px'
              }}
            >
              <Button
                variant='outlined'
                content='textOnly'
                text='Cancel'
                color='secondary'
                size='medium'
                onClick={() => setDeletePageModalOpen(false)}
              />
              <Button
                variant='contained'
                content='textOnly'
                text='Yes, delete it'
                color='error'
                size='medium'
                disabled={deletePageMutation.isLoading || deletePageMutation.isSuccess}
                onClick={() => {
                  if (!selectedPageId) {
                    return
                  }

                  deletePageMutation.mutate(selectedPageId, {
                    onSuccess: async () => {
                      await queryClient.invalidateQueries()
                      setDeletePageModalOpen(false)
                      setSelectedPageId(null)
                      deletePageMutation.reset()
                    }
                  })
                }}
                loading={deletePageMutation.isLoading || deletePageMutation.isSuccess}
              />
            </DialogActions>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ModulePage
