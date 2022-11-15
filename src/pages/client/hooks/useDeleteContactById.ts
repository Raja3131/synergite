import { clientQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { useMutation, useQueryClient } from 'react-query'

const deleteContactById = async (uuid: string): Promise<void> => {
  await axiosPrivate.delete(`/contact/delete/${uuid}`)
}

const useDeleteContactById = () => {
  const queryClient = useQueryClient()

  return useMutation(async (uuid: string) => deleteContactById(uuid), {
    onSuccess: () => {
      void queryClient.resetQueries(clientQueryKeys.contactList)
      console.log('Delete Contact Called')
    },
  })
}

export default useDeleteContactById
