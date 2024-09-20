import { IFilterResult } from '../../filter/types/filterResult.types'

const createNestedObject = (keyParts: string[], filterCondition: object): { [key: string]: any } => {
  if (keyParts.length === 1) {
    return { [keyParts[0]]: filterCondition }
  }
  const nestedKey = keyParts.shift()
  return { [nestedKey as string]: createNestedObject(keyParts, filterCondition) }
}

export function convertToFilterObject(filterResult: IFilterResult): object {
  const filterArray: any[] = []

  Object.keys(filterResult.resultController).forEach((key, index) => {
    const value = filterResult.resultController[key]

    if (Array.isArray(value)) {
      const arrayFilter = createNestedObject(key.split('.'), {
        _in: value.map(item => item.id || item)
      })
      filterArray.push(arrayFilter)
    } else if (value && value.startDate && value.endDate) {
      const dateFilter = createNestedObject(key.split('.'), {
        _between: [value.startDate, value.endDate]
      })
      filterArray.push(dateFilter)
    } else {
      const singleFilter = createNestedObject(key.split('.'), {
        _contains: value
      })
      filterArray.push(singleFilter)
    }
  })

  return {
    _and: filterArray
  }
}
