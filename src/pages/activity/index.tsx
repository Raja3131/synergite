import { Loader } from '@mantine/core'
import ActivityTable from './activity-table'
import useGetAllDefaultActivity from './hooks/useGetAllDefaultActivity'

export const Activity = () => {
  const { data, isError, error } = useGetAllDefaultActivity()

  if (isError) {
    console.log(error)
    return <h1>An Error Occurred</h1>
  }

  if (data?.data.length) {
    return <ActivityTable data={data.data} />
  } else {
    return <Loader variant="dots" />
  }
}

export default Activity
