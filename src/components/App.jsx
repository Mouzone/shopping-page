import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar.jsx'

function App() {
  return (
    <>
        <NavBar/>
        <Outlet/>
    </>
  )
}

export default App
