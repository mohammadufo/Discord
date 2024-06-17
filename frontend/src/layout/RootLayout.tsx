import { Outlet } from 'react-router-dom'
import Sidebar from '../components/navigation/Sidebar'

const RootLayout = () => {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default RootLayout
