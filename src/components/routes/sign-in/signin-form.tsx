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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)

    const { data, error } = await supabase.auth.signInWithPassword({
      email: '',
      password: '',
    })

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
            required
          >
            <option value="">select</option>
            <option value="LO">Loan Officer</option>
            <option value="RM">Relationship Manager</option>
            <option value="BM">Branch Manager</option>
            <option value="DCOO">DCOO</option>
            <option value="MD">MD</option>
            <option value="DR">Director</option>
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
                <Input placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </Form>
  )
}
