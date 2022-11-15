import { clientQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import apiClient from '@/services/base'
import { useMutation, useQueryClient } from 'react-query'

const deleteJobById = async (uuid: string): Promise<void> => {
  await axiosPrivate.delete(`/jobs/${uuid}`)
}

const useDeleteJobById = () => {
  const queryClient = useQueryClient()

  return useMutation(async (uuid: string) => deleteJobById(uuid), {
    onSuccess: () => {
      void queryClient.resetQueries(clientQueryKeys.jobList)
      console.log('Delete Job Called')
    },
  })
}

export default useDeleteJobById
