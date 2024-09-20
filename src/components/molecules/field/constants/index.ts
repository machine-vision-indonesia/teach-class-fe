import { createContext } from 'react'
import { FieldProps } from '../types/Field.types'

// Context for sharing props between compound components
export const FieldContext = createContext<Partial<FieldProps>>({})
