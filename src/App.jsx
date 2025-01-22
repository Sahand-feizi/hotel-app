import { Toaster } from 'react-hot-toast'
import './App.css'
import DashboardLayout from './components/DashboardLayout/DashboardLayout'
import { Route, Routes } from 'react-router-dom'
import SingleHotel from './components/SingleHotel/SingleHotel'
import { HotelsProvider } from './components/context/HotelsContext/HotelsContext'
import Map from './components/Map/Map'
import { WalletProvider } from './components/context/WalletContext/WalletContext'
import HotelsLayoute from './components/HotelsLayoute/HotelsLayoute'
import WalletLayout from './components/WalletLayoute/WalletLayout'

function App() {

  return (
    <HotelsProvider>
      <WalletProvider>
        <div className='appContainer'>
          <Toaster />
          <Routes>
            <Route path='/' element={<DashboardLayout />}>
              <Route path='hotels' element={<HotelsLayoute />}>
                <Route index element={<Map />} />
                <Route path=':id' element={<SingleHotel />} />
              </Route>
              <Route path='wallet' element={<WalletLayout />}>
                <Route index element={<Map />} />
                <Route path=':id' element={<SingleHotel />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </WalletProvider>
    </HotelsProvider>
  )
}

export default App
