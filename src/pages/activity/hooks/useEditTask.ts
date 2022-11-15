import { defaultActivityQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TTasks, TTaskFindById } from '@/types/activity-type'
import { useMutation, useQueryClient } from 'react-query'

const editTask = async (data: TTasks): Promise<TTaskFindById> => {
  return await axiosPrivate.patch('/default/task', data)
}

const useEditTask = () => {
  const queryClient = useQueryClient()

  return useMutation(editTask, {
    onSuccess: () => {
      void queryClient.resetQueries(defaultActivityQueryKeys.taskList)
    },
  })
}

export default useEditTask
