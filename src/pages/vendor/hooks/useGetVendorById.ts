import { vendorQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import apiClient from '@/services/base'
import { TVendorFindById } from '@/types'
import { useQuery } from 'react-query'

const findVendorById = async (uuid: string) => {
  // const response = await apiClient.get<TVendorFindById>(`/vendors/${uuid}`)
  // return response.data
  const response = await axiosPrivate.get<TVendorFindById>(`/vendor/${uuid}`)
  return response.data
}

const useGetVendorById = (uuid: string) => {
  return useQuery<TVendorFindById, Error>(
    [vendorQueryKeys.vendorDetails, uuid],
    async () => await findVendorById(uuid),
    {
      onSuccess: () => console.log('GetAllVendorById On Success Called'),
    }
  )
}

export default useGetVendorById
