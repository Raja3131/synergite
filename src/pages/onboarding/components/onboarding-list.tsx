import { ListViewLayout } from '@/components/layout/list-view.layout'
import { onboardingStatusList } from '@/data/onboarding-status.data'
import { Th } from '@/pages/employee/employee-list'
import { getOnboardingList } from '@/services/onboarding.services'
import theme from '@/theme/theme'
import {
  Badge,
  Button,
  Drawer,
  Group,
  Table,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core'
import { IconChevronRight } from '@tabler/icons'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import NoteList from './notes/note-list'
import OnboardingActivitySidebar from './onboarding-activity'
import OnboardingTasks from './onboarding-tasks'

const OnboardingList = () => {
  const [isNoteOpen, setIsNoteOpen] = useState(false)
  const [isActivityOpen, setIsActivityOpen] = useState(false)
  const [selectedOnboardingId, setSelectedOnboardingId] = useState('')
  const [selectedActivityUUID, setSelectedActivityUUID] = useState('')

  const { data: onboardingList = [] } = useQuery(
    'onboarding-list',
    getOnboardingList
  )

  return (
    <>
      <ListViewLayout
        title="Onboarding List"
        hideActionButton={true}
        hideColumnButton={true}
      >
        <Table horizontalSpacing="md" verticalSpacing="xs">
          <thead>
            <tr>
              <Th onSort={() => null}>Name</Th>
              <Th onSort={() => null}>Percent</Th>
              <Th onSort={() => null}>Status</Th>
              <th>Add Note</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {onboardingList?.map((onboarding) => {
              const onboardingStatus =
                onboardingStatusList[onboarding.onboard_status]

              const isPreOnboardingStatus =
                onboarding.onboard_status === 'PRE_INITIATED' ||
                onboarding.onboard_status === 'PRE_INPROGRESS'

              return (
                <tr key={onboarding.uuid}>
                  <td>
                    <Link
                      to={`/onboarding?onboarding_uuid${onboarding.uuid}`}
                      style={{
                        textDecoration: 'none',
                        color: theme?.colors?.grey?.[9],
                      }}
                    >
                      <Tooltip
                        label="Click to view"
                        color="blue"
                        withArrow
                        transition="pop-top-right"
                        transitionDuration={300}
                      >
                        <Text size="sm" weight={500}>
                          {onboarding.uuid}
                        </Text>
                      </Tooltip>
                    </Link>
                  </td>
                  <td>65%</td>
                  <td>
                    <Badge color="cyan">{onboardingStatus.label}</Badge>
                  </td>
                  <td onClick={() => setIsNoteOpen(true)}>Add Note</td>
                  <td
                    onClick={() => {
                      setIsActivityOpen(true)
                      setSelectedOnboardingId(onboarding.uuid)
                    }}
                    style={{
                      cursor: isPreOnboardingStatus ? 'not-allowed' : 'pointer',
                    }}
                  >
                    <IconChevronRight
                      style={{
                        opacity: isPreOnboardingStatus ? 0.2 : 1,
                      }}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </ListViewLayout>

      {/* Add New Note - Drawer */}
      <Drawer
        opened={isNoteOpen}
        onClose={() => setIsNoteOpen(false)}
        title="Add Note"
        padding="xl"
        size="xl"
        position="right"
      >
        <div className="space-y-32">
          <NoteList />
          <Group mt={40} style={{ display: 'flex', alignItems: 'center' }}>
            <TextInput label="Note" placeholder="Write note" />
            <Button mt={24}>Submit</Button>
          </Group>
        </div>
      </Drawer>

      {/* Activity - Drawer */}
      <Drawer
        opened={isActivityOpen}
        onClose={() => {
          setIsActivityOpen(false)
          setSelectedOnboardingId('')
          setSelectedActivityUUID('')
        }}
        title="Activity"
        padding="xl"
        size="xl"
        position="right"
      >
        <OnboardingActivitySidebar
          onboardingId={selectedOnboardingId}
          onDepartmentChange={() => setSelectedActivityUUID('')}
          onPressed={(activityId) => {
            setSelectedActivityUUID(activityId)
          }}
        />

        {selectedActivityUUID && (
          <OnboardingTasks activityId={selectedActivityUUID} />
        )}
      </Drawer>
    </>
  )
} // End of OnboardingList

export default OnboardingList

interface OnboardingTileProps {
  onAddNotePressed?: () => any
  onActionPressed?: () => any
}

const OnboardingTileProps: React.FC<OnboardingTileProps> = (props) => {
  const { onAddNotePressed, onActionPressed } = props

  return (
    <div className="border-2 flex justify-between items-center p-2">
      <div className="flex justify-between w-1/2">
        <span>Onboarding one</span>
        <span>68%</span>
        <span>Status</span>
      </div>
      <div className="space-x-2">
        <button onClick={onAddNotePressed} className="border p-2 min-w-[96px]">
          Add Note
        </button>
        <button onClick={onActionPressed} className="border p-2 min-w-[96px]">
          Action
        </button>
      </div>
    </div>
  )
} // End of OnboardingTile
