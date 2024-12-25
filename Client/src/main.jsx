import React from 'react'
import ReactDOM from 'react-dom/client'
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import UserProfile from './pages/UserProfile.jsx'
import Friends from './pages/Friends.jsx'
import Liked from './pages/Liked.jsx'
import Saved from './pages/Saved.jsx'

const valid = true
const ProtectedRoute = ({children}) => {
  if(!valid) return <Navigate to="/login" />
  return children
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<ProtectedRoute><App /></ProtectedRoute>}>
        <Route path='' element={<Home />} />
        <Route path='userProfile/:userId' element={<UserProfile />} />
        <Route path='friends' element={<Friends />} />
        <Route path='liked' element={<Liked />} />
        <Route path='saved' element={<Saved />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
