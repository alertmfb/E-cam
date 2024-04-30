import { z } from 'zod'

const laS = z.object({
  customer_name: z.string({ required_error: 'this field is required' }),
  customer_bvn: z
    .string({ required_error: 'this field is required' })
    .max(11, { message: 'invalid bvn' })
    .min(11, { message: 'invalid bvn' }),
})

export { laS }
