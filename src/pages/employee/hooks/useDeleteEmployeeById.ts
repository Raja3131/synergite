import { employeeQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { useMutation, useQueryClient } from 'react-query'

const deleteEmployeeById = async (uuid: string): Promise<void> => {
  await axiosPrivate.delete(`/employee/${uuid}`)
}

const useDeleteEmployeeById = () => {
  const queryClient = useQueryClient()

  return useMutation(async (uuid: string) => deleteEmployeeById(uuid), {
    onSuccess: () => {
      void queryClient.resetQueries(employeeQueryKeys.allEmployee)
      console.log('Delete Employee Called')
    },
  })
}

export default useDeleteEmployeeById
