import { vendorQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import apiClient from '@/services/base'
import { TVendor, TVendorFindById } from '@/types'
import { useMutation, useQueryClient } from 'react-query'

const editVendor = async (data: TVendor): Promise<TVendorFindById> => {
  return await axiosPrivate.patch(`/vendor/${data.uuid}`, data)
}

const useEditVendor = () => {
  const queryClient = useQueryClient()

  return useMutation(editVendor, {
    onSuccess: () => {
      void queryClient.resetQueries(vendorQueryKeys.allVendors)
    },
  })
}

export default useEditVendor
