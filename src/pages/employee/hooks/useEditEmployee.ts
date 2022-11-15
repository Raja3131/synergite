import { employeeQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TAEmployee, TAEmployeeFindById } from '@/types/employee-type'
import { useMutation, useQueryClient } from 'react-query'

// const editEmployee = async (data: TAEmployee): Promise<TAEmployeeFindById> => {
//   return await apiClient.patch(`/employees/${data.id}`, data)
// }
const editEmployee = async (data: TAEmployee): Promise<TAEmployeeFindById> => {
  return await axiosPrivate.patch(`/employee/${data.uuid}`, data)
}
// const editEmployee = async (
//   employee: TAEmployee
// ): Promise<TAEmployeeFindById> => {
//   return await axiosPrivate.patch('/employee/save', employee)
// }

const useEditEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation(editEmployee, {
    onSuccess: () => {
      void queryClient.resetQueries(employeeQueryKeys.allEmployee)
    },
  })
}

export default useEditEmployee
