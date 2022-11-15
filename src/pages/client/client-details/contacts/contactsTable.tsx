import { useState } from 'react'
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  Drawer,
  Button,
  Avatar,
  // Pagination,
} from '@mantine/core'
import { keys } from '@mantine/utils'
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconEdit,
  IconTrash,
  IconPlus,
} from '@tabler/icons'
import { TContacts } from '@/types'
import { openConfirmModal } from '@mantine/modals'
import CreateContact from '@/components/form/client/contact/createForm'
import EditContact from '@/components/form/client/contact/editForm'
import { showNotification } from '@mantine/notifications'
import useDeleteContactById from '../../hooks/useDeleteContactById'

// Style for the Page
const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    '&:hover': {
      backgroundColor: theme.colors.blue[0],
    },
  },

  companyDetails: {
    border: 'none',
    '&:hover': {
      backgroundColor: theme.colors.blue[1],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
  tableHead: {
    width: '100%',
    padding: '10px',
    paddingTop: '0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '0 !important',
    gap: '30px',
  },

  tableBottom: {
    width: '100%',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  searchField: {
    flex: 1,
  },
  text: {
    color: theme.colors.blue[9],
  },
  contactIcon: {
    color: theme.colors.blue[8],
  },
  editIcon: {
    color: theme.colors.blue[5],
    '&:hover': {
      color: theme.colors.blue[9],
    },
  },
  deleteIcon: {
    color: '#FF7676',
    '&:hover': {
      color: '#FF1414',
    },
  },
  action: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.colors.blue[0],
    },
  },
  childTable: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.25)',
    backgroundColor: 'white',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '98.3%',
    margin: '10px',
    borderCollapse: 'collapse',
    border: 'none',
  },
  iconPlus: {
    color: theme.colors.blue[6],
    backgroundColor: theme.colors.blue[1],
    borderRadius: '5px',
    cursor: 'pointer',
  },
}))

// Table Heading Props
interface ThProps {
  children: React.ReactNode
  reversed: boolean
  sorted: boolean
  onSort(): void
}

// Table Heading Component
function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles()
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  )
}

// Utility Function - filter Data
function filterData(data: TContacts[], search: string) {
  const query = search.toLowerCase().trim()
  return data.filter((item) =>
    keys(data[0]).some((key) => String(item[key]).toLowerCase().includes(query))
  )
}

// Utility Function - short Data
function sortData(
  data: TContacts[],
  payload: {
    sortBy: keyof TContacts | null
    reversed: boolean
    search: string
  }
) {
  const { sortBy } = payload

  if (!sortBy) {
    return filterData(data, payload.search)
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return String(b[sortBy]).localeCompare(String(a[sortBy]))
      }

      return String(a[sortBy]).localeCompare(String(b[sortBy]))
    }),
    payload.search
  )
}

interface ContactProps {
  data: TContacts[]
}

// Exporting Default ClientTable Component

export default function ContactsTable({ data }: ContactProps) {
  const [opened, setOpened] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
  const [search, setSearch] = useState('')
  const [contactEditData, setContactEditData] = useState({} as TContacts)
  const [sortedData, setSortedData] = useState(data)
  const [sortBy, setSortBy] = useState<keyof TContacts | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)
  const { classes } = useStyles()
  const setSorting = (field: keyof TContacts) => {
    const reversed = field === sortBy ? !reverseSortDirection : false
    setReverseSortDirection(reversed)
    setSortBy(field)
    setSortedData(sortData(data, { sortBy: field, reversed, search }))
  }
  const { mutate: deleteContact } = useDeleteContactById()

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSearch(value)
    // setSortedData()
    sortData(data, {
      sortBy,
      reversed: reverseSortDirection,
      search: value,
    })
  }
  //   contact data Delete handler model
  const openModalForDelete = (contact: TContacts) => {
    openConfirmModal({
      title: 'Do You want to delete this contact?',
      children: (
        <Text size="sm">
          After deleting a contacts, You cannot recover them back. So, Please
          take your Action Carefully.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => {
        deleteContact(contact?.uuid)
        showNotification({
          title: 'Contact Deleted !!',
          message: `${contact.fname} has been deleted successfully.`,
        })
      },
    })
  }

  return (
    <ScrollArea>
      <div className={classes.tableHead}>
        <Text size={'md'} weight="600" className={classes.text}>
          Contacts
        </Text>
        <TextInput
          placeholder="Search..."
          icon={<IconSearch size={14} stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
          radius="xl"
          className={classes.searchField}
        />
        {/* Add New - Client Button*/}
        <IconPlus
          className={classes.iconPlus}
          onClick={() => setOpened(true)}
        />
      </div>
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        className={classes.childTable}
        // sx={{ width: '100%', maxWidth: '90%', marginLeft: 0, marginRight: 0 }}
      >
        <thead>
          <tr>
            <Th
              sorted={sortBy === 'fname'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('lname')}
            >
              Name
            </Th>
            <Th
              sorted={sortBy === 'email1'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('email1')}
            >
              Email
            </Th>
            <Th
              sorted={sortBy === 'phone1'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('phone1')}
            >
              Phone
            </Th>
            {/* <Th
              sorted={sortBy === 'city'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('city')}
            >
              City
            </Th>
            <Th
              sorted={sortBy === 'state'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('state')}
            >
              State
            </Th>
            <Th
              sorted={sortBy === 'country'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('country')}
            >
              Country
            </Th> */}
            <th className={classes.action}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data && data?.length > 0 ? (
            sortedData.map((row) => (
              <tr key={row?.id} className={classes.companyDetails}>
                <td>
                  <Group spacing="sm">
                    {/* <Avatar
                      size={26}
                      src={`https://gokv9osl.directus.app/assets/${row?.profile_image}/${row?.first_name}.png?access_token=Hh-BLV5ovXyGUcQR1SUdpBncldVLekqE`}
                      radius={26}
                    /> */}
                    <Text size="sm" weight={500}>
                      {row?.fname} {row?.lname}
                    </Text>
                  </Group>
                </td>
                <td>{row?.email1}</td>
                <td>{row?.phone1}</td>
                {/* <td>{row?.city}</td>
                <td>{row?.state}</td>
                <td>{row?.country}</td> */}
                <td>
                  <Group spacing="sm">
                    <IconEdit
                      className={classes.editIcon}
                      cursor="pointer"
                      onClick={() => {
                        setIsOpened(true)
                        setContactEditData(row)
                      }}
                    />
                    <IconTrash
                      className={classes.deleteIcon}
                      cursor="pointer"
                      onClick={() => openModalForDelete(row)}
                    />
                  </Group>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>
                <Text weight={500} align="center">
                  No contacts available
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {/* Add New Contact - Contact Form Drawer*/}
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add New Contact"
        padding="xl"
        size="xl"
        position="right"
      >
        <CreateContact />
      </Drawer>

      {/* Edit Contact - Contact Edit Form Drawer*/}
      <Drawer
        opened={isOpened}
        onClose={() => setIsOpened(false)}
        title="Edit Contact"
        padding="xl"
        size="xl"
        position="right"
      >
        <EditContact {...contactEditData} />
      </Drawer>
    </ScrollArea>
  )
}
