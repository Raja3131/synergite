import { clientQueryKeys } from '@/react-query/queryKeys'
import ClientService from '@/services/clientService'
import { IFindContactsByClientId, TContacts } from '@/types'
import { Loader } from '@mantine/core'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import ContactsTable from './contactsTable'

const Contacts = () => {
  const { clientId } = useParams()
  // const search = window.location.search
  // const params = new URLSearchParams(search)
  // const id = params.get('id')
  const [contactsData, setContactsData] = useState<TContacts[]>(
    [] as TContacts[]
  )

  const { isError, error, isLoading } = useQuery<
    IFindContactsByClientId,
    Error
  >(
    [clientQueryKeys.contactList, clientId],
    async () => await ClientService.findContactsByClientId(String(clientId)),
    {
      onSuccess: (data) => {
        setContactsData(data.data)
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

  return <ContactsTable data={contactsData} />
}

export default Contacts
