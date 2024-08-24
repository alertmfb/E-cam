import { createFileRoute } from '@tanstack/react-router'
import { useUploadUserImage } from '@/lib/api/user-profile/functions'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/auth/hooks'

export const Route = createFileRoute('/app/_a/profile/')({
  component: Upload,
})

function Upload() {
  const { userId } = useAuth()

  return (
    <div className="container w-full flex flex-col px-4 gap-3 pt-10">
      <h1 className="text-xl font-semibold">Profile Upload</h1>
      <main className="flex flex-col h-24 pt-3">
        <ImageFormItem userId={userId!} />
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
      <Input
        type="file"
        onChange={(e) => handleFileChange(e)}
        className="lg:w-1/2"
      />
      <span className="text-sm pl-4">Supported formats: jpg, png, jpeg</span>
    </div>
  )
}
