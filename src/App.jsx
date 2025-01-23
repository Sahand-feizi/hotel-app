import { Toaster } from 'react-hot-toast'
import './App.css'
import DashboardLayout from './components/DashboardLayout/DashboardLayout'
import { Route, Routes } from 'react-router-dom'
import SingleHotel from './components/SingleHotel/SingleHotel'
import { HotelsProvider, useHotels } from './components/context/HotelsContext/HotelsContext'
import Map from './components/Map/Map'
import { WalletProvider } from './components/context/WalletContext/WalletContext'
import HotelsLayoute from './components/HotelsLayoute/HotelsLayoute'
import WalletLayout from './components/WalletLayoute/WalletLayout'
import AppRoutes from './components/AppRoutes/AppRoutes'

function App() {

  return (
    <HotelsProvider>
      <WalletProvider>
        <div className='appContainer'>
          <Toaster />
          <AppRoutes />
        </div>
      </WalletProvider>
    </HotelsProvider>
  )
}

export default App
