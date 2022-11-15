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
import { TTasks } from '@/types/activity-type'
import CreateTask from '@/components/form/defaultActivity/task/createForm'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import EditTask from '@/components/form/defaultActivity/task/editForm'
import useDeleteTaskById from '../../hooks/useDeleteTaskById'

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
function filterData(data: TTasks[], search: string) {
  const query = search.toLowerCase().trim()
  return data.filter((item) =>
    keys(data[0]).some((key) => String(item[key]).toLowerCase().includes(query))
  )
}

// Utility Function - short Data
function sortData(
  data: TTasks[],
  payload: {
    sortBy: keyof TTasks | null
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

interface TasksProps {
  data: TTasks[]
}

// Exporting Default ClientTable Component

export default function TasksTable({ data }: TasksProps) {
  const [opened, setOpened] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
  const [search, setSearch] = useState('')
  const [taskEditData, setTaskEditData] = useState({} as TTasks)
  const [sortedData, setSortedData] = useState(data)
  const [sortBy, setSortBy] = useState<keyof TTasks | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)
  const { classes } = useStyles()
  const setSorting = (field: keyof TTasks) => {
    const reversed = field === sortBy ? !reverseSortDirection : false
    setReverseSortDirection(reversed)
    setSortBy(field)
    setSortedData(sortData(data, { sortBy: field, reversed, search }))
  }
  const { mutate: deleteTask } = useDeleteTaskById()

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
  //   task data Delete handler model
  const openModalForDelete = (task: TTasks) => {
    openConfirmModal({
      title: 'Do you want to delete this task?',
      children: (
        <Text size="sm">
          After deleting a tasks, You cannot recover them back. So, Please take
          your Action Carefully.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => {
        deleteTask(task.uuid)
        showNotification({
          title: 'Contact Deleted !!',
          message: `Task has been deleted successfully.`,
        })
      },
    })
  }

  return (
    <ScrollArea>
      <div className={classes.tableHead}>
        <Text size={'xl'} weight="600" className={classes.text}>
          Tasks
        </Text>
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
            <Th
              sorted={sortBy === 'default_task'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('default_task')}
            >
              Default Task
            </Th>
            <Th
              sorted={sortBy === 'status'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('status')}
            >
              Status
            </Th>
            {/* <Th
              sorted={sortBy === 'created_by'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('created_by')}
            >
              Created By
            </Th> */}
            <th className={classes.action}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data && data?.length > 0 ? (
            sortedData.map((row) => (
              <tr key={row?.uuid} className={classes.companyDetails}>
                <td>{row?.default_task}</td>
                <td>{row?.status}</td>
                {/* <td>{row?.created_by}</td> */}
                <td>
                  <Group spacing="sm">
                    <IconEdit
                      className={classes.editIcon}
                      cursor="pointer"
                      onClick={() => {
                        setIsOpened(true)
                        setTaskEditData(row)
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
                  No task available
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {/* Add New Contact - Contact Form Drawer */}
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add New Task"
        padding="xl"
        size="xl"
        position="right"
      >
        <CreateTask />
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
        <EditTask {...taskEditData} />
      </Drawer>
    </ScrollArea>
  )
}
