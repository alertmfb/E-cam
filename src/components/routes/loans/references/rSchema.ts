import { z } from 'zod'

const rS = z.object({
  fullname: z.string({ required_error: 'this field is required' }),
  sex: z.string({ required_error: 'this field is required' }),
  home_address: z.string({ required_error: 'this field is required' }),
  business_name: z.string({ required_error: 'this field is required' }),
  business_nature: z.string({ required_error: 'this field is required' }),
  business_address: z.string({ required_error: 'this field is required' }),
  marital_status: z.string({ required_error: 'this field is required' }),
  relationship: z.string({ required_error: 'this field is required' }),
  phone_number: z.string({ required_error: 'this field is required' }),
  reference_person_comment: z.string({
    required_error: 'this field is required',
  }),
})

export { rS }
