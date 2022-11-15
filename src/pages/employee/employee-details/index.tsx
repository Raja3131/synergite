import { createStyles } from '@mantine/core'
import Personal from './personal'

const useStyles = createStyles((theme) => ({
  employeeDetails: {
    // display: 'flex',
    paddingLeft: '20px',
    paddingRight: '20px',
    // gap: '20px',
    width: '100%',
    // placeItems: 'center',
  },
  employeeProProfile: {
    width: '100%',
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.25)',
    borderRadius: '10px',
    padding: '20px',
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
    },
  },
}))

export const EmployeeDetails = () => {
  const { classes } = useStyles()

  return (
    <>
      <div className={classes.employeeDetails}>
        <div className={classes.employeeProProfile}>
          <Personal />
        </div>
      </div>
    </>
  )
}

export default EmployeeDetails
