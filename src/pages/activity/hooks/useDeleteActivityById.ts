import { defaultActivityQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { useMutation, useQueryClient } from 'react-query'

const deleteActivityById = async (uuid: string): Promise<void> => {
  await axiosPrivate.delete(`/default/activity/${uuid}`)
}

const useDeleteActivityById = () => {
  const queryClient = useQueryClient()

  return useMutation(async (uuid: string) => deleteActivityById(uuid), {
    onSuccess: () => {
      void queryClient.resetQueries(defaultActivityQueryKeys.allDefaultActivity)
    },
  })
}

export default useDeleteActivityById
