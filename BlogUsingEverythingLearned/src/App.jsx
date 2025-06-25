import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import './App.css'
import { login, logout } from './store/authSlice'
import {Header, Footer} from './components/index.js'
import { Outlet } from 'react-router-dom'



function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL);

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        }
        else { dispatch(logout()) }
      })
      .finally(setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen bg-slate-600'>
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </div>

  ) : null
}

export default App
