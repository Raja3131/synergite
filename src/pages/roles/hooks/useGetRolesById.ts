import { rolesQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TRolesFindById } from '@/types/roles-type'
import { useQuery } from 'react-query'

const findRolesById = async (rolesId: string) => {
  const response = await axiosPrivate.get<TRolesFindById>(`/role/${rolesId}`)
  return response.data
}

const useGetRolesById = (rolesId: string) => {
  return useQuery<TRolesFindById, Error>(
    [rolesQueryKeys.rolesDetails, rolesId],
    async () => await findRolesById(rolesId),
    {
      onSuccess: () => console.log('GetAllRolesById On Success Called'),
    }
  )
}

export default useGetRolesById
