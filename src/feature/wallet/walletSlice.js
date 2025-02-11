import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = ' http://localhost:4000/wallet'

const initialState = {
    hotels: [],
    loading: false,
    error: '',
    loadingPost: false,
    errorPost: '',
    selectedHotelLoading: false,
    selectedHotelData: null,
    selectedHotelError: '',
}

export const getFetchWallet = createAsyncThunk('wallet/getFetchWallet', async (payload, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(
            `${BASE_URL}?q=${payload.destination || ''}&accommodates_gte=${payload.room || 1}`
        )
        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const addFetchWallet = createAsyncThunk('wallet/addFetchWallet', async (payload, { rejectWithValue }) => {
    try {
        await axios.post(BASE_URL, payload)
        return payload
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const removeFetchWallet = createAsyncThunk('wallet/removeFetchWallet', async (payload, { rejectWithValue }) => {
    try {
        await axios.delete(`${BASE_URL}/${payload}`)
        return payload
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const getFetchSelectedWallet = createAsyncThunk('wallet/getFetchSelectedWallet', async (payload, { rejectWithValue }) => {
    try {
        const {data} = await axios.get(`${BASE_URL}/${payload}`)
        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getFetchWallet.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                    hotels: [],
                    error: ''
                }
            })
            .addCase(getFetchWallet.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    hotels: action.payload,
                    error: ''
                }
            })
            .addCase(getFetchWallet.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    hotels: [],
                    error: action.payload
                }
            })
            .addCase(addFetchWallet.pending, (state, action) => {
                return {
                    ...state,
                    loadingPost: true,
                    errorPost: ''
                }
            })
            .addCase(addFetchWallet.fulfilled, (state, action) => {
                return {
                    ...state,
                    loadingPost: false,
                    errorPost: '',
                    hotels: [...state.hotels.push(action.payload)]
                }
            })
            .addCase(addFetchWallet.rejected, (state, action) => {
                return {
                    ...state,
                    loadingPost: false,
                    errorPost: action.payload
                }
            })
            .addCase(removeFetchWallet.fulfilled, (state, action) => {
                return {
                    ...state,
                    hotels: [...state.hotels.filter(hotel => hotel.id != action.payload)]
                }
            })
            .addCase(getFetchSelectedWallet.pending, (state, action) => {
                return {
                    ...state,
                    selectedHotelLoading: true,
                    selectedHotelData: null,
                    selectedHotelError: ''
                }
            })
            .addCase(getFetchSelectedWallet.fulfilled, (state, action) => {
                return {
                    ...state,
                    selectedHotelLoading: false,
                    selectedHotelData: action.payload,
                    selectedHotelError: ''
                }
            })
            .addCase(getFetchSelectedWallet.rejected, (state, action) => {
                return {
                    ...state,
                    selectedHotelLoading: false,
                    selectedHotelData: null,
                    selectedHotelError: action.payload
                }
            })
    }
})

export default walletSlice.reducer