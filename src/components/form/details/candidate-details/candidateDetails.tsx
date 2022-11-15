import useEditCandidate from '@/pages/candidate/hooks/useEditCandidate'
import theme from '@/theme/theme'
import { TCandidate } from '@/types/candidate-type'
import { TextInput, Group, createStyles, Select } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
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

export default function CandidateDetails(candidateDetailsData: TCandidate) {
  const { classes } = useStyles()
  const { mutate: candidateDetails } = useEditCandidate()

  const form = useForm<TCandidate>({
    initialValues: candidateDetailsData,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: TCandidate) => {
    const candidateDetailsData = {
      ...values,
    }

    candidateDetails(candidateDetailsData)

    showNotification({
      title: 'Success!!',
      message: 'Candidate Details Fetched Successfully.',
    })
  }

  return (
    <>
      <div className={classes.paper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Group grow align="center" mb="lg">
            <TextInput
              readOnly={true}
              label="First Name"
              type={'text'}
              placeholder="First Name"
              value={candidateDetailsData.fname}
              style={{ minWidth: '200px' }}
            />
            <TextInput
              readOnly={true}
              label="Last Name"
              type={'text'}
              placeholder="Last Name"
              value={candidateDetailsData.lname}
              style={{ minWidth: '200px' }}
            />
            <TextInput
              readOnly={true}
              label="Email"
              type={'text'}
              placeholder="Email"
              value={candidateDetailsData.email}
              style={{ minWidth: '200px' }}
            />
            <TextInput
              readOnly={true}
              label="Phone"
              type={'text'}
              placeholder="Phone"
              value={candidateDetailsData.phone}
              style={{ minWidth: '200px' }}
            />
            <TextInput
              readOnly={true}
              label="SSN"
              type={'text'}
              placeholder="SSN"
              value={candidateDetailsData.ssn_no}
              style={{ minWidth: '200px' }}
            />
          </Group>

          <Group grow align="center" mb="lg">
            <div style={{ minWidth: '200px' }}>
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
            </div>
            <TextInput
              readOnly={true}
              label="Date of birth"
              type={'date'}
              placeholder="Date of birth"
              value={candidateDetailsData.dob}
              style={{ minWidth: '100px' }}
            />
            <TextInput
              readOnly={true}
              label="City"
              type={'text'}
              placeholder="City"
              value={candidateDetailsData.city}
            />
            <TextInput
              readOnly={true}
              label="State"
              type={'text'}
              placeholder="State"
              value={candidateDetailsData.state}
            />
          </Group>
        </form>
      </div>
    </>
  )
}
