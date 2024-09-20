import { Control, UseFormHandleSubmit, FieldErrors } from 'react-hook-form'

type FormData = {
  // Define your form data shape here
  name: string
  lastName: string
  description?: string | null
  phoneNumber?: string | null
}

export default interface ExampleProps {
  type: 'all' | 'one' | 'two' | 'step' | 'tab' | 'accordion'
}

export interface FormOneRowProps {
  control: Control<FormData>
  errors: FieldErrors<FormData>
  handleSubmit: UseFormHandleSubmit<FormData>
  onSubmit: (data: FormData) => void
}

export type GetListExampleResponse = {
  data: FormData
}
