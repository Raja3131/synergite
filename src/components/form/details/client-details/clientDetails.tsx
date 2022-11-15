import useEditClient from '@/pages/client/hooks/useEditClient'
import theme from '@/theme/theme'
import { TClient } from '@/types'
import {
  TextInput,
  Group,
  createStyles,
  Select,
  Divider,
  Box,
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

export default function ClientDetails(clientDetailsData: TClient) {
  const { classes } = useStyles()
  const { mutate: clientDetails } = useEditClient()

  const form = useForm<TClient>({
    initialValues: clientDetailsData,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TClient) => {
    const clientDetailsData = {
      ...values,
    }

    clientDetails(clientDetailsData)

    showNotification({
      title: 'Success!!',
      message: 'Client Details Fetched Successfully.',
    })
  }

  return (
    <>
      <div className={classes.paper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Group grow align="center" mt="md">
            <TextInput
              readOnly={true}
              label="Account Name"
              type={'text'}
              placeholder="Account Name"
              value={clientDetailsData.first_name}
            />
            <TextInput
              readOnly={true}
              label="Address line 1"
              type={'text'}
              placeholder="Address line 1"
              value={clientDetailsData.address_line1}
            />
            <TextInput
              readOnly={true}
              label="Address line 2"
              type={'text'}
              placeholder="Address line 2"
              value={clientDetailsData.address_line2}
            />
            <TextInput
              readOnly={true}
              label="City"
              type={'text'}
              placeholder="City"
              value={clientDetailsData.city}
            />
            <TextInput
              readOnly={true}
              label="State"
              type={'text'}
              placeholder="State"
              value={clientDetailsData.state}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              readOnly={true}
              label="Country"
              type={'text'}
              placeholder="Country"
              value={clientDetailsData.country}
            />
            <TextInput
              readOnly={true}
              label="ZIP"
              type={'text'}
              placeholder="ZIP"
              value={clientDetailsData.zip}
            />
            <Select
              readOnly={true}
              label="Employment Type"
              placeholder="Employment Type"
              data={[
                { label: 'H1', value: 'h1' },
                {
                  label: 'Green Card/Citizen',
                  value: 'Green Card/Citizen',
                },
                { label: 'Green Card/USC', value: 'Green Card/USC' },
                { label: 'NA', value: 'na' },
              ]}
              {...form.getInputProps('employee_type')}
            />
            <Select
              readOnly={true}
              label="Employment Type"
              placeholder="Employment Type"
              data={[
                { label: 'H1', value: 'h1' },
                {
                  label: 'Green Card/Citizen',
                  value: 'Green Card/Citizen',
                },
                { label: 'Green Card/USC', value: 'Green Card/USC' },
                { label: 'NA', value: 'na' },
              ]}
              {...form.getInputProps('employee_type')}
            />
            <TextInput
              readOnly={true}
              label="FAX"
              type={'text'}
              placeholder=" FAX"
              value={clientDetailsData.fax}
            />
          </Group>
          <Group grow align="center" mt="md">
            <TextInput
              readOnly={true}
              label="Company Phone"
              type={'text'}
              placeholder="Company Phone"
              value={clientDetailsData.primary_phone}
            />
            <TextInput
              readOnly={true}
              label="Company Email"
              type={'text'}
              placeholder="Company Email"
              value={clientDetailsData.primary_email}
            />
            <TextInput
              readOnly={true}
              label="Company Contact"
              type={'text'}
              placeholder="Company Contact"
              // {...form.getInputProps('company_contact')}
              // value={clientDetailsData.}
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
