import React from 'react'
import { Link } from 'react-router-dom'
import BackgroundPic from '../assets/groupOfFriends.png';

const Register = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-[#f5f5f5]'>
      <div className='grid grid-cols-12 h-[65%] w-[85%] sm:h-[80%] sm:w-[70%] bg-white shadow-equal rounded-xl'>
        <div className='col-span-12 sm:col-span-6 p-1'>
         
          <div class="w-full h-full bg-white md:mt-0 sm:max-w-md xl:p-0">
              <div class="p-6 space-y-4 md:space-y-4 sm:p-8">
                  <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                    Create an account
                  </h1>
                  <form class="space-y-4 md:space-y-4" action="">
                      <div>
                          <label for="username" class="block mb-1.5 text-sm font-medium">Username</label>
                          <input type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Username" required=""/>
                      </div>
                      <div>
                          <label for="email" class="block mb-1.5 text-sm font-medium">Email Address</label>
                          <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Email Address" required=""/>
                      </div>
                      <div>
                          <label for="password" class="block mb-1.5 text-sm font-medium">Password</label>
                          <input type="password" name="password" id="password" placeholder="Password" class="bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""/>
                      </div>
                      <div class="flex items-start">
                        <div class="flex items-center h-5">
                          <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required=""/>
                        </div>
                        <div class="ml-3 text-sm">
                          <label for="terms" class="text-gray-500">I accept the <a class="font-medium text-primary-600 hover:underline" href="#">Terms and Conditions</a></label>
                        </div>
                      </div>
                      <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center">Create an account</button>
                      <p class="text-sm font-light text-gray-500">
                          Already have an account? <Link to="/login" class="font-medium text-primary-600 hover:underline">Login here</Link>
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