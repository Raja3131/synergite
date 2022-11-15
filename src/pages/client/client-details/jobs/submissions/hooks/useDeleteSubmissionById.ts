import { submissionQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { useMutation, useQueryClient } from 'react-query'

const deleteSubmissionById = async (uuid: string): Promise<void> => {
  await axiosPrivate.delete(`submission/${uuid}`)
}

const useDeleteSubmissionById = () => {
  const queryClient = useQueryClient()

  return useMutation(async (uuid: string) => deleteSubmissionById(uuid), {
    onSuccess: () => {
      void queryClient.resetQueries(submissionQueryKeys.allSubmission)
    },
  })
}

export default useDeleteSubmissionById
