import { useNavigate } from 'react-router-dom'

interface SidebarProps {
  isOpen: boolean
}

function Sidebar({ isOpen }: SidebarProps) {
  const navigate = useNavigate()

  return (
    <div className={`sidebar ${isOpen ? 'active' : ''}`} id="sidebar">

      <div className="sidebar-top-card" />


      <div className="side-cards grid">
        <div
          className="side-box card"
          onClick={() => window.open('https://iocl.com/', '_blank')}
        >
          <i className="fa-solid fa-house" />
          <span>Home Page</span>
        </div>

        <div
          className="side-box card"
          onClick={() => window.open('/AnnuaReport_2004_05.pdf', '_blank')}
        >
          <i className="fa-solid fa-circle-info" />
          <span>About</span>
        </div>

        <div
          className="side-box card"
          onClick={() => window.open('/HSE-brochure.pdf', '_blank')}
        >
          <i className="fa-solid fa-helmet-safety" />
          <span>Safety Guidances</span>
        </div>

        <div
          className="side-box card"
          onClick={() => window.open('https://iocl.com/pages/ppump', '_blank')}
        >
          <i className="fa-solid fa-gas-pump" />
          <span>Pump Approval</span>
        </div>

        <div
          className="side-box card"
          onClick={() => window.open('https://iocl.com/pages/careers-overview', '_blank')}
        >
          <i className="fa-solid fa-briefcase" />
          <span>Careers</span>
        </div>

        <div
          className="side-box card"
          onClick={() => window.open('https://iocl.com/contact-us', '_blank')}
        >
          <i className="fa-solid fa-address-book" />
          <span>Contact Us</span>
        </div>
      </div>

      <div className="side-menu bottom">
        <div className="side-action" onClick={() => navigate('/')}>
          <i className="fa-regular fa-comments" />
          <span>New Chat</span>
        </div>

        <div className="side-action logout">
          <i className="fa-solid fa-right-from-bracket" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
