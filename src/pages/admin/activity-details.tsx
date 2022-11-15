import { TaskForm } from '@/components/admin/activity-form.component'
import {
  ListViewLayout,
  listViewLayoutStyle,
} from '@/components/layout/list-view.layout'
import {
  Avatar,
  Card,
  createStyles,
  Grid,
  Group,
  Table,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core'
import { IconSearch } from '@tabler/icons'
import { Link } from 'react-router-dom'
import { Th } from '../employee/employee-list'

export const AdminActivityDetails = () => {
  return (
    <Grid>
      <Grid.Col span={4}>
        <Card shadow="sm">
          <Group spacing="xl">
            <Text size="sm" color="#686969" weight={400} className="w-16">
              <b>Name :</b>
            </Text>
            <Text size="sm" color="#686969" weight={400}>
              vishal
            </Text>
          </Group>
          <Group spacing="xl">
            <Text size="sm" color="#686969" weight={400} className="w-16">
              <b>Email :</b>
            </Text>
            <Text size="sm" color="#686969" weight={400}>
              vishal@gail.com
            </Text>
          </Group>
          <Group spacing="xl">
            <Text size="sm" color="#686969" weight={400} className="w-16">
              <b>Phone :</b>
            </Text>
            <Text size="sm" color="#686969" weight={400}>
              1234567890
            </Text>
          </Group>
          <Group spacing="xl">
            <Text size="sm" color="#686969" weight={400} className="w-16">
              <b>City :</b>
            </Text>
            <Text size="sm" color="#686969" weight={400}>
              mumbai
            </Text>
          </Group>
          <Group spacing="xl">
            <Text size="sm" color="#686969" weight={400} className="w-16">
              <b>State :</b>
            </Text>
            <Text size="sm" color="#686969" weight={400}>
              state
            </Text>
          </Group>
          <Group spacing="xl">
            <Text size="sm" color="#686969" weight={400} className="w-16">
              <b>Country :</b>
            </Text>
            <Text size="sm" color="#686969" weight={400}>
              India
            </Text>
          </Group>
        </Card>
      </Grid.Col>
      <Grid.Col span={8}>
        <ListViewLayout
          title="Task"
          createDrawerTitle="Add Task"
          createDrawerChildren={<TaskForm />}
        >
          <Table
            horizontalSpacing="md"
            verticalSpacing="xs"
            className="shadow bg-white rounded-md"
          >
            <thead>
              <tr>
                <Th sorted={true} reversed={false} onSort={() => null}>
                  ID
                </Th>
                <Th sorted={true} reversed={false} onSort={() => null}>
                  Name
                </Th>
                <Th sorted={true} reversed={false} onSort={() => null}>
                  Email
                </Th>
                <Th sorted={true} reversed={false} onSort={() => null}>
                  Phone
                </Th>
                <Th sorted={true} reversed={false} onSort={() => null}>
                  City
                </Th>
                <Th sorted={true} reversed={false} onSort={() => null}>
                  State
                </Th>
                <Th sorted={true} reversed={false} onSort={() => null}>
                  Country
                </Th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {[1, 2, 3, 4, 5].map((num) => {
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
                              T
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
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </ListViewLayout>
      </Grid.Col>
    </Grid>
  )
}

export default AdminActivityDetails
