import { Navbar, ScrollArea, createStyles } from '@mantine/core'
import {
  IconLayoutDashboard,
  IconWallet,
  IconActivity,
  IconFileAnalytics,
  IconSettings,
  IconContrast2,
  IconTableOptions,
  IconUsers,
} from '@tabler/icons'

import LinksGroup from './NavBarLinksGroup'

const mockdata = [
  {
    label: 'Dashboard',
    icon: IconLayoutDashboard,
  },
  {
    label: 'Account',
    icon: IconWallet,
    initiallyOpened: false,
    links: [
      { label: 'Clients', link: '/client' },
      { label: 'Vendors', link: '/vendor' },
    ],
  },
  {
    label: 'Resources',
    icon: IconWallet,
    initiallyOpened: false,
    links: [
      { label: 'Candidates', link: '/candidate' },
      { label: 'Employees', link: '/employee' },
    ],
  },
  {
    label: 'Admin',
    icon: IconActivity,
    initiallyOpened: false,
    links: [
      { label: 'Activities', link: '/activity' },
      { label: 'Departments', link: '/department' },
      { label: 'Roles', link: '/roles' },
    ],
  },

  // { label: 'Employees', icon: IconUsers, url: '/employee' },
  // { label: 'Activities', icon: IconActivity, url: '/activity' },
  // { label: 'Contacts', icon: IconFileAnalytics },
  { label: 'TimeSheets', icon: IconFileAnalytics, url:'/timesheets' },

  { label: 'On Boarding List', icon: IconContrast2, url: '/onboarding-list' },
  { label: 'Job', icon: IconContrast2, url: '/job' },
  { label: 'Settings', icon: IconSettings },
]

const useStyles = createStyles((theme) => ({
  mainNav: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },
  navbar: {
    backgroundColor: theme.colors.blue[9],
    height: '100vh',
    borderTop: `1px solid ${theme.colors.blue[6]}`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    backgroundColor: theme.colors.blue[9],
  },

  linksInner: {
    paddingBottom: theme.spacing.xl,
  },

  // active: {
  //   '&, &:hover': {
  //     backgroundColor: theme.fn.variant({
  //       variant: 'light',
  //       color: theme.primaryColor,
  //     }).background,
  //     color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
  //       .color,
  //   },
  // },
}))

// interface NavbarLinkProps {
//   active?: boolean
// }
export default function NavBar() {
  const { classes } = useStyles()
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ))

  return (
    <Navbar
      hiddenBreakpoint="sm"
      width={{ sm: 200, md: 250, lg: 300 }}
      hidden={!open}
      className={classes.mainNav}
    >
      <Navbar width={{ sm: 300 }} p="md" className={classes.navbar}>
        {/* Main Navbar */}
        <Navbar.Section grow className={classes.links} component={ScrollArea}>
          <div className={classes.linksInner}>{links}</div>
        </Navbar.Section>
      </Navbar>
    </Navbar>
  )
}
