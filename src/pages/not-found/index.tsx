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
import notFoundImg from '@/assets/images/notFound.svg'
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
  notFoundImage: {
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
      <Group align="center">
        <Link to={'/'}>
          <Image src={SynergiteLogo} alt="SynergiteLogo" width={200} />
        </Link>
      </Group>
      <div className={classes.root}>
        <Container>
          <Image
            src={notFoundImg}
            alt="notFoundImg"
            className={classes.notFoundImage}
          />
          <Title className={classes.title}>Nothing to see here</Title>
          <Text size="lg" align="center" className={classes.description}>
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
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
                  Back to home page
                </Button>
              </Link>
            </MantineProvider>
          </Group>
        </Container>
      </div>
    </div>
  )
}
