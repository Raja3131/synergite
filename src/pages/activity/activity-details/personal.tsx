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
import useGetDefaultActivityById from '../hooks/useGetDefaultActivityById'

const useStyles = createStyles((theme) => ({
  main: {
    display: 'flex',
    gap: '20px',
  },
  activityUserCard: {
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
  const { activityId } = useParams()
  const { classes } = useStyles()
  console.log('Personal', activityId)

  const { data, isError, error, isLoading } = useGetDefaultActivityById(
    String(activityId)
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
      {/* back to Activity table list */}
      <div>
        <Link to={`/activity`} className={classes.userLink}>
          <Button
            className={classes.detailHead}
            rightIcon={<IconArrowBackUp />}
            variant="subtle"
          >
            Back to Activity List
          </Button>
        </Link>
        <div className={classes.activityUserCard}>
          <div className={classes.UserCardInner}>
            <Avatar size={40} radius={120} mx="auto" color="cyan">
              A
            </Avatar>
            <Text align="center" color="blue" size="xl" weight={700} mt="sm">
              {data?.data?.immigration_status}
            </Text>
          </div>
        </div>
      </div>
      <div className={classes.personalDetails}>
        <div>
          <Text size="md" color="blue" weight={600} mb="xs">
            Activity Details
          </Text>
          {/* <Text align="right">
            <IconListDetails
              size={24}
              color="blue"
              className={classes.detailsIcon}
            />
          </Text> */}
          <div className={classes.personalDetails}>
            <Group spacing="sm">
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              >
                <b>Immigration Status :</b>
              </Text>
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              >
                {data?.data?.immigration_status}
              </Text>
            </Group>
            <Group spacing="sm">
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              >
                <b>Type of Employee :</b>
              </Text>
              <Text size="sm" color="#686969" weight={400}>
                {data?.data?.employee_type}
              </Text>
            </Group>
            <Group spacing="sm">
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              >
                <b>New Client :</b>
              </Text>
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              >
                {data?.data?.new_client}
              </Text>
            </Group>
            <Group spacing="sm">
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              >
                <b>New Subvendor :</b>
              </Text>
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              >
                {data?.data?.new_subvendor}
              </Text>
            </Group>
            <Group spacing="sm">
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              >
                <b>Default Activity :</b>
              </Text>
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              >
                {data?.data?.default_activity}
              </Text>
            </Group>
            <Group spacing="sm">
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              >
                <b>Department :</b>
              </Text>
              <Text
                size="sm"
                color="#686969"
                weight={400}
                transform="capitalize"
              >
                {data?.data?.department_uuid}
              </Text>
            </Group>
          </div>
        </div>
      </div>
    </div>
  )
}
