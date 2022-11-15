import { submissionQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TSubmission } from '@/types/submission-type'
import { useQuery } from 'react-query'

interface TSubmissionApi {
  data: TSubmission[]
}

const findAllSubmissions = async (client_id: string, job_id: string) => {
  // console.log('SubmissionById', client_id)
  const response = await axiosPrivate.get<TSubmissionApi>(
    // TODO: TMP - remove old
    `/submission/client/jobs?client_id=${client_id}&job_id=${job_id}`
  )
  return response.data
}

const useGetAllSubmissionsByClientIdJobId = (
  client_id: string,
  job_id: string
) => {
  return useQuery<TSubmissionApi, Error>(
    [submissionQueryKeys.getAllSubmissionByClientIdJobId, client_id, job_id],
    async () => await findAllSubmissions(client_id, job_id),
    {
      onSuccess: () =>
        console.log('GetAllSubmissionsByClientIdJobId On Success Called'),
    }
  )
}

export default useGetAllSubmissionsByClientIdJobId

//
// import { submissionQueryKeys } from '@/react-query/queryKeys'
// import axiosPrivate from '@/services/axiosPrivate'
// import { TSubmission } from '@/types/submission-type'
// import { useQuery } from 'react-query'

// interface TSubmissionApi {
//   data: TSubmission[]
//   ok: boolean
//   message: string
// }

// const findAllSubmissionsByClientIdJobId = async () => {
//   const response = await axiosPrivate.get<TSubmissionApi>('/submission')
//   return response.data
// }

// const useGetAllSubmissionsByClientIdJobId = () => {
//   return useQuery<TSubmissionApi, Error>(
//     submissionQueryKeys.getAllSubmissionByClientIdJobId,
//      findAllSubmissionsByClientIdJobId,
//     {
//       onSuccess: () =>
//         console.log('GetAllSubmissionsByClientIdJobId On Success Called'),
//     }
//   )
// }

// export default useGetAllSubmissionsByClientIdJobId
