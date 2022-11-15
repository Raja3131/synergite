import {
  Text,
  createStyles,
  Group,
  Loader,
  Avatar,
  Button,
} from '@mantine/core'
import { IconArrowBackUp } from '@tabler/icons'
import { Link, useParams } from 'react-router-dom'
import useGetDepartmentById from '../hooks/useGetDepartmentById'

const useStyles = createStyles((theme) => ({
  main: {
    display: 'flex',
    gap: '20px',
  },
  departmentUserCard: {
    display: 'flex',
    justifyContent: 'center',
    border: `1px solid ${theme.colors.blue[1]}`,
    borderRadius: '5px',
    paddingLeft: '20px',
    paddingRight: '20px',
    marginTop: '10px',
  },
  UserCardInner: {
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  personalDetails: {
    display: 'flex',
    padding: '10px',
    gap: '50px',
    borderRadius: '5px',
    border: `1px solid ${theme.colors.blue[1]}`,
  },

  leftDT: {
    // display: 'flex',
    // flexDirection: 'column',
    gap: '5px',
  },
  detailHead: {
    border: `1px solid ${theme.colors.blue[1]}`,
    padding: '10px',
    paddingLeft: '20px',
    paddingRight: '20px',
    borderRadius: '5px',
  },
  detailBottom: {
    marginBottom: '5px',
    borderBottom: `1px solid transparent`,

    '&:hover': {
      borderBottom: `1px solid blue`,
    },
  },
  detailsIcon: {
    '&:hover': {
      backgroundColor: theme.colors.blue[1],
      cursor: 'pointer',
      padding: '2px',
      borderRadius: '2px',
    },
  },
  userLink: {
    textDecoration: 'none',
    color: theme.colors.grey[9],
    '&:hover': {
      color: theme.colors.blue[9],
    },
  },
}))

export default function Personal() {
  const { departmentId } = useParams()
  const { classes } = useStyles()
  console.log('Personal', departmentId)

  const { data, isError, error, isLoading } = useGetDepartmentById(
    String(departmentId)
  )

  if (isError) {
    console.log(error)
    return <h1>An Error Occurred</h1>
  }

  if (isLoading) {
    return (
      <div>
        <Loader variant="dots" />
      </div>
    )
  }

  return (
    <div className={classes.main}>
      {/* back to Department table list */}
      {/*  */}
      <div>
        <Link to={`/department`} className={classes.userLink}>
          <Button
            className={classes.detailHead}
            rightIcon={<IconArrowBackUp />}
            variant="subtle"
          >
            Back to Department List
          </Button>
        </Link>
        <div className={classes.departmentUserCard}>
          <div className={classes.UserCardInner}>
            <Avatar size={40} radius={120} mx="auto" color="cyan">
              D
            </Avatar>
            <Text align="center" color="blue" size="xl" weight={700} mt="sm">
              {data?.data?.name}
            </Text>
          </div>
        </div>
      </div>
      {/*  */}
      <div className={classes.personalDetails}>
        <div>
          <Text size="md" color="blue" weight={600} mb="xs">
            Department Details
          </Text>
          {/* <Text align="right">
            <IconListDetails
              size={24}
              color="blue"
              className={classes.detailsIcon}
            />
          </Text> */}
          <div className={classes.personalDetails}>
            <Group spacing="xs">
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              >
                <b>Department Name :</b>
              </Text>
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              >
                {data?.data?.name}
              </Text>
            </Group>
            <Group spacing="xs">
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              ></Text>
              <Text size="sm" color="#686969" weight={400}></Text>
            </Group>
            <Group spacing="xs">
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              ></Text>
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              ></Text>
            </Group>
            <Group spacing="xs">
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              ></Text>
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              ></Text>
            </Group>
            <Group spacing="xs">
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              ></Text>
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              ></Text>
            </Group>
            <Group spacing="xs">
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              ></Text>
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              ></Text>
            </Group>
          </div>
        </div>
      </div>
    </div>
  )
}
