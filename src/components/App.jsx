import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar.jsx'

// todo: refactor items out of navbar and collection
function App() {
  return (
    <>
        <NavBar/>
        <Outlet/>
    </>
  )
}

export default App
