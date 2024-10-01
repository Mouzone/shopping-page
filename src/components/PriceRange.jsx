import {useState} from "react";
import {Form} from "react-router-dom";
import PropTypes from "prop-types";

export default function PriceRange({setFilter, filterBy}) {
    console.log(filterBy)
    function priceOnChange(type) {
        return (e) => {
            // if type is min_value and value==="" set value to 0
            // if type is max_value and value ==="" set value to Infinity
            let value = e.target.value.replace(/[^0-9.]/g, "")
            if (value === "" && type === "minPrice") {
                value = 0
            } else if (value === "" && type === "maxPrice") {
                value = Infinity
            }
            setFilter({
                ...filterBy,
                [type]: parseFloat(value)
            })
        }
    }
    return (
        <>
            <h2 className="text-2xl mt-1 underline"> Price Range: </h2>
            <Form className="flex gap-2 text-sm">
                <div className="flex gap-1">
                    <PriceInput
                        placeholder="Min"
                        priceInput={filterBy.minPrice}
                        onChange={priceOnChange("minPrice")}
                    />
                    <p className="self-center"> - </p>
                    <PriceInput
                        placeholder="Max"
                        priceInput={filterBy.maxPrice}
                        onChange={priceOnChange("maxPrice")}
                    />
                </div>
            </Form>
        </>
    )
}

function PriceInput({placeholder, priceInput, onChange}) {
    const value =
        ((priceInput === 0 && placeholder === "Min") || (priceInput === Infinity && placeholder ==="Max"))
            ? ""
            : `$${priceInput}`
    // if priceINput is 0 and placeholder is min set to ""
    // if priceINput is Infinity and placeholder is max set to "
    return (
        <input
            className="border-b border-black w-10 p-1 text-center"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    )
}

PriceRange.propTypes = {
    setFilter: PropTypes.func.isRequired,
    filterBy: PropTypes.exact({
        category: PropTypes.string.isRequired,
        minPrice: PropTypes.number.isRequired,
        maxPrice: PropTypes.number.isRequired,
    }),
}

PriceInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
    priceInput: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
}