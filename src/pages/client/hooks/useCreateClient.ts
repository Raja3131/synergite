import { clientQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TClientCreate, TClientFindById } from '@/types'
import { useMutation, useQueryClient } from 'react-query'

const createClient = async (
  client: TClientCreate
): Promise<TClientFindById> => {
  return await axiosPrivate.post('/client', client)
}

const useCreateClient = () => {
  const queryClient = useQueryClient()

  return useMutation(createClient, {
    onSuccess: () => {
      void queryClient.resetQueries(clientQueryKeys.allClients)
      console.log('Create Client Called')
    },
  })
}

export default useCreateClient
