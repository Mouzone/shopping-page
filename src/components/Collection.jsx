import { useState, useEffect } from "react";

export default function Collection() {
    const [ items, setItems ] = useState([])

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => setItems(data))
    }, [])

    // add filter bar to left and search
    // add description and prices
    return (
        <div className="flex pl-24 pr-24 gap-10">
            <Filter/>
            <Grid items={items}/>
        </div>
    )
}
// the JSON has jewelry as jewelery
function Filter() {
    return (
        <div className="flex flex-col p-10 gap-2 font-bold -mt-5">
            <h2 className="text-4xl"> Categories: </h2>
            <button className="mt-2 self-start ml-5">
                Men's Clothing
            </button>
            <button className="self-start ml-5">
                Jewelry
            </button>
            <button className="self-start ml-5">
                Electronics
            </button>
            <button className="self-start ml-5">
                Women's Clothing
            </button>
        </div>
    )
}

function Grid({ items }) {
    return (
        <div className="flex flex-col items-center mt-10">
            {items.length === 0 ? (
                <div className="flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-4 gap-10 items-center">
                    {items.map(item => <img className="w-40" key={item.id} src={item.image} alt={item.title}/>)}
                </div>
            )}
        </div>
    )
}