import { createStyles } from '@mantine/core'
import { useSearchParams } from 'react-router-dom'
import Personal from './personal'
import Submission from './submission'

const useStyles = createStyles((theme) => ({
  submissionDetails: {
    paddingLeft: '20px',
    paddingRight: '20px',
    width: '100%',
  },
  submissionInner: {
    width: '100%',
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.25)',
    borderRadius: '10px',
    padding: '20px',
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
    },
  },
  submission: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    flex: 1,
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
}))

export const SubmissionMain = () => {
  const [searchParams] = useSearchParams()
  // console.log('searchParams', searchParams.get('client_id'))
  // const params = useParams()
  // console.log('NewClient', params)

  const { classes } = useStyles()

  return (
    <div className={classes.main}>
      <div className={classes.submissionDetails}>
        <div className={classes.submissionInner}>
          <Personal />
        </div>
      </div>
      <div className={classes.submissionDetails}>
        <div className={classes.submission}>
          <Submission
            client_id={searchParams.get('client_id') || ''}
            job_id={searchParams.get('job_id') || ''}
          />
        </div>
      </div>
    </div>
  )
}

export default SubmissionMain
