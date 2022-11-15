import { useEffect, useState } from 'react'

import { getActivitiesByOnboardingId } from '@/services/onboarding.services'
import { Button, Group, Loader, Paper } from '@mantine/core'
import { useQuery } from 'react-query'

type TDepartment = 'Accounts' | 'Contracts' | 'HR' | 'Immigration'

interface OnboardingActivity {
  onboardingId: string
  onDepartmentChange: (department: string) => void
  onPressed: (activityId: string) => void
}

const OnboardingActivity: React.FC<OnboardingActivity> = ({
  onboardingId,
  onDepartmentChange,
  onPressed,
}) => {
  const [selectedDepartment, setSelectedDepartment] =
    useState<TDepartment>('Accounts')

  const { data, isLoading, error } = useQuery(
    ['activity-by-department', selectedDepartment],
    () => getActivitiesByOnboardingId(onboardingId, selectedDepartment)
  )

  useEffect(() => {
    onDepartmentChange(selectedDepartment)
  }, [selectedDepartment])

  let element: React.ReactNode = <></>

  if (error) {
    element = (
      <Paper
        style={{
          boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.50)',
          padding: '20px',
        }}
      >
        Error Occurred
      </Paper>
    )
  } else if (!isLoading && !data) {
    element = (
      <Paper
        style={{
          boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.50)',
          padding: '20px',
        }}
      >
        {selectedDepartment} Not Found
      </Paper>
    )
  } else if (isLoading) {
    element = <Loader variant="dots" />
  }

  return (
    <div>
      {/* Departments  */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button
          onClick={() => setSelectedDepartment('Accounts')}
          variant={selectedDepartment === 'Accounts' ? 'filled' : 'light'}
        >
          Account
        </Button>
        <Button
          onClick={() => setSelectedDepartment('Contracts')}
          variant={selectedDepartment === 'Contracts' ? 'filled' : 'light'}
        >
          Contracts
        </Button>
        <Button
          onClick={() => setSelectedDepartment('HR')}
          variant={selectedDepartment === 'HR' ? 'filled' : 'light'}
        >
          HR
        </Button>
        <Button
          onClick={() => setSelectedDepartment('Immigration')}
          variant={selectedDepartment === 'Immigration' ? 'filled' : 'light'}
        >
          Immigration
        </Button>
      </div>

      <div style={{ marginTop: '40px' }}>{element}</div>

      <div>
        {data?.map((activity) => {
          return (
            <Paper key={activity.uuid}>
              <Group>
                <p
                  onClick={() => onPressed(activity.uuid)}
                  style={{ cursor: 'pointer' }}
                >
                  Assigned To: {activity.assigned_to}
                </p>
                <p>Assigned By: {activity.assigned_by}</p>
                <p>Status: {activity.activity_status}</p>
              </Group>
            </Paper>
          )
        })}
      </div>
    </div>
  )
} // End of OnboardingActivity

export default OnboardingActivity
