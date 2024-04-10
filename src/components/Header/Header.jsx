import React from 'react'
import {useSelector , useDispatch} from "react-redux"
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../services/operations/authAPI';
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token} = useSelector(state=>state.auth);
  const {user} = useSelector(state=>state.profile);
  return (
    <div className='bg-slate-900 flex flex-row  justify-end items-center '>
        <div className='container p-2 mx-auto'>
            <nav className='py-5'>
                <div className='text-base text-white'>
                    URLShortner
                </div>

            </nav>

        </div>
        <div className=' flex flex-row space-x-7 mr-10'>
          {
            token == null &&(
              <Link to ="/login">
              <button
              className=' bg-white text-[15px] px-6 py-2 rounded-md
               font-semibold  text-black
               hover:scale-95 transition-all duration-200'>
                Login
              </button>
              </Link>
            )
          }
          {
            token == null &&(
              <Link to='/signup'>
              <button 
              className=' bg-white text-[15px] px-6 py-2 rounded-md
              font-semibold  text-black
              hover:scale-95 transition-all duration-200'>
                Signup
              </button>
              </Link>
            )
          }
          {
            token !==null &&(
              <button
              onClick={()=>{
                dispatch(logout(navigate))
              }}
              className=' bg-white text-[15px] px-6 py-2 rounded-md
              font-semibold  text-black
              hover:scale-95 transition-all duration-200'
              >
                Logout
              </button>
            )
          }
        </div>

    </div>
  )
}

export default Header