import useEditSubmission from '@/pages/client/client-details/jobs/submissions/hooks/useEditSubmission'
import { TSubmission } from '@/types/submission-type'
import { useState } from 'react'

import {
  Button,
  createStyles,
  Drawer,
  Grid,
  Group,
  Paper,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import EmployeeDetailsForm from './details/employeeDetailsForm'
import VendorDetailsForm from './details/vendorDetailsForm'
import EmployeeIdList from './employeeIdList'
import VendorIdList from './vendorIdList'
import { TAEmployee } from '@/types/employee-type'
import { TVendor } from '@/types'
import { IconExternalLink } from '@tabler/icons'
const useStyles = createStyles(() => ({
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
    height: '100%',
    overflow: 'auto',
    display: 'block',
    marginBottom: '32px',
  },
}))

export default function EditForm(submissionData: TSubmission) {
  const { classes } = useStyles()
  const { mutate: editSubmission } = useEditSubmission()
  const [employeeOpened, setEmployeeOpened] = useState(false)
  const [vendorOpened, setVendorOpened] = useState(false)

  const [employeeDetails, setEmployeeDetails] = useState({} as TAEmployee)
  const [vendorDetails, setVendorDetails] = useState({} as TVendor)

  const [vendorListOpened, vendorListIsOpened] = useState(false)
  const [employeeListOpened, employeeListIsOpened] = useState(false)

  const form = useForm<TSubmission>({
    // validate: zodResolver(zSubmissionEdit),
    initialValues: submissionData,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const employeeName = `${employeeDetails?.fname || ''} ${
    employeeDetails?.lname || ''
  }`
  const vendorName = `${vendorDetails?.first_name || ''} ${
    vendorDetails?.last_name || ''
  }`

  const handleSubmit = (values: TSubmission) => {
    const submissionCreateData = {
      ...values,
    }

    editSubmission(submissionCreateData)

    showNotification({
      title: 'Success!!',
      message: 'Submission Edited successfully.',
    })
  }

  return (
    <>
      <Paper p={20} radius="sm" className={classes.paper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            mt="md"
            required
            label="Vendor"
            type={'text'}
            placeholder="Vendor"
            onClick={() => {
              vendorListIsOpened(true)
            }}
            value={vendorName || ''}
            rightSection={
              vendorDetails?.uuid ? (
                <IconExternalLink
                  size="20"
                  color="grey"
                  cursor="pointer"
                  onClick={() => {
                    setVendorOpened(true)
                    // setVendorDetails()
                  }}
                />
              ) : null
            }
          />
          <TextInput
            key={employeeDetails?.uuid}
            mt="md"
            required
            label="Candidate"
            type={'text'}
            placeholder="Candidate"
            onClick={() => {
              employeeListIsOpened(true)
            }}
            value={employeeName || employeeName}
            rightSection={
              employeeDetails?.uuid ? (
                <IconExternalLink
                  size="20"
                  color="grey"
                  cursor="pointer"
                  onClick={() => {
                    setEmployeeOpened(true)
                    // setEmployeeDetails(employeeDetails)
                  }}
                />
              ) : null
            }
          />
          <Grid mt="md">
            <Grid.Col span={6}>
              <Select
                data={[
                  { value: 'Unknown', label: 'Unknown' },
                  { value: 'Selected', label: 'Selected' },
                  { value: 'Rejected', label: 'Rejected' },
                  { value: 'On Hold', label: 'On Hold' },
                ]}
                placeholder="Submission Status"
                label="Submission Status"
                {...form.getInputProps('submission_status')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                placeholder="Pay Rate"
                label="Pay Rate"
                type="number"
                // {...form.getInputProps('submission_status')}
              />
            </Grid.Col>
          </Grid>
          <Grid mt="md">
            <Grid.Col span={6}>
              <TextInput
                required
                label="Recruiters"
                type={'text'}
                placeholder="Recruiters"
                {...form.getInputProps('recruiters')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Rejection Reason"
                type={'text'}
                placeholder="Rejection Reason"
                {...form.getInputProps('rejection_reason')}
              />
            </Grid.Col>
          </Grid>

          <Textarea
            required
            label="Remarks"
            type={'text'}
            placeholder="Remarks"
            mt="md"
            {...form.getInputProps('remarks')}
          />
          <Button fullWidth type="submit" mt="xl" mb="xl">
            Submit Now
          </Button>
        </form>

        {/* Showing Vendor Details */}
        <Drawer
          opened={vendorOpened}
          onClose={() => setVendorOpened(false)}
          title="Vendor details"
          padding="xl"
          size="xl"
          position="right"
        >
          <VendorDetailsForm {...vendorDetails} />
        </Drawer>

        {/* Showing Employee Details */}
        <Drawer
          opened={employeeOpened}
          onClose={() => setEmployeeOpened(false)}
          title="Employee details"
          padding="xl"
          size="xl"
          position="right"
        >
          <EmployeeDetailsForm employeeData={employeeDetails} />
        </Drawer>

        {/* Showing Employee IdList */}
        <Drawer
          opened={employeeListOpened}
          onClose={() => employeeListIsOpened(false)}
          title="Employee List"
          padding="xl"
          size="xl"
          position="right"
        >
          <EmployeeIdList
            setEmployee={(employee) => {
              setEmployeeDetails(employee as TAEmployee)
            }}
          />
        </Drawer>

        <Drawer
          opened={vendorListOpened}
          onClose={() => vendorListIsOpened(false)}
          title="Vendor List"
          padding="xl"
          size="xl"
          position="right"
        >
          <VendorIdList
            setVendor={(vendor) => {
              setVendorDetails(vendor)
            }}
          />
        </Drawer>
      </Paper>
    </>
  )
}
