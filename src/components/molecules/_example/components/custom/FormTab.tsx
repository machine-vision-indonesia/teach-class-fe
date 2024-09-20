import Tabs from '@/components/atoms/tabs'
import { FormTwoRow } from './FormTwoRow'
import { useState } from 'react'
import { FormFirst } from '../form/FormFirst'
import { Card, CardContent } from '@mui/material'

/**
 * Renders a form tab component.
 *
 * @return {JSX.Element} The rendered form tab component.
 */
export const FormTab = () => {
  const [value, setValue] = useState('0')
  const handleChange = (_value: string): void => {
    setValue(_value)
  }
  return (
    <Card>
      <CardContent>
        <Tabs
          value={value}
          onChange={handleChange}
          data={[
            {
              Label: 'Form One Row',
              content: <FormFirst />,
              icon: 'iconamoon:home'
            },
            {
              Label: 'Content',
              content: <FormTwoRow />,
              icon: 'system-uicons:paper'
            }
          ]}
        />
      </CardContent>
    </Card>
  )
}
