import { defaultActivityQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TTaskFindById } from '@/types/activity-type'
import { useQuery } from 'react-query'

const findGetAllTaskByActivityId = async (activityId: string) => {
  const response = await axiosPrivate.get<TTaskFindById>(
    `/default/task/${activityId}`
  )
  return response.data
}

const useGetAllTaskByActivityId = (activityId: string) => {
  return useQuery<TTaskFindById, Error>(
    [defaultActivityQueryKeys.taskList, activityId],
    async () => await findGetAllTaskByActivityId(activityId),
    {
      onSuccess: () => console.log('GetAllActivityById On Success Called'),
    }
  )
}

export default useGetAllTaskByActivityId
