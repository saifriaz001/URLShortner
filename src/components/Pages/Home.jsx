import React from 'react'
import image from "../../assets/11.15_hero_mobile@2x.png"
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex flex-row -mt-12 mx-auto justify-between items-center h-[39.5rem]'>
      <div className='w-[700px] space-y-4   mx-auto flex flex-col items-start justify-center'>
        <p className='text-5xl font-bold'>
        Build stronger digital <span className=' text-orange-500'>connections</span> 
        </p>
        <p className='text-2xl text-gray-600 justify-center items-center'>
        Use our URL shortener, QR Codes, and Link-in-bio pages to engage your audience and connect them to the right information. Build, edit, and track everything inside the URL Shortner Platform.
        </p>
        <div className=''> 
        <Link to="/signup">
        <button  className='  border px-10 py-4 rounded-md  bg-slate-900 text-white'>
        Get Started for Free
        </button>
        </Link>
        </div>


      </div>
      <div className='relative flex mx-auto items-center justify-center'>
        <img src={image} width={600} height={600}/>

      </div>
      

    </div>
  )
}

export default Home