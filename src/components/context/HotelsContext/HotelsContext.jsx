import { createContext, useContext, useReducer, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useGetFetchHotelsData from "../../../hooks/useGetFetchHotelsData/useGetFetchHotelsData";
import axios from "axios";
import toast from "react-hot-toast";

const HotelsContext = createContext()

const initialState = {
    selectedHotelData: [],
    isLoadingSelectedHotel: false
}

function HotelReducer(state, { type, payload }) {
    switch (type) {
        case "loading":
            return {
                ...state,
                isLoadingSelectedHotel: true
            }
        case "changeSelectedHotel":
            return {
                selectedHotelData: payload,
                isLoadingSelectedHotel: false
            }
        case "rejected":
            return {
                selectedHotelData: [],
                isLoadingSelectedHotel: false
            }
        default: throw new Error('somthing went rong')
    }
}

export function HotelsProvider({ children }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const room = JSON.parse(searchParams.get('options'))?.room;
    const destination = searchParams.get('destination')
    const { data: hotels, isLoading, fetchData } = useGetFetchHotelsData(
        'http://localhost:5000/hotels',
        searchParams ? `q=${destination || ''}&accommodates_gte=${room || 1}` : ''
    )

    const [{ isLoadingSelectedHotel, selectedHotelData }, dispatch] = useReducer(HotelReducer, initialState)

    async function selectedHotel(id) {
        try {
            dispatch({ type: 'loading' })
            const { data } = await axios.get(`http://localhost:5000/hotels/${id}`)
            dispatch({ type: "changeSelectedHotel", payload: data })
        } catch (error) {
            dispatch({ type: "rejected" })
            toast.error(error?.message)
        }
    }

    async function removeHotel(id) {
        try {
            await axios.delete(`http://localhost:5000/hotels/${id}`)
        } catch (error) {
            toast.error(error?.message)
        } finally {
            fetchData('http://localhost:5000/hotels', '')
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