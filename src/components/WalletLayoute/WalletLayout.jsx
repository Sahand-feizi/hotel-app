import React, { useEffect } from 'react'
import Slider from '../Slider/Slider'
import Hotels from '../Hotels/Hotels'
import { Outlet, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getFetchWallet, removeFetchWallet } from '../../feature/wallet/walletSlice'

function WalletLayout() {
    const [searchParams, setSearchParams] = useSearchParams()
    const destination = searchParams.get('destination')
    const room = JSON.parse(searchParams.get('options'))?.room
    const state = useSelector(state => state.wallet)
    const dispatch = useDispatch()
    console.log(state);
    

    useEffect(() => {
        dispatch(getFetchWallet({destination, room}))
    }, [destination, room])

    return (
        <>
            <Slider />
            <Hotels
                selectedHotelData={state.selectedHotelData}
                hotels={state.hotels}
                isLoading={state.loading}
                removeHotelCb={(id) => dispatch(removeFetchWallet(id))}
            />
            <Outlet />
        </>
    )
}

export default WalletLayout
