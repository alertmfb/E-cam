import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { lfS } from './lfSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon } from '@radix-ui/react-icons'
// import { useNavigate } from '@tanstack/react-router'

export function LoanForm() {
  const form = useForm<z.infer<typeof lfS>>({
    resolver: zodResolver(lfS),
    defaultValues: {
      bvn: '',
      phone_number: '',
      nuban_no: '',
      business_name: '',
      business_address: '',
      business_desc: '',
      business_landmark: '',
      // another section
      name: '',
      sex: '',
      residence_address: '',
      residence_landmark: '',
      house_ownership_status: '',
      house_stay: 0,
      house_desc: '',
      // another section
      marital_status: '',
      religion: '',
      nationality: '',
      place_of_worship_name: '',
      place_of_worship_address: '',
      place_of_worship_landmark: '',
      // another section
      business_worth: 0,
      loan_purpose: '',
      series_of_loan: 0,
      previous_loan_amount: 0,
      new_loan_amount: 0,
      previous_loan_default: '',
      previous_loan_default_reason: '',
      // another section
      running_loan: '',
      // disbursement_date
      // maturity_date
      running_loan_amount: 0,
      running_loan_duration: 0,
      running_monthly_instalment_amount: 0,
      running_days_overdue: 0,
      running_no_instalments_paid: 0,
      running_loan_balance: 0,
      // another section
      is_client_guarantor: '',
      guarantor_branch: '',
      customer_name: '',
      guaranteed_loan_amount: 0,
      guarantor_loan_duration: 0,
      guarantor_monthly_instalment_amount: 0,
      guarantor_days_overdue: 0,
      guarantor_instalments_paid: 0,
      guarantor_loan_balance: 0,
    },
  })

  function onSubmit(values: z.infer<typeof lfS>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 pb-4"
      >
        <div className="flex flex-col items-center justify-start gap-10 border p-4 rounded-lg">
          <FormSection>
            <div className="w-full flex gap-4 items-start flex-1 flex-wrap">
              <FormField
                control={form.control}
                name="bvn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer's BVN</FormLabel>
                    <FormControl>
                      <Input placeholder="bvn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input placeholder="091..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nuban_no"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nuban no</FormLabel>
                    <FormControl>
                      <Input placeholder="nuban no" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="alert_discovery"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      How did the customer know about Alert?
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex items-start gap-4 flex-1 flex-wrap">
              <FormField
                control={form.control}
                name="business_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input placeholder="business name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="business_desc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="brief business description"
                        className="w-96"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="business_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="business address"
                        className="w-96"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="business_landmark"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Landmark</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="any landmark close to the business"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </FormSection>

          <FormSection>
            <SectionInputContainer>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Owner Name</FormLabel>
                    <FormControl>
                      <Input placeholder=".." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sex"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Owner Sex</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="residence_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Owner residence address</FormLabel>
                    <FormControl>
                      <Textarea className="w-96" placeholder=".." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="residence_landmark"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Owner residence landmark</FormLabel>
                    <FormControl>
                      <Input placeholder="closest landmark" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="house_ownership_status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>House Ownership Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select which applies" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="owned">owned</SelectItem>
                        <SelectItem value="family">family</SelectItem>
                        <SelectItem value="rented">rented</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="house_stay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No of Years of stay in house</FormLabel>
                    <FormControl>
                      <Input placeholder="no in years" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="house_desc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>House Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="w-96"
                        placeholder="brief house description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </SectionInputContainer>
          </FormSection>
          <FormSection>
            <SectionInputContainer>
              <FormField
                control={form.control}
                name="marital_status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marital Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select which applies" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="single">single</SelectItem>
                        <SelectItem value="married">married</SelectItem>
                        <SelectItem value="divorced">divorced</SelectItem>
                        <SelectItem value="widow">widow</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="religion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Religion</FormLabel>
                    <FormControl>
                      <Input placeholder="religion" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality</FormLabel>
                    <FormControl>
                      <Input placeholder="nationality" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="place_of_worship_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Place of worship name</FormLabel>
                    <FormControl>
                      <Input placeholder="... parish" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="place_of_worship_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Place of worship address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="" className="w-96" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="place_of_worship_landmark"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Landmark</FormLabel>
                    <FormControl>
                      <Input placeholder="closest landmark" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </SectionInputContainer>
          </FormSection>
          <FormSection>
            <SectionInputContainer>
              <FormField
                control={form.control}
                name="business_worth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Worth</FormLabel>
                    <FormControl>
                      <Input placeholder="business worth" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="loan_purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loan Purpose</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="loan purpose"
                        className="w-96"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="series_of_loan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Series of Loan</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="previous_loan_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Previous Loan Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="new_loan_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-600">
                      New Loan Request/Amount
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="previous_loan_default"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Previous Loan Default?</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="yes/no" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="no">no</SelectItem>
                        <SelectItem value="yes">yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="previous_loan_default_reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Previous Loan Default Reason</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="if yes, why?"
                        {...field}
                        className="w-96"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </SectionInputContainer>
          </FormSection>
          <FormSection>
            <SectionInputContainer>
              <FormField
                control={form.control}
                name="running_loan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Is the client on a running loan?</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="yes/no" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="no">no</SelectItem>
                        <SelectItem value="yes">yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="running_loan_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Running Loan Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="running_loan_duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Running Loan Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="running_monthly_instalment_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Installment Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="running_days_overdue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Days Overdue</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="running_no_instalments_paid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Instalments Paid</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="running_loan_balance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loan Balance</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="disbursement_date"
                render={({ field }) => (
                  <FormItem className="self-center">
                    <FormLabel className="mr-3">Disbursement Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maturity_date"
                render={({ field }) => (
                  <FormItem className="self-center">
                    <FormLabel className="mr-3">Maturity Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </SectionInputContainer>
          </FormSection>
          <FormSection>
            <SectionInputContainer>
              <FormField
                control={form.control}
                name="is_client_guarantor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Is the client a guarantor?</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="guarantor_branch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customer_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name of the customer</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="guaranteed_loan_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Guaranteed Loan Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="guarantor_loan_duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="guarantor_monthly_instalment_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Instalment Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="guarantor_days_overdue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Days in Overdue</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="guarantor_instalments_paid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Instalments Paid</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="guarantor_loan_balance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loan Balance</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </SectionInputContainer>
          </FormSection>
        </div>
        <Button type="submit" className="w-32">
          Submit
        </Button>
      </form>
    </Form>
  )
}

function SectionInputContainer({ children }: { children?: React.ReactNode }) {
  return (
    <div className="w-full flex gap-4 items-start flex-1 flex-wrap">
      {children}
    </div>
  )
}

function FormSection({ children }: { children?: React.ReactNode }) {
  return (
    <div className="w-full flex flex-col gap-4 pb-4 border-b">{children}</div>
  )
}
