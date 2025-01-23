import { createContext, useContext, useState } from "react";
import useGetFetchHotelsData from "../../../hooks/useGetFetchHotelsData/useGetFetchHotelsData";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useSearchParams } from "react-router-dom";

const WalletContext = createContext()

export function WalletProvider({ children }) {
    const { id } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const room = JSON.parse(searchParams.get('options'))?.room;
    const destination = searchParams.get('destination')
    const { data: hotels, isLoading, fetchData } = useGetFetchHotelsData(
        'http://localhost:5000/wallet', 
        `q=${destination || ''}&accommodates_gte=${room || 1}`)
    const [isAddToWalletLoading, setIsAddToWalletLoading] = useState(false)
    const [selectedHotelData, setSelectedHotelData] = useState([])

    const selectedHotel = async (selectedId) => {
        try {
            const { data } = await axios.get(`http://localhost:5000/hotels/${selectedId}`)
            setSelectedHotelData(data)
        } catch (error) {
            setSelectedHotelData([])
            toast.error(error?.message)
        }
    }

    async function addToWallet(walletHotel) {
        try {
            setIsAddToWalletLoading(true)
            await axios.post('http://localhost:5000/wallet', walletHotel)
        } catch (error) {
            toast.error(error?.message)
        } finally {
            setIsAddToWalletLoading(false)
        }
    }

    return (
        <WalletContext.Provider value={{
            hotels,
            isLoading,
            isAddToWalletLoading,
            addToWallet,
            fetchData,
            selectedHotel,
            selectedHotelData
        }}>
            {children}
        </WalletContext.Provider>
    )
}

export const useWallet = () => {
    return useContext(WalletContext)
}