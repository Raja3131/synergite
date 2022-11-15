import { employeeQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TAEmployeeFindById } from '@/types/employee-type'
import { useQuery } from 'react-query'

const findEmployeeById = async (uuid: string) => {
  // const response = await apiClient.get<TAEmployeeFindById>(`/employees/${id}`)
  // return response.data
  const response = await axiosPrivate.get<TAEmployeeFindById>(
    `/employee/${uuid}`
  )
  return response.data
}

const useGetEmployeeById = (uuid: string) => {
  return useQuery<TAEmployeeFindById, Error>(
    [employeeQueryKeys.employeeDetails, uuid],
    async () => await findEmployeeById(uuid),
    {
      onSuccess: () => console.log('GetAllEmployeeById On Success Called'),
    }
  )
}

export default useGetEmployeeById
