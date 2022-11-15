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
import useGetCandidateById from '../hooks/useGetCandidateById'

const useStyles = createStyles((theme) => ({
  main: {
    display: 'flex',
    gap: '20px',
  },
  mainInner: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  candidateUserCard: {
    display: 'flex',
    justifyContent: 'center',
    border: `1px solid ${theme.colors.blue[1]}`,
    borderRadius: '5px',
    paddingLeft: '20px',
    paddingRight: '20px',
    marginTop: '10px',
  },
  UserCardInner: {
    paddingTop: '20px',
    paddingBottom: '20px',
  },
  personalDetails: {
    display: 'flex',
    padding: '10px',
    gap: '50px',
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
  const { candidateId } = useParams()
  const { classes } = useStyles()

  const { data, isError, error, isLoading } = useGetCandidateById(
    String(candidateId)
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
      {/* back to Employ table list */}
      <div>
        <Link to={`/candidate`} className={classes.userLink}>
          <Button
            className={classes.detailHead}
            rightIcon={<IconArrowBackUp />}
            variant="subtle"
          >
            Back to Candidate List
          </Button>
        </Link>
        <div className={classes.candidateUserCard}>
          <div className={classes.UserCardInner}>
            <Avatar size={40} radius={120} mx="auto" color="cyan">
              C
            </Avatar>
            <Text align="center" color="blue" size="xl" weight={700} mt="sm">
              {data?.data?.fname} {data?.data?.lname}
            </Text>
          </div>
        </div>
      </div>
      <div className={classes.mainInner}>
        <div className={classes.personalDetails}>
          <div>
            <Text size="md" color="blue" weight={600} mb="xs">
              Personal Information
            </Text>
            <div className={classes.personalDetails}>
              <Group spacing="xs">
                <Text
                  size="sm"
                  color="#686969"
                  weight={400}
                  transform="capitalize"
                >
                  <b>Employee Id :</b>
                </Text>
              </Group>
              <Group spacing="xs">
                <Text
                  size="sm"
                  color="#686969"
                  weight={400}
                  transform="capitalize"
                >
                  <b>Name :</b>
                </Text>
                <Text
                  size="sm"
                  color="#686969"
                  weight={400}
                  transform="capitalize"
                >
                  {data?.data?.fname} {data?.data?.lname}
                </Text>
              </Group>
              <Group spacing="xs">
                <Text
                  size="sm"
                  color="#686969"
                  weight={400}
                  transform="capitalize"
                >
                  <b>Email :</b>
                </Text>
                <Text
                  size="sm"
                  color="#686969"
                  weight={400}
                  transform="capitalize"
                >
                  {data?.data?.email}
                </Text>
              </Group>
              <Group spacing="xs">
                <Text
                  size="sm"
                  color="#686969"
                  weight={400}
                  transform="capitalize"
                >
                  <b>Phone :</b>
                </Text>
                <Text
                  size="sm"
                  color="#686969"
                  weight={400}
                  transform="capitalize"
                >
                  {data?.data?.phone}
                </Text>
              </Group>
              <Group spacing="xs">
                <Text
                  size="sm"
                  color="#686969"
                  weight={400}
                  transform="capitalize"
                >
                  <b>Ssn :</b>
                </Text>
                <Text
                  size="sm"
                  color="#686969"
                  weight={400}
                  transform="capitalize"
                >
                  {data?.data?.ssn_no}
                </Text>
              </Group>
              <Group spacing="xs">
                <Text
                  size="sm"
                  color="#686969"
                  weight={400}
                  transform="capitalize"
                >
                  <b>Date of Birth :</b>
                </Text>
                <Text
                  size="sm"
                  color="#686969"
                  weight={400}
                  transform="capitalize"
                >
                  {data?.data?.dob}
                </Text>
              </Group>
              <Group spacing="xs">
                <Text
                  size="sm"
                  color="#686969"
                  weight={400}
                  transform="capitalize"
                >
                  <b>Gender :</b>
                </Text>
                <Text
                  size="sm"
                  color="#686969"
                  weight={400}
                  transform="capitalize"
                >
                  {data?.data?.gender}
                </Text>
              </Group>
            </div>
          </div>
        </div>
        <div className={classes.personalDetails}>
          <div>
            <Text size="md" color="blue" weight={600} mb="xs">
              Address Information
            </Text>
            <div className={classes.personalDetails}>
              <Group spacing="xs">
                <Text
                  size="sm"
                  color="#686969"
                  weight={400}
                  transform="capitalize"
                >
                  <b>Address Line 1 :</b>
                </Text>
                <Text
                  size="sm"
                  color="#686969"
                  weight={400}
                  transform="capitalize"
                >
                  {data?.data?.address1}
                </Text>
              </Group>
              <Group spacing="xs">
                <Text
                  size="sm"
                  color="#686969"
                  weight={400}
                  transform="capitalize"
                >
                  <b>Address line 2 :</b>
                </Text>
                <Text
                  size="sm"
                  color="#686969"
                  weight={400}
                  transform="capitalize"
                >
                  {data?.data?.address2}
                </Text>
              </Group>
              <Group spacing="xs">
                <Text
                  size="sm"
                  color="#686969"
                  weight={400}
                  transform="capitalize"
                >
                  <b>City :</b>
                </Text>
                <Text
                  size="sm"
                  color="#686969"
                  weight={400}
                  transform="capitalize"
                >
                  {data?.data?.city}
                </Text>
              </Group>
              <Group spacing="xs">
                <Text
                  size="sm"
                  color="#686969"
                  weight={400}
                  transform="capitalize"
                >
                  <b>State :</b>
                </Text>
                <Text
                  size="sm"
                  color="#686969"
                  weight={400}
                  transform="capitalize"
                >
                  {data?.data?.state}
                </Text>
              </Group>
              <Group spacing="xs">
                <Text
                  size="sm"
                  color="#686969"
                  weight={400}
                  transform="capitalize"
                >
                  <b>County :</b>
                </Text>
                <Text
                  size="sm"
                  color="#686969"
                  weight={400}
                  transform="capitalize"
                >
                  {data?.data?.county}
                </Text>
              </Group>
              <Group spacing="xs">
                <Text
                  size="sm"
                  color="#686969"
                  weight={400}
                  transform="capitalize"
                >
                  <b>Country :</b>
                </Text>
                <Text
                  size="sm"
                  color="#686969"
                  weight={400}
                  transform="capitalize"
                >
                  {data?.data?.country}
                </Text>
              </Group>
              <Group spacing="xs">
                <Text
                  size="sm"
                  color="#686969"
                  weight={400}
                  transform="capitalize"
                >
                  <b>Zip Code :</b>
                </Text>
                <Text
                  size="sm"
                  color="#686969"
                  weight={400}
                  transform="capitalize"
                >
                  {data?.data?.zip}
                </Text>
              </Group>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
