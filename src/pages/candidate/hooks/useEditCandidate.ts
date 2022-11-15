import { employeeQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TCandidate, TCandidateFindById } from '@/types/candidate-type'
import { useMutation, useQueryClient } from 'react-query'

// const editEmployee = async (data: TCandidate): Promise<TCandidateFindById> => {
//   return await apiClient.patch(`/employees/${data.id}`, data)
// }
const editCandidate = async (data: TCandidate): Promise<TCandidateFindById> => {
  return await axiosPrivate.patch(`/candidate/${data?.uuid}`, data)
}
// const editCandidate = async (
//   employee: TCandidate
// ): Promise<TCandidateFindById> => {
//   return await axiosPrivate.patch('/employee/save', employee)
// }

const useEditCandidate = () => {
  const queryClient = useQueryClient()

  return useMutation(editCandidate, {
    onSuccess: () => {
      void queryClient.resetQueries(employeeQueryKeys.allEmployee)
    },
  })
}

export default useEditCandidate
