import { TCandidate } from '@/types/candidate-type'
import {
  TextInput,
  Button,
  Group,
  createStyles,
  Paper,
  FileInput,
  Stepper,
} from '@mantine/core'
import { useState } from 'react'
const useStyles = createStyles(() => ({
  paper: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
  },
}))

// employeeData: TCandidate
const EmployeeDetailsForm: React.FC<{ employeeData: TCandidate }> = ({
  employeeData,
}) => {
  const [active, setActive] = useState(0)

  console.log('employeeData = ', employeeData)
  const { classes } = useStyles()
  // next btn
  const nextStep = () =>
    setActive((current) => {
      // if (hasErrors) {
      //   return current
      // }
      return current < 2 ? current + 1 : current
    })
  // prev btn
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current))

  return (
    <>
      <Paper p={20} mt={30} radius="sm" className={classes.paper}>
        {/* onSubmit={form.onSubmit(handleSubmit)} */}
        <form>
          <Stepper active={active} breakpoint="sm">
            {/* Personal Information */}
            <Stepper.Step label="Info" description="Personal information">
              <Group grow align="center" mt="md">
                <FileInput
                  label="Profile Image"
                  // mt="md"
                  // {...form.getInputProps('profile_image')}
                />
                <TextInput
                  required
                  label="Employee Id"
                  type={'text'}
                  placeholder="Employee Id"
                  value={employeeData?.employee_id}
                />
              </Group>
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="First Name"
                  type={'text'}
                  placeholder="First Name"
                  value={employeeData?.fname}
                />
                <TextInput
                  required
                  label="Last Name"
                  type={'text'}
                  placeholder="Last Name"
                  value={employeeData?.lname}
                />
              </Group>
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="Email"
                  type={'text'}
                  placeholder="Email"
                  value={employeeData?.email}
                />
                <TextInput
                  required
                  label="Phone"
                  type={'text'}
                  placeholder="Phone"
                  value={employeeData?.phone}
                />
              </Group>
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="SSN"
                  type={'text'}
                  placeholder="SSN"
                  value={employeeData?.ssn_no}
                />
                <TextInput
                  required
                  label="Date of birth"
                  type={'date'}
                  placeholder="Date of birth"
                  value={employeeData?.dob}
                />
              </Group>
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="Gender"
                  type={'text'}
                  placeholder="Gender"
                  value={employeeData?.gender}
                />
                <TextInput
                  required
                  label="Ethnic Origin"
                  type={'text'}
                  placeholder="Ethnic Origin"
                  value={employeeData?.ethnic_origin}
                />
              </Group>
            </Stepper.Step>
            {/* Address */}
            <Stepper.Step label="Address" description="Employee address">
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="Address line 1"
                  type={'text'}
                  placeholder="Address line 1"
                  value={employeeData?.address1}
                />
                <TextInput
                  required
                  label="Address line 2"
                  type={'text'}
                  placeholder="Address line 2"
                  value={employeeData?.address2}
                />
              </Group>
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="City"
                  type={'text'}
                  placeholder="City"
                  value={employeeData?.city}
                />
                <TextInput
                  required
                  label="State"
                  type={'text'}
                  placeholder="State"
                  value={employeeData?.state}
                />
              </Group>
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="Country"
                  type={'text'}
                  placeholder="Country"
                  value={employeeData?.country}
                />
                <TextInput
                  required
                  label="Zip Code"
                  type={'text'}
                  placeholder="Zip Code"
                  value={employeeData?.zip}
                />
              </Group>
              <Group grow align="center" mt="md">
                <TextInput
                  required
                  label="County"
                  type={'text'}
                  placeholder="County"
                  value={employeeData?.county}
                />
                <Button fullWidth type="submit" mt="xl">
                  Update
                </Button>
              </Group>
            </Stepper.Step>
          </Stepper>
          {/* prev and next button */}
          <Group position="right" mt="xl">
            {active !== 0 && (
              <Button variant="default" onClick={prevStep}>
                Prev
              </Button>
            )}
            {active !== 1 && <Button onClick={nextStep}>Next</Button>}
          </Group>
        </form>
      </Paper>
    </>
  )
}

export default EmployeeDetailsForm
