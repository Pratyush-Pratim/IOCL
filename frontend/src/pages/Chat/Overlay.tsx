interface OverlayProps {
  isActive: boolean
  onClick: () => void
}

function Overlay({ isActive, onClick }: OverlayProps) {
  return (
    <div
      className={`overlay ${isActive ? 'active' : ''}`}
      id="overlay"
      onClick={onClick}
      aria-hidden={!isActive}
    />
  )
}

export default Overlay
