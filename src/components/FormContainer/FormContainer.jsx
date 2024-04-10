import React, { useState } from 'react'
import axios from "axios";
import { serverUrl } from '../helpers/Constants';
import { useSelector } from 'react-redux';
import  {endpoints} from "../helpers/Constants"
import { apiConnector } from '../../services/apiConnector';
const FormContainer = (props) => {
  const {token} = useSelector(state=>state.auth);
  
 
  const {updateReloadState} = props;
  const [fullUrl , setFullUrl] = useState("");
 const handleSubmit = async(e)=>{
  e.preventDefault();
  try {
      const response = await axios.post(`${serverUrl}/createurl1`, 
      {fullUrl:fullUrl},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      },
      
      
    );

    //await apiConnector("POST",CREATEURL_API,{
      //Authorization: `Bearer ${token}`,
      
    //})
   // await axios.post(`${serverUrl}/createurl1` ,{
     // fullUrl:fullUrl
    //});
    setFullUrl("");
    updateReloadState();
   console.log(response)
  } catch (error) {
    console.log(error)
  }

 }

  return (
    <div className='container mx-auto p-2'>
      <div className="bg-banner my-8 rounded-xl bg-cover bg-center">
        <div className='w-full h-full rounded-xl p-20 backdrop-brightness-50'>
        <h2 className='text-white text-4xl text-center pb-4'>URL Shortner</h2>
        <p className='text-white text-center pb-2 text-xl font-extralight'>
          paste your untidy link to Shorten it 
        </p>
        <p className='text-white  text-center pb-4 text-sm font-thin'>
          free tool to shorten a URL or reduce link, Use our URl shortner to create a shortened & neat link making it easy to use 
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <div className='relative w-full'>
              <div className='absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none text-slate-800 '>
                urlShortner.link /</div>
                <input type="text" 
                placeholder='add your link'
                 required
                 value={fullUrl}
                 onChange={(e)=>setFullUrl(e.target.value)}
                className='block w-full ps-32 p-4 text-sm text-gray-900 border border-gray-300
                rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500'/>
                <button type="submit" className=" absolute top-0 end-0 p-2.5 text-sm font-medium
                h-full text-white  bg-blue-700 rounded-lg border border-blue-700 focus:ring-4 focus:outline-none
                focus:ring-blue-300 ">
                  Shorten URL

                </button>
            </div>
          </div>
        </form>
        </div>
      </div>
    </div>
  )
}

export default FormContainer;