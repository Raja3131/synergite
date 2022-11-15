import {
  Avatar,
  Text,
  createStyles,
  Group,
  Loader,
  Button,
  Drawer,
} from '@mantine/core'
import { IconArrowBackUp, IconView360 } from '@tabler/icons'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useGetClientById from '../hooks/useGetClientById'
import Contacts from './contacts'

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
  const [opened, setOpened] = useState(false)
  const { clientId } = useParams()
  const { classes } = useStyles()

  const { data, isError, error, isLoading } = useGetClientById(String(clientId))

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
    <>
      <div className={classes.main}>
        <div>
          <Group position="apart">
            <Link to={`/client`} className={classes.userLink}>
              <Button
                className={classes.detailHead}
                rightIcon={<IconArrowBackUp />}
                onClick={() => {
                  setOpened(true)
                }}
                variant="subtle"
              >
                Back to Client List
              </Button>
            </Link>

            <Button
              leftIcon={<IconView360 />}
              onClick={() => {
                setOpened(true)
              }}
            >
              View Contacts
            </Button>
          </Group>
        </div>
        <div className={classes.personalDetailsMain}>
          <div className={classes.clientUserCard}>
            <Avatar size={40} radius={120} mx="auto" color="cyan">
              C
            </Avatar>
            <Text align="center" color="blue" size="xl" weight={700} mt="sm">
              {data?.data?.first_name} {data?.data?.last_name}
            </Text>
          </div>
          <div className={classes.personalDetailsInner}>
            <Text size="lg" color="blue" weight={600} mb="xs">
              Client Details
            </Text>

            <div className={classes.personalDetails}>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>Client Name :</b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  {data?.data?.first_name} {data?.data?.last_name}
                </Text>
              </Group>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>Email :</b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  {data?.data?.primary_email}
                </Text>
              </Group>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>Phone :</b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  {data?.data?.primary_phone}
                </Text>
              </Group>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>City :</b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  {data?.data?.city}
                </Text>
              </Group>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>State :</b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  {data?.data?.state}
                </Text>
              </Group>
              <Group spacing="sm">
                <Text size="lg" color="#686969" weight={400}>
                  <b>Country :</b>
                </Text>
                <Text size="lg" color="#686969" weight={400}>
                  {data?.data?.country}
                </Text>
              </Group>
            </div>
          </div>
        </div>
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          padding="md"
          size="600px"
          position="right"
        >
          <Contacts />
        </Drawer>
      </div>
    </>
  )
}
