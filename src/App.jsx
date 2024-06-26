import { Route, Routes } from 'react-router-dom'
import './App.css'
import JobHomePage from './pages/JobHomePage'
import AuthPage from './pages/AuthPage'
import { Toaster } from 'sonner'
import DetailPage from './pages/DetailPage'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from './redux/slices/authSlice'
import { useEffect } from 'react'
import Protectedroute from './components/Protectedroute'
import UnProtectedroute from './components/Unprotectedroute'

function App() {
  const dispatch = useDispatch()
  const authState = useSelector((state) => state.auth)
  useEffect(() => {
    dispatch(loadUser())
  }, [])

  if (authState.status === "idle") {
    //statrting time only it is idle..that time loading...
    return <div className='text-white' >Loading...</div>

  }
  return (
    <>
      <Routes>
        <Route path="/" element={<UnProtectedroute element={<AuthPage />} />} />
        <Route path="/home" element={<Protectedroute element={<JobHomePage />} />} />
        <Route path="/job/:id" element={<DetailPage />} />
        <Route path="*" element={<div>Page Not Found</div>} />

      </Routes>

      <Toaster
        richColors
      ></Toaster>
      <div className="bg-slate-900 min-h-screen
      ">
      </div>
    </>
  )
}

export default App
