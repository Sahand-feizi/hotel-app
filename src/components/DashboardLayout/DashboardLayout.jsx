import React from 'react'
import Slider from '../Slider/Slider'
import Hotels from '../Hotels/Hotels'
import { Outlet } from 'react-router-dom'

function DashboardLayout() {
  return (
    <div className='dashboardContainer'>
      <Slider />
      <Hotels />
      <Outlet />
    </div>
  )
}

export default DashboardLayout
