import { useState, useEffect } from "react";
import {customSort, customFilter} from "../helper.js";

import Grid from "./Grid.jsx";
import Sort from "./Sort.jsx";
import Filter from "./Filter.jsx";
import Tag from "./Tag.jsx";
// todo: style filter width
// todo: change styling to pure black and white
// todo: search bar

export default function Collection() {
    const [ items, setItems ] = useState(null )
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

    let filtered_items = items === null ? null : customFilter(items, filterBy)
    let sorted_filtered_items = filtered_items === null ? null : customSort(filtered_items, sortBy)

    const categories = items === null ? null : [...new Set(items.map(item => item.category))]
    return (
        <div className="flex flex-col p-32 pt-0 gap-10">
            <div className="flex sticky top-0 z-10 bg-white pb-5">
                <h1 className="pt-8 text-5xl pl-5 font-light text-gray-500"> {sorted_filtered_items === null ? 0 : sorted_filtered_items.length} Items Found </h1>
                <Sort isActive={sortIsActive} setIsActive={setSortIsActive} setSortBy={setSortBy}/>
            </div>
            <div className="h-full flex gap-10">
                <div className="h-auto">
                    <div className="sticky top-28 z-10">
                        <div>
                            <Filter
                                setFilter={setFilterBy}
                                filterBy={filterBy}
                                categories={categories}
                            />
                            <div className="flex gap-1 mt-2">
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
                    </div>
                </div>
                <Grid
                    items={sorted_filtered_items}
                />
            </div>
        </div>
    )
}

