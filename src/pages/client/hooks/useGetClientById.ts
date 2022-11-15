import { clientQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TClientFindById } from '@/types'
import { useQuery } from 'react-query'

const findClientById = async (uuid: string) => {
  const response = await axiosPrivate.get<TClientFindById>(`/client/${uuid}`)
  return response.data
}

const useGetClientById = (uuid: string) => {
  return useQuery<TClientFindById, Error>(
    [clientQueryKeys.clientDetails, uuid],
    async () => await findClientById(uuid)
    // {
    //   onSuccess: () => console.log('GetAllClientById On Success Called'),
    // }
  )
}

export default useGetClientById
