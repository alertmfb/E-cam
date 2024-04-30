import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { laS } from './laSchema'
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
  FormSection,
  SectionInputContainer,
} from '../client-information/client-info'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { createLoanApplication } from '@/lib/api/loan-application/functions'
import { useNavigate } from '@tanstack/react-router'

export function LoanApplicationForm() {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof laS>>({
    resolver: zodResolver(laS),
    defaultValues: {
      customer_bvn: '',
      customer_name: '',
    },
  })

  const createMutation = useMutation({
    mutationFn: createLoanApplication,
    onSuccess: () => {
      //TODO: toast success
      navigate({ to: '/app/loans/incomplete' })
    },
  })

  function onSubmit(values: z.infer<typeof laS>) {
    createMutation.mutate(values)
  }

  return (
    // TODO: add spinner state beside save button
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
                name="customer_bvn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer's BVN</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="bvn"
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
                name="customer_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer's Name</FormLabel>
                    <FormControl>
                      <Input placeholder="..." required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </SectionInputContainer>
            <Button type="submit" className="w-32">
              Proceed
            </Button>
          </FormSection>
        </div>
      </form>
    </Form>
  )
}
