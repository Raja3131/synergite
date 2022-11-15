import { defaultActivityQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TActivityFindAll } from '@/types/activity-type'
import { useQuery } from 'react-query'

const findAllDefaultActivity = async () => {
  const response = await axiosPrivate.get<TActivityFindAll>('/default/activity')
  return response.data
}

const useGetAllDefaultActivity = () => {
  return useQuery<TActivityFindAll, Error>(
    defaultActivityQueryKeys.allDefaultActivity,
    findAllDefaultActivity
  )
}

export default useGetAllDefaultActivity
