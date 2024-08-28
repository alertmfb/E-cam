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
import { useAuth, useUser } from '@/lib/auth/hooks'
import { useNavigate } from '@tanstack/react-router'
import { useGetMailRecepient } from '@/lib/api/find/functions'
import { Role } from '@/lib/auth'
import { Loader2 } from 'lucide-react'

const returnRecepientRole = (role: Role): Role => {
  switch (role) {
    case 'branch_manager':
      return 'regional_manager'

    case 'regional_manager':
      return 'executive'

    case 'executive':
      return 'loan_officer'

    default:
      return role
  }
}

export function LoanActionForm({ loanId }: { loanId: string }) {
  const { role, branch_id, institution_id, name, email } = useUser()
  const { userId } = useAuth()
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
          loanId: loanId,
          branchId: role !== 'executive' ? branch_id.toString() : 'exec',
        },
      })
    },
  })

  const { data: recepients } = useGetMailRecepient(
    // Return the role(s) of the receipents to fetch
    returnRecepientRole(role),
    branch_id.toString(),
    loanId
  )

  if (!recepients) {
    return <div></div>
  }

  const onSubmit = (values: z.infer<typeof loanActionSchema>) => {
    addMutation.mutate({
      payload: { ...values, senderName: name, senderEmail: email, recepients },
      params: {
        institutionId: role !== 'executive' ? institution_id.toString() : '',
        loanId: loanId,
        branchId: role !== 'executive' ? branch_id.toString() : '',
        role: role,
        userId: userId!,
      },
    })
  }

  // TODO: Check if loan has gotten final approval

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
            </SectionInputContainer>
            <FormField
              control={form.control}
              name="approval_comment"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea
                      className="w-full"
                      placeholder="details"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-fit flex items-center gap-3">
              Process{' '}
              {addMutation.isPending && <Loader2 className="animate-spin" />}
            </Button>
          </FormSection>
        </div>
      </form>
    </Form>
  )
}

export function LoanRejectionForm(loanId: { loanId: string }) {
  const { role, branch_id } = useUser()
  const { userId } = useAuth()
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
          branchId: role !== 'executive' ? branch_id.toString() : 'exec',
        },
      })
    },
  })

  function onSubmit(values: z.infer<typeof loanRejectionSchema>) {
    rejectMutation.mutate({
      payload: values,
      params: {
        loanId: loanId.loanId,
        branchId: role !== 'executive' ? branch_id.toString() : 'exec',
        role: role,
        userId: userId!,
      },
    })
  }

  // TODO: Check if loan has gotten final approval

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
                  <FormItem className="w-full">
                    <FormLabel>Rejection Reasons/comments</FormLabel>
                    <FormControl>
                      <Textarea
                        className="w-full"
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
