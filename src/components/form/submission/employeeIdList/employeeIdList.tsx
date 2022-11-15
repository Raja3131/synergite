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
  Radio,
} from '@mantine/core'
import { keys } from '@mantine/utils'
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconCircleCheck,
} from '@tabler/icons'
import { TCandidate } from '@/types/candidate-type'

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
function filterData(data: TCandidate[], search: string) {
  const query = search.toLowerCase().trim()
  return data.filter((item) =>
    keys(data[0]).some((key) => String(item[key]).toLowerCase().includes(query))
  )
}

// Utility Function - sortData
function sortData(
  data: TCandidate[],
  payload: {
    sortBy: keyof TCandidate | null
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
  data: TCandidate[]
  setEmployee: (value: TCandidate) => void
}

// Exporting Default ClientTable Component
export function EmployeeId({ data, setEmployee }: IEmployeeProps) {
  const [search, setSearch] = useState('')
  const [empData, setEmpDataMain] = useState(data)
  const [sortBy, setSortBy] = useState<keyof TCandidate | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)
  const { classes } = useStyles()

  const setSorting = (field: keyof TCandidate) => {
    const reversed = field === sortBy ? !reverseSortDirection : false
    setReverseSortDirection(reversed)
    setSortBy(field)
    setEmpDataMain(sortData(data, { sortBy: field, reversed, search }))
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSearch(value)
    setEmpDataMain(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    )
  }
  // Create Rows
  const rows = empData?.map((item) => (
    <tr key={item.uuid}>
      <td>
        <Radio value={item.uuid} onClick={() => setEmployee(item)} />
      </td>
      <td>
        <Text size="sm" weight={500}>
          {item.fname} {item.lname}
        </Text>
      </td>
    </tr>
  ))

  // Returning the Scroll Area of Table
  return (
    <>
      <ScrollArea>
        <div className={classes.tableHead}>
          <TextInput
            placeholder="Search by any field"
            icon={<IconSearch size={14} stroke={1.5} />}
            value={search}
            onChange={handleSearchChange}
            radius="xl"
            className={classes.searchField}
          />
        </div>
        <Radio.Group>
          <Table
            sx={{ minWidth: 400 }}
            horizontalSpacing="md"
            verticalSpacing="xs"
            className={classes.childTable}
          >
            <thead>
              <tr>
                <th>
                  <IconCircleCheck
                    style={{
                      marginTop: '10px',
                    }}
                  />
                </th>
                <Th
                  sorted={sortBy === 'uuid'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('uuid')}
                >
                  Candidate
                </Th>
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? (
                rows
              ) : (
                <tr>
                  <td colSpan={Object.keys(data[0] || {}).length}>
                    <Text weight={500} align="center">
                      No Candidate found
                    </Text>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Radio.Group>
      </ScrollArea>
    </>
  )
}
