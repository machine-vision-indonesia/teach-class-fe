import { createAsyncThunk } from '@reduxjs/toolkit'
import { getData } from 'src/@core/utils/request'
import { IParams } from 'src/types/master/filter'

async function getModules() {
  const params: IParams = {
    fields: [
      'id',
      'code',
      'name',
      'description',
      'is_collapse',
      'base_path',
      'order',
      'is_default',
      'clusters.id',
      'clusters.code',
      'clusters.name',
      'clusters.is_active',
      'clusters.is_collapse',
      'clusters.order',
      'clusters.is_default',
      'clusters.pages.id',
      'clusters.pages.code',
      'clusters.pages.name',
      'clusters.pages.description',
      'clusters.pages.icon',
      'clusters.pages.url',
      'clusters.pages.is_collapse',
      'clusters.pages.type',
      'clusters.pages.status',
      'clusters.pages.platform',
      'clusters.pages.order',
      'clusters.pages.is_external_src',
      'clusters.pages.is_default',
      'clusters.pages.childrens.id',
      'clusters.pages.childrens.code',
      'clusters.pages.childrens.name',
      'clusters.pages.childrens.description',
      'clusters.pages.childrens.url',
      'clusters.pages.childrens.icon',
      'clusters.pages.childrens.is_collapse',
      'clusters.pages.childrens.type',
      'clusters.pages.childrens.status',
      'clusters.pages.childrens.platform',
      'clusters.pages.childrens.order',
      'clusters.pages.childrens.is_external_src',
      'clusters.pages.childrens.is_default',
      'clusters.module.id'
    ],
    filter: JSON.stringify({ code: { _neq: 'GE' } }),
    sort: ['order']
  }

  return await getData('/items/modules', params)
}

async function getPages() {
  const params: IParams = {
    fields: [
      'id',
      'code',
      'name',
      'description',
      'icon',
      'url',
      'is_collapse',
      'type',
      'status',
      'platform',
      'order',
      'is_external_src',
      'is_default',
      'childrens.id',
      'childrens.code',
      'childrens.name',
      'childrens.description',
      'childrens.icon',
      'childrens.url',
      'childrens.is_collapse',
      'childrens.type',
      'childrens.status',
      'childrens.platform',
      'childrens.order',
      'childrens.is_external_src',
      'childrens.is_default'
    ],
    filter: JSON.stringify({
      _and: [{ module: { code: { _eq: 'GE' } } }, { type: { _eq: 'page' } }]
    }),
    sort: ['order']
  }

  return await getData('/items/pages', params)
}

export const getModulesPages = createAsyncThunk('modules', async () => {
  const modules = await getModules()
  const pages = await getPages()

  return {
    modules: modules?.data.data,
    pages: pages?.data.data
  }
})
