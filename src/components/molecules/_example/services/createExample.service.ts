// ** validation imports
import { ExampleSchema } from '../validations'

// ** Other imports
import client from 'src/client'

export const createExample = (data: ExampleSchema) => {
  client.api.post('/items/mt_examples', data)
}
