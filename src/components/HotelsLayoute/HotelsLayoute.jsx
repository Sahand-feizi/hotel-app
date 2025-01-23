import React from 'react'
import Slider from '../Slider/Slider'
import Hotels from '../Hotels/Hotels'
import { Outlet } from 'react-router-dom'
import { useHotels } from '../context/HotelsContext/HotelsContext'

function HotelsLayoute() {
    const { selectedHotelData, hotels, isLoading } = useHotels()
    return (
        <>
            <Slider />
            <Hotels
                selectedHotelData={selectedHotelData}
                hotels={hotels}
                isLoading={isLoading}
            />
            <Outlet />
        </>
    )
}

export default HotelsLayoute
