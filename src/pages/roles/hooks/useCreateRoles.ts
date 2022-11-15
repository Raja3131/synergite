import { rolesQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TRolesCreate, TRolesFindById } from '@/types/roles-type'
import { useMutation, useQueryClient } from 'react-query'

const createRoles = async (role: TRolesCreate): Promise<TRolesFindById> => {
  return await axiosPrivate.post('/role', role)
}

const useCreateRoles = () => {
  const queryClient = useQueryClient()

  return useMutation(createRoles, {
    onSuccess: () => {
      void queryClient.resetQueries(rolesQueryKeys.allRoles)
    },
  })
}

export default useCreateRoles
