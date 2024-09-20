/** React imports */
import * as React from 'react'
import { useForm } from 'react-hook-form'

/** MUI import */
import { Box } from '@mui/material'

/** Component imports */
import { FormOneRow } from './custom/FormOneRow'
import { FormTwoRow } from './custom/FormTwoRow'
import { FormTab } from './custom/FormTab'
import { FormAccordion } from './custom/FormAccordion'
import { FormStepper } from './custom/FormStepper'

/** React Hook Form imports */
import { yupResolver } from '@hookform/resolvers/yup'

/** Types imports */
import ExampleProps from '../types/Example.types'

/** Valiations imports */
import { exampleSchema } from '../validations'
import { createExample } from '../services/createExample.service'

/**
 * Lorem Ipsum is simply dummy text of the printing and typesetting industry.
 * Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
 * when an unknown printer took a galley of type and scrambled it to make a type specimen book.
 * It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
 * It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
 * and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
 */
export const Example: React.FC<ExampleProps> = ({ type = 'all' }: ExampleProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(exampleSchema)
  })

  const onSubmit = (data: any) => {
    console.log(data)
    const payload = data

    createExample(payload)
  }

  return (
    <main>
      <Box sx={{ display: 'grid', gap: 8 }}>
        {(type === 'all' || type === 'one') && (
          <FormOneRow errors={errors} control={control} handleSubmit={handleSubmit} onSubmit={onSubmit} />
        )}
        {(type === 'all' || type === 'two') && <FormTwoRow />}
        {(type === 'all' || type === 'tab') && <FormTab />}
        {(type === 'all' || type === 'accordion') && <FormAccordion />}
        {(type === 'all' || type === 'step') && <FormStepper />}
      </Box>
    </main>
  )
}
