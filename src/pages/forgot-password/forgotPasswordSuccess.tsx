import Logo from '@/components/logo'
import {
  Container,
  createStyles,
  Image,
  Loader,
  Paper,
  Text,
} from '@mantine/core'
import { Link } from 'react-router-dom'
import SuccessfullyDone from '@/assets/images/successfully-done.gif'

const useStyles = createStyles((theme) => ({
  headerWrapper: {
    backgroundColor: theme.colors.blue[6],
    padding: '20px',
  },
  successCmp: {
    display: 'flex',
    flexDirection: 'column',
    placeItems: 'center',
    // gap: '10px',
    padding: '20px',
    marginTop: '50px',
  },
  text: {
    fontSize: '28px',
    // color: theme.colors.blue[4],
  },
  logo: {
    color: theme.colors.cyan,
    height: '50px',
  },
}))
const ForgotPasswordSuccess = () => {
  const { classes } = useStyles()

  return (
    <>
      <div>
        <div className={classes.headerWrapper}>
          <Link to={'/'}>
            <a href="/" rel="noopener noreferrer">
              <Logo />
            </a>
          </Link>
        </div>
        <Container>
          <Paper className={classes.successCmp}>
            <Image src={SuccessfullyDone} alt="SuccessfullyDone" width={250} />
            <Text className={classes.text} weight="500">
              Success Forgot Password Link
            </Text>
            <Text size={'xl'} mt="10px" weight="400">
              We have Successfully send Password Reset Link to your Email.
            </Text>
            <Loader variant="dots" size="xs" color={'black'} />
          </Paper>
        </Container>
      </div>
    </>
  )
}

export default ForgotPasswordSuccess
