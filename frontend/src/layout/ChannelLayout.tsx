import { Outlet } from 'react-router-dom'
import ServerSidebar from '../components/navigation/ServerSidebar'

function ChannelLayout() {
  return (
    <div>
      <ServerSidebar />
      <Outlet />
    </div>
  )
}

export default ChannelLayout
