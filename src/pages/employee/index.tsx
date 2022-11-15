import { Loader } from '@mantine/core'
import { EmployeeList } from './employee-list'
import useGetAllEmployees from './hooks/useGetAllEmployees'
// import useGetAllClients from './hooks/useGetAllClients'

export const Employee = () => {
  const { data, isError, error } = useGetAllEmployees()

  if (isError) {
    console.log(error)
    return <h1>An Error Occurred</h1>
  }

  if (data?.data.length) {
    return <EmployeeList data={data.data} />
  } else {
    return <Loader variant="dots" />
  }
}

export default Employee
