import { useOnboarding } from '@/store/onboarding.store'
import {
  Autocomplete,
  Button,
  createStyles,
  Group,
  Loader,
  Text,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  successCmp: {
    display: 'flex',
    flexDirection: 'column',
    padding: '30px',
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.40)',
  },
  logo: {
    color: theme.colors.cyan,
    height: '50px',
  },
}))

type IOnboardingQuestionnaireProps = {
  employee_type: string
  immigration_status: string
  payment_type: string
}

const Questionnaire = () => {
  const [isProceeding, setIsProceeding] = useState(false)
  const { classes } = useStyles()
  const navigate = useNavigate()
  const { state } = useLocation()
  console.log('[Questionnaire] state =', state)

  const form = useForm<IOnboardingQuestionnaireProps>({
    initialValues: {
      employee_type: '',
      immigration_status: '',
      payment_type: '',
    },
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })
  const handleSubmit = (values: IOnboardingQuestionnaireProps) => {
    console.log(values)
    void values
    try {
      form.reset()
      setTimeout(() => {
        navigate('/onboarding')
      }, 2000)
    } catch (error) {
      // TODO - Need to show an Error Alert
    }
    setIsProceeding(true)
  }

  return (
    <>
      {isProceeding && (
        <div>
          Proceeding
          <Loader variant="dots" size="sm" />
        </div>
      )}
      {!isProceeding && (
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          className={classes.successCmp}
        >
          <Group position="apart" mb="sm" align={'center'} grow>
            <Autocomplete
              data={['1099', 'C2C', 'W2', 'Others']}
              label="Employee Type"
              placeholder="Employee Type"
              radius="xs"
              variant="default"
              required
              withAsterisk
              {...form.getInputProps('employee_type')}
            />
            <Autocomplete
              data={['Green card/Citizen', 'H1', 'Not Applicable', 'Others']}
              label="Immigration Status"
              placeholder="Immigration Status"
              radius="xs"
              variant="default"
              required
              withAsterisk
              {...form.getInputProps('immigration_status')}
            />
          </Group>
          <Group position="apart" align={'center'} grow>
            <Autocomplete
              data={[
                'Billable',
                'Non Billable',
                'Billable/Non Billable',
                'Others',
              ]}
              label="Payment Type"
              placeholder="Payment Type"
              radius="xs"
              variant="default"
              required
              withAsterisk
              {...form.getInputProps('payment_type')}
            />
            <Button variant="gradient" mt="xl" type="submit">
              Proceed to Onboarding
            </Button>
          </Group>
        </form>
      )}
    </>
  )
}

export default Questionnaire
