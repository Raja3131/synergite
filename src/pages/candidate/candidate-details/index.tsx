import { createStyles } from '@mantine/core'
import Personal from './personal'

const useStyles = createStyles((theme) => ({
  candidateDetails: {
    // display: 'flex',
    paddingLeft: '20px',
    paddingRight: '20px',
    // gap: '20px',
    width: '100%',
    // placeItems: 'center',
  },
  candidateProProfile: {
    width: '100%',
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.25)',
    borderRadius: '10px',
    padding: '20px',
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
    },
  },
}))

export const CandidateDetails = () => {
  const { classes } = useStyles()

  return (
    <>
      <div className={classes.candidateDetails}>
        <div className={classes.candidateProProfile}>
          <Personal />
        </div>
      </div>
    </>
  )
}

export default CandidateDetails
