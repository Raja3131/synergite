import { departmentQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { useMutation, useQueryClient } from 'react-query'

const deleteDepartmentById = async (uuid: string): Promise<void> => {
  await axiosPrivate.delete(`/department/${uuid}`)
}

const useDeleteDepartmentById = () => {
  const queryClient = useQueryClient()

  return useMutation(async (uuid: string) => deleteDepartmentById(uuid), {
    onSuccess: () => {
      void queryClient.resetQueries(departmentQueryKeys.allDepartment)
    },
  })
}

export default useDeleteDepartmentById
