import { Outlet } from 'react-router-dom'
import MobileSidebar from '../components/navigation/MobileSidebar'

function ChannelLayout() {
  return (
    <div>
      <MobileSidebar />
      <Outlet />
    </div>
  )
}

export default ChannelLayout
