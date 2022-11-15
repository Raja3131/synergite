import { ListViewLayout } from '@/components/layout/list-view.layout'
import {
  Button,
  Checkbox,
  createStyles,
  Select,
  Table,
  Text,
  TextInput,
} from '@mantine/core'
import { Th } from '../employee/employee-list'
import React, { useState,ReactNode } from 'react'
import { IconPlus, IconSubmarine } from '@tabler/icons'
interface Props {
  children?: ReactNode
  date:any
  // any props that come into the component
}

const CreateTimeSheet = ({date}:Props) => {
  const [fields, setFields] = useState([{ value: null }])
  const [searchValue, onSearchChange] = useState('')
  const [checked, setChecked] = useState(true)
  function handleChange(i: any, event: any) {
    const values = [...fields]
    values[i].value = event.target.value
    setFields(values)
  }
  function handleAdd() {
    const values = [...fields]
    values.push({ value: null })  
    setFields(values)
  }
  const onCheckboxChange = (event: any) => {
    setChecked(event.currentTarget.checked)
  }
  const useStyles = createStyles((theme) => ({
    th: {
      paddingLeft: '20px !important',
    },
    td: {
      padding: '20px !important',
    },
    tr: {
      display: 'flex',
      flexDirection: 'row',
      gap: '130px',
      marginLeft: '72px',
    },
    tbody: {
      gap: '120px',
      display: 'flex',
      flexDirection: 'row',
      marginLeft: '60px',
    },
    buttonContainer: {
      position: 'absolute',
      top: '90%',
      right: '40%',
    },
    iconContainer: {
      position: 'absolute',
      top: '180px',
      right: '150px',
    },
  }))
  const { classes } = useStyles()
  return (
    <>
      <tr className={classes.tr}>
        <Th onSort={() => null}>Date</Th>
        <Th onSort={() => null}>Project</Th>
        <Th onSort={() => null}>Billable/Not</Th>
        <Th onSort={() => null}>Total Hrs</Th>
      </tr>

      <Table horizontalSpacing="md" verticalSpacing="xs">
        <thead className={classes.th}>
          <>
            {fields.map((field, idx) => {
              return (
                <>
                  <tbody className={classes.tbody} key={`${field}-${idx}`}>
                    <td>
                      <td>{date}</td>
                    </td>
                    <td>
                      <TextInput placeholder="Project" withAsterisk />
                    </td>

                    <td>
                      <Checkbox label="" />
                    </td>
                    <td>
                      {' '}
                      <Select
                        placeholder="Hrs"
                        searchable
                        onSearchChange={onSearchChange}
                        //   searchValue={searchValue}
                        nothingFound="No options"
                        data={['1', '2', '3', '4', '5', '6', '7', '8']}
                      />
                    </td>
                  </tbody>
                </>
              )
            })}
          </>
        </thead>
        
      </Table>
     
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          flexDirection: 'row',
        }}
      >
       
      </div>
      <Button className={classes.buttonContainer} variant="white">
        Submit
      </Button>
      <div>
          <IconPlus
            size={30}
            strokeWidth={4}
            color={'green'}
            onClick={() => handleAdd()}
            className={classes.iconContainer}
          />
        </div>
    </>
  )
}

export default CreateTimeSheet
