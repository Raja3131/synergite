import {
  Paper,
  createStyles,
  PasswordInput,
  Button,
  Title,
  Image,
  Group,
  MantineProvider,
  Text,
  Loader,
} from '@mantine/core'

import Logo from '@/components/logo'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm, zodResolver } from '@mantine/form'
import axiosPublic from '@/services/axiosPublic'
import { useMemo, useState } from 'react'
import { zResetPassword } from '@/types/login-type'
import { showNotification } from '@mantine/notifications'

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    display: 'flex',
    width: '100%',
    overflow: 'hidden',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 900,
    width: `40%`,
    backgroundColor: theme.colors.blue[9],
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },

  formInner: {
    width: '100%',
    margin: '0 auto',
    padding: 80,
    // backgroundColor: 'rgba(103, 169, 241, 0.17)',
    backgroundColor: theme.colors.white,
    marginTop: '155px',
  },

  title: {
    color: theme.black,
    fontFamily: theme.fontFamily,
    fontSize: '1.4rem',
  },
  password: {
    color: theme.colors.accent[9],
    fontWeight: 700,
  },
  loginImg: {
    width: '60%',
    maxWidth: '50%',
    height: '100vh',
    marginLeft: 'auto',
    marginRight: 'auto',

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },
  btn: {
    backgroundColor: theme.colors.accent[9],
    ':hover': {
      backgroundColor: theme.colors.accent[8],
      transition: 'all 0.6s ease-in-out',
    },
  },
  emailInput: {
    // backgroundColor: theme.colors.blue[9],
    '::-ms-input-placeholder': {
      backgroundColor: theme.colors.blue[9],
    },
  },
  backPage: {
    textDecoration: 'none',
    color: theme.colors.blue[9],
  },
}))
type IResetRequest = {
  password: string
  confirm_password: string
}

function useQuery() {
  const { search } = useLocation()

  return useMemo(() => new URLSearchParams(search), [search])
}

export function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const query = useQuery()
  const navigate = useNavigate()

  const { classes } = useStyles()
  const form = useForm<IResetRequest>({
    validate: zodResolver(zResetPassword),
    initialValues: {
      password: '',
      confirm_password: '',
    },
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })
  const handleSubmit = (values: IResetRequest) => {
    // console.log({ values })

    try {
      void axiosPublic.post(
        `/user/resetpassword?email=ranjitkoiri009@gmail.com&reset_token=${String(
          query.get('reset_token')
        )}&password=${values.password}`
      )
      // resetting form = Done
      form.reset()
      // notifying password reset success = Done
      setTimeout(() => {
        showNotification({
          title: 'Password Reset Success!!',
          message: 'You have successfully resetting your password.',
        })
      }, 1500)
      // navigating login page after 2 sec = Done
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (error) {
      // TODO - Need to show an Error Alert
    }
    setIsSubmitting(true)
  }
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30} px={80}>
        <Link to={'/'}>
          <Logo />
        </Link>
        <form onSubmit={form.onSubmit(handleSubmit)} autoComplete="on">
          <Paper className={classes.formInner} radius={10}>
            <Title
              order={6}
              className={classes.title}
              align="left"
              mt="md"
              mb={50}
            >
              Confirm your <span className={classes.password}>Password</span>
            </Title>
            <PasswordInput
              label="Password"
              placeholder="★★★★★★★★"
              mt="md"
              size="md"
              {...form.getInputProps('password')}
            />
            <PasswordInput
              label="Confirm Password"
              placeholder="★★★★★★★★"
              mt="md"
              size="md"
              mb={10}
              {...form.getInputProps('confirm_password')}
            />
            <Group grow mt={20} position="apart">
              <Link className={classes.backPage} to={'/login'}>
                Back to login page
              </Link>
              <MantineProvider
                theme={{
                  defaultGradient: {
                    from: 'orange',
                    to: 'red',
                    deg: 45,
                  },
                }}
              >
                <Button variant="gradient" type="submit" size="md">
                  {!isSubmitting && 'Submit'}
                  {isSubmitting && (
                    <Text>
                      Submitting{''}
                      <Loader variant="dots" color={'white'} size="sm" />
                    </Text>
                  )}
                </Button>
              </MantineProvider>
            </Group>
          </Paper>
        </form>
      </Paper>

      <Paper className={classes.loginImg} radius={0}>
        <Image
          src="https://img.freepik.com/free-vector/login-concept-illustration_114360-757.jpg?w=826&t=st=1660660487~exp=1660661087~hmac=25452a9c404715893a9a1fcb9a5cfc8056a60a06dae96319cdd8cca781672bbb"
          alt="Login_Img"
          height="100vh"
          width="100%"
        />
      </Paper>
    </div>
  )
}

export default Login
