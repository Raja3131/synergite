import { Box, createStyles, Divider } from '@mantine/core'
import { IconChevronsRight } from '@tabler/icons'

const textDividerStyles = createStyles((theme) => ({
  dividerText: {
    color: theme.colors.blue[9],
  },
}))

interface TextDividerProps {
  label: string
}

const TextDivider: React.FC<TextDividerProps> = ({ label }) => {
  const { classes } = textDividerStyles()

  return (
    <Divider
      className={classes.dividerText}
      my="20px"
      label={
        <>
          <IconChevronsRight />
          <Box style={{ fontFamily: '-moz-initial' }} ml={5}>
            {label}
          </Box>
        </>
      }
    />
  )
} // End of TextDivider

export default TextDivider
