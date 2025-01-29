import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useGetFetchHotelsData from "../../../hooks/useGetFetchHotelsData/useGetFetchHotelsData";
import axios from "axios";
import toast from "react-hot-toast";

const HotelsContext = createContext()

export function HotelsProvider({ children }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const room = JSON.parse(searchParams.get('options'))?.room;
    const destination = searchParams.get('destination')
    const { data: hotels, isLoading, fetchData } = useGetFetchHotelsData(
        'http://localhost:5000/hotels',
        searchParams ? `q=${destination || ''}&accommodates_gte=${room || 1}` : ''
    )

    const [selectedHotelData, setSelectedHotelData] = useState([])
    const [isLoadingSelectedHotel, setIsLoadingSelectedHotel] = useState(false)

    async function selectedHotel(id) {
        try {
            setIsLoadingSelectedHotel(true)
            const { data } = await axios.get(`http://localhost:5000/hotels/${id}`)
            setSelectedHotelData(data)
        } catch (error) {
            setSelectedHotelData([])
            toast.error(error?.message)
        } finally {
            setIsLoadingSelectedHotel(false)
        }
    }

    async function removeHotel(id) {
        try {
            await axios.delete(`http://localhost:5000/hotels/${id}`)
        } catch (error) {
            toast.error(error?.message)
        }finally{
            fetchData('http://localhost:5000/hotels','')
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