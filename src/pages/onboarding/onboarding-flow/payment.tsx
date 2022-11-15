import { TOnboarding } from '@/types/onboarding-flow-type'
import {
  TextInput,
  Group,
  createStyles,
  Divider,
  Box,
  Select,
  Autocomplete,
} from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { IconChevronsRight } from '@tabler/icons'
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

export default function Payment({ form }: onboardingStepperProps) {
  const { classes } = useStyles()

  return (
    <>
      <div className={classes.paper}>
        <Group grow align="center" mt="lg">
          <TextInput
            label="Bill rate"
            type={'text'}
            placeholder="Bill rate"
            {...form.getInputProps('bill_rate')}
          />
          <TextInput
            label="Pay rate"
            type={'text'}
            placeholder="Pay rate"
            {...form.getInputProps('pay_rate')}
          />
          <Autocomplete
            label="Payment frequency"
            placeholder="Payment frequency"
            {...form.getInputProps('payment_frequency')}
            limit={30}
            maxDropdownHeight={200}
            nothingFound="No Payment Frequency found"
            data={['Net o', 'Net 3', 'Net 5', 'Nil 45', 'Net 15', 'Nil 30']}
          />
        </Group>
        <Group grow align="center" mt="lg">
          <TextInput
            label="Account Manager Commission"
            type={'text'}
            placeholder="Account Manager Commission"
            {...form.getInputProps('account_manager_commission')}
          />
          <TextInput
            label="Recruitment Manager Commission"
            type={'text'}
            placeholder="Recruitment Manager Commission"
            {...form.getInputProps('recruitment_manager_commission')}
          />
          <TextInput
            label="Recruitment Commission"
            type={'text'}
            placeholder="Recruitment Commission"
            {...form.getInputProps('recruitment_commission')}
          />
        </Group>
        <Group grow align="center" mt="lg">
          <TextInput
            label="Additional Commission"
            type={'text'}
            placeholder="Additional Commission"
            {...form.getInputProps('additional_commission')}
          />
          <TextInput
            label="Additional Information"
            type={'text'}
            placeholder="Additional Information"
            {...form.getInputProps('additional_information')}
          />
        </Group>
      </div>
    </>
  )
}
