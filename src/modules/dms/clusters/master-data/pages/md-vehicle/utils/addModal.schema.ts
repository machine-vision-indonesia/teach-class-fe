import { z } from "zod";

export const vehicleSchema = z.object({
    code: z.string({ required_error: 'This field is required.' }).trim().min(1, { message: 'This field is required.' }),
    name: z.string({ required_error: 'This field is required.' }).trim().min(1, { message: 'This field is required.' }),
    is_active: z.boolean().default(true),
    description: z.string().nullish()
  })