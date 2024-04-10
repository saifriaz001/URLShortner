import Header from './components/Header/Header'
import  Footer from './components/Footer/Footer'
import Container from './components/Container/Container'
import LoginForm from './components/Auth/LoginForm'
import SignupForm from './components/Auth/SignupForm'
import Home from './components/Pages/Home'
import { useState } from 'react'
import './App.css'
import { Route ,Routes } from 'react-router-dom'
import VerifyOtp from './components/Pages/VerifyOtp'
import DataTable from './components/DataTable/DataTable'
import OpenRoute from './components/Auth/OpenRoute'
import PrivateRoute from './components/Auth/PrivateRoute'


function App() {


  return (
    <>
      <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<OpenRoute><LoginForm/></OpenRoute>}/>
        <Route path="/signup" element={<OpenRoute><SignupForm/></OpenRoute>   }/>
        <Route path="/verify-email" element={<VerifyOtp/>}/>
        <Route path="/dashboard/my-profile" element={<PrivateRoute>
          <DataTable/>
          </PrivateRoute>} />
        <Route path="*" element={<Home/>} />
      </Routes>
     
      <Footer/>
      </div>
    </>
  )
}

export default App
