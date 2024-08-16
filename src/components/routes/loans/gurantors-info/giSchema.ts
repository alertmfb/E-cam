import { z } from 'zod'

const giS = z.object({
  business_name: z.string({ required_error: 'this field is required' }),
  registration_no: z.string({ required_error: 'this field is required' }),
  business_desc: z.string({ required_error: 'this field is required' }),
  monthly_salary: z.string({ required_error: 'this field is required' }),
  phone_number: z
    .string({ required_error: 'this field is required' })
    .min(11, { message: 'Invalid Phone Number' })
    .max(11, { message: 'Invalid Phone Number' }),
  business_address: z.string({ required_error: 'this field is required' }),
  business_landmark: z.string({ required_error: 'this field is required' }),
  //
  owner_name: z.string({ required_error: 'this field is required' }),
  sex: z.string({ required_error: 'this field is required' }),
  residence_address: z.string({ required_error: 'this field is required' }),
  house_landmark: z.string({ required_error: 'this field is required' }),
  house_ownership_status: z.string({
    required_error: 'this field is required',
  }),
  house_stay: z.string({ required_error: 'this field is required' }),
  house_desc: z.string({ required_error: 'this field is required' }),
  //
  customer_relationship: z.string({ required_error: 'this field is required' }),
  marital_status: z.string({ required_error: 'this field is required' }),
  religion: z.string({ required_error: 'this field is required' }),
  nationality: z.string({ required_error: 'this field is required' }),
  place_of_worship_name: z.string({ required_error: 'this field is required' }),
  place_of_worship_address: z.string({
    required_error: 'this field is required',
  }),
  place_of_worship_landmark: z.string({
    required_error: 'this field is required',
  }),
  //
  business_worth: z.string({ required_error: 'this field is required' }),
  goods_stock: z.string({ required_error: 'this field is required' }),
  monthly_sales: z.string({ required_error: 'this field is required' }),
  cost_of_goods_sold: z.string({ required_error: 'this field is required' }),
  gross_profit: z.string({ required_error: 'this field is required' }),
  operation_expenses: z.string({ required_error: 'this field is required' }),
  net_profit: z.string({ required_error: 'this field is required' }),
  instalment_amount: z.string({ required_error: 'this field is required' }),
  repayment_capacity: z.string({ required_error: 'this field is required' }),
  dsr: z.string({ required_error: 'this field is required' }),
})

export { giS }
