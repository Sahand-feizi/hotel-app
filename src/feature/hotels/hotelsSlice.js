import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { redirect } from "react-router-dom";

const BASE_URL = 'http://localhost:4000/hotels'

export const getFetchHotels = createAsyncThunk('hotels/getFetchHotels', async (payload, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(
            `${BASE_URL}?q=${payload.destination || ''}&accommodates_gte=${payload.room || 1}`
        )
        console.log(data);
        
        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const removeFetchHotel = createAsyncThunk('hotels/removeFetchHotel', async (payload, { rejectWithValue }) => {
    try {
        await axios.delete(`${BASE_URL}/${payload}`)
        return payload
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const addFetchHotel = createAsyncThunk('hotels/addFetchHotel', async (payload, { rejectWithValue }) => {
    try {
        await axios.post(BASE_URL, payload)
        return payload
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const getFetchSelectedHotel = createAsyncThunk('hotels/getFetchSelectedHotel', async (payload, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/${payload}`)
        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const initialState = {
    hotels: [],
    loading: false,
    error: '',
    loadingPost: false,
    errorPost: '',
    loadingSelectedHotel: false,
    selectedHotelData: null,
    selectedHotelError: ''
}

const hotelsSlice = createSlice({
    name: 'hotels',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getFetchHotels.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                    hotels: [],
                    error: ''
                }
            })
            .addCase(getFetchHotels.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    hotels: action.payload,
                    error: ''
                }
            })
            .addCase(getFetchHotels.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    hotels: [],
                    error: action.payload
                }
            })
            .addCase(addFetchHotel.pending, (state, action) => {
                return {
                    ...state,
                    loadingPost: true,
                    errorPost: ''
                }
            })
            .addCase(addFetchHotel.fulfilled, (state, action) => {
                return {
                    ...state,
                    hotels: [...state.hotels.push(action.payload)],
                    loadingPost: false,
                    errorPost: ''
                }
            })
            .addCase(addFetchHotel.rejected, (state, action) => {
                return {
                    ...state,
                    loadingPost: false,
                    errorPost: action.payload
                }
            })
            .addCase(removeFetchHotel.fulfilled, (state, action) => {
                return {
                    ...state,
                    hotels: state.hotels.filter(hotel => hotel.id != action.payload)
                }
            })
            .addCase(getFetchSelectedHotel.pending, (state, action) => {
                return {
                    ...state,
                    loadingSelectedHotel: true,
                    selectedHotelData: null,
                    selectedHotelError: ''
                }
            })
            .addCase(getFetchSelectedHotel.fulfilled, (state, action) => {
                return {
                    ...state,
                    loadingSelectedHotel: false,
                    selectedHotelData: action.payload,
                    selectedHotelError: ''
                }
            })
            .addCase(getFetchSelectedHotel.rejected, (state, action) => {
                return {
                    ...state,
                    loadingSelectedHotel: false,
                    selectedHotelData: null,
                    selectedHotelError: action.payload
                }
            })
    }
})

export default hotelsSlice.reducer