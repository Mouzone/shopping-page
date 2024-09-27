import {createContext, useState, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar.jsx'

const ParamsContext = createContext()

export const useParams = () => useContext(ParamsContext)

// todo: refactor items out of navbar and collection
function App() {
    const [ searchBy, setSearchBy ] = useState("")
    const [ liked, setLiked ] = useState([]) // store independent ids
    const [ cart, setCart ] = useState({}) // store independent ids and quantity

    const [ showFavorites, setShowFavorites ] = useState(false)
    return (
    <>
        <NavBar setSearchBy={setSearchBy} liked={liked} setShowFavorites={setShowFavorites}/>
        <ParamsContext.Provider value={{ searchBy, setSearchBy, liked, setLiked, showFavorites }}>
            <Outlet/>
        </ParamsContext.Provider>
    </>
    )
}

export default App
