import { z } from 'zod'

const loanActionSchema = z.object({
  approval_amount: z.string({ required_error: 'this field is required' }),
  approval_comment: z.string({ required_error: 'this field is required' }),
})

const loanRejectionSchema = z.object({
  rejection_comment: z.string({ required_error: 'this field is required' }),
})

export { loanActionSchema, loanRejectionSchema }
