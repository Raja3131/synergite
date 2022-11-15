import { defaultActivityQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TActivityCreate, TActivityFindById } from '@/types/activity-type'
import { useMutation, useQueryClient } from 'react-query'

const createDefaultActivity = async (
  activity: TActivityCreate
): Promise<TActivityFindById> => {
  return await axiosPrivate.post('/default/activity', activity)
}

const useCreateDefaultActivity = () => {
  const queryClient = useQueryClient()

  return useMutation(createDefaultActivity, {
    onSuccess: () => {
      void queryClient.resetQueries(defaultActivityQueryKeys.allDefaultActivity)
    },
  })
}

export default useCreateDefaultActivity
