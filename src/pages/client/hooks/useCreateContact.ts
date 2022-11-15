import { clientQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TContactCreate, TContactsFindById } from '@/types'
import { useMutation, useQueryClient } from 'react-query'

const createContact = (data: TContactCreate): Promise<TContactsFindById> => {
  return axiosPrivate.post('/contact', data)
  // return apiClient.post('/contacts').then((response) => response.data.data)
}

const useCreateContact = () => {
  const queryClient = useQueryClient()

  return useMutation(createContact, {
    onSuccess: () => {
      void queryClient.resetQueries(clientQueryKeys.contactList)
      console.log('Create Contact Called')
    },
  })
}

export default useCreateContact
