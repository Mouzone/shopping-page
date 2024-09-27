import {createContext, useState, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar.jsx'

const SearchContext = createContext()

export const useSearch = () => useContext(SearchContext)

// todo: refactor items out of navbar and collection
function App() {
    const [ searchBy, setSearchBy ] = useState("")
    return (
    <>
        <NavBar setSearchBy={setSearchBy}/>
        <SearchContext.Provider value={{ searchBy, setSearchBy }}>
            <Outlet/>
        </SearchContext.Provider>
    </>
    )
}

export default App
