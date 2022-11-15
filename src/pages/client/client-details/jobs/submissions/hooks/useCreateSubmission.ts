import { submissionQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TSubmissionCreate, TSubmissionFindById } from '@/types/submission-type'
import { useMutation, useQueryClient } from 'react-query'

const createSubmission = async (
  data: TSubmissionCreate
): Promise<TSubmissionFindById> => {
  console.log(data)

  return await axiosPrivate.post(`/submission`, data)
}

const useCreateSubmission = () => {
  const queryClient = useQueryClient()

  return useMutation(createSubmission, {
    onSuccess: () => {
      void queryClient.resetQueries(submissionQueryKeys.allSubmission)
    },
  })
}

export default useCreateSubmission
