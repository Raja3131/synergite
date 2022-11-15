import { candidateQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { useMutation, useQueryClient } from 'react-query'

const deleteCandidateById = async (uuid: string): Promise<void> => {
  await axiosPrivate.delete(`/candidate/${uuid}`)
}

const useDeleteCandidateById = () => {
  const queryClient = useQueryClient()

  return useMutation(async (uuid: string) => deleteCandidateById(uuid), {
    onSuccess: () => {
      void queryClient.resetQueries(candidateQueryKeys.allCandidate)
      console.log('Delete Employee Called')
    },
  })
}

export default useDeleteCandidateById
