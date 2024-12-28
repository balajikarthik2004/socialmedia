import React, { useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BackgroundPic from '../assets/background.png';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import CircularProgress from '@mui/material/CircularProgress'

const Register = () => {
  const username = useRef()
  const email = useRef()
  const password = useRef()
  const { isFetching, dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const registerUser = async(userCredentials, dispatch) => {
    dispatch({ type: "REGISTER_START" })
    try {
      const res = await axios.post(`api/auth/register`, userCredentials)
      console.log(res.data)
      dispatch({ type: "REGISTER_SUCCESS" })
      navigate('/login')
      navigate(0)
    } catch (error) {
      console.log(error)
      dispatch({ type: "REGISTER_FAILURE" })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    registerUser({
      username : username.current.value,
      email : email.current.value,
      password : password.current.value
    }, dispatch)
  }

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-[#f5f5f5]'>
      <div className='grid grid-cols-12 h-[65%] w-[85%] sm:h-[80%] sm:w-[70%] bg-white shadow-equal rounded-xl'>
        <div className='col-span-12 sm:col-span-6 p-1'>
         
          <div className="w-full h-full bg-white md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-6 space-y-4 md:space-y-4 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                    Create an account
                  </h1>
                  <form className="space-y-4 md:space-y-4" onSubmit={handleSubmit}>
                      <div>
                          <label className="block mb-1.5 text-sm font-medium">Username</label>
                          <input 
                            type="text" 
                            className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" 
                            placeholder="Username" 
                            ref={username}
                            required />
                      </div>
                      <div>
                          <label className="block mb-1.5 text-sm font-medium">Email Address</label>
                          <input 
                            type="email" 
                            className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" 
                            placeholder="Email Address"
                            ref={email} 
                            required />
                      </div>
                      <div>
                          <label className="block mb-1.5 text-sm font-medium">Password</label>
                          <input 
                            type="password" 
                            placeholder="Password" 
                            className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" 
                            ref={password}
                            required />
                      </div>
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" required=""/>
                        </div>
                        <div className="ml-3 text-sm">
                          <label className="text-gray-500">I accept the <a className="font-medium text-blue-600 hover:underline" href="#">Terms and Conditions</a></label>
                        </div>
                      </div>
                      <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center">Create an account {isFetching && <CircularProgress />}</button>
                      <p className="text-sm font-light text-gray-500">
                          Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:underline">Login here</Link>
                      </p>
                  </form>
              </div>
          </div>

        </div>
        <div className='hidden sm:visible p-5 sm:flex justify-center col-span-6 rounded-r-xl bg-cover bg-center opacity-90' style={{ backgroundImage: `url(${BackgroundPic})` }}>
          <div className='flex flex-col gap-4 items-center mt-4'>
            <h2 className='text-3xl font-bold'>FriendsZone</h2>
            <p className='font-semibold'>Connect with friends, share updates, and join communities. Enjoy a safe, intuitive social experience with advanced privacy controls. Stay in touch and make new connections easily on FriendsZone!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register