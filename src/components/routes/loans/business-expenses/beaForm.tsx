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
import { useMutation } from '@tanstack/react-query'
import {
  createBusinessAsset,
  createBusinessExpense,
} from '@/lib/api/business-expenses/functions'
import { useAuthSession, useAuthUser } from '@/lib/auth/hooks'

export function BusinessExpensesForm({ loanId }: { loanId: string }) {
  const auth = useAuthSession()
  const user = useAuthUser()

  const form = useForm<z.infer<typeof beS>>({
    resolver: zodResolver(beS),
    defaultValues: {
      category: '',
      item: '',
      details: '',
      amount: '',
    },
  })

  const addMutation = useMutation({
    mutationFn: createBusinessExpense,
    onSuccess: () => {
      alert('business expense added')
    },
  })

  function onSubmit(values: z.infer<typeof beS>) {
    addMutation.mutate({
      payload: values,
      branchId: user.branch_id.toString(),
      loanId: loanId,
      role: auth.role,
      userId: user.id.toString(),
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
                      <Input placeholder="Feeding" {...field} />
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
            <div className="flex items-center justify-between">
              <Button type="submit" className="w-32 self-start">
                Add
              </Button>
              <p className="font-muted-foreground cursor-pointer text-sm">
                preview
              </p>
            </div>
          </FormSection>
        </div>
      </form>
    </Form>
  )
}

export function BusinessAssetsForm({ loanId }: { loanId: string }) {
  const auth = useAuthSession()
  const user = useAuthUser()

  const form = useForm<z.infer<typeof baS>>({
    resolver: zodResolver(baS),
    defaultValues: {
      category: '',
      item: '',
      details: '',
      amount: '',
    },
  })

  const addMutation = useMutation({
    mutationFn: createBusinessAsset,
    onSuccess: () => {
      alert('business asset added')
    },
  })

  function onSubmit(values: z.infer<typeof baS>) {
    addMutation.mutate({
      payload: values,
      branchId: user.branch_id.toString(),
      loanId: loanId,
      role: auth.role,
      userId: user.id.toString(),
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
            <div className="flex items-center justify-between">
              <Button type="submit" className="w-32 self-start">
                Add
              </Button>
              <p className="font-muted-foreground cursor-pointer text-sm">
                preview
              </p>
            </div>
          </FormSection>
        </div>
      </form>
    </Form>
  )
}
