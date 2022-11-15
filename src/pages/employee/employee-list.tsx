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
  Button,
  Drawer,
  Pagination,
  Tooltip,
  Checkbox,
  Avatar,
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
import { TAEmployee } from '@/types/employee-type'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import EditEmployee from '@/components/form/employee/editForm'
import CreateEmployee from '@/components/form/employee/createForm'
import useDeleteEmployeeById from './hooks/useDeleteEmployeeById'
import { Link } from 'react-router-dom'

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

  employeeRowData: {
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
  reversed?: boolean
  sorted?: boolean
  onSort(): void
}
// Table Heading Component
export function Th({ children, reversed, sorted, onSort }: ThProps) {
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
function filterData(data: TAEmployee[], search: string) {
  const query = search.toLowerCase().trim()
  return data.filter((item) =>
    keys(data[0]).some((key) => String(item[key]).toLowerCase().includes(query))
  )
}

// Utility Function - sortData
function sortData(
  data: TAEmployee[],
  payload: {
    sortBy: keyof TAEmployee | null
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

interface IEmployeeProps {
  data: TAEmployee[]
}

// Exporting Default ClientTable Component
export function EmployeeList({ data }: IEmployeeProps) {
  const [opened, setOpened] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
  const [search, setSearch] = useState('')
  const [sortedData, setSortedData] = useState(data)
  const [sortBy, setSortBy] = useState<keyof TAEmployee | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)
  const { classes } = useStyles()
  const { mutate: deleteEmployee } = useDeleteEmployeeById()
  const [employeeEditData, setEmployeeEditData] = useState({} as TAEmployee)

  const setSorting = (field: keyof TAEmployee) => {
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

  // employee data Delete handler
  const openModalForDelete = (Employee: TAEmployee) => {
    openConfirmModal({
      title: 'Do You want to delete this Employee?',
      children: (
        <Text size="sm">
          After deleting an active employee, You cannot recover them back. So,
          please choose your action carefully.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => {
        deleteEmployee(Employee.uuid)
        console.log('delete')
        showNotification({
          title: 'Employee Deleted !!',
          // message: `${Employee.fname} has been deleted successfully.`,
          message: `Employee has been deleted successfully.`,
        })
      },
    })
  }

  // employee data filter handler
  const openModalForFilter = () => {
    openConfirmModal({
      title: 'Select Filter?',
      children: (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: '30px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <Text size="sm" color="blue">
              Payment Type
            </Text>
            <Checkbox size="xs" label="Billable" />
            <Checkbox size="xs" label="Non Billable" />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <Text size="sm" color="blue">
              Employee Type
            </Text>
            <Checkbox size="xs" label="W2" />
            <Checkbox size="xs" label="C2C" />
            <Checkbox size="xs" label="1099" />
            <Checkbox size="xs" label="Internal" />
          </div>
        </div>
      ),
      labels: { confirm: 'Submit', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => {
        console.log('Filtered')
        showNotification({
          title: 'EmployeeType Filtered !!',
          message: 'EmployeeType has been filtered successfully.',
        })
      },
    })
  }

  // Create Rows
  const rows = sortedData?.map((row) => (
    <tr key={row?.id} className={classes.employeeRowData}>
      {/* <td>{row?.employee_id}</td> */}
      <td>{row?.id}</td>
      <td>
        <Link
          to={`/employee-details/${row?.uuid}`}
          className={classes.userLink}
        >
          <Tooltip
            label="Click to view"
            color="blue"
            withArrow
            transition="pop-top-right"
            transitionDuration={300}
          >
            <Group spacing="sm">
              {/* <Avatar
                size={26}
                src={`https://gokv9osl.directus.app/assets/${row?.profile_image}/${row?.fname}.png?access_token=Hh-BLV5ovXyGUcQR1SUdpBncldVLekqE`}
                radius={26}
              /> */}
              <Avatar color="cyan" size={26} radius={26}>
                E
              </Avatar>
              <Text size="sm" weight={500}>
                {row?.fname} {row?.lname}
              </Text>
            </Group>
          </Tooltip>
        </Link>
      </td>
      <td>{row?.email}</td>
      <td>{row?.phone}</td>
      {/* <td>{row?.dob}</td> */}
      <td>{row?.gender}</td>
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
              setEmployeeEditData(row)
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
              Employees
            </Text>
            <IconFilter
              className={classes.filterIcon}
              onClick={() => openModalForFilter()}
              cursor="pointer"
            />
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
              <Th
                sorted={sortBy === 'employee_id'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('employee_id')}
              >
                Employee Id
              </Th>
              <Th
                sorted={sortBy === 'fname'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('fname')}
              >
                Name
              </Th>
              <Th
                sorted={sortBy === 'email'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('email')}
              >
                Email
              </Th>
              <Th
                sorted={sortBy === 'phone'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('phone')}
              >
                Phone
              </Th>
              {/* <Th
                sorted={sortBy === 'dob'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('dob')}
              >
                DOB
              </Th> */}
              <Th
                sorted={sortBy === 'gender'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('gender')}
              >
                Gender
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

      {/* Add New - employee Form Drawer*/}
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add New Employee"
        padding="xl"
        size="xl"
        position="right"
      >
        <CreateEmployee />
      </Drawer>

      {/* Edit Employee - Employee Edit Form Drawer*/}
      <Drawer
        opened={isOpened}
        onClose={() => setIsOpened(false)}
        title="Edit Employee"
        padding="xl"
        size="xl"
        position="right"
      >
        <EditEmployee {...employeeEditData} />
      </Drawer>
    </>
  )
}
