import { jobQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TJobs } from '@/types'
import { useQuery } from 'react-query'

const getJobs = async () => {
  const response = await axiosPrivate.get<{ data: TJobs[] }>(
    `${jobQueryKeys.jobs}`
  )
  return response.data.data
} // End of getJobs

const useFetchJob = () => {
  return useQuery<TJobs[], Error>('jobQueryKeys.jobs', getJobs, {
    onSuccess: () => console.log('GetAllJob On Success Called'),
  })
} // End of useFetchJob

export default useFetchJob
