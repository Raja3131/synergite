import { clientQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { useMutation, useQueryClient } from 'react-query'

const deleteClientById = async (uuid: string): Promise<void> => {
  await axiosPrivate.delete(`/client/${uuid}`)
}

const useDeleteClientById = () => {
  const queryClient = useQueryClient()

  return useMutation(async (uuid: string) => deleteClientById(uuid), {
    onSuccess: () => {
      void queryClient.resetQueries(clientQueryKeys.allClients)
      console.log('Delete Client Called')
    },
  })
}

export default useDeleteClientById
