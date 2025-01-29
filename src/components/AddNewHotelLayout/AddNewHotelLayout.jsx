import React from 'react'
import Slider from '../Slider/Slider'
import { Outlet } from 'react-router-dom'

function AddNewHotelLayout() {
  return (
    <>
      <Slider />
      <Outlet />
    </>
  )
}

export default AddNewHotelLayout
