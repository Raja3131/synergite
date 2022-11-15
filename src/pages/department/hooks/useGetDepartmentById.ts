import { departmentQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TDepartmentFindById } from '@/types/department-type'
import { useQuery } from 'react-query'

const findDepartmentById = async (departmentId: string) => {
  const response = await axiosPrivate.get<TDepartmentFindById>(
    `/department/${departmentId}`
  )
  return response.data
}

const useGetDepartmentById = (departmentId: string) => {
  return useQuery<TDepartmentFindById, Error>(
    [departmentQueryKeys.departmentDetails, departmentId],
    async () => await findDepartmentById(departmentId),
    {
      onSuccess: () => console.log('GetAllActivityById On Success Called'),
    }
  )
}

export default useGetDepartmentById
