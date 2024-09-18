import { useState, useEffect } from "react";
import {filter} from "jsdom/lib/jsdom/living/traversal/helpers.js";

export default function Collection() {
    const [ items, setItems ] = useState([])
    const [ filterBy, setFilterBy ] = useState("none")

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => setItems(data))
    }, [])

    function onFilter(val) {
        return () => {
            setFilterBy(val)
        }
    }

    const filtered_items =  filterBy !== "none"
                                    ? items.filter(item => item.category === filterBy)
                                    : items

    return (
        <div className="flex flex-col pl-32">
            <h1 className="pt-10 text-5xl font-light text-gray-500"> {filtered_items.length} Items Found </h1>
            <div className="flex gap-10">
                <Filter
                    onFilter = {onFilter}
                    toSelect = {filterBy}
                />
                <Grid
                    items={filtered_items}
                />
            </div>
        </div>
    )
}

// the JSON has jewelry as jewelery
// todo: add price slider to set min and max and search
function Filter({onFilter, toSelect}) {
    return (
        <div className="flex flex-col pl-0 p-10 gap-2">
            <h2 className="text-4xl"> Categories: </h2>
            <button
                className={`mt-2 self-start ml-5 ${toSelect === "men's clothing" ? "font-bold underline" : "none"}`}
                onClick={onFilter("men's clothing")}
            >
                Men's Clothing
            </button>
            <button
                className={`self-start ml-5 ${toSelect === "jewelery" ? "font-bold underline" : "none"}`}
                onClick={onFilter("jewelery")}
            >
                Jewelry
            </button>
            <button
                className={`self-start ml-5 ${toSelect === "electronics" ? "font-bold underline" : "none"}`}
                onClick={onFilter("electronics")}
            >
                Electronics
            </button>
            <button
                className={`self-start ml-5 ${toSelect === "women's clothing" ? "font-bold underline" : "none"}`}
                onClick={onFilter("women's clothing")}
            >
                Women's Clothing
            </button>
        </div>
    )
}

// add price, maybe description
function Grid({ items }) {
    return (
        <div className="flex flex-col items-center">
            {items.length === 0 ? (
                <div className="flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
                </div>
            ) : (
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
            )
            }
        </div>)
}

function formatPrice(price) {
    if (Number.isInteger(price)) {
        return price.toFixed(2)
    }
    return price.toFixed(2);
}