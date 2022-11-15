import { createStyles } from '@mantine/core'
import Personal from './personal'

const useStyles = createStyles((theme) => ({
  departmentDetails: {
    paddingLeft: '20px',
    paddingRight: '20px',
    width: '100%',
  },
  departmentProProfile: {
    width: '100%',
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.25)',
    borderRadius: '10px',
    padding: '20px',
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
    },
  },
}))

export const DepartmentDetails = () => {
  const { classes } = useStyles()

  return (
    <div className={classes.departmentDetails}>
      <div className={classes.departmentProProfile}>
        <Personal />
      </div>
    </div>
  )
}

export default DepartmentDetails
