import { Th } from '@/pages/employee/employee-list'
import { Table } from '@mantine/core'
import { useState } from 'react'
import NoteList from './notes/note-list'
import SideModal from './side-modal'

const OnboardingList = () => {
  const [isNoteOpen, setIsNoteOpen] = useState(false)
  const [isActivityOpen, setIsActivityOpen] = useState(false)
  const [onboardingList, setOnnboardingList] = useState([1, 2, 3, 4, 5])

  const closeAllSideModalHandler = () => {
    setIsNoteOpen(false)
    setIsActivityOpen(false)
  } // End of closeAllSideModalHandler

  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-8"> Onboarding List</h3>

      {/* Actions  */}
      <div className="mb-8 space-x-4">
        {/* Initiated */}
        <button className="border p-2 min-w-[96px]">Initiated</button>

        {/* In Progress */}
        <button className="border p-2 min-w-[96px]">In Progress</button>

        {/* Onboarded */}
        <button className="border p-2 min-w-[96px]">Onboarded</button>

        {/* All */}
        <button className="border p-2 min-w-[96px]">All</button>
      </div>

      {/* Onboarding List */}
      <div className="space-y-4">
        {onboardingList?.map((onboarding) => {
          return (
            <OnboardingTile
              key={onboarding}
              onAddNotePressed={() => {
                setIsNoteOpen(true)
                setIsActivityOpen(false)
              }}
              onActionPressed={() => {
                setIsActivityOpen(true)
                setIsNoteOpen(false)
              }}
            />
          )
        })}
      </div>

      <div>
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          // className={classes.childTable}
          // sx={{ width: '100%', maxWidth: '90%', marginLeft: 0, marginRight: 0 }}
        >
          <thead>
            <tr>
              <Th onSort={() => null}>Employee Id</Th>
              <Th onSort={() => null}>Name</Th>
              <Th onSort={() => null}>Percent</Th>
              <Th onSort={() => null}>Status</Th>
              <th>Add Note</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {onboardingList?.map((num) => {
              return (
                <tr key={num}>
                  <td>{num}</td>
                  <td>Onboarding {num}</td>
                  <td>65%</td>
                  <td>Completed</td>
                  <td>Add Note</td>
                  <td>Action</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>

      {/* Note Sidebar */}
      <SideModal
        isOpen={isNoteOpen}
        onOverlayPressed={closeAllSideModalHandler}
      >
        <div className="p-4 h-full overflow-y-auto">
          <h3 className="text-xl font-semibold mb-8"> Add Note</h3>
          <div className="space-y-32">
            <NoteList />
            <div className="border border-black rounded overflow-hidden">
              <input className="h-10 inline-block outline-none p-2" />
              <button className="border-l border-black p-2 h-10">Submit</button>
            </div>
          </div>
        </div>
      </SideModal>

      {/* Activity */}
      <SideModal
        isOpen={isActivityOpen}
        onOverlayPressed={closeAllSideModalHandler}
      >
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-8">Activities</h3>

          {/* Actions  */}
          <div className="mb-8 space-x-4">
            {/* Account */}
            <button className="border-2 p-2 min-w-[96px]">Account</button>

            {/* Contacts */}
            <button className="border-2 p-2 min-w-[96px]">Contacts</button>

            {/* Human Resource */}
            <button className="border-2 p-2 min-w-[96px]">
              Human Resource
            </button>

            {/* Immigration */}
            <button className="border-2 p-2 min-w-[96px]">Immigration</button>
          </div>
          <div>
            <div className="border-2 flex justify-between items-center p-2">
              <div className="flex space-x-24">
                <p>Task one</p>
                <p>20-oct-2022 18:45</p>
              </div>
              <button className="border-2 w-[80px] h-[32px]">
                <div className="w-1/2 h-full bg-black"></div>
              </button>
            </div>
          </div>
        </div>
      </SideModal>
    </div>
  )
} // End of OnboardingList

export default OnboardingList

interface OnboardingTileProps {
  onAddNotePressed?: () => any
  onActionPressed?: () => any
}

const OnboardingTile: React.FC<OnboardingTileProps> = (props) => {
  const { onAddNotePressed, onActionPressed } = props

  return (
    <div className="border-2 flex justify-between items-center p-2">
      <div className="flex justify-between w-1/2">
        <span>Onboarding one</span>
        <span>68%</span>
        <span>Status</span>
      </div>
      <div className="space-x-2">
        <button onClick={onAddNotePressed} className="border p-2 min-w-[96px]">
          Add Note
        </button>
        <button onClick={onActionPressed} className="border p-2 min-w-[96px]">
          Action
        </button>
      </div>
    </div>
  )
} // End of OnboardingTile
