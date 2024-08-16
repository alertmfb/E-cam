import { useForm } from 'react-hook-form'
import {
  SectionInputContainer,
  FormSection,
} from '../client-information/client-info-form'
import { rS } from './rSchema'
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
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createFamilyReference,
  createCommercialReference,
  createNeighbourhoodReference,
  useReferenceByCategory,
  ReferencePayload,
} from '@/lib/api/references/functions'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useState } from 'react'

export function FamilyRefereceForm({ loanId }: { loanId: string }) {
  const form = useForm<z.infer<typeof rS>>({
    resolver: zodResolver(rS),
    defaultValues: {
      fullname: '',
      sex: '',
      home_address: '',
      business_name: '',
      business_nature: '',
      business_address: '',
      marital_status: '',
      relationship: '',
      phone_number: '',
      reference_person_comment: '',
    },
  })

  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: createFamilyReference,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reference-family-data'] })
      alert('family reference added')
      form.reset()
    },
  })

  function onSubmit(values: z.infer<typeof rS>) {
    addMutation.mutate({ payload: values, loanId: loanId })
  }

  const { data } = useReferenceByCategory(loanId, 'family')
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
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
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
                  name="home_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Home Address</FormLabel>
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
                  name="business_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input placeholder="..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="business_nature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Nature</FormLabel>
                      <FormControl>
                        <Input placeholder="..." {...field} />
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
                  name="relationship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relationship</FormLabel>
                      <FormControl>
                        <Input placeholder="..." {...field} />
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
                  name="reference_person_comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comment from the reference person</FormLabel>
                      <FormControl>
                        <Input placeholder="..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </SectionInputContainer>
              <div className="flex items-center justify-between mt-4">
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

export function CommercialReferenceForm({ loanId }: { loanId: string }) {
  const form = useForm<z.infer<typeof rS>>({
    resolver: zodResolver(rS),
    defaultValues: {
      fullname: '',
      sex: '',
      home_address: '',
      business_name: '',
      business_nature: '',
      business_address: '',
      marital_status: '',
      relationship: '',
      phone_number: '',
      reference_person_comment: '',
    },
  })

  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: createCommercialReference,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reference-commercial-data'] })
      alert('commercial reference added')
      form.reset()
    },
  })

  function onSubmit(values: z.infer<typeof rS>) {
    addMutation.mutate({ payload: values, loanId: loanId })
  }

  const { data } = useReferenceByCategory(loanId, 'commercial')
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
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
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
                  name="home_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Home Address</FormLabel>
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
                  name="business_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input placeholder="..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="business_nature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Nature</FormLabel>
                      <FormControl>
                        <Input placeholder="..." {...field} />
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
                  name="relationship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relationship</FormLabel>
                      <FormControl>
                        <Input placeholder="..." {...field} />
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
                  name="reference_person_comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comment from the reference person</FormLabel>
                      <FormControl>
                        <Input placeholder="..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </SectionInputContainer>
              <div className="flex items-center justify-between mt-4">
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

export function NeighbourhoodReferenceForm({ loanId }: { loanId: string }) {
  const form = useForm<z.infer<typeof rS>>({
    resolver: zodResolver(rS),
    defaultValues: {
      fullname: '',
      sex: '',
      home_address: '',
      business_name: '',
      business_nature: '',
      business_address: '',
      marital_status: '',
      relationship: '',
      phone_number: '',
      reference_person_comment: '',
    },
  })

  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: createNeighbourhoodReference,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reference-neighbourhood-data'],
      })
      alert('neighbourhood reference added')
      form.reset()
    },
  })

  function onSubmit(values: z.infer<typeof rS>) {
    addMutation.mutate({ payload: values, loanId: loanId })
  }

  const { data } = useReferenceByCategory(loanId, 'neighbourhood')
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
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
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
                  name="home_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Home Address</FormLabel>
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
                  name="business_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input placeholder="..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="business_nature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Nature</FormLabel>
                      <FormControl>
                        <Input placeholder="..." {...field} />
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
                  name="relationship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relationship</FormLabel>
                      <FormControl>
                        <Input placeholder="..." {...field} />
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
                  name="reference_person_comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comment from the reference person</FormLabel>
                      <FormControl>
                        <Input placeholder="..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </SectionInputContainer>
              <div className="flex items-center justify-between mt-4">
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

const DataTable = ({ data }: { data: ReferencePayload[] }) => {
  return (
    <Table className="w-full lg:w-1/2">
      <TableHeader>
        <TableRow>
          <TableHead>S/N</TableHead>
          <TableHead>Full Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, idx) => (
          <TableRow key={idx}>
            <TableCell>{idx + 1}</TableCell>
            <TableCell>{row.fullname}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
