import { createContext, useContext, useReducer, useState } from "react";
import useGetFetchHotelsData from "../../../hooks/useGetFetchHotelsData/useGetFetchHotelsData";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useSearchParams } from "react-router-dom";

const WalletContext = createContext()

const initialState = {
    hotels: [],
    isLoading: false,
    error: '',
    isAddToWalletLoading: false,
    selectedHotelData: []
}

function WalletReducer(state, {type, payload}){
    switch(type){
        case "isLoading": 
            return{
                ...state,
                isLoading: true
            }
        case "success":
            return{
                ...state,
                isLoading: false,
                hotels: payload,
                error: ''
            }
        case "rejected":
            return{
                ...state,
                isLoading: false,
                error: payload,
                hotels: false
            }
        case "changeSelectedHotelIsLoading":
            return{
                ...state,
                isAddToWalletLoading: true
            }
        case "changeSelectedHotel":
            return{
                isAddToWalletLoading: false,
                selectedHotelData: payload
            }
        case "changeSelectedHotelRejected":
            return{
                selectedHotelData: [],
                isAddToWalletLoading: false
            }
        default: throw new Error('somthing went rong')
    }
}

export function WalletProvider({ children }) {

    const [{
        isAddToWalletLoading,
        selectedHotelData,
        hotels,
        error
    }, dispatch] = useReducer(WalletReducer, initialState)
    
    const { id } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const room = JSON.parse(searchParams.get('options'))?.room;
    const destination = searchParams.get('destination')
    const { data , isLoading, fetchData } = useGetFetchHotelsData(
        (data) => dispatch({ type: 'success', payload: data }),
        (err) => dispatch({ type: 'rejected', payload: err }),
        'http://localhost:4000/wallet',
        `q=${destination || ''}&accommodates_gte=${room || 1}`)

    const selectedHotel = async (selectedId) => {
        try {
            const { data } = await axios.get(`http://localhost:4000/hotels/${selectedId}`)
            dispatch({type: "changeSelectedHotel", payload: data})
        } catch (error) {
            dispatch({type: "rejected"})
            toast.error(error?.message)
        }
    }

    async function addToWallet(walletHotel) {
        try {
            dispatch({type: 'loading'})
            await axios.post('http://localhost:4000/wallet', walletHotel)
        } catch (error) {
            toast.error(error?.message)
        } finally {
            dispatch({type: 'rejected'})
        }
    }

    async function removeHotel(id) {
        try {
            await axios.delete(`http://localhost:4000/wallet/${id}`)
        } catch (error) {
            toast.error(error?.message)
        } finally {
            fetchData('http://localhost:4000/wallet', '')
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