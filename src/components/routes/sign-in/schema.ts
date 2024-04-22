import { z } from 'zod'

const formSchema = z.object({
  email: z
    .string()
    .min(19, { message: 'not a valid email' })
    .max(60, { message: 'email too long' }),
  password: z
    .string()
    .min(8, { message: 'passworn too short' })
    .max(22, { message: 'password too long' }),
})

export { formSchema }
