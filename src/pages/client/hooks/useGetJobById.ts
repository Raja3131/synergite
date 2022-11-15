import { clientQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import apiClient from '@/services/base'
import { TJobsFindById } from '@/types'
import { useQuery } from 'react-query'

const findJobById = async (id: string) => {
  const response = await axiosPrivate.get<TJobsFindById>(`/jobs/${id}`)
  return response.data
}

const useGetJobById = (id: string) => {
  return useQuery<TJobsFindById, Error>(
    [clientQueryKeys.jobDetails, id],
    async () => await findJobById(id),
    {
      onSuccess: () => console.log('GetAllJobById On Success Called'),
    }
  )
}

export default useGetJobById
