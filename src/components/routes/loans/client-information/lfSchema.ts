import { z } from 'zod'

const ciS = z.object({
  // email: z.string().email({ message: 'email is required' }),
  // bvn: z.string().min(11, { message: 'bvn must be 11 digits' }).max(11),
  phone_number: z.string().min(11, { message: 'invalid phone number' }).max(13),
  business_name: z.string({ required_error: 'business name is required' }),
  nuban_no: z
    .string({ required_error: 'this field is required' })
    .min(10, { message: 'invalid account number' })
    .max(10, { message: 'invalid account number' }),
  business_desc: z.string().min(1).max(500),
  business_address: z.string({
    required_error: 'business address is required',
  }),
  business_landmark: z.string({ required_error: 'this field is required' }),
  alert_discovery: z.string({ required_error: 'this field is required' }),
  name: z.string({ required_error: 'business owner name is required' }),
  sex: z.string({ required_error: 'sex is required' }),
  residence_address: z.string({
    required_error: 'residence address is required',
  }),
  residence_landmark: z.string({ required_error: 'this field is required' }),
  house_ownership_status: z
    .string({
      required_error: 'this field is required',
    })
    .min(2, { message: 'select' }),
  house_stay: z.string({ required_error: 'this field is required' }),
  house_desc: z.string({ required_error: 'this field is required' }).max(250),
  marital_status: z.string({ required_error: 'marital status is required' }),
  religion: z.string({ required_error: 'religion is required' }),
  nationality: z.string({ required_error: 'nationality is required' }),
  place_of_worship_name: z.string({ required_error: 'this field is required' }),
  place_of_worship_address: z.string({
    required_error: 'this field is required',
  }),
  place_of_worship_landmark: z.string({
    required_error: 'this field is required',
  }),
  business_worth: z.string({
    required_error: 'business worth is required',
    invalid_type_error: 'must be a number',
  }),
  loan_purpose: z.string({ required_error: 'loan purpose is required' }),
  series_of_loan: z.string({
    required_error: 'this field is required',
    invalid_type_error: 'must be a number',
  }),
  previous_loan_amount: z.string({ required_error: 'this field is required ' }),
  // TODO: Find out the minimum and maximum loan request amount
  new_loan_amount: z.string({
    required_error: 'new loan amount is required',
    invalid_type_error: 'must be a number',
  }),
  previous_loan_default: z.string({ required_error: 'this field is required' }),
  // TODO: Optionize previous loan default reason
  previous_loan_default_reason: z.string({
    required_error: 'this field is required',
  }),
  running_loan: z
    .string({ required_error: 'this field is required' })
    .optional()
    .or(z.literal('')),
  running_loan_amount: z
    .string({ required_error: 'this field is required' })
    .optional()
    .or(z.literal('')),
  disbursement_date: z.date(),
  // TODO: make this exactly +x days from disbursement date
  maturity_date: z.date(),
  running_loan_duration: z
    .string({
      required_error: 'loan duration is required',
      invalid_type_error: 'must ba a number',
    })
    .optional()
    .or(z.literal('')),
  running_monthly_instalment_amount: z
    .string({
      required_error: 'this field is required',
      invalid_type_error: 'must be a number',
    })
    .optional()
    .or(z.literal('')),
  running_days_overdue: z
    .string({ required_error: 'this field is required' })
    .optional()
    .or(z.literal('')),
  running_no_instalments_paid: z
    .string({
      required_error: 'this field is required',
    })
    .optional()
    .or(z.literal('')),
  running_loan_balance: z
    .string({ required_error: 'this field is required' })
    .optional()
    .or(z.literal('')),

  is_client_guarantor: z
    .string({ required_error: 'this field is required' })
    .optional()
    .or(z.literal('')),
  guarantor_branch: z
    .string({ required_error: 'branch required' })
    .optional()
    .or(z.literal('')),
  customer_name: z
    .string({ required_error: 'this field is required' })
    .optional()
    .or(z.literal('')),
  guaranteed_loan_amount: z
    .string({
      required_error: 'this field is required',
    })
    .optional()
    .or(z.literal('')),
  guarantor_loan_duration: z
    .string({
      required_error: 'this field is required',
    })
    .optional()
    .or(z.literal('')),
  guarantor_monthly_instalment_amount: z
    .string({
      required_error: 'this field is required',
    })
    .optional()
    .or(z.literal('')),
  guarantor_days_overdue: z
    .string({
      required_error: 'this field is required',
    })
    .optional()
    .or(z.literal('')),
  guarantor_instalments_paid: z
    .string({
      required_error: 'this field is required',
    })
    .optional()
    .or(z.literal('')),
  guarantor_loan_balance: z
    .string({
      required_error: 'this field is required',
    })
    .optional()
    .or(z.literal('')),

  // loan_officer_name: z.string({ required_error: 'loan officer name required' }),
  // loan_officer_branch: z.string({
  //   required_error: 'loan officer branch is required',
  // }),
})

export { ciS }
