import theme from '@/theme/theme'
import { Group, Text, Checkbox, createStyles } from '@mantine/core'
import { IconGripVertical } from '@tabler/icons'

const AdjustableColumn = () => {
  const { classes } = adjustableColumnStyles()

  const columns = [
    { label: 'ID' },
    { label: 'Job Title' },
    { label: 'Priority' },
    { label: 'Tax Terms' },
    { label: 'Recruiter' },
  ]

  return (
    <div className={classes.container}>
      <Text style={{ color: theme.colors?.gray?.[9], fontSize: '24px' }}>
        Table View
      </Text>

      <Text>Column Settings:</Text>

      <div style={{ marginTop: '8px' }}>
        {columns.map((column) => (
          <Group key={column.label} mb={8}>
            <IconGripVertical className={classes.verticalGripIcon} />
            <Checkbox label={column.label} />
          </Group>
        ))}
      </div>
    </div>
  )
} // End of AdjustableColumn

export default AdjustableColumn

// Style for the Page
export const adjustableColumnStyles = createStyles((theme) => ({
  container: {
    padding: '0 !important',
  },
  text: {
    color: theme.colors.blue[9],
  },
  verticalGripIcon: {
    color: theme.colors.blue[8],
    '&:hover': {
      cursor: 'pointer',
    },
  },
}))
