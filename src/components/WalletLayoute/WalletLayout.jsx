import React, { useEffect } from 'react'
import Slider from '../Slider/Slider'
import Hotels from '../Hotels/Hotels'
import { Outlet } from 'react-router-dom'
import Map from '../Map/Map'
import { useWallet } from '../context/WalletContext/WalletContext'

function WalletLayout() {
    const {
        hotels,
        isLoading,
        fetchData,
        selectedHotelData,
        removeHotel
    } = useWallet()

    useEffect(() => {
        fetchData('http://localhost:4000/wallet', '')
    }, [])

    return (
        <>
            <Slider />
            <Hotels
                hotels={hotels}
                isLoading={isLoading}
                selectedHotelData={selectedHotelData}
                removeHotelCb={(id) => removeHotel(id)}
            />
            <Outlet />
        </>
    )
}

export default WalletLayout
