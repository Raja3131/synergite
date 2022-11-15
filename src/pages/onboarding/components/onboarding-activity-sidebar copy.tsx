import SideModal from './side-modal'

interface OnboardingActivitySidebar {
  isOpen?: boolean
}

const OnboardingActivitySidebar: React.FC<OnboardingActivitySidebar> = ({
  isOpen,
}) => {
  return (
    <SideModal isOpen={isOpen}>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-8">Activities</h3>

        {/* Actions  */}
        <div className="mb-8 space-x-4">
          {/* Account */}
          <button className="border-2 p-2 min-w-[96px]">Account</button>

          {/* Contacts */}
          <button className="border-2 p-2 min-w-[96px]">Contacts</button>

          {/* Human Resource */}
          <button className="border-2 p-2 min-w-[96px]">Human Resource</button>

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
  )
} // End of OnboardingActivitySidebar

export default OnboardingActivitySidebar
