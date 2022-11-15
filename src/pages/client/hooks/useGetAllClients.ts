import { clientQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TClientFindAll } from '@/types'
import { useQuery } from 'react-query'

const findAllClients = async () => {
  const response = await axiosPrivate.get<TClientFindAll>('/client')
  return response.data
}

const useGetAllClients = () => {
  return useQuery<TClientFindAll, Error>(
    clientQueryKeys.allClients,
    findAllClients
    // {
    //   onSuccess: () => console.log('GetAllClients On Success Called'),
    // }
  )
}

export default useGetAllClients
