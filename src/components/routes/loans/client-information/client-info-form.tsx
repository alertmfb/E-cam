import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ciS } from './lfSchema'
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
import {
  locationsArr,
  getZoneNumber,
  getZoneColor,
  branchesArr,
} from './zonification'
import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  createClientInfo,
  fetchBvn,
  useUploadClientImage,
} from '@/lib/api/client-info/functions'

import { useNavigate } from '@tanstack/react-router'
import { useUser } from '@/lib/auth/hooks'

type LoanId = { loanId: string }

export function ClientInfoForm({ loanId }: LoanId) {
  const { branch_id } = useUser()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof ciS>>({
    resolver: zodResolver(ciS),
    defaultValues: {
      // bvn: '',
      phone_number: '',
      nuban_no: '',
      business_name: '',
      business_address: '',
      business_desc: '',
      business_landmark: '',
      alert_discovery: '',
      // // another section
      name: '',
      sex: '',
      residence_address: '',
      residence_landmark: '',
      house_ownership_status: '',
      house_stay: '',
      house_desc: '',
      // // another section
      marital_status: '',
      religion: '',
      nationality: '',
      place_of_worship_name: '',
      place_of_worship_address: '',
      place_of_worship_landmark: '',
      // // another section
      business_worth: '',
      loan_purpose: '',
      series_of_loan: '',
      previous_loan_amount: '',
      new_loan_amount: '',
      previous_loan_default: '',
      previous_loan_default_reason: '',
      // // another section
      running_loan: '',
      // disbursement_date
      // maturity_date
      running_loan_amount: '',
      running_loan_duration: '',
      running_monthly_instalment_amount: '',
      running_days_overdue: '',
      running_no_instalments_paid: '',
      running_loan_balance: '',
      // // another section
      is_client_guarantor: '',
      guarantor_branch: '',
      customer_name: '',
      guaranteed_loan_amount: '',
      guarantor_loan_duration: '',
      guarantor_monthly_instalment_amount: '',
      guarantor_days_overdue: '',
      guarantor_instalments_paid: '',
      guarantor_loan_balance: '',
      // // another section
      // // TODO: auto populate this
      // loan_officer_name: 'Loan Officer',
      // loan_officer_branch: 'EBUTE-METTA',
    },
  })

  const [runningLoan, setRunningLoan] = useState('no')
  const [clientGuarantor, setClientGuarantor] = useState('no')

  const [businessLocation, setBusinessLocation] = useState('')
  const [zoneColor, setZoneColor] = useState('bg-white')

  function handleZonificationCheck(clientLocation: string) {
    setBusinessLocation(clientLocation)
    const n = getZoneNumber(clientLocation)
    setZoneColor(getZoneColor(branch_id, n))
  }

  const { data: bvn, fetchStatus } = useQuery({
    queryKey: ['bvn'],
    queryFn: () => fetchBvn({ loanId: loanId }),
  })

  const addMutation = useMutation({
    mutationFn: createClientInfo,
    onSuccess: () => {
      navigate({
        to: '/app/loans/incomplete',
      })
    },
  })

  if (!bvn) {
    alert('Error: bvn not found')
    navigate({ to: '/app/dashboard' })
  }

  function onSubmit(values: z.infer<typeof ciS>) {
    addMutation.mutate({
      payload: {
        ...values,
        customer_bvn: bvn!,
        client_business_location: businessLocation,
        running_loan: runningLoan,
        is_client_guarantor: clientGuarantor,
      },
      loanId: loanId,
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 pb-4 drop-shadow-md"
      >
        <div className="flex flex-col items-center justify-start gap-10 border p-4 rounded-lg">
          <FormSection>
            <SectionInputContainer>
              <FormItem>
                <FormLabel>Customer's BVN</FormLabel>
                <Input placeholder="bvn" type="number" value={bvn!} readOnly />
              </FormItem>
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="091..."
                        type="number"
                        required
                        {...field}
                      />
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
                      <Input
                        placeholder="nuban no"
                        type="number"
                        required
                        {...field}
                      />
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      required
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select which applies" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Referred by alert customer">
                          Referred by alert customer
                        </SelectItem>
                        <SelectItem value="Through marketing / promotion">
                          Through marketing / promotion
                        </SelectItem>
                        <SelectItem value="Through ALERT MFB website / social media">
                          Through ALERT MFB website / social media
                        </SelectItem>
                        <SelectItem value="A walk in customer">
                          A walk in customer
                        </SelectItem>
                        <SelectItem value="Poached from another MFB">
                          Poached from another MFB
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="business_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input placeholder="business name" required {...field} />
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
                        required
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
                        required
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
                        required
                        placeholder="closest landmark"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <ImageFormItem loanId={loanId} />

              {/* <FormItem>
                <FormLabel>Customer's Picture</FormLabel>
                <Input
                  type="file"
                  onChange={(e) => console.log(e.target.files[0].name)}
                />
              </FormItem> */}
            </SectionInputContainer>
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
                      <Input required placeholder=".." {...field} />
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
                      <Input required placeholder="" {...field} />
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
                      required
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
                      <Input
                        required
                        placeholder="no in years"
                        type="number"
                        {...field}
                      />
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
                      <Input required placeholder="religion" {...field} />
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
                      <Input required placeholder="nationality" {...field} />
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
                      <Input required placeholder="... parish" {...field} />
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
                      <Input
                        required
                        placeholder="closest landmark"
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
                name="business_worth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Worth</FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder="business worth"
                        type="number"
                        {...field}
                      />
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
                      <Input required placeholder="" type="number" {...field} />
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
                      <Input required placeholder="" type="number" {...field} />
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
                      <Input required placeholder="" type="number" {...field} />
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
              <FormItem className="w-fit">
                <FormLabel>Is the client on a running loan?</FormLabel>
                <select
                  className="flex w-full h-10 items-center justify-between rounded-md border border-input px-2"
                  onChange={(e) => setRunningLoan(e.target.value)}
                >
                  <option value="">yes/no</option>
                  <option value="no">no</option>
                  <option value="yes">yes</option>
                </select>
              </FormItem>

              {runningLoan !== 'no' && (
                <>
                  <FormField
                    control={form.control}
                    name="running_loan_amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Running Loan Amount</FormLabel>
                        <FormControl>
                          <Input
                            required
                            placeholder=""
                            type="number"
                            {...field}
                          />
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
                          <Input
                            required
                            placeholder=""
                            type="number"
                            {...field}
                          />
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
                          <Input
                            required
                            placeholder=""
                            type="number"
                            {...field}
                          />
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
                          <Input
                            required
                            placeholder=""
                            type="number"
                            {...field}
                          />
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
                          <Input
                            required
                            placeholder=""
                            type="number"
                            {...field}
                          />
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
                          <Input
                            required
                            placeholder=""
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="disbursement_date"
                    render={({ field }) => (
                      <FormItem className="self-end">
                        <FormLabel className="mr-3">
                          Disbursement Date
                        </FormLabel>
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
                      <FormItem className="self-end">
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
                </>
              )}
            </SectionInputContainer>
          </FormSection>

          <FormSection>
            <SectionInputContainer>
              <FormItem className="w-fit">
                <FormLabel>Is the client a guarantor?</FormLabel>
                <select
                  className="flex w-full h-10 items-center justify-between rounded-md border border-input px-2"
                  onChange={(e) => setClientGuarantor(e.target.value)}
                >
                  <option value="">yes/no</option>
                  <option value="no">no</option>
                  <option value="yes">yes</option>
                </select>
              </FormItem>
              {clientGuarantor !== 'no' && (
                <>
                  <FormField
                    control={form.control}
                    name="guarantor_branch"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Branch</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {branchesArr.sort().map((branch, idx) => (
                              <SelectItem key={idx} value={branch}>
                                {branch}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                          <Input required placeholder="" {...field} />
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
                          <Input
                            required
                            placeholder=""
                            type="number"
                            {...field}
                          />
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
                          <Input
                            required
                            placeholder=""
                            type="number"
                            {...field}
                          />
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
                          <Input
                            required
                            placeholder=""
                            type="number"
                            {...field}
                          />
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
                          <Input
                            required
                            placeholder=""
                            type="number"
                            {...field}
                          />
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
                          <Input
                            required
                            placeholder=""
                            type="number"
                            {...field}
                          />
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
                          <Input
                            required
                            placeholder=""
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </SectionInputContainer>
          </FormSection>

          {/* <FormSection>
            <SectionInputContainer>
              <FormItem>
                <FormLabel>Loan Officer Name</FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder=""
                    value="Loan Officer"
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel>Loan Officer Branch</FormLabel>
                <FormControl>
                  <Input placeholder="" value="EBUTE-METTA" disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            </SectionInputContainer>
          </FormSection> */}

          <FormSection>
            <SectionInputContainer>
              <FormItem>
                <FormLabel>Location of client's business</FormLabel>

                <select
                  className="flex h-10 items-center justify-between rounded-md border border-input px-2"
                  onChange={(e) => handleZonificationCheck(e.target.value)}
                >
                  <option value="">select</option>
                  {locationsArr.sort().map((location, idx) => (
                    <option value={location} key={idx}>
                      {location}
                    </option>
                  ))}
                </select>
              </FormItem>

              <FormItem>
                <FormLabel>Zonification Indicator</FormLabel>
                <div
                  className={`flex h-10 w-full rounded-md border ${zoneColor}`}
                ></div>
                <FormMessage />
              </FormItem>
            </SectionInputContainer>
          </FormSection>
        </div>
        <Button
          type="submit"
          className="w-32 self-end"
          disabled={zoneColor === 'bg-red-500' || zoneColor === 'bg-white'}
        >
          Save
        </Button>
      </form>
    </Form>
  )
}

export function SectionInputContainer({
  children,
}: {
  children?: React.ReactNode
}) {
  return (
    <div className="w-full flex gap-4 items-start flex-1 flex-wrap">
      {children}
    </div>
  )
}

export function FormSection({ children }: { children?: React.ReactNode }) {
  return (
    <div className="w-full flex flex-col gap-4 pb-4 border-b">{children}</div>
  )
}

const ImageFormItem = ({ loanId }: { loanId: string }) => {
  const upload = useUploadClientImage()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const form = new FormData()
      form.append('picture', e.target.files[0])

      upload.mutate({ loanId, image: form })
    }
  }

  return (
    <FormItem>
      <FormLabel>Customer's Picture</FormLabel>
      <Input type="file" onChange={(e) => handleFileChange(e)} />
    </FormItem>
  )
}
