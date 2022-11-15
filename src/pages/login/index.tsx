import { useContext } from 'react'

import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Image,
  MantineProvider,
  Group,
  Text,
} from '@mantine/core'

import Logo from '@/components/logo'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, zodResolver } from '@mantine/form'
import useLogin, { ILoginRequest } from './hooks/useLogin'
import { zLoginValidation } from '@/types/login-type'
import { AxiosError } from 'axios'
import { useAuth } from '@/store/auth.store'

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 800,
    display: 'flex',
    width: '100%',
    overflow: 'hidden',

    [theme.fn.smallerThan('xl')]: {
      minHeight: 600,
    },
    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
      minHeight: 600,
    },
  },
  formMain: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 900,
    width: `40%`,
    backgroundColor: theme.colors.blue[9],

    [theme.fn.smallerThan('xl')]: {
      width: '40%',
      padding: '40px',
    },
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      padding: '20px',
    },
  },

  formInner: {
    width: '100%',
    margin: '0 auto',
    padding: 80,
    backgroundColor: theme.colors.white,
    marginTop: '140px',

    [theme.fn.smallerThan('xl')]: {
      padding: 30,
      marginTop: '70px',
    },
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
    '::-ms-input-placeholder': {
      backgroundColor: theme.colors.blue[9],
    },
  },
  backPage: {
    textDecoration: 'none',
    color: theme.colors.blue[9],
  },
}))

export function Login() {
  const { classes } = useStyles()

  const login = useAuth((state) => state.login)
  const navigate = useNavigate()

  const form = useForm<ILoginRequest>({
    validate: zodResolver(zLoginValidation),
    initialValues: {
      email: '',
      password: '',
    },
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: ILoginRequest) => {
    console.log('[handleSubmit] is called')
    login(values)
      .then(() => {
        navigate('/client')
      })
      .catch((error: AxiosError) => {
        console.log(error)
        navigate('/login')
      })
  }

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.formMain} radius={0} p={30} px={80}>
        <Link to={'/'}>
          <Logo />
        </Link>
        {/* Login form */}
        {/* <form onSubmit={form.onSubmit(handleSubmit)} autoComplete="on"> */}
        <form onSubmit={form.onSubmit(handleSubmit)} autoComplete="on">
          <Paper className={classes.formInner} radius={10}>
            <Title
              order={6}
              className={classes.title}
              align="left"
              mt="md"
              mb={50}
            >
              Login with <span className={classes.password}>Email</span> and{' '}
              <span className={classes.password}>Password</span>
            </Title>

            <TextInput
              className={classes.emailInput}
              label="Email address"
              placeholder="Enter your email address"
              size="md"
              type="email"
              autoComplete="on"
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              autoComplete="on"
              mt="md"
              size="md"
              // type="password"
              {...form.getInputProps('password')}
            />

            <Group grow mt={20} position="center">
              <Checkbox label="Keep me logged in" size="sm" required />

              <Link className={classes.backPage} to={'/forgot-password'}>
                <Text
                  weight={700}
                  // onClick={(event) => event.preventDefault()}
                  align="right"
                >
                  Forgot Password
                </Text>
              </Link>
            </Group>
            <MantineProvider
              inherit
              theme={{
                defaultGradient: {
                  from: 'orange',
                  to: 'red',
                  deg: 45,
                },
              }}
            >
              <Button
                type="submit"
                variant="gradient"
                size="md"
                fullWidth
                mt="xl"
                color="indigo"
              >
                Login
              </Button>
            </MantineProvider>
          </Paper>
        </form>
      </Paper>

      <div className={classes.loginImg}>
        <Image
          src="https://www.allen.ac.in/apps2223/assets/images/login.jpg"
          alt="Login_Img"
          height="100vh"
          width="100%"
        />
      </div>
    </div>
  )
}

export default Login
