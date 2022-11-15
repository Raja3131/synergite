import { createStyles, Grid } from '@mantine/core'
import Contacts from './contacts'
import Personal from './personal'

const useStyles = createStyles(() => ({
  vendorDetails: {
    // display: 'flex',
    paddingLeft: '20px',
    paddingRight: '20px',
    // gap: '20px',
    width: '100%',
    // placeItems: 'center',
  },
  vendorProProfile: {
    // display: 'flex',
    // height: '88.5vh',
    width: '100%',
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
    borderRadius: '10px',
    padding: '20px',
  },
  vendorContactJobs: {
    height: '88.5vh',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    flex: 1,
  },
  contacts: {
    height: '40vh',
  },
}))

export const VendorDetails = () => {
  const { classes } = useStyles()

  return (
    <>
      <Grid>
        <Grid.Col span={4}>
          <div className={classes.vendorDetails}>
            <div className={classes.vendorProProfile}>
              <Personal />
            </div>
          </div>
        </Grid.Col>
        <Grid.Col span={8}>
          <div className={classes.vendorDetails}>
            <div className={classes.vendorContactJobs}>
              <div>
                <Contacts />
              </div>
            </div>
          </div>
        </Grid.Col>
      </Grid>
    </>
  )
}

export default VendorDetails
