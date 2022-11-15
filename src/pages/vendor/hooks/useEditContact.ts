import { clientQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TVContacts, TContactsFindById } from '@/types'
import { useMutation, useQueryClient } from 'react-query'

const editContact = async (data: TVContacts): Promise<TContactsFindById> => {
  return await axiosPrivate.patch(`/contact/${data?.uuid}`, data)
}

const useEditContact = () => {
  const queryClient = useQueryClient()

  return useMutation(editContact, {
    onSuccess: () => {
      void queryClient.resetQueries(clientQueryKeys.contactList)
    },
  })
}

export default useEditContact
