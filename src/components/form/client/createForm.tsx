import useCreateClient from '@/pages/client/hooks/useCreateClient'
import { TClientCreate, zClientCreate } from '@/types'
import {
  TextInput,
  Button,
  Group,
  createStyles,
  Paper,
  FileInput,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
const useStyles = createStyles(() => ({
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
  },
}))

export default function CreateForm() {
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
          <Group grow align="center" mt="md">
            <TextInput
              required
              label="First Name"
              type={'text'}
              placeholder="First Name"
              {...form.getInputProps('first_name')}
            />
            <TextInput
              required
              label="Last Name"
              type={'text'}
              placeholder="Last Name"
              {...form.getInputProps('last_name')}
            />
          </Group>
          {/* <Group grow align="center" mt="md">
            <TextInput
              required
              label="Address Line 2"
              type={'text'}
              placeholder="Address Line 2"
              {...form.getInputProps('address_line2')}
            />
            <TextInput
              required
              label="Zip Code"
              type={'text'}
              placeholder="Zip Code"
              {...form.getInputProps('zip')}
            />
          </Group> */}

          <Group grow align="center" mt="md">
            <TextInput
              required
              label="Email"
              type={'text'}
              placeholder="Email"
              {...form.getInputProps('primary_email')}
            />
            <TextInput
              required
              label="Phone"
              type={'tel'}
              placeholder="Phone"
              {...form.getInputProps('primary_phone')}
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
          </Group>
          <div>
            <FileInput
              label="Profile Image"
              mt="md"
              {...form.getInputProps('profile_image')}
            />
            <Button fullWidth type="submit" mt="md" mb="lg">
              Add New
            </Button>
          </div>
        </form>
      </Paper>
    </>
  )
}
