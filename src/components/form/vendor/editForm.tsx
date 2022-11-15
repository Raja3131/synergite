import useEditVendor from '@/pages/vendor/hooks/useEditVendor'
import { TVendor } from '@/types'
import {
  TextInput,
  Button,
  Group,
  createStyles,
  Paper,
  FileInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
const useStyles = createStyles(() => ({
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
  },
}))

export default function EditForm(vendorData: TVendor) {
  const { classes } = useStyles()
  const { mutate: editVendor } = useEditVendor()

  const form = useForm<TVendor>({
    // validate: zodResolver(zVendorEdit),
    initialValues: vendorData,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TVendor) => {
    const vendorCreateData = {
      ...values,
      profile_image: '4a61f578-53fd-4ef0-9036-8cf343948813',
    }

    editVendor(vendorCreateData)

    showNotification({
      title: 'Success!!',
      message: 'Vendor Edited successfully.',
    })
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
          <Group grow align="center" mt="md">
            <TextInput
              required
              label="Email"
              type={'email'}
              placeholder="email@email.com"
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
              Edit Vendor
            </Button>
          </div>
        </form>
      </Paper>
    </>
  )
}
