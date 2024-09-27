import { useState, useEffect } from "react";
import {customSort, customFilter} from "../helper.js";
import {useSearch} from "./App.jsx";

import Grid from "./Grid.jsx";
import Sort from "./Sort.jsx";
import Filter from "./Filter.jsx";
import Tag from "./Tag.jsx";

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
    const { searchBy, setSearchBy } =useSearch()

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => setItems(data))
        return () => {
            setSearchBy("")
        }
    }, [setSearchBy])

    const filtered_items = items === null ? null : customFilter(items, filterBy)
    const sorted_filtered_items = filtered_items === null ? null : customSort(filtered_items, sortBy)
    const relevant_items = sorted_filtered_items === null ? null : sorted_filtered_items.filter(item => item.title.includes(searchBy)
        || item.title.toLowerCase().includes(searchBy.toLowerCase()))


    const categories = items === null ? null : [...new Set(items.map(item => item.category))]
    const sorted_categories = categories === null ? null : categories.sort((a, b) => a.length - b.length)

    return (
        <div className="flex flex-col p-32 pb-0 pt-0">
            <div className="flex sticky top-0 z-1 bg-white p-5 border-black border border-t-0 pt-0">
                <h1 className="pt-8 text-5xl font-light text-gray-500"> {sorted_filtered_items === null ? 0 : sorted_filtered_items.length} Items Found </h1>
                <Sort isActive={sortIsActive} setIsActive={setSortIsActive} setSortBy={setSortBy}/>
            </div>
            <div className="h-full flex gap-5 ">
                <div className="h-auto border border-black border-t-0 p-5 w-60">
                    <div className="sticky top-36 z-10">
                        <div>
                            <Filter
                                setFilter={setFilterBy}
                                filterBy={filterBy}
                                categories={sorted_categories}
                            />
                            <div className="flex gap-2 mt-2  flex-wrap justify-end">
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
                                <Tag
                                    type="search"
                                    toDisplay={searchBy}
                                    setState={setSearchBy}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Grid
                    items={relevant_items}
                />
            </div>
        </div>
    )
}

