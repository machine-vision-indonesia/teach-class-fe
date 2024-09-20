import { format, sub } from 'date-fns'

type DateFilterObjParams = {
  field: string
  date: Date
}

export function dateFilterObj(params: DateFilterObjParams) {
  const gteDate = format(
    sub(params.date, {
      days: 1
    }),
    'yyyy-MM-dd'
  )

  const fields = params.field.split('.')
  const output: Record<string, any> = {}

  let currentObj = output
  for (let i = 0; i < fields.length; i++) {
    const key = fields[i]
    currentObj[key] = i === fields.length - 1 ? { _gte: `${gteDate}T17:00:00.000Z` } : {}
    currentObj = currentObj[key]
  }

  const lteDate = format(params.date, 'yyyy-MM-dd')

  const fields2 = params.field.split('.')
  const output2: Record<string, any> = {}

  let currentObj2 = output2
  for (let i = 0; i < fields2.length; i++) {
    const key = fields2[i]
    currentObj2[key] = i === fields2.length - 1 ? { _lte: `${lteDate}T17:00:00.000Z` } : {}
    currentObj2 = currentObj2[key]
  }

  return {
    _and: [output, output2]
  }
}

type DropdownMultipleFilterObjParams = {
  field: string
  value: any[]
}

export function dropdownMultipleFilterObj(params: DropdownMultipleFilterObjParams) {
  const fields = params.field.split('.')
  const output: Record<string, any> = {}

  let currentObj = output
  for (let i = 0; i < fields.length; i++) {
    const key = fields[i]
    currentObj[key] = i === fields.length - 1 ? { _in: params.value } : {}
    currentObj = currentObj[key]
  }

  return output
}

type SearchFilterObjParams = {
  fields: string[]
  value: string
}

export function searchFilterObj(params: SearchFilterObjParams) {
  return params.fields.map(field => {
    const fields = field.split('.')
    const output: Record<string, any> = {}

    let currentObj = output
    for (let i = 0; i < fields.length; i++) {
      const key = fields[i]
      currentObj[key] = i === fields.length - 1 ? { _icontains: params.value } : {}
      currentObj = currentObj[key]
    }

    return output
  })
}
