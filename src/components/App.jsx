import {createContext, useState, useContext, useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar.jsx'

const ParamsContext = createContext()

export const useParams = () => useContext(ParamsContext)

// todo: refactor items out of navbar and collection
function App() {
    const [ items, setItems ] = useState(null )
    const [ searchBy, setSearchBy ] = useState("")
    const [ liked, setLiked ] = useState([1, 5, 7]) // store independent ids
    const [ cart, setCart ] = useState({}) // store independent ids and quantity

    // todo: figure out how to load items only on collection and favorites, but not on home
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => setItems(data))
    }, [])

    return (
    <>
        <NavBar setSearchBy={setSearchBy} liked={liked}/>
        <ParamsContext.Provider value={{ items, searchBy, setSearchBy, liked, setLiked}}>
            <Outlet/>
        </ParamsContext.Provider>
    </>
    )
}

export default App
