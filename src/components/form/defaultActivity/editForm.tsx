import useEditDefaultActivity from '@/pages/activity/hooks/useEditDefaultActivity'
import { TActivity } from '@/types/activity-type'
import { TextInput, Button, createStyles, Paper, Select } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
const useStyles = createStyles(() => ({
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
  },
}))

export default function EditForm(defaultActivityData: TActivity) {
  const { classes } = useStyles()
  const { mutate: editDefaultActivity } = useEditDefaultActivity()

  const form = useForm<TActivity>({
    // validate: zodResolver(zActivityEdit),
    initialValues: defaultActivityData,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TActivity) => {
    const activityCreateData = {
      ...values,
    }

    editDefaultActivity(activityCreateData)

    showNotification({
      title: 'Success!!',
      message: 'Activity Edited successfully.',
    })
  }

  return (
    <>
      <Paper p={20} mt={30} radius="sm" className={classes.paper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Select
            mb={16}
            label="Immigration Status*"
            placeholder="Immigration Status"
            data={[
              { label: 'H1', value: 'h1' },
              { label: 'Green Card/Citizen', value: 'Green Card/Citizen' },
              { label: 'Green Card/USC', value: 'Green Card/USC' },
              { label: 'NA', value: 'na' },
            ]}
            {...form.getInputProps('immigration_status')}
          />
          <Select
            mb={16}
            label="Type of Employee*"
            placeholder="Type of Employee"
            data={[
              { label: 'W2', value: 'W2' },
              { label: 'C2C', value: 'C2C' },
              { label: 'Green Card/USC', value: 'Green Card/USC' },
              { label: '1099', value: '1099' },
              { label: 'Internal Employee', value: 'Internal Employee' },
            ]}
            {...form.getInputProps('employee_type')}
          />
          <Select
            mb={16}
            label="New Client*"
            placeholder="New Client"
            data={[
              { label: 'Yes', value: 'Yes' },
              { label: 'NO', value: 'NO' },
              { label: 'NA', value: 'NA' },
            ]}
            {...form.getInputProps('new_client')}
          />
          <Select
            mb={16}
            label="New Sub Activity*"
            placeholder="New Sub Activity"
            data={[
              { label: 'Yes', value: 'Yes' },
              { label: 'NO', value: 'NO' },
              { label: 'NA', value: 'NA' },
            ]}
            {...form.getInputProps('new_subvendor')}
          />
          <TextInput
            mb={16}
            label="Default Activity"
            placeholder="Default Activity"
            {...form.getInputProps('default_activity')}
          />
          <TextInput
            mb={16}
            label="Department"
            placeholder="Department"
            {...form.getInputProps('department_uuid')}
          />
          {/* <Select
            mb={16}
            label="Assignee Role"
            placeholder="Assignee Role"
            data={[
              { label: 'Supervisor', value: 'Supervisor' },
              { label: 'Department', value: 'Department' },
              { label: 'Contracts', value: 'Contracts' },
            ]}
            {...form.getInputProps('assigneeRole')}
          /> */}
          <Button fullWidth type="submit" mt="md" mb="lg">
            Edit New
          </Button>
        </form>
      </Paper>
    </>
  )
}
