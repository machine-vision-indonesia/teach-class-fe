import { Stepper } from '@/components/molecules/stepper'
import { Card, CardContent } from '@mui/material'
import { FormFirst } from '../form/FormFirst'
import { FormSecond } from '../form/FormSecond'

/**
 * Renders a Form Stepper component with a Card, Stepper, FormFirst, and FormSecond components.
 *
 * @return {JSX.Element} The rendered Form Stepper component
 */
export const FormStepper = () => {
  return (
    <Card>
      <CardContent sx={{ display: 'grid', gap: 6 }}>
        <Stepper
          data={[
            {
              active: false,
              passed: true,
              subtitle: 'Description 0',
              title: 'Title 1'
            },
            {
              active: true,
              passed: false,
              subtitle: 'Description 1',
              title: 'Title 2'
            },
            {
              active: false,
              passed: false,
              subtitle: 'Description 2',
              title: 'Title 3'
            }
          ]}
          orientation='horizontal'
          size='small'
        />
        <FormFirst />
        <FormSecond />
      </CardContent>
    </Card>
  )
}
