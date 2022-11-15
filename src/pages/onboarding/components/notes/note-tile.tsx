import { createStyles, Radio } from '@mantine/core'

const NoteTile = () => {
  const { classes } = useNoteStyle()

  return (
    <div className={classes.container}>
      <Radio value="false" />
      <label className={classes.labelContainer}>
        <span className={classes.title}>This is a Note</span>
        <span className={classes.subtitle}>10th sep 2022 16:30 I Account</span>
      </label>
    </div>
  )
} // End of NoteTile

export default NoteTile

const useNoteStyle = createStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: '12px',
    fontStyle: 'italic',
  },
})
