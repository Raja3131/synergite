import useGetAllCandidate from '@/pages/candidate/hooks/useGetAllCandidate'
import { TCandidate } from '@/types/candidate-type'
import { Loader, Paper } from '@mantine/core'
import { EmployeeId } from './employeeIdList'

interface EmployeeIdListProps {
  setEmployee: (value: TCandidate) => void
}

export const EmployeeIdList = ({ setEmployee }: EmployeeIdListProps) => {
  const { data, isError, error, isLoading } = useGetAllCandidate()

  if (isError) {
    console.log(error)
    return <h1>An Error Occurred</h1>
  }

  if (!isLoading) {
    return (
      <Paper
        style={{
          boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.50)',
          padding: '20px',
        }}
      >
        <EmployeeId
          data={data?.data ? data?.data : []}
          setEmployee={setEmployee}
        />
      </Paper>
    )
  } else if (isLoading) {
    return <Loader variant="dots" />
  } else {
    return <></>
  }
}

export default EmployeeIdList
