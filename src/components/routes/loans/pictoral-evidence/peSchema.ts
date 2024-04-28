import { z } from 'zod'

const peS = z.object({
  date: z.date({ required_error: 'this field is required' }),
})

export { peS }
