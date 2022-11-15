import { useState, useContext } from 'react'
import {
  createStyles,
  // Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Burger,
  Header,
  MediaQuery,
  Box,
  Divider,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  IconLogout,
  IconSettings,
  IconClock,
  IconChevronRight,
  IconRoute,
} from '@tabler/icons'
import Logo from '../logo'
import { Link, useNavigate } from 'react-router-dom'
import useLogout from '@/pages/login/hooks/useLogout'
import useCurrentUser from '@/pages/login/hooks/useCurrentUser'
import { useAuth } from '@/store/auth.store'

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    height: '90px',
    backgroundColor: 'transparent',
    border: 'none',

    [theme.fn.smallerThan('xs')]: {
      backgroundColor: theme.colors.blue[9],
      alignItems: 'center',
    },
  },

  user: {
    color: theme.colors.grey[0],
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.colors.blue[0],
      color: theme.colors.grey[0],
    },

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor: theme.colors.white,
  },

  leftSide: {
    display: 'flex',
    alignItems: 'center',
    width: '299px',
    paddingLeft: '20px',
    backgroundColor: theme.colors.blue[9],

    [theme.fn.smallerThan('xs')]: {
      backgroundColor: 'transparent',
    },
  },
  rightSide: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: '25px',
    paddingLeft: '25px',

    [theme.fn.smallerThan('sm')]: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'right',
    },
  },

  dateTime: {
    display: 'flex',
    alignItems: 'center',
    color: theme.colors.grey[0],
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',
    backgroundColor: theme.colors.blue[8],
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.colors.blue[8],
    },
  },
  accSet: {
    '&:hover': {
      backgroundColor: theme.colors.blue[0],
    },
  },
  logout: {
    '&:hover': {
      backgroundColor: theme.colors.blue[0],
    },
  },
}))

interface IHeaderBarProps {
  user: { name: string; image: string }
}

export default function HeaderBar({ user }: IHeaderBarProps) {
  const { classes, cx } = useStyles()
  const [opened, { toggle }] = useDisclosure(false)
  const [userMenuOpened, setUserMenuOpened] = useState(false)

  const logout = useAuth((state) => state.logout)
  const navigate = useNavigate()

  const currentDay = new Date().toLocaleDateString('en-US')
  void useCurrentUser()

  return (
    <Header className={classes.header} height={80}>
      <Box className={classes.leftSide}>
        <Link to={'/'}>
          <Logo />
        </Link>
      </Box>
      <Box className={classes.rightSide}>
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Group spacing={7} className={classes.dateTime}>
            <div>{currentDay}</div>
            <IconClock size={18} stroke={2} />
          </Group>
        </MediaQuery>
        <div>
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              className={classes.burger}
              size="xl"
              color="white"
            />

            <Menu
              width={260}
              position="bottom-end"
              transition="pop-top-right"
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
            >
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, {
                    [classes.userActive]: userMenuOpened,
                  })}
                >
                  <Group spacing={7}>
                    <Avatar
                      src={user.image}
                      alt={user.name}
                      radius="xl"
                      size={28}
                    />
                    <Text
                      weight={600}
                      size="md"
                      sx={{ lineHeight: 1 }}
                      mr={3}
                      color="blue"
                    >
                      {user.name}
                    </Text>
                    <IconChevronRight size={12} stroke={1.5} color="blue" />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Settings</Menu.Label>
                <Menu.Item
                  icon={<IconSettings size={14} stroke={1.5} />}
                  className={classes.accSet}
                >
                  Account settings
                </Menu.Item>
                <Menu.Item
                  icon={<IconLogout size={14} stroke={1.5} />}
                  className={classes.logout}
                  onClick={() => {
                    logout()
                    navigate('/login')
                  }}
                >
                  Logout
                </Menu.Item>
                {/* <Divider my="sm" />
                <Menu.Item
                  icon={<IconRoute size={14} stroke={1.5} />}
                  className={classes.logout}
                >
                  Page Route Link Below
                </Menu.Item>
                <Menu.Item>
                  <Link to={'/login'}>Login</Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to={'/forgot-password'}>Forgot Password</Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to={'/confirm-password'}>Confirm Password</Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to={'/not-found'}>404 Not Found</Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to={'/server-error'}>500 Server Error</Link>
                </Menu.Item> */}
              </Menu.Dropdown>
            </Menu>
          </Group>
        </div>
      </Box>
    </Header>
  )
}
