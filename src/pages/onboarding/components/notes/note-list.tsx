import { createStyles } from '@mantine/core'
import NoteTile from './note-tile'

const NoteList = () => {
  const { classes } = useNoteListStyle()
  return (
    <div className={classes.container}>
      <NoteTile />
      <NoteTile />
      <NoteTile />
      <NoteTile />
      <NoteTile />
    </div>
  )
} // End of NoteList

export default NoteList

const useNoteListStyle = createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
})
