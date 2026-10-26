import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Outlet } from 'react-router-dom'
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    let active = true

    authService
      .getCurrentUser()
      .then((userData) => {
        if (!active) return

        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .catch(() => {
        if (!active) return
        dispatch(logout())
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [dispatch])

  if (loading) return null

  return (
    <div className='min-h-screen w-full block'>
      <div className='w-full block'>
        <Header />
        <main className='min-h-screen w-full block'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
