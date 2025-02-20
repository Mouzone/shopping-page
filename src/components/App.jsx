import {createContext, useState, useContext, useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar.jsx'

const ParamsContext = createContext()

export const useParams = () => useContext(ParamsContext)

function App() {
    const [ items, setItems ] = useState(null )
    const [ searchBy, setSearchBy ] = useState("")
    const [ liked, setLiked ] = useState([1, 2, 3, 4, 5, 6, 7]) // store independent ids
    const [ cart, setCart ] = useState({1: 1, 2:3, 3: 4}) // store independent ids and quantity


    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => setItems(data))
    }, [])

    return (
        <div className="h-screen">
            <NavBar setSearchBy={setSearchBy} liked={liked} cart={cart}/>
            <ParamsContext.Provider value={{ items, searchBy, setSearchBy, liked, setLiked, cart, setCart}}>
                <Outlet/>
            </ParamsContext.Provider>
        </div>
    )
}

export default App
