import { employeeQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TCandidateFindById } from '@/types/candidate-type'
import { useQuery } from 'react-query'

const findCandidateById = async (uuid: string) => {
  // const response = await apiClient.get<TATCandidateFindById>(`/employees/${id}`)
  // return response.data
  const response = await axiosPrivate.get<TCandidateFindById>(
    `/candidate/${uuid}`
  )
  return response.data
}

const useGetCandidateById = (uuid: string) => {
  return useQuery<TCandidateFindById, Error>(
    [employeeQueryKeys.employeeDetails, uuid],
    async () => await findCandidateById(uuid),
    {
      onSuccess: () => console.log('GetAllTCandidateById On Success Called'),
    }
  )
}

export default useGetCandidateById
