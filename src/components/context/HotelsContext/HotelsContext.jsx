import { createContext, useContext, useReducer, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useGetFetchHotelsData from "../../../hooks/useGetFetchHotelsData/useGetFetchHotelsData";
import axios from "axios";
import toast from "react-hot-toast";

const HotelsContext = createContext()

const initialState = {
    hotels:[],
    isLoading: false,
    error: '',
    selectedHotelData: [],
    isLoadingSelectedHotel: false,
}

function HotelReducer(state, { type, payload }) {
    switch (type) {
        case "loading":
            return {
                ...state,
                isLoading: true
            }
        case "access":
            return{
                ...state,
                hotels: payload
            }
        case "rejected":
            return{
                ...state,
                hotels: [],
                error: payload
            }
        case "removeHotel":
            return{
                ...state,
                hotels: state.hotels.filter(hotel => hotel.id != payload)
            }
        case "loadingSelectedHotel":
            return{
                ...state,
                isLoadingSelectedHotel: true
            }
        case "changeSelectedHotel":
            return {
                selectedHotelData: payload,
                isLoadingSelectedHotel: false
            }
        case "rejectedSelectedHotel":
            return {
                selectedHotelData: [],
                isLoadingSelectedHotel: false
            }
        default: throw new Error('somthing went rong')
    }
}

export function HotelsProvider({ children }) {

    const [{ isLoadingSelectedHotel, selectedHotelData, hotels, error }, dispatch] = useReducer(HotelReducer, initialState)

    const [searchParams, setSearchParams] = useSearchParams()
    const room = JSON.parse(searchParams.get('options'))?.room;
    const destination = searchParams.get('destination')
    const { data , isLoading, fetchData } = useGetFetchHotelsData(
        (data) => dispatch({type: 'access', payload: data}),
        (err) => dispatch({type: 'rejected', payload: err}),
        'http://localhost:4000/hotels',
        searchParams ? `q=${destination || ''}&accommodates_gte=${room || 1}` : ''
    )

    async function selectedHotel(id) {
        try {
            dispatch({ type: 'loading' })
            const { data } = await axios.get(`http://localhost:4000/hotels/${id}`)
            dispatch({ type: "changeSelectedHotel", payload: data })
        } catch (error) {
            dispatch({ type: "rejected" })
            toast.error(error?.message)
        }
    }

    async function removeHotel(id) {
        try {
            dispatch({type: 'loading'})
            await axios.delete(`http://localhost:4000/hotels/${id}`)
            dispatch({type: 'removeHotel', payload: id})
        } catch (error) {
            toast.error(error?.message)
            dispatch({type: 'rejected', payload: error?.message})
        }
    }

    return (
        <HotelsContext.Provider value={{
            hotels,
            isLoading,
            selectedHotel,
            selectedHotelData,
            isLoadingSelectedHotel,
            removeHotel,
            fetchData
        }}>
            {children}
        </HotelsContext.Provider>
    )
}

export const useHotels = () => {
    return useContext(HotelsContext)
}