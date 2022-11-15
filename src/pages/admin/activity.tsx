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

import { showNotification } from '@mantine/notifications'
import EditClient from '@/components/form/client/editForm'
import CreateClient from '@/components/form/client/createForm'
import { ListViewLayout } from '@/components/layout/list-view.layout'
import CreateForm from '@/components/form/client/createForm'
import ActivityForm from '@/components/admin/activity-form.component'

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

// Exporting Default AdminActivity Component
export const AdminActivity: React.FC = () => {
  const onboardingList = [1, 2, 3, 4, 5]

  return (
    <ListViewLayout
      title="Activity Table"
      createDrawerTitle="Add new Activity"
      createDrawerChildren={<ActivityForm />}
    >
      <thead>
        <tr>
          <Th sorted={true} reversed={false} onSort={() => null}>
            ID
          </Th>
          <Th sorted={true} reversed={false} onSort={() => null}>
            Immigration Status
          </Th>
          <Th sorted={true} reversed={false} onSort={() => null}>
            Type of Employee
          </Th>
          <Th sorted={true} reversed={false} onSort={() => null}>
            New Client
          </Th>
          <Th sorted={true} reversed={false} onSort={() => null}>
            New Sub Vendo
          </Th>
          <Th sorted={true} reversed={false} onSort={() => null}>
            Default Activity
          </Th>
          <Th sorted={true} reversed={false} onSort={() => null}>
            New Client Contracts
          </Th>
          <Th sorted={true} reversed={false} onSort={() => null}>
            Assignee Role
          </Th>
          <th>Action</th>
          {/* <th className={classes.action}>Action</th> */}
        </tr>
      </thead>

      <tbody>
        {onboardingList?.map((num) => {
          return (
            <tr key={num}>
              <td>
                <Text weight={500} align="center">
                  No records found
                </Text>
              </td>
              <td>
                <Link
                  to={`/admin-activity/1`}
                  // className={classes.userLink}
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
                        A
                      </Avatar>
                      <Text size="sm" weight={500}>
                        Vishal
                      </Text>
                    </Group>
                  </Tooltip>
                </Link>
              </td>
              <td>
                <Text weight={500} align="center">
                  No records found
                </Text>
              </td>
              <td>
                <Text weight={500} align="center">
                  No records found
                </Text>
              </td>
              <td>
                <Text weight={500} align="center">
                  No records found
                </Text>
              </td>
              <td>
                <Text weight={500} align="center">
                  No records found
                </Text>
              </td>
              <td>
                <Text weight={500} align="center">
                  No records found
                </Text>
              </td>
              <td>
                <Text weight={500} align="center">
                  No records found
                </Text>
              </td>
              <td>
                <Text weight={500} align="center">
                  No records found
                </Text>
              </td>
            </tr>
          )
        })}
      </tbody>
    </ListViewLayout>
  )
}
