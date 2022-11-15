import { Text, createStyles, Group, Loader } from '@mantine/core'
import { IconArrowBackUp, IconListDetails } from '@tabler/icons'
import { Link, useParams } from 'react-router-dom'
import useGetVendorById from '../hooks/useGetVendorById'

const useStyles = createStyles((theme) => ({
  ClientUserCard: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    border: `1px solid ${theme.colors.blue[0]}`,
    borderRadius: '5px',
  },
  UserCardInner: {
    paddingTop: '20px',
    paddingBottom: '20px',
  },
  vendorInnerProfile: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '15px',
  },
  personalDetails: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    gap: '5px',
    borderRadius: '5px',
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.20)',
    border: `1px solid ${theme.colors.blue[0]}`,
  },
  detailHead: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.20)',
    border: `1px solid ${theme.colors.blue[0]}`,
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
  const { vendorId } = useParams()
  const { classes } = useStyles()

  const { data, isError, error, isLoading } = useGetVendorById(String(vendorId))

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
    <div className={classes.vendorInnerProfile}>
      {/* back to Client table list */}
      <Group grow className={classes.detailHead}>
        <Text size="md" color="blue" weight={600}>
          Back to Vendor List
        </Text>
        <Link to={`/vendor`} className={classes.userLink}>
          <Text align="right">
            <IconArrowBackUp
              size={24}
              color="blue"
              className={classes.detailsIcon}
            />
          </Text>
        </Link>
      </Group>
      <div className={classes.ClientUserCard}>
        <div className={classes.UserCardInner}>
          {/* <Avatar
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            src={`https://gokv9osl.directus.app/assets/${data?.data.profile_image}/${data?.data.first_name}.png?access_token=Hh-BLV5ovXyGUcQR1SUdpBncldVLekqE`}
            size={120}
            radius={120}
            mx="auto"
          /> */}
          <Text align="center" color="blue" size="xl" weight={700} mt="md">
            {data?.data?.first_name} {data?.data?.last_name}
          </Text>
          <Text align="center" color="dimmed" size="sm">
            {data?.data?.primary_email}
          </Text>
        </div>
      </div>
      <Group grow className={classes.detailHead}>
        <Text size="md" color="blue" weight={600}>
          Vendor Details
        </Text>
        <Text align="right">
          <IconListDetails
            size={24}
            color="blue"
            className={classes.detailsIcon}
          />
        </Text>
      </Group>
      <div className={classes.personalDetails}>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400} transform="capitalize">
            <b>Name :</b>
          </Text>
          <Text size="sm" color="#686969" weight={400} transform="capitalize">
            {data?.data?.first_name} {data?.data?.last_name}
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400} transform="capitalize">
            <b>Email :</b>
          </Text>
          <Text size="sm" color="#686969" weight={400}>
            {data?.data?.primary_email}
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400} transform="capitalize">
            <b>Phone :</b>
          </Text>
          <Text size="sm" color="#686969" weight={400} transform="capitalize">
            {data?.data?.primary_phone}
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400} transform="capitalize">
            <b>City :</b>
          </Text>
          <Text size="sm" color="#686969" weight={400} transform="capitalize">
            {data?.data?.city}
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400} transform="capitalize">
            <b>State :</b>
          </Text>
          <Text size="sm" color="#686969" weight={400} transform="capitalize">
            {data?.data?.state}
          </Text>
        </Group>
        <Group spacing="xl">
          <Text size="sm" color="#686969" weight={400} transform="capitalize">
            <b>Country :</b>
          </Text>
          <Text size="sm" color="#686969" weight={400} transform="capitalize">
            {data?.data?.country}
          </Text>
        </Group>
      </div>
    </div>
  )
}
