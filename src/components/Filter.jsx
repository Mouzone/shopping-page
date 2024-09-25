import Categories from "./Categories.jsx";
import PriceRange from "./PriceRange.jsx"
// the JSON has jewelry as jewelery
export default function Filter({setFilter, filterBy, categories}) {
    return (
        <div className="flex flex-col gap-5 items-end">
            <Categories
                categories={categories}
                filterBy={filterBy}
                setFilter={setFilter}
            />
            <PriceRange
                filterBy={filterBy}
                setFilter={setFilter}
            />
        </div>

    )
}