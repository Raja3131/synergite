import useCreateClient from '@/pages/client/hooks/useCreateClient'
import { TClientCreate, zClientCreate } from '@/types'
import {
  TextInput,
  Button,
  Group,
  createStyles,
  Paper,
  FileInput,
  Select,
  Input,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import CreateForm from '../form/client/createForm'
const useStyles = createStyles(() => ({
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
  },
}))

export default function ActivityForm() {
  const { classes } = useStyles()
  const { mutate: addClient } = useCreateClient()

  const form = useForm<TClientCreate>({
    validate: zodResolver(zClientCreate),
    initialValues: {
      first_name: '',
      last_name: '',
      address_line2: '',
      zip: '',
      country: '',
      city: '',
      state: '',
      primary_email: '',
      primary_phone: '',
    },
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TClientCreate) => {
    const clientCreateData = {
      ...values,
      // status: 'published',
      profile_image: '4a61f578-53fd-4ef0-9036-8cf343948813',
    }

    const data = addClient(clientCreateData)

    showNotification({
      title: 'Success!!',
      message: 'Client Created successfully.',
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
            //   {...form.getInputProps('immigration_status')}
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
            //   {...form.getInputProps('immigration_status')}
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
            //   {...form.getInputProps('immigration_status')}
          />
          <Select
            mb={16}
            label="New Sub Vendor*"
            placeholder="New Sub Vendor"
            data={[
              { label: 'Yes', value: 'Yes' },
              { label: 'NO', value: 'NO' },
              { label: 'NA', value: 'NA' },
            ]}
            //   {...form.getInputProps('immigration_status')}
          />
          <TextInput
            mb={16}
            label="Default Activity"
            placeholder="Default Activity"
          />
          <TextInput
            mb={16}
            label="New Client Contracts"
            placeholder="New Client Contracts"
          />
          <Select
            mb={16}
            label="Assignee Role"
            placeholder="Assignee Role"
            data={[
              { label: 'Supervisor', value: 'Supervisor' },
              { label: 'Department', value: 'Department' },
              { label: 'Contracts', value: 'Contracts' },
            ]}
            //   {...form.getInputProps('immigration_status')}
          />
          <Button fullWidth type="submit" mt="md" mb="lg">
            Add New
          </Button>
        </form>
      </Paper>
    </>
  )
}

export const TaskForm = () => {
  const { classes } = useStyles()

  return (
    <Paper p={20} mt={30} radius="sm" className={classes.paper}>
      <form>
        <TextInput label="Task Description*" placeholder="Task Description" />
        <Button fullWidth type="submit" mt="md" mb="lg">
          Add New
        </Button>
      </form>
    </Paper>
  )
}
