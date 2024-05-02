import { useQuery } from '@tanstack/react-query'
import {
  ClientInfoPayload,
  fetchClientInfo,
} from '@/lib/api/client-info/functions'

export function ClientInfoData() {
  const info = useQuery({
    queryKey: ['client-info-data'],
    queryFn: () =>
      fetchClientInfo({
        loanId: '1',
        role: 'relationship_manager',
        userId: '1',
      }),
  })

  if (info.isPending) {
    return <div>...Loading</div>
  }

  const infoArray = Object.entries(info?.data as ClientInfoPayload)

  return (
    <div>
      {infoArray.map((data, idx) => (
        <div key={idx}>{`${data[0]} : ${data[1]}`}</div>
      ))}
    </div>
  )
}
