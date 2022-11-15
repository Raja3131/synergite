import { vendorQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import apiClient from '@/services/base'
import { useMutation, useQueryClient } from 'react-query'

const deleteVendorById = async (uuid: string): Promise<void> => {
  // await apiClient.delete(`/vendors/${id}`)
  await axiosPrivate.delete(`/vendor/${uuid}`)
}

const useDeleteVendorById = () => {
  const queryClient = useQueryClient()

  return useMutation(async (uuid: string) => deleteVendorById(uuid), {
    onSuccess: () => {
      void queryClient.resetQueries(vendorQueryKeys.allVendors)
    },
  })
}

export default useDeleteVendorById
