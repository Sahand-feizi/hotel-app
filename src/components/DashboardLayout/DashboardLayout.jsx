import React from 'react'
import { Outlet } from 'react-router-dom'

function DashboardLayout() {
  return (
    <div className='dashboardContainer'>
      <Outlet />
    </div>
  )
}

export default DashboardLayout
