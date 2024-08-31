import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  useResetPassword,
  useUploadUserImage,
} from '@/lib/api/user-profile/functions'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/auth/hooks'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useRef } from 'react'

export const Route = createFileRoute('/app/_a/profile/')({
  component: Upload,
})

function Upload() {
  const { userId } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="container w-full flex flex-col px-4 gap-3 pt-10">
      <div className="flex items-center gap-3">
        <ArrowLeft
          onClick={() => navigate({ to: '/app/dashboard', replace: true })}
          className="cursor-pointer"
        />
        <h1 className="text-xl font-semibold">Profile Settings</h1>
      </div>
      <main className="flex flex-col gap-20 pt-8">
        <div className="flex flex-col gap-3 rounded-md border p-4">
          <Label className="text-xl">Update Profile Image</Label>
          <ImageFormItem userId={userId!} />
        </div>

        <div className="w-full xl:w-1/2 flex flex-col gap-6 rounded-md border p-4">
          <div className="flex flex-col gap-2">
            <Label className="text-xl">Reset Password</Label>
            <Label className="text-base">
              Enter new password and confirm to change.
            </Label>
          </div>
          <ResetPasswordForm userId={userId!} />
        </div>
      </main>
    </div>
  )
}

const ImageFormItem = ({ userId }: { userId: string }) => {
  const LIMIT = 2 * 2 ** 20 // 2MB
  const allowedFormats: Record<string, boolean> = {
    'image/jpeg': true,
    'image/png': true,
    'image/apng': true,
    'image/webp': true,
    'image/tiff': true,
  }

  const upload = useUploadUserImage()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // check size of file
      const file = e.target.files[0]

      if (file.size > LIMIT) {
        alert('Image size greater than 2MB')
        return
      }

      if (!allowedFormats[file.type]) {
        alert('Unsupported image format')
        return
      }

      const form = new FormData()
      form.append('picture', e.target.files[0])

      upload.mutate({ userId, image: form })
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <Input
          type="file"
          onChange={(e) => handleFileChange(e)}
          className="lg:w-1/2"
        />
        {upload.isPending && <Loader2 className="animate-spin" />}
      </div>
      <span className="text-sm">Supported formats: jpg, png, jpeg</span>
    </div>
  )
}

const ResetPasswordForm = ({ userId }: { userId: string }) => {
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmRef = useRef<HTMLInputElement>(null)

  const reset = useResetPassword()

  const submit = () => {
    if (passwordRef.current?.value === '' || confirmRef.current?.value === '') {
      alert('Invalid password entered')
      return
    }

    if (passwordRef.current?.value !== confirmRef.current?.value) {
      alert('Passwords do not match')
      return
    }

    const password = passwordRef.current?.value
    const confirm = confirmRef.current?.value

    if (!password || !confirm) {
      alert('error')
      return
    }

    passwordRef.current.value = ''
    confirmRef.current.value = ''

    reset.mutate({
      userId: userId,
      password: password,
    })
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col items-start gap-2 justify-start">
        <div className="">New Password</div>
        <Input placeholder="********" type="password" ref={passwordRef} />
      </div>

      <div className="flex flex-col items-start gap-2 justify-start">
        <div className="">Confirm Password</div>
        <Input placeholder="********" type="password" ref={confirmRef} />
      </div>
      <Button className="mt-4" onClick={submit}>
        Reset
      </Button>
    </div>
  )
}
