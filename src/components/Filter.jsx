import { useState } from "react";
import {Form} from "react-router-dom";

// the JSON has jewelry as jewelery
// todo: refactor code
export default function Filter({setFilter, filterBy}) {
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
            <h2 className="text-2xl underline"> Categories: </h2>
            <button
                className={`self-start ml-3 ${filterBy.category === "men's clothing" ? "font-bold" : "none"}`}
                onClick={filterOnCategory("men's clothing")}
            >
                Men's Clothing
            </button>
            <button
                className={`self-start ml-3 ${filterBy.category === "jewelery" ? "font-bold" : "none"}`}
                onClick={filterOnCategory("jewelery")}
            >
                Jewelry
            </button>
            <button
                className={`self-start ml-3 ${filterBy.category === "electronics" ? "font-bold" : "none"}`}
                onClick={filterOnCategory("electronics")}
            >
                Electronics
            </button>
            <button
                className={`self-start ml-3 ${filterBy.category === "women's clothing" ? "font-bold" : "none"}`}
                onClick={filterOnCategory("women's clothing")}
            >
                Women's Clothing
            </button>
            <h2 className="text-2xl mt-1 underline"> Price Range: </h2>
            <Form className="flex gap-2 text-sm items-center ">
                <div className="flex gap-1">
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
                </div>
                <div className="flex gap-1">
                    <button
                        type="submit"
                        onClick={() => filterOnPrice(parseFloat(minPriceInput), parseFloat(maxPriceInput))}
                        className="bg-blue-200 p-1 rounded border-2 border-transparent active:border-blue-500"
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={() => handleClear()}
                        className="bg-red-200 p-1 rounded border-2 border-transparent active:border-blue-500"
                    >
                        Clear
                    </button>
                </div>
            </Form>
        </div>

    )
}