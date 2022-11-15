import { defaultActivityQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TActivity, TActivityFindById } from '@/types/activity-type'
import { useMutation, useQueryClient } from 'react-query'

const editDefaultActivity = async (
  data: TActivity
): Promise<TActivityFindById> => {
  return await axiosPrivate.patch(`/default/activity`, data)
}

const useEditDefaultActivity = () => {
  const queryClient = useQueryClient()

  return useMutation(editDefaultActivity, {
    onSuccess: () => {
      void queryClient.resetQueries(defaultActivityQueryKeys.allDefaultActivity)
    },
  })
}

export default useEditDefaultActivity
