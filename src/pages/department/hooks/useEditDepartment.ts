import { departmentQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TDepartment, TDepartmentFindById } from '@/types/department-type'
import { useMutation, useQueryClient } from 'react-query'

const editDepartment = async (
  data: TDepartment
): Promise<TDepartmentFindById> => {
  return await axiosPrivate.post(`/default/activity`, data)
}

const useEditDepartment = () => {
  const queryClient = useQueryClient()

  return useMutation(editDepartment, {
    onSuccess: () => {
      void queryClient.resetQueries(departmentQueryKeys.allDepartment)
    },
  })
}

export default useEditDepartment
