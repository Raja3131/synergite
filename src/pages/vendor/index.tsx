import { Loader } from '@mantine/core'
import useGetAllVendors from './hooks/useGetAllVendors'
import VendorTable from './vendor-table'

export const Vendor = () => {
  const { data, isError, error } = useGetAllVendors()

  if (isError) {
    console.log(error)
    return <h1>An Error Occurred</h1>
  }

  if (data?.data.length) {
    return <VendorTable data={data.data} />
  } else {
    return <Loader variant="dots" />
  }
}

export default Vendor
