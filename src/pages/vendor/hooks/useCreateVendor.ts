import { vendorQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import apiClient from '@/services/base'
import { TVendorCreate, TVendorFindById } from '@/types'
import { useMutation, useQueryClient } from 'react-query'

const createVendor = async (
  vendor: TVendorCreate
): Promise<TVendorFindById> => {
  return await axiosPrivate.post('/vendor', vendor)
}

const useCreateVendor = () => {
  const queryClient = useQueryClient()

  return useMutation(createVendor, {
    onSuccess: () => {
      void queryClient.resetQueries(vendorQueryKeys.allVendors)
    },
  })
}

export default useCreateVendor
