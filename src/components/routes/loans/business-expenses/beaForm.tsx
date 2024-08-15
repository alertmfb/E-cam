import { useForm } from 'react-hook-form'
import {
  SectionInputContainer,
  FormSection,
} from '../client-information/client-info-form'
import { baS, beS } from './beSchema'
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
  BusinessExAs,
  createBusinessAsset,
  createBusinessExpense,
  useGetBusinessAsset,
  useGetBusinessExpense,
} from '@/lib/api/business-expenses/functions'
import { useAuth, useUser } from '@/lib/auth/hooks'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useState } from 'react'

export function BusinessExpensesForm({ loanId }: { loanId: string }) {
  const { userId } = useAuth()
  const { role, branch_id } = useUser()

  const form = useForm<z.infer<typeof beS>>({
    resolver: zodResolver(beS),
    defaultValues: {
      category: '',
      item: '',
      details: '',
      amount: '',
    },
  })

  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: createBusinessExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business-expense-data'] })
      alert('business expense added')
      form.reset()
    },
  })

  function onSubmit(values: z.infer<typeof beS>) {
    addMutation.mutate({
      payload: values,
      branchId: branch_id.toString(),
      loanId: loanId,
      role: role,
      userId: userId!,
    })
  }

  const { data } = useGetBusinessExpense(loanId)
  const [prev, setPrev] = useState<boolean>(false)

  const displayPrev = () => {
    setPrev((prev) => !prev)
  }

  return (
    <div className="w-full space-y-3">
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
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
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
                          <SelectItem value="regular">regular</SelectItem>
                          <SelectItem value="irregular">irregular</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="item"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item</FormLabel>
                      <FormControl>
                        <Input placeholder="..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Details</FormLabel>
                      <FormControl>
                        <Textarea
                          className="w-96"
                          placeholder="details"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input placeholder="" type="number" {...field} />
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

export function BusinessAssetsForm({ loanId }: { loanId: string }) {
  const { userId } = useAuth()
  const { role, branch_id } = useUser()

  const form = useForm<z.infer<typeof baS>>({
    resolver: zodResolver(baS),
    defaultValues: {
      category: '',
      item: '',
      details: '',
      amount: '',
    },
  })

  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: createBusinessAsset,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business-asset-data'] })
      alert('business asset added')
      form.reset()
    },
  })

  function onSubmit(values: z.infer<typeof baS>) {
    addMutation.mutate({
      payload: values,
      branchId: branch_id.toString(),
      loanId: loanId,
      role: role,
      userId: userId!,
    })
  }

  const { data } = useGetBusinessAsset(loanId)
  const [prev, setPrev] = useState<boolean>(false)

  const displayPrev = () => {
    setPrev((prev) => !prev)
  }

  return (
    <div className="w-full space-y-3">
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
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
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
                          <SelectItem value="equip_and_furn">
                            equipment and furniture
                          </SelectItem>
                          <SelectItem value="vehicles">vehicles</SelectItem>
                          <SelectItem value="house_land">house/land</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="item"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item</FormLabel>
                      <FormControl>
                        <Input placeholder="..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Details</FormLabel>
                      <FormControl>
                        <Textarea
                          className="w-96"
                          placeholder="details"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input placeholder="" type="number" {...field} />
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

const DataTable = ({ data }: { data: BusinessExAs[] }) => {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>S/N</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Item</TableHead>
          <TableHead>Details</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, idx) => (
          <TableRow key={idx}>
            <TableCell>{idx + 1}</TableCell>
            <TableCell>{row.category}</TableCell>
            <TableCell>{row.item}</TableCell>
            <TableCell>{row.details}</TableCell>
            <TableCell>N{parseFloat(row.amount).toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
