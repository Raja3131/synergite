import { submissionQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TSubmission, TSubmissionFindById } from '@/types/submission-type'
import { useMutation, useQueryClient } from 'react-query'

const editSubmission = async (
  data: TSubmission
): Promise<TSubmissionFindById> => {
  return await axiosPrivate.post(`/submission`, data)
}

const useEditSubmission = () => {
  const queryClient = useQueryClient()

  return useMutation(editSubmission, {
    onSuccess: () => {
      void queryClient.resetQueries(submissionQueryKeys.allSubmission)
    },
  })
}

export default useEditSubmission
