import { Accordion } from '@/components/atoms'
import { FormFirst } from '../form/FormFirst'
import { FormSecond } from '../form/FormSecond'
import { Card, CardContent } from '@mui/material'

/**
 * Renders a form accordion component with multiple form sections.
 *
 * @return {JSX.Element} The rendered form accordion component.
 */
export const FormAccordion = () => {
  return (
    <Card>
      <CardContent>
        <Accordion
          data={[
            {
              content: <FormFirst />,
              title: 'Form One Row'
            },
            {
              content: <FormSecond />,
              title: 'Form Two Column'
            }
          ]}
        />
      </CardContent>
    </Card>
  )
}
