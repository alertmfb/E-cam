import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { formSchema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNavigate } from '@tanstack/react-router'
import { supabase } from '@/lib/sb'

export function SigninForm() {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.removeItem('user')
  }

  function handleRoleChange(role: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('role', JSON.stringify(role))
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data, error } = await supabase.auth.signInWithPassword(values)
    if (data.session) {
      navigate({ to: '/app/dashboard' })
    }

    if (error) {
      throw new Error(`Authentication error: ${error}`)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormItem>
          <FormLabel>Role</FormLabel>
          <select
            className="flex w-full h-10 items-center justify-between rounded-md border border-input px-2"
            onChange={(e) => handleRoleChange(e.target.value)}
            required
          >
            <option value="">select</option>
            <option value="loan_officer">Loan Officer</option>
            <option value="branch_manager">Branch Manager</option>
            <option value="regional_manager">Regional Manager</option>
            {/* <option value="relationship_manager">Relationship Manager</option> */}
          </select>
        </FormItem>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-[#3F3D56] hover:bg-[#3F3D56]/90"
        >
          Continue
        </Button>
      </form>
    </Form>
  )
}
