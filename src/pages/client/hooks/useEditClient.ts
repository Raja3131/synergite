import { clientQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TClient, TClientFindById } from '@/types'
import { useMutation, useQueryClient } from 'react-query'

const editClient = async (data: TClient): Promise<TClientFindById> => {
  // return await axiosPrivate.patch(`/client/save`, data)

  return await axiosPrivate.patch(`/client/${data.uuid}`, data)
}

const useEditClient = () => {
  const queryClient = useQueryClient()

  return useMutation(editClient, {
    onSuccess: () => {
      void queryClient.resetQueries(clientQueryKeys.allClients)
      console.log('Client Edited')
    },
  })
}

export default useEditClient
