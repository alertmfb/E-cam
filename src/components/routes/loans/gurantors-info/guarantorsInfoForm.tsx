import { useForm } from 'react-hook-form'
import {
  SectionInputContainer,
  FormSection,
} from '../client-information/client-info-form'
import { giS } from './giSchema'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  GuarantorInfoPayload,
  createGuarantorInfo,
  useGetGuarantorNameInfo,
} from '@/lib/api/guarantor-info/functions'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth, useUser } from '@/lib/auth/hooks'
import { useState } from 'react'

export function GuarantorsInfoForm({ loanId }: { loanId: string }) {
  const { branch_id, role } = useUser()
  const { userId } = useAuth()

  const form = useForm<z.infer<typeof giS>>({
    resolver: zodResolver(giS),
    defaultValues: {
      business_name: '',
      registration_no: '',
      business_desc: '',
      monthly_salary: '',
      phone_number: '',
      business_address: '',
      business_landmark: '',
      owner_name: '',
      sex: '',
      residence_address: '',
      house_landmark: '',
      house_ownership_status: '',
      house_stay: '',
      house_desc: '',
      customer_relationship: '',
      marital_status: '',
      religion: '',
      nationality: '',
      place_of_worship_name: '',
      place_of_worship_address: '',
      place_of_worship_landmark: '',
      business_worth: '',
      goods_stock: '',
      monthly_sales: '',
      cost_of_goods_sold: '',
      gross_profit: '',
      operation_expenses: '',
      net_profit: '',
      instalment_amount: '',
      repayment_capacity: '',
      dsr: '',
    },
  })

  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: createGuarantorInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guarantor-name-info'] })
      alert('guarantor added')
      form.reset()
    },
  })

  function onSubmit(values: z.infer<typeof giS>) {
    addMutation.mutate({
      payload: values,
      branchId: branch_id.toString(),
      loanId: loanId,
    })
  }

  const { data } = useGetGuarantorNameInfo(userId!, branch_id.toString(), role)
  const [prev, setPrev] = useState<boolean>(false)

  const displayPrev = () => {
    setPrev((prev) => !prev)
  }

  return (
    <div className="w-full space-y-4">
      {data && (
        <div className="space-y-3">
          <Button variant="outline" onClick={displayPrev}>
            {prev ? 'Hide Saved' : 'Show Saved'}
          </Button>

          {prev && <DataTable data={data} />}
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 pb-4 drop-shadow-md"
        >
          <div className="flex flex-col items-center justify-start gap-10 border p-4 rounded-lg">
            <FormSection>
              <SectionInputContainer>
                <FormField
                  control={form.control}
                  name="business_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business/Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="registration_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Registration No</FormLabel>
                      <FormControl>
                        <Input placeholder="..." {...field} />
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
                      <FormLabel>Brief Business Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="..."
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
                  name="monthly_salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Salary if Employed</FormLabel>
                      <FormControl>
                        <Input placeholder="..." type="number" {...field} />
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
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="..." type="number" {...field} />
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
                          placeholder="..."
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
                      <FormLabel>Business Landmark</FormLabel>
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
                  name="owner_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner Name</FormLabel>
                      <FormControl>
                        <Input placeholder="..." {...field} />
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
                      <FormLabel>Sex</FormLabel>
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
                          <SelectItem value="male">male</SelectItem>
                          <SelectItem value="female">female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="residence_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Residence Address</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="..."
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
                  name="house_landmark"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Closest Landmark to House</FormLabel>
                      <FormControl>
                        <Input placeholder="..." {...field} />
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
                            <SelectValue placeholder="select" />
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
                      <FormLabel>Years of stay in house</FormLabel>
                      <FormControl>
                        <Input placeholder="..." type="number" {...field} />
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
                          placeholder="..."
                          className="w-96"
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
                  name="customer_relationship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relationship With Customer</FormLabel>
                      <FormControl>
                        <Input placeholder="..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                            <SelectValue placeholder="select" />
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
                        <Input placeholder="..." {...field} />
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
                        <Input placeholder="..." {...field} />
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
                      <FormLabel>Place of Worship Name</FormLabel>
                      <FormControl>
                        <Input placeholder="..." {...field} />
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
                      <FormLabel>Place of Worship Address</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="..."
                          {...field}
                          className="w-96"
                        />
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
                      <FormLabel>
                        Closest Landmark to Place of Worship
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="..." {...field} />
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
                        <Input placeholder="..." type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="goods_stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Goods Stock</FormLabel>
                      <FormControl>
                        <Input placeholder="..." type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="monthly_sales"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Sales</FormLabel>
                      <FormControl>
                        <Input placeholder="..." type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cost_of_goods_sold"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cost of Goods Sold</FormLabel>
                      <FormControl>
                        <Input placeholder="..." type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gross_profit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gross Profit</FormLabel>
                      <FormControl>
                        <Input placeholder="..." type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="operation_expenses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Operational Expenses</FormLabel>
                      <FormControl>
                        <Input placeholder="..." type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="net_profit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Net Profit</FormLabel>
                      <FormControl>
                        <Input placeholder="..." type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="instalment_amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instalment Amount</FormLabel>
                      <FormControl>
                        <Input placeholder="..." type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="repayment_capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Repayment Capacity</FormLabel>
                      <FormControl>
                        <Input placeholder="..." type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dsr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>DSR</FormLabel>
                      <FormControl>
                        <Input placeholder="..." type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </SectionInputContainer>
              <div className="flex items-center justify-between mt-6">
                <Button type="submit" className="w-32 self-start">
                  Add
                </Button>
              </div>
            </FormSection>
          </div>
        </form>
      </Form>
    </div>
  )
}

const DataTable = ({ data }: { data: GuarantorInfoPayload[] }) => {
  return (
    <Table className="w-full lg:w-1/2">
      <TableHeader>
        <TableRow>
          <TableHead>S/N</TableHead>
          <TableHead>Business Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, idx) => (
          <TableRow key={idx}>
            <TableCell>{idx + 1}</TableCell>
            <TableCell>{row.business_name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
