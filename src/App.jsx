import { Toaster } from 'react-hot-toast'
import './App.css'
import AppRoutes from './components/AppRoutes/AppRoutes'

function App() {

  return (
    <div className='appContainer'>
      <Toaster />
      <AppRoutes />
    </div>
  )
}

export default App
