import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import AdminMobileNav from './AdminMobileNav'
import './Layout.css'

export default function AdminLayout() {
  return (
    <div className="app-layout">
      <AdminSidebar />
      <div className="main-area">
        <Outlet />
      </div>
      <AdminMobileNav />
    </div>
  )
}
