import { createStyles } from '@mantine/core'
import { useLocation } from 'react-router-dom'
import Jobs from './jobs'
import Personal from './personal'

const useStyles = createStyles((theme) => ({
  clientDetails: {
    paddingLeft: '20px',
    paddingRight: '20px',
    width: '100%',
  },
  clientInner: {
    width: '100%',
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.25)',
    borderRadius: '10px',
    padding: '20px',
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
    },
  },
  clientJob: {
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

export const ClientDetails = () => {
  const { classes } = useStyles()

  return (
    <div className={classes.main}>
      <div className={classes.clientDetails}>
        <div className={classes.clientInner}>
          <Personal />
        </div>
      </div>
      <div className={classes.clientDetails}>
        <div className={classes.clientJob}>
          <Jobs />
        </div>
      </div>
    </div>
  )
}

export default ClientDetails
