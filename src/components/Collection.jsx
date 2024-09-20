import { useState, useEffect } from "react";
import {Form} from "react-router-dom";

export default function Collection() {
    const [ items, setItems ] = useState([])
    const [ filterBy, setFilterBy ] = useState({
        category: "",
        min_price: 0,
        max_price: Infinity,
    })
    const [ sortIsActive, setSortIsActive ] = useState(false)

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => setItems(data))
    }, [])

    // todo: sort and search bar
    let filtered_items = filterBy.category === "" ? items : items.filter(item => item.category === filterBy.category)
    filtered_items = filtered_items.filter(item =>
        parseFloat(item.price) >= filterBy.min_price && parseFloat(item.price) <= filterBy.max_price)

    return (
        <div className="flex flex-col pl-32">
            <div className="flex">
                <h1 className="pt-10 text-5xl pl-5 font-light text-gray-500"> {filtered_items.length} Items Found </h1>
                <Sort isActive={sortIsActive} setIsActive={setSortIsActive}/>
            </div>
            <div className="flex gap-2">
                <Filter
                    setFilter={setFilterBy}
                    filterBy={filterBy}
                />
                <Grid
                    items={filtered_items}
                />
            </div>
        </div>
    )
}

// todo: add sort funcitonality
function Sort({ isActive, setIsActive }) {
    return (
        <div className="flex flex-col font-light self-end ml-auto mr-40 items-center">
            <h3 className="flex items-center gap-1">
                Sort By
                <button
                    className="w-4"
                    onClick={() => setIsActive(!isActive)}
                >
                    {isActive
                        ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>chevron-up</title>
                                <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>chevron-down</title>
                                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                            </svg>
                        )
                    }
                </button>
            </h3>
            { isActive && (
                <div className="flex flex-col absolute mt-7 bg-white rounded border border-black pb-2">
                    <button className="hover:underline p-2"> A - Z</button>
                    <button className="hover:underline p-2"> Z - A</button>
                    <button className="hover:underline p-2"> Price ↑</button>
                    <button className="hover:underline p-2"> Price ↓</button>
                </div>
            )
            }
        </div>
    )
}

// the JSON has jewelry as jewelery
// todo: refactor code
function Filter({setFilter, filterBy}) {
    const [minPriceInput, setMinPriceInput] = useState("")
    const [maxPriceInput, setMaxPriceInput] = useState("")

    function filterOnCategory(category) {
        return () => {
            setFilter({...filterBy, category: category})
        }
    }

    function filterOnPrice(min_price, max_price) {
        min_price = isNaN(min_price) ? 0 : min_price
        max_price = isNaN(max_price) ? Infinity : max_price
        setFilter({...filterBy, min_price: min_price, max_price: max_price})
    }

    function handleClear() {
        setMinPriceInput("")
        setMaxPriceInput("")
        filterOnPrice(0, Infinity)
    }

    function handleChange(setValue) {
        return (e) => {
            const value = e.target.value
            const numeric_value = value.replace(/[^0-9.]/g, "")
            setValue(numeric_value)
        }
    }

    return (
        <div className="flex flex-col pl-0 p-10 gap-2">
            <h2 className="text-4xl"> Categories: </h2>
            <button
                className={`mt-2 self-start ml-5 ${filterBy.category === "men's clothing" ? "font-bold underline" : "none"}`}
                onClick={filterOnCategory("men's clothing")}
            >
                Men's Clothing
            </button>
            <button
                className={`self-start ml-5 ${filterBy.category === "jewelery" ? "font-bold underline" : "none"}`}
                onClick={filterOnCategory("jewelery")}
            >
                Jewelry
            </button>
            <button
                className={`self-start ml-5 ${filterBy.category === "electronics" ? "font-bold underline" : "none"}`}
                onClick={filterOnCategory("electronics")}
            >
                Electronics
            </button>
            <button
                className={`self-start ml-5 ${filterBy.category === "women's clothing" ? "font-bold underline" : "none"}`}
                onClick={filterOnCategory("women's clothing")}
            >
                Women's Clothing
            </button>
            <h2 className="text-4xl mt-6"> Price Range: </h2>
            <Form className="flex gap-2 text-sm items-center mt-1">
                <input
                    className="border-b border-black w-10 p-1 text-center"
                    placeholder="Min"
                    value={minPriceInput === "" ? "" : `$${minPriceInput}`}
                    onChange={handleChange(setMinPriceInput)}
                />
                <p className="self-center"> - </p>
                <input
                    className="border-b border-black w-10 p-1 text-center"
                    placeholder="Max"
                    value={maxPriceInput === "" ? "" : `$${maxPriceInput}`}
                    onChange={handleChange(setMaxPriceInput)}
                />
                <button
                    type="submit"
                    onClick={() => filterOnPrice(parseFloat(minPriceInput), parseFloat(maxPriceInput))}
                    className="bg-blue-200 p-2 rounded border-2 border-transparent active:border-blue-500"
                >
                    Submit
                </button>
                <button
                    type="button"
                    onClick={() => handleClear()}
                    className="bg-red-200 p-2 rounded border-2 border-transparent active:border-blue-500"
                >
                    Clear
                </button>
            </Form>
            {/*todo: change stylings so the category term has no extra space to left and right*/}
            {filterBy.category !== "" && (
                <div
                    className="flex w-24 p-2 pl-4 pr-4 bg-blue-200 rounded justify-center items-center">
                    <p className="text-xs w-16 overflow-hidden whitespace-nowrap truncate">{filterBy.category}</p>
                    <button
                        type="button"
                        className="w-5"
                        onClick={filterOnCategory("")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>window-close</title>
                            <path
                                d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z"/>
                        </svg>
                    </button>
                </div>
            )}
        </div>

    )
}

// todo: add spinner when items is loading, not when there are no items in search
function Grid({ items }) {
    return (
        <div className="flex flex-col items-center">
                <div className="grid grid-cols-4 gap-16 items-center mt-4">
                    {items.map(item =>
                        <div key={item.id} className="flex flex-col h-96">
                            <div className="flex items-center h-72">
                                <img className="w-40" key={item.id} src={item.image} alt={item.title}/>
                            </div>
                            <div className="flex mt-auto">
                                <h2 className="w-40 truncate ..."> {item.title} </h2>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6">
                                        <title>heart-outline</title>
                                        <path
                                            d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z"/>
                                    </svg>
                                </button>
                            </div>
                            <h2 className="font-bold">
                                ${formatPrice(item.price)}
                            </h2>
                            <p className="w-44 line-clamp-3 truncate ... text-xs whitespace-normal"> {item.description}</p>
                        </div>
                    )}
                </div>
        </div>)
}

function formatPrice(price) {
    if (Number.isInteger(price)) {
        return price.toFixed(2)
    }
    return price.toFixed(2);
}