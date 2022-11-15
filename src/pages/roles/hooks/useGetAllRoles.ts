import { rolesQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TRolesFindAll } from '@/types/roles-type'
import { useQuery } from 'react-query'

const findAllRoles = async () => {
  const response = await axiosPrivate.get<TRolesFindAll>('/role')
  return response.data
}

const useGetAllRoles = () => {
  return useQuery<TRolesFindAll, Error>(rolesQueryKeys.allRoles, findAllRoles)
}

export default useGetAllRoles
