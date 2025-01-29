import { createContext, useContext, useReducer, useState } from "react";
import useGetFetchHotelsData from "../../../hooks/useGetFetchHotelsData/useGetFetchHotelsData";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useSearchParams } from "react-router-dom";

const WalletContext = createContext()

const initialState = {
    isAddToWalletLoading: false,
    selectedHotelData: []
}

function WalletReducer(state, {type, payload}){
    switch(type){
        case "loading":
            return{
                ...state,
                isAddToWalletLoading: true
            }
        case "changeSelectedHotel":
            return{
                isAddToWalletLoading: false,
                selectedHotelData: payload
            }
        case "rejected":
            return{
                selectedHotelData: [],
                isAddToWalletLoading: false
            }
        default: throw new Error('somthing went rong')
    }
}

export function WalletProvider({ children }) {
    const { id } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const room = JSON.parse(searchParams.get('options'))?.room;
    const destination = searchParams.get('destination')
    const { data: hotels, isLoading, fetchData } = useGetFetchHotelsData(
        'http://localhost:5000/wallet',
        `q=${destination || ''}&accommodates_gte=${room || 1}`)
    
    const [{isAddToWalletLoading, selectedHotelData}, dispatch] = useReducer(WalletReducer, initialState)

    const selectedHotel = async (selectedId) => {
        try {
            const { data } = await axios.get(`http://localhost:5000/hotels/${selectedId}`)
            dispatch({type: "changeSelectedHotel", payload: data})
        } catch (error) {
            dispatch({type: "rejected"})
            toast.error(error?.message)
        }
    }

    async function addToWallet(walletHotel) {
        try {
            dispatch({type: 'loading'})
            await axios.post('http://localhost:5000/wallet', walletHotel)
        } catch (error) {
            toast.error(error?.message)
        } finally {
            dispatch({type: 'rejected'})
        }
    }

    async function removeHotel(id) {
        try {
            await axios.delete(`http://localhost:5000/wallet/${id}`)
        } catch (error) {
            toast.error(error?.message)
        } finally {
            fetchData('http://localhost:5000/wallet', '')
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
            selectedHotelData,
            removeHotel
        }}>
            {children}
        </WalletContext.Provider>
    )
}

export const useWallet = () => {
    return useContext(WalletContext)
}