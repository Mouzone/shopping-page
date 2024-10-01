import { useState, useEffect } from "react";
import {getRelevantItems} from "../helper.js";
import {useParams} from "./App.jsx";

import Grid from "./Grid.jsx";
import Sort from "./Sort.jsx";
import Filter from "./Filter.jsx";
import Tag from "./Tag.jsx";

export default function Collection() {
    const { items, searchBy, setSearchBy, liked } = useParams()

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
        return () => {
            setSearchBy("")
        }
    }, [setSearchBy])

    const relevant_items = getRelevantItems(items, liked, filterBy, sortBy, searchBy)

    const categories = items === null ? null : [...new Set(items.map(item => item.category))]
    const sorted_categories = categories === null ? null : categories.sort((a, b) => a.length - b.length)

    return (
        <div className="flex flex-col p-10 pb-0 pt-0">
            <div className="flex sticky top-0 z-1 bg-white p-5 border-black border border-t-0 pt-0">
                <h1 className="pt-8 text-xl font-light text-gray-500">
                    <span className="text-black font-bold text-5xl"> Collection </span>
                    {relevant_items === null ? 0 : relevant_items.length} Items
                </h1>
                <Sort isActive={sortIsActive} setIsActive={setSortIsActive} setSortBy={setSortBy}/>
            </div>
            <div className="flex gap-5">
                <div className="h-auto border border-black border-t-0 p-5 w-60">
                    <div className="sticky top-36 z-10">
                        <div className="h-[70vh]">
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

