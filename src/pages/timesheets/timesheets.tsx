import { ListViewLayout } from '@/components/layout/list-view.layout'
import {
  Avatar,
  Button,
  Checkbox,
  Group,
  Select,
  Table,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core'
import { Th } from '../employee/employee-list'
import React, { useState } from 'react'
import { IconPlus, IconSubmarine } from '@tabler/icons'
import { SheetData } from './data'
import CreateTimeSheet from './createTimeSheet'
import { Badge } from '@mantine/core'


const Timesheet = () => {
  const [fields, setFields] = useState([{ value: null }])
  const [searchValue, onSearchChange] = useState('')
  const [checked, setChecked] = useState(true)
  const [createSheet, setCreateSheet] = useState<Boolean>(false)
  const [date,selectedDate] = useState<any>('')
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
  return (
    <>
      {createSheet && <CreateTimeSheet
      date={date}
      

       />}
      {!createSheet && (
        <>
          <ListViewLayout title="Timesheets" hideActionButton hideColumnButton>
            <Table horizontalSpacing="md" verticalSpacing="xs">
              <thead>
                <tr>
                  <Th onSort={() => null}>Name</Th>
                  <Th onSort={() => null}>Week</Th>
                  <Th onSort={() => null}>Project</Th>
                  <Th onSort={() => null}>Billable/Non-Billable</Th>
                  <Th onSort={() => null}>Total Hrs</Th>
                  <Th onSort={() => null}>Status</Th>
                </tr>
              </thead>
              <tbody>
                {SheetData.map((sheetValue) => {
                  return (
                    <>
                      <tr>
                        <td>{sheetValue.Name}</td>
                        <Tooltip
                          label="Click to view"
                          color="blue"
                          withArrow
                          transition="pop-top-right"
                          transitionDuration={300}
                        >
                          <Group spacing="sm">
                            <Text size="sm" weight={500}>
                              <div
                                style={{ cursor: 'pointer' }}
                                onClick={() => {

                                  setCreateSheet(!createSheet)
                                  SheetData.filter((dateData)=>{
                                    if (dateData.Week === sheetValue.Week){
                                      selectedDate(dateData.Week)
                                    }

                                  })
                                }}
                              >
                                <td>{sheetValue.Week}</td>
                              </div>
                            </Text>
                          </Group>
                        </Tooltip>
                        <td>{sheetValue.Project}</td>
                        <td>{sheetValue.Billable}</td>
                        <td>{sheetValue.TotalHrs}</td>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Badge>
                            <td>{sheetValue.Status}</td>
                          </Badge>
                        </div>
                      </tr>
                    </>
                  )
                })}
              </tbody>
            </Table>
          </ListViewLayout>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              flexDirection: 'row',
            }}
          ></div>
        </>
      )}
    </>
  )
}

export default Timesheet
