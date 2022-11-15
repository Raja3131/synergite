import { vendorQueryKeys } from '@/react-query/queryKeys'
import VendorService from '@/services/vendorService'
import { IFindContactsByVendorId, TVContacts } from '@/types'
import { Loader } from '@mantine/core'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import ContactsTable from './contactsTable'

const Contacts = () => {
  const { vendorId } = useParams()
  // const search = window.location.search
  // const params = new URLSearchParams(search)
  // const id = params.get('id')

  const [vContactsData, setVContactsData] = useState<TVContacts[]>(
    [] as TVContacts[]
  )

  const { isError, error, isLoading } = useQuery<
    IFindContactsByVendorId,
    Error
  >(
    [vendorQueryKeys.contactList, vendorId],
    async () => await VendorService.findContactsByVendorId(String(vendorId)),
    {
      onSuccess: (data) => {
        setVContactsData(data.data)
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

  return <ContactsTable data={vContactsData} />
}

export default Contacts
