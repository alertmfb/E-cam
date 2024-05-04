import { useForm } from 'react-hook-form'
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
import { Button } from '@/components/ui/button'
import { gvS } from './gvSchema'
import {
  FormSection,
  SectionInputContainer,
} from '../client-information/client-info-form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from '@radix-ui/react-icons'
import { Calendar } from '@/components/ui/calendar'

export function GuarantorVerificationForm() {
  const form = useForm<z.infer<typeof gvS>>({
    resolver: zodResolver(gvS),
    defaultValues: {
      // date: '',
    },
  })
  function onSubmit(values: z.infer<typeof gvS>) {
    console.log(values)
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
              <FormItem>
                <FormLabel>Guarantor One Business Pictures</FormLabel>
                <FormControl>
                  <Input type="file" />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="self-end">
                    <FormLabel className="mr-3">Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>
                  Verification Picture (Loan Officer and Risk Supervisor)
                </FormLabel>
                <FormControl>
                  <Input type="file" />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="self-end">
                    <FormLabel className="mr-3">Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </SectionInputContainer>
            <div className="flex items-center justify-between">
              <Button type="submit" className="w-32 self-start">
                Save
              </Button>
              <p className="font-muted-foreground cursor-pointer text-sm">
                preview
              </p>
            </div>
          </FormSection>
          <FormSection>
            <SectionInputContainer>
              <FormItem>
                <FormLabel>Guarantor Two Business Pictures</FormLabel>
                <FormControl>
                  <Input type="file" />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="self-end">
                    <FormLabel className="mr-3">Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>
                  Verification Picture (Loan Officer and Risk Supervisor)
                </FormLabel>
                <FormControl>
                  <Input type="file" />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="self-end">
                    <FormLabel className="mr-3">Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </SectionInputContainer>
            <div className="flex items-center justify-between">
              <Button type="submit" className="w-32 self-start">
                Save
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
