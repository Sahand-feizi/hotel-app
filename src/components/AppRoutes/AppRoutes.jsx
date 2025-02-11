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
    const { selectedHotelData: selectedHotelDataHotels } = useSelector(state => state.hotels)
    const { selectedHotelData: selectedHotelDataWallet } = useSelector(state => state.wallet)
    
    return (
        <Routes>
            <Route path='/' element={<DashboardLayout />}>
                <Route path='hotels' element={<HotelsLayoute />}>
                    <Route index element={<Map />} />
                    <Route path=':id' element={<SingleHotel hotel={selectedHotelDataHotels} cbSelectedHotel={(id) => dispatch(getFetchSelectedHotel(id))} />} />
                </Route>
                <Route path='wallet' element={<WalletLayout />}>
                    <Route index element={<Map />} />
                    <Route path=':id' element={<SingleHotel hotel={selectedHotelDataWallet} cbSelectedHotel={(id) => dispatch(getFetchSelectedWallet(id))}/>} />
                </Route>
                <Route path='addNewHotel' element={<AddNewHotelLayout />}>
                    <Route index element={<Map className='addNewHotelMap'/>} />
                    <Route path=":id" element={<AddNewHotel />} />
                </Route>
            </Route>
            <Route path="/login" element={<Login />}/>
        </Routes>
    )
}

export default AppRoutes
