import React from 'react'
import Slider from '../Slider/Slider'
import Hotels from '../Hotels/Hotels'
import { Outlet } from 'react-router-dom'

function HotelsLayoute() {
    return (
        <>
            <Slider />
            <Hotels />
            <Outlet />
        </>
    )
}

export default HotelsLayoute
