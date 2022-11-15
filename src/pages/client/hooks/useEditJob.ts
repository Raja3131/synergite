import { clientQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import apiClient from '@/services/base'
import { TJobs, TJobsFindById } from '@/types'
import { useMutation, useQueryClient } from 'react-query'

const editJob = async (data: TJobs): Promise<TJobsFindById> => {
  return await axiosPrivate.patch(`/jobs/${data?.uuid}`, data)
}

const useEditJob = () => {
  const queryClient = useQueryClient()

  return useMutation(editJob, {
    onSuccess: () => {
      void queryClient.resetQueries(clientQueryKeys.jobList)
    },
  })
}

export default useEditJob
