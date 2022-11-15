import { rolesQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TRoles, TRolesFindById } from '@/types/roles-type'
import { useMutation, useQueryClient } from 'react-query'

const editRoles = async (data: TRoles): Promise<TRolesFindById> => {
  return await axiosPrivate.post(`/default/activity`, data)
}

const useEditRoles = () => {
  const queryClient = useQueryClient()

  return useMutation(editRoles, {
    onSuccess: () => {
      void queryClient.resetQueries(rolesQueryKeys.allRoles)
    },
  })
}

export default useEditRoles
