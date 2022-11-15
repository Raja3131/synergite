interface SideModalProps {
  isOpen?: boolean
  children?: React.ReactNode
  onOverlayPressed?: () => any
}

const SideModal: React.FC<SideModalProps> = (props) => {
  const { isOpen, children, onOverlayPressed } = props

  let sideModalClassName = `fixed right-0 h-screen top-0 z-10 bg-white shadow-xl transform transition delay-100`
  if (isOpen) {
    sideModalClassName = `${sideModalClassName} translate-x-0`
  } else {
    sideModalClassName = `${sideModalClassName} translate-x-full`
  }

  return (
    <>
      {/* overlay */}
      {isOpen && (
        <div
          onClick={onOverlayPressed}
          className="bg-black/40 fixed top-0 bottom-0 left-0 right-0"
        ></div>
      )}
      <div className={sideModalClassName}>{children}</div>
    </>
  )
} // End of SideModal

export default SideModal
