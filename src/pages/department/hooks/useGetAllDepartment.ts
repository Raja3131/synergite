import { departmentQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TDepartmentFindAll } from '@/types/department-type'
import { useQuery } from 'react-query'

const findAllDepartment = async () => {
  const response = await axiosPrivate.get<TDepartmentFindAll>('/department')
  return response.data
}

const useGetAllDepartment = () => {
  return useQuery<TDepartmentFindAll, Error>(
    departmentQueryKeys.allDepartment,
    findAllDepartment
  )
}

export default useGetAllDepartment
