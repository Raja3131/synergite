import useEditContact from '@/pages/client/hooks/useEditContact'
import { TContacts, zContactEdit } from '@/types'
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

export default function EditForm(contactData: TContacts) {
  const { classes } = useStyles()
  const { mutate: editContact, isSuccess, isError } = useEditContact()

  const form = useForm<TContacts>({
    // validate: zodResolver(zContactEdit),
    initialValues: contactData,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TContacts) => {
    const contactEditData = {
      ...values,
      status: 'published',
      profile_image: '4a61f578-53fd-4ef0-9036-8cf343948813',
    }

    const data = editContact(contactEditData)

    showNotification({
      title: 'Success!!',
      message: 'Contact Edited successfully.',
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
              {...form.getInputProps('fname')}
            />
            <TextInput
              required
              label="Last Name"
              type={'text'}
              placeholder="Last Name"
              {...form.getInputProps('lname')}
            />
          </Group>

          <Group grow align="center" mt="md">
            <TextInput
              required
              label="Email"
              type={'email'}
              placeholder="email@email.com"
              {...form.getInputProps('email1')}
            />
            <TextInput
              required
              label="Phone"
              // onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
              //   console.log(event)

              //   event.target.value
              //     .replace(/[^0-9.]/g, '')
              //     .replace(/(\..*)\./g, '$1')
              // }}
              type={'tel'}
              placeholder="Phone"
              {...form.getInputProps('phone1')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              required
              label="Address Line 1"
              type={'text'}
              placeholder="Address Line 1"
              {...form.getInputProps('address1')}
            />
            <TextInput
              required
              label="Address Line 2"
              type={'text'}
              placeholder="Address Line 2"
              {...form.getInputProps('address2')}
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
              label="County"
              type={'text'}
              placeholder="County"
              {...form.getInputProps('county')}
            />
            <TextInput
              required
              label="Country"
              type={'text'}
              placeholder="Country"
              {...form.getInputProps('country')}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              required
              label="Zip Code"
              type={'text'}
              placeholder="Zip Code"
              {...form.getInputProps('zip')}
            />
          </Group>
          <div>
            <FileInput
              label="Profile Image"
              mt="md"
              {...form.getInputProps('profile_image')}
            />
            <Button fullWidth type="submit" mt="md" mb="lg">
              Update Now
            </Button>
          </div>
        </form>
      </Paper>
    </>
  )
}
