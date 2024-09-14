import React from 'react'
import Header from './src/components/Header/Header'
import Footer from './src/components/Footer/Footer'
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout

// Wherever we use 'Outlet' the contents to be displayed change there
// Here the Header and Footer will remain the same