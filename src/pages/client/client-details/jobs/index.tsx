import { clientQueryKeys } from '@/react-query/queryKeys'
import ClientService from '@/services/clientService'
import { IFindJobsByClientId, TJobs } from '@/types'
import { Loader } from '@mantine/core'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import JobsTable from './jobsTable'

const Jobs = () => {
  const { clientId } = useParams()
  // const search = window.location.search
  // const params = new URLSearchParams(search)
  // const id = params.get('id')
  const [jobData, setJobData] = useState<TJobs[]>([] as TJobs[])

  const { isError, error, isLoading } = useQuery<IFindJobsByClientId, Error>(
    [clientQueryKeys.jobList, clientId],
    async () => await ClientService.findJobsByClientId(String(clientId)),
    {
      onSuccess: (data) => {
        setJobData(data.data)
      },
    }
  )

  if (isError) {
    console.log(error)
    return <h1>An Error Occurred</h1>
  }

  if (isLoading) {
    return (
      <div>
        <Loader variant="dots" />
      </div>
    )
  }

  return <JobsTable data={jobData} />
}

export default Jobs
