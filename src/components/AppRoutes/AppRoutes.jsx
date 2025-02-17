import { Route, Routes } from "react-router-dom"
import DashboardLayout from "../DashboardLayout/DashboardLayout"
import HotelsLayoute from "../HotelsLayoute/HotelsLayoute"
import Map from "../Map/Map"
import SingleHotel from "../SingleHotel/SingleHotel"
import WalletLayout from "../WalletLayoute/WalletLayout"
import AddNewHotelLayout from "../AddNewHotelLayout/AddNewHotelLayout"
import AddNewHotel from "../addNewHotel/addNewHotel"
import Login from "../Login/Login"
import { useDispatch, useSelector } from "react-redux"
import { getFetchSelectedWallet } from "../../feature/wallet/walletSlice"
import { getFetchSelectedHotel } from "../../feature/hotels/hotelsSlice"

function AppRoutes() {

    const dispatch = useDispatch()
    const { loading, hotels, selectedHotelData: selectedHotelDataHotels } = useSelector(state => state.hotels)
    const { loading: walletLoading, hotels: WalletHotels, selectedHotelData: selectedHotelDataWallet } = useSelector(state => state.wallet)
    console.log(hotels);
    
    return (
        <Routes>
            <Route path='/' element={<DashboardLayout />}>
                <Route path='hotels' element={<HotelsLayoute />}>
                    <Route index element={<Map hotels={hotels} isLoading={loading}/>} />
                    <Route path=':id' element={<SingleHotel showMapHotels={{hotels: hotels, loading: loading}} hotel={selectedHotelDataHotels} cbSelectedHotel={(id) => dispatch(getFetchSelectedHotel(id))} />} />
                </Route>
                <Route path='wallet' element={<WalletLayout />}>
                    <Route index element={<Map hotels={WalletHotels} isLoading={walletLoading}/>} />
                    <Route path=':id' element={<SingleHotel showMapHotels={{hotels: WalletHotels, loading: walletLoading}} hotel={selectedHotelDataWallet} cbSelectedHotel={(id) => dispatch(getFetchSelectedWallet(id))}/>} />
                </Route>
                <Route path='addNewHotel' element={<AddNewHotelLayout />}>
                    <Route index element={<Map isLoading={loading} style='addNewHotelMap' hotels={hotels}/>} />
                    <Route path=":id" element={<AddNewHotel />} />
                </Route>
            </Route>
            <Route index element={<Login />}/>
        </Routes>
    )
}

export default AppRoutes
