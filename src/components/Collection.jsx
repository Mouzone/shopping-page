import { useState, useEffect } from "react";
import {customSort, customFilter} from "../helper.js";

import Grid from "./Grid.jsx";
import Sort from "./Sort.jsx";
import Filter from "./Filter.jsx";
import Tag from "./Tag.jsx";
// todo: move clear button
// todo: add sort tag and remove it on click
// todo: change styling to pure black and white
export default function Collection() {
    const [ items, setItems ] = useState([])
    const [ filterBy, setFilterBy ] = useState({
        category: "",
        min_price: 0,
        max_price: Infinity,
    })
    const [ sortIsActive, setSortIsActive ] = useState(false)
    const [ sortBy, setSortBy ] = useState({
        type: "",
        direction: ""
    })

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => setItems(data))
    }, [])

    // todo: search bar
    let filtered_items = customFilter(items, filterBy)
    let sorted_filtered_items = customSort(filtered_items, sortBy)

    return (
        <div className="flex flex-col pl-32">
            <div className="flex">
                <h1 className="pt-10 text-5xl pl-5 font-light text-gray-500"> {filtered_items.length} Items Found </h1>
                <Sort isActive={sortIsActive} setIsActive={setSortIsActive} setSortBy={setSortBy}/>
            </div>
            <div className="flex gap-2">
                <div>
                    <Filter
                        setFilter={setFilterBy}
                        filterBy={filterBy}
                    />
                    <div className="flex gap-1 -mt-8">
                        <Tag
                            type="filter"
                            toDisplay={filterBy}
                            setState={setFilterBy}
                        />
                        <Tag
                            type="sort"
                            toDisplay={sortBy}
                            setState={setSortBy}
                        />
                    </div>
                </div>
                {/*todo: move filterby and sortby tags here*/}
                <Grid
                    items={sorted_filtered_items}
                />
            </div>
        </div>
    )
}

