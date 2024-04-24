import { z } from 'zod'

const lfS = z.object({
  email: z.string().email({ message: 'email is required' }),
  bvn: z.string().min(11, { message: 'bvn must be 11 digits' }).max(11),
  phone_number: z.string().min(11, { message: 'invalid phone number' }).max(13),
  business_name: z.string({ required_error: 'business name is required' }),
  nuban_no: z.string(),
  business_desc: z.string().min(1).max(500),
  business_address: z.string({
    required_error: 'business address is required',
  }),
  alert_discovery: z.string(),
  business_landmark: z.string(),
  name: z.string({ required_error: 'business owner name is required' }),
  sex: z.string({ required_error: 'sex is required' }),
  residence_address: z.string({
    required_error: 'residence address is required',
  }),
  residence_landmark: z.string(),
  house_ownership_status: z.string(),
  house_stay: z.number(),
  house_desc: z.string().min(1).max(250),
  marital_status: z.string({ required_error: 'marital status is required' }),
  religion: z.string({ required_error: 'religion is required' }),
  nationality: z.string({ required_error: 'nationality is required' }),
  place_of_worship_name: z.string({ required_error: 'this field is required' }),
  place_of_worship_address: z.string({
    required_error: 'this field is required',
  }),
  place_of_worship_landmark: z.string(),
  business_worth: z.number({
    required_error: 'business worth is required',
    invalid_type_error: 'must be a number',
  }),
  loan_purpose: z.string({ required_error: 'loan purpose is required' }),
  series_of_loan: z.number({
    required_error: 'this field is required',
    invalid_type_error: 'must be a number',
  }),
  previous_loan_amount: z.number({ required_error: 'this field is required ' }),
  // TODO: Find out the minimum and maximum loan request amount
  new_loan_amount: z.number({
    required_error: 'new loan amount is required',
    invalid_type_error: 'must be a number',
  }),
  previous_loan_default: z.string({ required_error: 'this field is required' }),
  // TODO: Optionize previous loan default reason
  previous_loan_default_reason: z.string(),
  running_loan: z.string({ required_error: 'this field is required' }),
  running_loan_amount: z.number({ required_error: 'this field is required' }),
  disbursement_date: z.date({ required_error: 'this field is required' }),
  // TODO: make this exactly +x days from disbursement date
  maturity_date: z.date(),
  running_loan_duration: z.number({
    required_error: 'loan duration is required',
    invalid_type_error: 'must ba a number',
  }),
  running_monthly_instalment_amount: z.number({
    required_error: 'this field is required',
    invalid_type_error: 'must be a number',
  }),
  running_days_overdue: z.number(),
  running_no_instalments_paid: z.number(),
  running_loan_balance: z.number(),

  is_client_guarantor: z.string(),
  guarantor_branch: z.string({ required_error: 'branch required' }),
  customer_name: z.string(),
  guaranteed_loan_amount: z.number(),
  guarantor_loan_duration: z.number(),
  guarantor_monthly_instalment_amount: z.number(),
  guarantor_days_overdue: z.number(),
  guarantor_instalments_paid: z.number(),
  guarantor_loan_balance: z.number(),

  loan_officer_name: z.string({ required_error: 'loan officer name required' }),
  loan_officer_branch: z.string({
    required_error: 'loan officer branch is required',
  }),

  client_business_location: z.string({
    required_error: 'client business location required',
  }),
})

export { lfS }
