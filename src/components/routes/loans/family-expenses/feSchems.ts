import { z } from 'zod'

const feS = z.object({
  category: z.string({ required_error: 'this field is required' }),
  item: z.string({ required_error: 'this field is required' }),
  details: z.string({ required_error: 'this field is required' }),
  amount: z.string({ required_error: 'this field is required' }),
})
const faS = z.object({
  category: z.string({ required_error: 'this field is required' }),
  item: z.string({ required_error: 'this field is required' }),
  details: z.string({ required_error: 'this field is required' }),
  amount: z.string({ required_error: 'this field is required' }),
})

export { feS, faS }
