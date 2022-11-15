import useGetAllVendors from '@/pages/vendor/hooks/useGetAllVendors'
import { TVendor } from '@/types'
import { Paper } from '@mantine/core'
import { VendorId } from './vendorIdList'

interface VendorIdListProps {
  setVendor: (value: TVendor) => void
}

const VendorIdList = ({ setVendor }: VendorIdListProps) => {
  const { data } = useGetAllVendors()
  console.log(data?.data)

  return (
    <Paper
      style={{
        boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.50)',
        padding: '20px',
      }}
    >
      <VendorId data={data?.data || []} setVendor={setVendor} />
    </Paper>
  )
}

export default VendorIdList
