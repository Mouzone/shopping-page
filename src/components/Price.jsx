import {useState} from "react";
import {Form} from "react-router-dom";

// todo: move clear button to clear away all filters and etc, right beneath tags
// todo: remove submit button from price, and do live updating

export default function PriceRange({setFilter, filterBy}) {
    const [minPriceInput, setMinPriceInput] = useState("")
    const [maxPriceInput, setMaxPriceInput] = useState("")

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

    return (
        <>
            <h2 className="text-2xl mt-1 underline"> Price Range: </h2>
            <Form className="flex gap-2 text-sm items-center ">
                <div className="flex gap-1">
                    <PriceInput
                        priceInput={minPriceInput}
                        setState={setMinPriceInput}
                    />
                    <p className="self-center"> - </p>
                    <PriceInput
                        priceInput={maxPriceInput}
                        setState={setMaxPriceInput}
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
        </>
    )
}

function PriceInput({priceInput, setState}) {
    function handleChange(setValue) {
        return (e) => {
            const value = e.target.value
            const numeric_value = value.replace(/[^0-9.]/g, "")
            setValue(numeric_value)
        }
    }

    return (
        <input
            className="border-b border-black w-10 p-1 text-center"
            placeholder="Max"
            value={priceInput === "" ? "" : `$${priceInput}`}
            onChange={handleChange(setState)}
        />
    )
}