import Categories from "./Categories.jsx";
import PriceRange from "./PriceRange.jsx"
import PropTypes from "prop-types";
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

Filter.propTypes = {
    setFilter: PropTypes.func.isRequired,
    filterBy: PropTypes.exact({
        category: PropTypes.string.isRequired,
        minPrice: PropTypes.number.isRequired,
        maxPrice: PropTypes.number.isRequired,
    }),
    categories: PropTypes.array,
}