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
  Avatar,
  Button,
  Drawer,
  Pagination,
  Tooltip,
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
  IconFilter,
} from '@tabler/icons'
import { TClient } from '@/types'
import { openConfirmModal } from '@mantine/modals'
import { Link } from 'react-router-dom'
import useDeleteClientById from './hooks/useDeleteClientById'

import { showNotification } from '@mantine/notifications'
import EditClient from '@/components/form/client/editForm'
import CreateClient from '@/components/form/client/createForm'
import { useOnboarding } from '@/store/onboarding.store'

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
  filterIcon: {
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
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.20)',
    backgroundColor: 'white',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '98.8%',
    margin: '10px',
  },
  userLink: {
    textDecoration: 'none',
    color: theme.colors.grey[9],
    '&:hover': {
      color: theme.colors.blue[9],
    },
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

// Utility Function - filterData
function filterData(data: TClient[], search: string) {
  const query = search.toLowerCase().trim()
  return data.filter((item) =>
    keys(data[0]).some((key) => String(item[key]).toLowerCase().includes(query))
  )
}

// Utility Function - sortData
function sortData(
  data: TClient[],
  payload: {
    sortBy: keyof TClient | null
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
        return String(b[sortBy]).localeCompare(String(a[sortBy]))
      }

      return String(a[sortBy]).localeCompare(String(b[sortBy]))
    }),
    payload.search
  )
}

interface IClientTableProps {
  data: TClient[]
}

// Exporting Default ClientTable Component
export function ClientTable({ data }: IClientTableProps) {
  const [opened, setOpened] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
  const [search, setSearch] = useState('')
  const [sortedData, setSortedData] = useState(data)
  const [sortBy, setSortBy] = useState<keyof TClient | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)
  const { classes } = useStyles()
  const { mutate: deleteClient } = useDeleteClientById()
  const [clientEditData, setClientEditData] = useState({} as TClient)

  const setClient = useOnboarding((state) => state.setClient)

  const setSorting = (field: keyof TClient) => {
    const reversed = field === sortBy ? !reverseSortDirection : false
    setReverseSortDirection(reversed)
    setSortBy(field)
    setSortedData(sortData(data, { sortBy: field, reversed, search }))
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSearch(value)
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    )
  }

  // client data Delete handler
  const openModalForDelete = (client: TClient) => {
    openConfirmModal({
      title: 'Do You want to delete this client?',
      children: (
        <Text size="sm">
          After deleting a clients, You cannot recover them back. So, Please
          take your Action Carefully.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => {
        deleteClient(client.uuid)
        showNotification({
          title: 'Client Deleted !!',
          message: `${client.first_name} has been deleted successfully.`,
        })
      },
    })
  }
  // console.log('dataShorted', sortedData)
  // Create Rows
  const rows = sortedData?.map((row) => (
    <tr key={row?.id} className={classes.companyDetails}>
      {/* <td>{row?.id}</td> */}
      <td>
        <Link
          to={`/client-details/${row?.uuid}`}
          // state={{ user: row }}
          className={classes.userLink}
          onClick={() => setClient(row)}
        >
          <Tooltip
            label="Click to view"
            color="blue"
            withArrow
            transition="pop-top-right"
            transitionDuration={300}
          >
            <Group spacing="sm">
              <Avatar color="cyan" size={26} radius={26}>
                C
              </Avatar>
              <Text size="sm" weight={500}>
                {row?.first_name} {row?.last_name}
              </Text>
            </Group>
          </Tooltip>
        </Link>
      </td>
      <td>{row?.primary_email}</td>
      <td>{row?.primary_phone}</td>
      <td>{row?.city}</td>
      <td>{row?.state}</td>
      <td>{row?.country}</td>
      <td>
        <Group spacing="sm">
          <IconEdit
            className={classes.editIcon}
            cursor="pointer"
            onClick={() => {
              setIsOpened(true)
              setClientEditData(row)
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

  // Returning the Scroll Area of Table
  return (
    <>
      <ScrollArea>
        <div className={classes.tableHead}>
          <Group spacing="sm">
            <Text size={'xl'} weight="600" className={classes.text}>
              Clients Table
            </Text>
            <IconFilter className={classes.filterIcon} />
          </Group>
          <TextInput
            placeholder="Search by any field"
            icon={<IconSearch size={14} stroke={1.5} />}
            value={search}
            onChange={handleSearchChange}
            radius="xl"
            className={classes.searchField}
          />
          {/* Add New - Client Button*/}
          <Button onClick={() => setOpened(true)}>
            <Group spacing="sm" align="center">
              <IconPlus color="white" />
              <Text weight={400}>Add New</Text>
            </Group>
          </Button>
        </div>

        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          className={classes.childTable}
          // sx={{ width: '100%', maxWidth: '90%', marginLeft: 0, marginRight: 0 }}
        >
          <thead>
            <tr>
              {/* <Th
                sorted={sortBy === 'id'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('id')}
              >
                ID
              </Th> */}
              <Th
                sorted={sortBy === 'first_name'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('first_name')}
              >
                Name
              </Th>
              <Th
                sorted={sortBy === 'primary_email'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('primary_email')}
              >
                Email
              </Th>
              <Th
                sorted={sortBy === 'primary_phone'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('primary_phone')}
              >
                Phone
              </Th>
              <Th
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
              </Th>
              <th className={classes.action}>Action</th>
            </tr>
          </thead>

          <tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <tr>
                <td colSpan={Object.keys(data[0]).length}>
                  <Text weight={500} align="center">
                    No records found
                  </Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        <div className={classes.tableBottom}>
          <Text color={'grey'}>Showing 1 to 20 of 110 entries</Text>
          <Pagination total={5} size="sm" />
        </div>
      </ScrollArea>

      {/* Add New - Client Form Drawer*/}
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add New Client"
        padding="xl"
        size="xl"
        position="right"
      >
        <CreateClient />
      </Drawer>

      {/* Edit Client - Client Edit Form Drawer*/}
      <Drawer
        opened={isOpened}
        onClose={() => setIsOpened(false)}
        title="Edit Client"
        padding="xl"
        size="xl"
        position="right"
      >
        <EditClient {...clientEditData} />
      </Drawer>
    </>
  )
}
