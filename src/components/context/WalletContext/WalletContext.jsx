import { createContext, useContext, useState } from "react";
import useGetFetchHotelsData from "../../../hooks/useGetFetchHotelsData/useGetFetchHotelsData";
import axios from "axios";
import toast from "react-hot-toast";

const WalletContext = createContext()

export function WalletProvider({ children }) {
    const { data: hotels, isLoading } = useGetFetchHotelsData('http://localhost:5000/wallet', '')
    const [isAddToWalletLoading, setIsAddToWalletLoading] = useState(false)

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
        <WalletContext.Provider value={{ hotels, isLoading, isAddToWalletLoading, addToWallet }}>
            {children}
        </WalletContext.Provider>
    )
}

export const useWallet = () => {
    return useContext(WalletContext)
}