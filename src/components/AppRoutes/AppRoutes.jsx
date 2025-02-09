import { Route, Routes } from "react-router-dom"
import { useHotels } from "../context/HotelsContext/HotelsContext"
import DashboardLayout from "../DashboardLayout/DashboardLayout"
import HotelsLayoute from "../HotelsLayoute/HotelsLayoute"
import Map from "../Map/Map"
import SingleHotel from "../SingleHotel/SingleHotel"
import WalletLayout from "../WalletLayoute/WalletLayout"
import { useWallet } from "../context/WalletContext/WalletContext"
import AddNewHotelLayout from "../AddNewHotelLayout/AddNewHotelLayout"
import AddNewHotel from "../addNewHotel/addNewHotel"
import Login from "../Login/Login"

function AppRoutes() {
    const { selectedHotel } = useHotels()
    const {selectedHotel: selectedHotelWallet} = useWallet()

    return (
        <Routes>
            <Route path='/' element={<DashboardLayout />}>
                <Route path='hotels' element={<HotelsLayoute />}>
                    <Route index element={<Map />} />
                    <Route path=':id' element={<SingleHotel cbSelectedHotel={selectedHotel} />} />
                </Route>
                <Route path='wallet' element={<WalletLayout />}>
                    <Route index element={<Map />} />
                    <Route path=':id' element={<SingleHotel cbSelectedHotel={selectedHotelWallet}/>} />
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
