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

import { loanActionSchema, loanRejectionSchema } from './laSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FormSection,
  SectionInputContainer,
} from '../client-information/client-info-form'
import { useMutation } from '@tanstack/react-query'
import {
  approveLoanApplication,
  rejectLoanApplication,
} from '../../../../lib/api/loan-action/functions'
import { useAuthSession, useAuthUser } from '@/lib/auth/hooks'
import { useNavigate } from '@tanstack/react-router'

export function LoanActionForm(loanId: { loanId: string }) {
  const user = useAuthUser()
  const { role } = useAuthSession()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof loanActionSchema>>({
    resolver: zodResolver(loanActionSchema),
    defaultValues: {
      approval_amount: '',
      approval_comment: '',
    },
  })

  const addMutation = useMutation({
    mutationFn: approveLoanApplication,
    onSuccess: () => {
      alert('Approved!')
      form.reset()
      navigate({
        to: '/app/loans/status/$loanId/$branchId',
        params: {
          loanId: loanId.loanId,
          branchId: role !== 'executive' ? user.branch_id.toString() : 'exec',
        },
      })
    },
  })

  function onSubmit(values: z.infer<typeof loanActionSchema>) {
    addMutation.mutate({
      payload: values,
      params: {
        institutionId:
          role !== 'executive' ? user.institution_id.toString() : '',
        loanId: loanId.loanId,
        branchId: role !== 'executive' ? user.branch_id.toString() : '',
        role: role,
        userId: user.id.toString(),
      },
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 pb-4 drop-shadow-md"
      >
        Approval Form
        <div className="flex flex-col items-center justify-start gap-10 border p-4 rounded-lg">
          <FormSection>
            <SectionInputContainer>
              <FormField
                control={form.control}
                name="approval_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Approval Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="N000,000" type="number" {...field} />
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
                    <FormLabel>Comment</FormLabel>
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
            <Button type="submit" className="w-fit">
              Process
            </Button>
          </FormSection>
        </div>
      </form>
    </Form>
  )
}

export function LoanRejectionForm(loanId: { loanId: string }) {
  const user = useAuthUser()
  const { role } = useAuthSession()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof loanRejectionSchema>>({
    resolver: zodResolver(loanRejectionSchema),
    defaultValues: {
      rejection_comment: '',
    },
  })

  const rejectMutation = useMutation({
    mutationFn: rejectLoanApplication,
    onSuccess: () => {
      alert('Rejected!')
      form.reset()
      navigate({
        to: '/app/loans/rejected/$loanId/$branchId',
        params: {
          loanId: loanId.loanId,
          branchId: role !== 'executive' ? user.branch_id.toString() : 'exec',
        },
      })
    },
  })

  function onSubmit(values: z.infer<typeof loanRejectionSchema>) {
    rejectMutation.mutate({
      payload: values,
      params: {
        loanId: loanId.loanId,
        branchId: role !== 'executive' ? user.branch_id.toString() : 'exec',
        role: role,
        userId: user.id.toString(),
      },
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 pb-4 drop-shadow-md"
      >
        Rejection Form
        <div className="flex flex-col items-center justify-start gap-10 border p-4 rounded-lg">
          <FormSection>
            <SectionInputContainer>
              <FormField
                control={form.control}
                name="rejection_comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rejection Reasons/comments</FormLabel>
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
            <Button type="submit" className="w-fit" variant="destructive">
              Reject
            </Button>
          </FormSection>
        </div>
      </form>
    </Form>
  )
}
