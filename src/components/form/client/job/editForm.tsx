import useEditJob from '@/pages/client/hooks/useEditJob'
import { TJobs, zJobEdit } from '@/types'
import {
  TextInput,
  Button,
  Group,
  createStyles,
  Paper,
  Select,
  Textarea,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
const useStyles = createStyles(() => ({
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
  },
}))

export default function EditForm(jobData: TJobs) {
  const { classes } = useStyles()
  const { mutate: editJob, isSuccess, isError } = useEditJob()

  const form = useForm<TJobs>({
    // validate: zodResolver(zJobEdit),
    initialValues: jobData,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TJobs) => {
    const jobEditData = {
      ...values,
      // status: 'published',
      profile_image: '4a61f578-53fd-4ef0-9036-8cf343948813',
    }

    const data = editJob(jobEditData)

    showNotification({
      title: 'Success!!',
      message: 'Client Edited successfully.',
    })

    // if (isError)
    //   showNotification({
    //     title: 'Filed!!',
    //     message: 'Failed to create client',
    //   })

    // if (isSuccess) {
    //   form.reset()
    //   showNotification({
    //     title: 'Success!!',
    //     message: 'Client Created successfully.',
    //   })
    // }
  }

  return (
    <>
      <Paper p={20} mt={30} radius="sm" className={classes.paper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Group grow align="center" mt="md">
            <TextInput
              required
              label="Job Title"
              type={'text'}
              placeholder="Job Title"
              {...form.getInputProps('title')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              required
              label="City"
              type={'text'}
              placeholder="City"
              {...form.getInputProps('city')}
            />
            <TextInput
              required
              label="State"
              type={'text'}
              placeholder="State"
              {...form.getInputProps('state')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              required
              label="Country"
              type={'text'}
              placeholder="Country"
              {...form.getInputProps('country')}
            />
            {/* <TextInput
              required
              label="Visa Status"
              type={'text'}
              placeholder="Visa Status"
              {...form.getInputProps('visa_status')}
            /> */}
            <Select
              data={[
                { value: 'H1B', label: 'H1B' },
                { value: 'Green Card', label: 'Green Card' },
                { value: 'Citizen', label: 'Citizen' },
              ]}
              placeholder="Visa Status"
              label="Visa Status"
              {...form.getInputProps('visa_status')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <Textarea
              label="Primary Skills"
              placeholder="Primary Skills"
              maxRows={4}
              {...form.getInputProps('primary_skills')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <Textarea
              label="Secondary Skills"
              placeholder="Enter Secondary Skills"
              maxRows={4}
              {...form.getInputProps('secondary_skills')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              required
              label="Job Type"
              type={'text'}
              placeholder="Job Type"
              {...form.getInputProps('job_type')}
            />
            <TextInput
              required
              label="Pay Rate"
              type={'text'}
              placeholder="Pay Rate"
              {...form.getInputProps('pay_rate')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              // required
              label="Start Date"
              type={'date'}
              placeholder="Start Date"
              {...form.getInputProps('start_date')}
            />
            {/* <TextInput
              required
              label="Job Status"
              type={'text'}
              placeholder="Job Status"
              {...form.getInputProps('job_status')}
            /> */}
            <Select
              data={[
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' },
              ]}
              placeholder="Job Status"
              label="Job Status"
              {...form.getInputProps('job_status')}
            />
          </Group>
          {/* <Group grow align="center" mt="md">
            <TextInput
              required
              label="Job Name"
              type={'text'}
              placeholder="Job Name"
              {...form.getInputProps('job_name')}
            />
            <TextInput
              required
              label="Location"
              type={'text'}
              placeholder="Location"
              {...form.getInputProps('location')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              required
              label="Category"
              type={'text'}
              placeholder="Category"
              {...form.getInputProps('category')}
            />
            <TextInput
              required
              label="Job Status"
              // onInput={(event: React.ChangeEvent<HTMLInputElement>) => {

              //   event.target.value
              //     .replace(/[^0-9.]/g, '')
              //     .replace(/(\..*)\./g, '$1')
              // }}
              type={'text'}
              placeholder="Job Status"
              {...form.getInputProps('job_status')}
            />
          </Group> */}

          <Button fullWidth type="submit" mt="md" mb="lg">
            Edit Job
          </Button>
        </form>
      </Paper>
    </>
  )
}
