import { Loader } from '@mantine/core'
import DepartmentTable from './department-table'
import useGetAllDepartment from './hooks/useGetAllDepartment'

export const Department = () => {
  const { data, isError, error } = useGetAllDepartment()

  if (isError) {
    console.log(error)
    return <h1>An Error Occurred</h1>
  }

  if (data?.data.length) {
    return <DepartmentTable data={data.data} />
  } else {
    return <Loader variant="dots" />
  }
}

export default Department
