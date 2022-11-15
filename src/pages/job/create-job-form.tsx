import TextDivider from '@/components/elements/text-divider'
import { languages } from '@/data/languages.data'
import useCreateJob from '@/pages/client/hooks/useCreateJob'
import { jobQueryKeys } from '@/react-query/queryKeys'
import { TJobCreate, zJobCreate } from '@/types'
import {
  TextInput,
  Button,
  Group,
  createStyles,
  Paper,
  Select,
  Textarea,
  Accordion,
  Divider,
  FileInput,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
const useStyles = createStyles(() => ({
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
  },
}))

const CreateJobForm = () => {
  const { clientId } = useParams()
  const { classes } = useStyles()
  const { mutate: addJob, isSuccess, isError } = useCreateJob(jobQueryKeys.jobs)

  const navigate = useNavigate()

  const form = useForm<TJobCreate>({
    validate: zodResolver(zJobCreate),
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = () => {
    const jobCreateData = {
      ...form.values,
      client_uuid: String(clientId),
    }

    addJob(jobCreateData)

    showNotification({
      title: 'Success!!',
      message: 'Job Created successfully.',
    })

    navigate(-1)
  } // End of handleSubmit

  return (
    <>
      <Paper p={20} mt={30} radius="sm" className={classes.paper}>
        <form
        // onSubmit={form.onSubmit((values) => console.log('values =', values))}
        >
          <Accordion defaultValue="job_details">
            <Accordion.Item
              value="job_details"
              style={{ borderBottom: 'none' }}
            >
              <Accordion.Control style={{ padding: '0' }}>
                <TextDivider label="Job Details" />
              </Accordion.Control>

              {/* Job Details */}
              <Accordion.Panel>
                <Group grow align="center" mt="md">
                  <TextInput
                    required
                    label="Job ID"
                    type={'text'}
                    placeholder="Job-001"
                    {...form.getInputProps('job_id')}
                  />
                  <TextInput
                    required
                    label="Client request ID"
                    type={'text'}
                    placeholder="Client request ID"
                    {...form.getInputProps('client_req_id')}
                  />
                  <TextInput
                    required
                    label="Start Date"
                    type={'date'}
                    placeholder="Start Date"
                    {...form.getInputProps('start_date')}
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
                  <TextInput
                    required
                    label="Country"
                    type={'text'}
                    placeholder="Country"
                    {...form.getInputProps('country')}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <Select
                    label="Job Title"
                    placeholder="Job Title"
                    data={[
                      { value: 'dev', label: 'Developer' },
                      { value: 'accountant', label: 'Accountant' },
                    ]}
                    {...form.getInputProps('title')}
                  />
                  <TextInput
                    label="Job Description"
                    type={'text'}
                    placeholder="Job Description"
                    {...form.getInputProps('job_description')}
                  />
                  <Select
                    label="Priority"
                    placeholder="Priority"
                    data={[
                      { value: '1', label: '1' },
                      { value: '2', label: '2' },
                      { value: '3', label: '3' },
                    ]}
                    {...form.getInputProps('priority')}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    required
                    label="Priority reason"
                    type={'text'}
                    placeholder="Priority reason"
                    {...form.getInputProps('priority_reason')}
                  />
                  <Select
                    label="Status"
                    placeholder="Status"
                    data={[
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'In Active' },
                    ]}
                    {...form.getInputProps('job_status')}
                  />
                  <Select
                    label="Tax Terms"
                    placeholder="Tax Terms"
                    data={[
                      { value: 'C2C', label: 'C2C' },
                      { value: '1099', label: '1099' },
                      { value: 'W2', label: 'W2' },
                    ]}
                    {...form.getInputProps('tax_terms')}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <Select
                    label="Created By"
                    placeholder="Created By"
                    data={[
                      { value: 'vishal', label: 'Vishal' },
                      { value: 'john', label: 'John Doe' },
                    ]}
                    {...form.getInputProps('job_status')}
                  />
                  <TextInput
                    required
                    label="Primary Skills"
                    type={'text'}
                    placeholder="Primary Skills"
                    {...form.getInputProps('primary_skills')}
                  />
                  <TextInput
                    required
                    label="Secondary Skills"
                    type={'text'}
                    placeholder="Secondary Skills"
                    {...form.getInputProps('secondary_skills')}
                  />
                </Group>

                <Group grow align="center" mt="md">
                  <Select
                    label="Visa Status"
                    placeholder="Visa Status"
                    data={[
                      { value: 'USC', label: 'USC' },
                      { value: 'H1', label: 'H1' },
                      { value: 'Green Card', label: 'Green Card' },
                    ]}
                    {...form.getInputProps('visa_status')}
                  />
                  <Select
                    label="Languages"
                    placeholder="Languages"
                    required
                    data={[
                      { value: 'Hindi', label: 'Hindi' },
                      { value: 'English', label: 'English' },
                      { value: 'Marathi', label: 'Marathi' },
                    ]}
                    {...form.getInputProps('languages')}
                  />
                  <Select
                    label="Industry"
                    placeholder="Industry"
                    data={[
                      {
                        value: 'IT- Information Technology',
                        label: 'IT- Information Technology',
                      },
                      { value: 'Media', label: 'Media' },
                    ]}
                    {...form.getInputProps('industry')}
                  />
                </Group>
                <Group grow align="center" mt="md">
                  <TextInput
                    required
                    label="Client Contact Email"
                    type={'text'}
                    placeholder="Client Contact Email"
                    {...form.getInputProps('client_contact_email')}
                  />
                  <TextInput
                    required
                    label="Client Contact Phone"
                    type={'text'}
                    placeholder="Client Contact Phone"
                    {...form.getInputProps('client_contact_phone')}
                  />
                </Group>
              </Accordion.Panel>
            </Accordion.Item>

            {/* Job Description */}
            <Accordion.Item
              value="employee_details"
              style={{ borderBottom: 'none' }}
            >
              <Accordion.Control style={{ padding: '0' }}>
                <TextDivider label="Job Details" />
              </Accordion.Control>

              <Accordion.Panel>
                <Group grow align="center" mt="md">
                  <Select
                    label="Job Domain"
                    placeholder="Job Domain"
                    data={[
                      { value: 'Developer', label: 'Developer' },
                      { value: 'Graphic Designer', label: 'Graphic Designer' },
                    ]}
                    {...form.getInputProps('job_domain')}
                  />
                  <TextInput
                    required
                    label="Job Description"
                    type={'text'}
                    placeholder="Job Description"
                    {...form.getInputProps('job_description')}
                  />
                </Group>
              </Accordion.Panel>
            </Accordion.Item>

            {/* Attachments */}
            <Accordion.Item
              value="attachments"
              style={{ borderBottom: 'none' }}
            >
              <Accordion.Control style={{ padding: '0' }}>
                <TextDivider label="Attachments" />
              </Accordion.Control>

              <Accordion.Panel>
                <Group grow align="center" mt="md">
                  <FileInput
                    label="Attachments"
                    type={'file'}
                    placeholder="Attachments"
                    {...form.getInputProps('attachments')}
                    // accept="image/png,image/jpeg, "
                  />
                </Group>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>

          {/* <Button fullWidth mt="md" mb="lg" type="submit"> */}
          <Button fullWidth mt="md" mb="lg" onClick={handleSubmit}>
            Add JOB
          </Button>
        </form>
      </Paper>
    </>
  )
} // End of CreateJobForm

export default CreateJobForm
