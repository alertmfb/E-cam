import { z } from 'zod'

const gvS = z.object({
  date: z.date({ required_error: 'this field is required' }),
})

export { gvS }
