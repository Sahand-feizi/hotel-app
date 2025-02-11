import React, { useEffect } from 'react'
import Slider from '../Slider/Slider'
import Hotels from '../Hotels/Hotels'
import { Outlet, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getFetchHotels, removeFetchHotel } from '../../feature/hotels/hotelsSlice'

function HotelsLayoute() {
    const [searchParams, setSearchParams] = useSearchParams()
    const destination = searchParams.get('destination')
    const room = JSON.parse(searchParams.get('options'))?.room
    const state = useSelector(state => state.hotels)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFetchHotels({destination, room}))
    },[destination, room])
    
    return (
        <>
            <Slider />
            <Hotels
                selectedHotelData={state.selectedHotelData}
                hotels={state.hotels}
                isLoading={state.loading}
                removeHotelCb={(id) => dispatch(removeFetchHotel(id))}
            />
            <Outlet />
        </>
    )
}

export default HotelsLayoute
