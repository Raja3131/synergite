import { TOnboarding } from '@/types/onboarding-flow-type'
import { TextInput, Group, createStyles, Select } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
const useStyles = createStyles((theme) => ({
  paper: {
    backgroundColor: 'transparent',
  },
  hrInfo: {
    color: theme.colors.blue[9],
  },
}))

type onboardingStepperProps = {
  form: UseFormReturnType<TOnboarding>
}

export default function Immigration({ form }: onboardingStepperProps) {
  const { classes } = useStyles()

  return (
    <>
      <div className={classes.paper}>
        <Group grow align="center" mt="md">
          <Select
            label="Processing Type"
            placeholder="Processing Type"
            {...form.getInputProps('processing_type')}
            data={[
              { value: 'regular', label: 'Regular' },
              { value: 'premium', label: 'Premium' },
            ]}
          />
          <Select
            allowDeselect="No"
            label="Who is going to pay Premium"
            placeholder="Who is going to pay Premium"
            {...form.getInputProps('who_is_going_to_pay_premium')}
            data={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ]}
          />
        </Group>
        <Group grow align="center" mt="md">
          <TextInput
            label="Immigration Job Title"
            type={'text'}
            placeholder="Immigration Job Title"
            {...form.getInputProps('immigration_job_title')}
          />
          <TextInput
            label="Current H1B validity"
            type={'text'}
            placeholder="Current H1B validity"
            {...form.getInputProps('current_h1b_validity')}
          />
          <TextInput
            label="Current LCA number"
            type={'text'}
            placeholder="Current LCA number"
            {...form.getInputProps('current_lac_number')}
          />
        </Group>
        {/* <div>
            <Button fullWidth type="submit" mt="md" mb="lg">
              Update Now
            </Button>
          </div> */}
      </div>
    </>
  )
}
