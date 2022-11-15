import { Loader } from '@mantine/core'
import { CandidateList } from './candidate-list'
import useGetAllCandidate from './hooks/useGetAllCandidate'
// import useGetAllClients from './hooks/useGetAllClients'

export const Candidate = () => {
  const { data, isError, error } = useGetAllCandidate()

  if (isError) {
    console.log(error)
    return <h1>An Error Occurred</h1>
  }

  if (data?.data.length) {
    return <CandidateList data={data?.data} />
    // return <>Candidate List</>
  } else {
    return <Loader variant="dots" />
  }
}

export default Candidate
