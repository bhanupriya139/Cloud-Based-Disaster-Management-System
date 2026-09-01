import { Outlet } from 'react-router-dom'
import NGOSidebar from './NGOSidebar'
import NGOMobileNav from './NGOMobileNav'
import './Layout.css'

export default function NGOLayout() {
  return (
    <div className="app-layout">
      <NGOSidebar />
      <div className="main-area">
        <Outlet />
      </div>
      <NGOMobileNav />
    </div>
  )
}
