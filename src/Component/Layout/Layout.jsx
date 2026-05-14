import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function Layout() {
  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
        <Navbar/>

        <div className="container mt-25">
            <Outlet/>
        </div>

        <Footer/>
      
    </div>
  )
}
