import { defaultActivityQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { useMutation, useQueryClient } from 'react-query'

const deleteTaskById = async (uuid: string): Promise<void> => {
  await axiosPrivate.delete(`/default/task/${uuid}`)
}

const useDeleteTaskById = () => {
  const queryClient = useQueryClient()

  return useMutation(async (uuid: string) => deleteTaskById(uuid), {
    onSuccess: () => {
      void queryClient.resetQueries(defaultActivityQueryKeys.taskList)
    },
  })
}

export default useDeleteTaskById
