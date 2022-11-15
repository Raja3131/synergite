import useEditVendor from '@/pages/vendor/hooks/useEditVendor'
import theme from '@/theme/theme'
import { TVendor } from '@/types'
import {
  TextInput,
  Group,
  createStyles,
  Divider,
  Box,
  Select,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconChevronsRight } from '@tabler/icons'
const useStyles = createStyles(() => ({
  paper: {
    backgroundColor: 'transparent',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  dividerText: {
    color: theme.colors?.blue?.[9],
  },
}))

export default function VendorDetails(vendorDetailsData: TVendor) {
  const { classes } = useStyles()
  const { mutate: vendorDetails } = useEditVendor()

  const form = useForm<TVendor>({
    // validate: zodResolver(zVendorEdit),
    initialValues: vendorDetailsData,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TVendor) => {
    const vendorDetailsData = {
      ...values,
    }

    vendorDetails(vendorDetailsData)

    showNotification({
      title: 'Success!!',
      message: 'Vendor Details Fetched Successfully.',
    })
  }

  return (
    <>
      <div className={classes.paper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Group grow align="center" mt="md">
            <TextInput
              readOnly={true}
              label="First Name"
              type={'text'}
              placeholder="First Name"
              {...form.getInputProps('first_name')}
            />
            <TextInput
              readOnly={true}
              label="Last Name"
              type={'text'}
              placeholder="Last Name"
              {...form.getInputProps('last_name')}
            />
            <TextInput
              readOnly={true}
              label="Email"
              type={'email'}
              placeholder="email@email.com"
              {...form.getInputProps('primary_email')}
            />
            <TextInput
              readOnly={true}
              label="Phone"
              type={'tel'}
              placeholder="Phone"
              {...form.getInputProps('primary_phone')}
            />
            <TextInput
              readOnly={true}
              label="Address line 1"
              type={'text'}
              placeholder="Address line 1"
              {...form.getInputProps('address1')}
              // value={clientDetailsData.address_line1}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              readOnly={true}
              label="Address line 2"
              type={'text'}
              placeholder="Address line 2"
              // value={clientDetailsData.address_line2}
              {...form.getInputProps('address2')}
            />
            <TextInput
              readOnly={true}
              label="City"
              type={'text'}
              placeholder="City"
              {...form.getInputProps('city')}
            />
            <TextInput
              readOnly={true}
              label="State"
              type={'text'}
              placeholder="State"
              {...form.getInputProps('state')}
            />
            <TextInput
              readOnly={true}
              label="County"
              type={'text'}
              placeholder="County"
              {...form.getInputProps('county')}
            />
            <TextInput
              readOnly={true}
              label="Country"
              type={'text'}
              placeholder="Country"
              {...form.getInputProps('country')}
            />
          </Group>
          <Divider
            className={classes.dividerText}
            my="20px"
            label={
              <>
                <IconChevronsRight />
                <Box style={{ fontFamily: '-moz-initial' }} ml={5}>
                  Additional details
                </Box>
              </>
            }
          />
          <Group grow align="center" mt="md">
            <Select
              readOnly={true}
              label="Invoicing Frequency"
              placeholder="Invoicing Frequency"
              data={[
                { label: 'H1', value: 'h1' },
                {
                  label: 'Green Card/Citizen',
                  value: 'Green Card/Citizen',
                },
                { label: 'Green Card/USC', value: 'Green Card/USC' },
                { label: 'NA', value: 'na' },
              ]}
              {...form.getInputProps('invoicing_frequency')}
            />
            <TextInput
              readOnly={true}
              label="Format of Timesheet"
              type={'text'}
              placeholder="Format of Timesheet"
              {...form.getInputProps('format_of_timesheet')}
            />
            <TextInput
              readOnly={true}
              label="Invoice Format"
              type={'text'}
              placeholder="Invoice Format"
              {...form.getInputProps('invoice_format')}
            />
            <TextInput
              readOnly={true}
              label="Remark"
              type={'text'}
              placeholder="Remark"
              {...form.getInputProps('remark')}
            />
          </Group>
        </form>
      </div>
    </>
  )
}
