import NoteList from './note-list'
import SideModal from '../side-modal'

interface NoteSidebarProps {
  isOpen?: boolean
}

const NoteSidebar: React.FC<NoteSidebarProps> = ({ isOpen }) => {
  return (
    <SideModal isOpen={isOpen}>
      <div className="p-4 flex justify-between flex-col h-full">
        <h3 className="text-xl font-semibold mb-8"> Onboarding List</h3>

        <NoteList />
        <div className="border border-black rounded overflow-hidden">
          <input className="h-10 inline-block outline-none p-2" />
          <button className="border-l border-black p-2 h-10">Submit</button>
        </div>
      </div>
    </SideModal>
  )
} // End of NoteSidebar

export default NoteSidebar
