import { defaultActivityQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TTaskCreate, TTaskFindById } from '@/types/activity-type'
import { useMutation, useQueryClient } from 'react-query'

const createTask = async (data: TTaskCreate): Promise<TTaskFindById> => {
  console.log('createTask', createTask)
  return await axiosPrivate.post('/default/task', data)
}

const useCreateTask = () => {
  const queryClient = useQueryClient()

  return useMutation(createTask, {
    onSuccess: () => {
      void queryClient.resetQueries(defaultActivityQueryKeys.taskList)
    },
  })
}

export default useCreateTask
