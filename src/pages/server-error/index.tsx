import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Group,
  MantineProvider,
  Image,
} from '@mantine/core'
import SynergiteLogo from '@/assets/images/Synergite-Logo-With-Tagline.png'
import serverError from '@/assets/images/serverError.svg'
import { Link } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  main: {
    backgroundColor: theme.colors.blue[9],
    height: '100vh',
    width: '100%',
    paddingLeft: 80,
    paddingRight: 80,
    paddingTop: 30,
  },
  root: {
    backgroundColor: theme.colors.blue[9],
    display: 'flex',
    placeItems: 'center',
    height: '80vh',
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color: 'rgba(216, 126, 46, 0.5)',
    fontFamily: `Piedra`,
  },

  title: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,
    color: theme.white,
    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  serverError: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  description: {
    maxWidth: 540,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
    color: theme.colors[theme.primaryColor][1],
  },
}))

export default function ServerError() {
  const { classes } = useStyles()

  return (
    <div className={classes.main}>
      <Link to={'/'}>
        <Image src={SynergiteLogo} alt="SynergiteLogo" width={200} />
      </Link>
      <div className={classes.root}>
        <Container>
          <Image
            style={{ width: 300, marginLeft: 'auto', marginRight: 'auto' }}
            src={serverError}
            alt="notFoundImg"
            className={classes.serverError}
            // width={300}
          />
          <Title className={classes.title}>
            Something bad just happened...
          </Title>
          <Text size="lg" align="center" className={classes.description}>
            Our servers could not handle your request. Don&apos;t worry, our
            development team was already notified. Try refreshing the page.
          </Text>
          <Group position="center">
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
              <Link to={'/'}>
                <Button variant="gradient" size="md">
                  Refresh the page
                </Button>
              </Link>
            </MantineProvider>
          </Group>
        </Container>
      </div>
    </div>
  )
}
