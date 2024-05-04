import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { loanActionSchema } from './laSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FormSection,
  SectionInputContainer,
} from '../client-information/client-info-form'
import { useMutation } from '@tanstack/react-query'
import { approveLoanApplication } from './functions'

export function LoanActionForm(loanId: { loanId: string }) {
  const form = useForm<z.infer<typeof loanActionSchema>>({
    resolver: zodResolver(loanActionSchema),
    defaultValues: {
      approval_amount: '',
      approval_comment: '',
    },
  })

  const addMutation = useMutation({
    mutationFn: approveLoanApplication,
    onSuccess: () => {},
  })

  function onSubmit(values: z.infer<typeof loanActionSchema>) {
    addMutation.mutate({
      payload: values,
      params: { loanId: loanId.loanId, branchId: '', role: '', userId: '' },
    })
  }

  console.log(loanId)

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
                name="approval_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item</FormLabel>
                    <FormControl>
                      <Input placeholder="" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="approval_comment"
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
            </SectionInputContainer>
            <Button type="submit">Process</Button>
          </FormSection>
        </div>
      </form>
    </Form>
  )
}
