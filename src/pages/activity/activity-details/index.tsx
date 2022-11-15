import { createStyles } from '@mantine/core'
import Personal from './personal'
import Tasks from './tasks'

const useStyles = createStyles((theme) => ({
  activityDetails: {
    paddingLeft: '20px',
    paddingRight: '20px',
    width: '100%',
  },
  activityProProfile: {
    width: '100%',
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.25)',
    borderRadius: '10px',
    padding: '20px',
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
    },
  },
  activityTask: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    flex: 1,
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
}))

export const ActivityDetails = () => {
  const { classes } = useStyles()

  return (
    <>
      <div className={classes.main}>
        {/* <Grid.Col span={4}> */}
        <div className={classes.activityDetails}>
          <div className={classes.activityProProfile}>
            <Personal />
          </div>
        </div>
        {/* </Grid.Col>
        <Grid.Col span={8}> */}
        <div className={classes.activityDetails}>
          <div className={classes.activityTask}>
            <div>
              <Tasks />
            </div>
          </div>
        </div>
        {/* </Grid.Col> */}
      </div>
    </>
  )
}

export default ActivityDetails
