import { z } from 'zod'

const beS = z.object({
  category: z.string({ required_error: 'this field is required' }),
  item: z.string({ required_error: 'this field is required' }),
  details: z.string({ required_error: 'this field is required' }),
  amount: z.string({ required_error: 'this field is required' }),
})
const baS = z.object({
  category: z.string({ required_error: 'this field is required' }),
  item: z.string({ required_error: 'this field is required' }),
  details: z.string({ required_error: 'this field is required' }),
  amount: z.string({ required_error: 'this field is required' }),
})

export { beS, baS }
