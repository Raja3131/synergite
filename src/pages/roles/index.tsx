import { Loader } from '@mantine/core'
import RolesTable from './roles-table'
import useGetAllRoles from './hooks/useGetAllRoles'

export const Roles = () => {
  const { data, isError, error } = useGetAllRoles()

  if (isError) {
    console.log(error)
    return <h1>An Error Occurred</h1>
  }

  if (data?.data.length) {
    return <RolesTable data={data.data} />
  } else {
    return <Loader variant="dots" />
  }
}

export default Roles
