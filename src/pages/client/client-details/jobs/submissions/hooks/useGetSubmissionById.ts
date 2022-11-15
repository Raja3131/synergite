import { submissionQueryKeys } from '@/react-query/queryKeys'
import apiClient from '@/services/base'
import { TSubmissionFindById } from '@/types/submission-type'
import { useQuery } from 'react-query'

const findSubmissionById = async (id: number) => {
  const response = await apiClient.get<TSubmissionFindById>(
    `/submissions/${id}`
  )
  return response.data
}

const useGetSubmissionById = (id: number) => {
  return useQuery<TSubmissionFindById, Error>(
    [submissionQueryKeys.allSubmission, id],
    async () => await findSubmissionById(id),
    {
      onSuccess: () => console.log('GetAllSubmissionById On Success Called'),
    }
  )
}

export default useGetSubmissionById
