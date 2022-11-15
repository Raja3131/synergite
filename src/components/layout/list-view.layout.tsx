import { useState } from 'react'
import {
  createStyles,
  Table,
  ScrollArea,
  Group,
  Text,
  TextInput,
  Button,
  Drawer,
  Pagination,
  Checkbox,
  Popover,
} from '@mantine/core'
import {
  IconSearch,
  IconFilter,
  IconPlus,
  IconColumns,
  IconGripVertical,
} from '@tabler/icons'
import { Column } from '@ant-design/plots'
import AdjustableColumn from '../adjustable-column/adjustable-column-list'

interface IListViewLayoutProps {
  title: string
  children?: React.ReactNode
  createDrawerTitle?: string
  createDrawerChildren?: React.ReactNode
  editDrawerChildren?: React.ReactNode
  hideActionButton?: boolean
  hideColumnButton?: boolean
  onColumnClick?: () => void
  onAddNewClick?: () => void
}

export const ListViewLayout: React.FC<IListViewLayoutProps> = (props) => {
  const {
    title,
    children,
    createDrawerTitle,
    createDrawerChildren,
    editDrawerChildren,
    hideActionButton,
    hideColumnButton,
    onColumnClick,
    onAddNewClick,
  } = props

  const [isColumnSelectionDrawerOpen, setIsColumnSelectionDrawerOpen] =
    useState(false)
  const [isAddNewDrawerOpen, setIsAddNewDrawerOpen] = useState(false)
  const [isEditDrawerOpen, setIsEditNewDrawerOpen] = useState(false)
  const { classes } = listViewLayoutStyle()

  // Returning the Scroll Area of Table
  return (
    <>
      <div className={classes.tableHead}>
        <Group spacing="sm">
          <Text size={'xl'} weight="600" className={classes.text}>
            {title}
          </Text>
          <IconFilter className={classes.filterIcon} />
        </Group>
        <TextInput
          placeholder="Search by any field"
          icon={<IconSearch size={14} stroke={1.5} />}
          // value={search}
          // onChange={handleSearchChange}
          radius="xl"
          className={classes.searchField}
        />

        {!hideColumnButton && (
          <Popover width={200} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <Button>Column</Button>
            </Popover.Target>
            <Popover.Dropdown>
              <AdjustableColumn />
            </Popover.Dropdown>
          </Popover>
        )}

        {/* Add New - Button*/}
        {!hideActionButton && (
          <Button
            onClick={() => {
              if (onAddNewClick) {
                onAddNewClick()
              } else {
                setIsColumnSelectionDrawerOpen(true)
              }
            }}
          >
            <Group spacing="sm" align="center">
              <IconPlus color="white" />
              <Text weight={400}>Add New</Text>
            </Group>
          </Button>
        )}
      </div>

      <ScrollArea>
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          className={classes.table}
        >
          {children}
        </Table>

        {/* Pagination */}
        <div className={classes.paginationContainer}>
          <Text color={'grey'}>Showing 1 to 20 of 110 entries</Text>
          <Pagination total={5} size="sm" />
        </div>
      </ScrollArea>

      {/* List of columns */}
      <Drawer
        opened={isColumnSelectionDrawerOpen}
        onClose={() => setIsColumnSelectionDrawerOpen(false)}
        title={createDrawerTitle}
        padding="xl"
        size="xl"
        position="right"
      >
        <AdjustableColumn />
      </Drawer>

      {/* Add New - Drawer */}
      <Drawer
        opened={isAddNewDrawerOpen}
        onClose={() => setIsAddNewDrawerOpen(false)}
        title={createDrawerTitle}
        padding="xl"
        size="xl"
        position="right"
      >
        {createDrawerChildren}
      </Drawer>

      {/* Edit Drawer*/}
      <Drawer
        opened={isEditDrawerOpen}
        onClose={() => setIsEditNewDrawerOpen(false)}
        title="Edit Client"
        padding="xl"
        size="xl"
        position="right"
      >
        {editDrawerChildren}
      </Drawer>
    </>
  )
}

// Style for the Page
export const listViewLayoutStyle = createStyles((theme) => ({
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

  paginationContainer: {
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
  table: {
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
