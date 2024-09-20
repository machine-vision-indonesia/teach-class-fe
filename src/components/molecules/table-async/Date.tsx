import { useAtom } from 'jotai'
import { DatePicker } from 'src/components/atoms/date-picker/DatePicker'
import { filterValuesAtom } from './atoms'
import { format } from 'date-fns'

type DateProps = {
  name: string
  field: string
}

export function Date(props: DateProps) {
  const [filterValues, setFilterValues] = useAtom(filterValuesAtom)
  const value = filterValues.find(filterValue => filterValue.name === props.name)?.values[0]?.value

  return (
    <DatePicker
      selected={value}
      onChange={date => {
        if (date) {
          const newFilterValues = filterValues.filter(filterValue => filterValue.name !== props.name)

          setFilterValues([
            ...newFilterValues,
            {
              name: props.name,
              type: 'date',
              field: props.field,
              values: [
                {
                  text: format(date, 'dd/MM/yyyy'),
                  value: date
                }
              ]
            }
          ])
        }
      }}
    />
  )
}
