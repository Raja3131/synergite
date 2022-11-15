import {
  Avatar,
  Text,
  createStyles,
  Group,
  Loader,
  Button,
} from '@mantine/core'
import { IconArrowAutofitDown, IconArrowBackUp } from '@tabler/icons'
import { Link, useParams } from 'react-router-dom'
import useGetJobById from '../../../hooks/useGetJobById'

const useStyles = createStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  clientUserCard: {
    border: `1px solid ${theme.colors.blue[1]}`,
    borderRadius: '5px',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '13px',
    paddingBottom: '13px',
  },
  personalDetails: {
    display: 'flex',
    padding: '10px',
    gap: '40px',
    borderRadius: '5px',
    border: `1px solid ${theme.colors.blue[1]}`,
  },
  personalDetailsInner: {
    borderRadius: '5px',
    border: `1px solid ${theme.colors.blue[1]}`,
    padding: '10px',
  },
  personalDetailsMain: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    gap: '10px',
    borderRadius: '5px',
    border: `1px solid ${theme.colors.blue[1]}`,
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
  const { jobId } = useParams()
  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientId = params.get('client_id')

  const { classes } = useStyles()

  const { data, isError, error, isLoading } = useGetJobById(String(jobId))

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
      {/* back to Client table list */}
      <div>
        <Group position="apart">
          <Link
            to={`/client-details/${String(clientId)}`}
            className={classes.userLink}
          >
            <Button
              className={classes.detailHead}
              rightIcon={<IconArrowBackUp />}
              variant="subtle"
            >
              Back to Client Details
            </Button>
          </Link>

          <IconArrowAutofitDown color="lightBlue" style={{}} />
        </Group>
      </div>
      <div className={classes.personalDetailsMain}>
        <div className={classes.clientUserCard}>
          <Avatar size={40} radius={120} mx="auto" color="cyan">
            J
          </Avatar>
          <Text align="center" color="blue" size="xl" weight={700} mt="sm">
            {data?.data?.title}
          </Text>
        </div>
        <div className={classes.personalDetailsInner}>
          <Text size="lg" color="blue" weight={600} mb="xs">
            Job Details
          </Text>
          <div className={classes.personalDetails}>
            <Group spacing="xs">
              <Text size="sm" color="#686969" weight={400}>
                <b>Job Title :</b>
              </Text>
              <Text size="sm" color="#686969" weight={400}>
                {data?.data?.title}
              </Text>
            </Group>
            <Group spacing="xs">
              <Text size="sm" color="#686969" weight={400}>
                <b>City :</b>
              </Text>
              <Text size="sm" color="#686969" weight={400}>
                {data?.data?.city}
              </Text>
            </Group>
            <Group spacing="xs">
              <Text size="sm" color="#686969" weight={400}>
                <b>State :</b>
              </Text>
              <Text size="sm" color="#686969" weight={400}>
                {data?.data?.state}
              </Text>
            </Group>
            <Group spacing="xs">
              <Text size="sm" color="#686969" weight={400}>
                <b>Country :</b>
              </Text>
              <Text size="sm" color="#686969" weight={400}>
                {data?.data?.country}
              </Text>
            </Group>
            <Group spacing="xs">
              <Text size="sm" color="#686969" weight={400}>
                <b>Primary Skills :</b>
              </Text>
              <Text size="sm" color="#686969" weight={400}>
                {data?.data?.primary_skills}
              </Text>
            </Group>
            <Group spacing="xs">
              <Text size="sm" color="#686969" weight={400}>
                <b>Secondary Skills :</b>
              </Text>
              <Text size="sm" color="#686969" weight={400}>
                {data?.data?.secondary_skills}
              </Text>
            </Group>
            <Group spacing="xs">
              <Text size="sm" color="#686969" weight={400}>
                <b>Visa Status :</b>
              </Text>
              <Text size="sm" color="#686969" weight={400}>
                {data?.data?.visa_status}
              </Text>
            </Group>
            <Group spacing="xs">
              <Text size="sm" color="#686969" weight={400}>
                <b>Start Date :</b>
              </Text>
              <Text size="sm" color="#686969" weight={400}>
                {data?.data?.start_date}
              </Text>
            </Group>
            <Group spacing="xs">
              <Text size="sm" color="#686969" weight={400}>
                <b>Pay Rate :</b>
              </Text>
              <Text size="sm" color="#686969" weight={400}>
                {data?.data?.pay_rate}
              </Text>
            </Group>
            <Group spacing="xs">
              <Text size="sm" color="#686969" weight={400}>
                <b>Status :</b>
              </Text>
              <Text size="sm" color="#686969" weight={400}>
                {data?.data?.job_status}
              </Text>
            </Group>
          </div>
        </div>
      </div>
    </div>
  )
}

