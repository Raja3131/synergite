import { candidateQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TCandidateCreate, TCandidateFindById } from '@/types/candidate-type'
import { useMutation, useQueryClient } from 'react-query'

const createCandidate = async (
  employee: TCandidateCreate
): Promise<TCandidateFindById> => {
  return await axiosPrivate.post('/candidate', employee)
}

const useCreateCandidate = () => {
  const queryClient = useQueryClient()

  return useMutation(createCandidate, {
    onSuccess: () => {
      void queryClient.resetQueries(candidateQueryKeys.allCandidate)
    },
  })
}

export default useCreateCandidate
