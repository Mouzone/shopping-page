import Spinner from "./Spinner.jsx";
import PropTypes from "prop-types";

export default function Categories({categories, filterBy, setFilter}) {
    function filterOnCategory(category) {
        return () => {
            setFilter({...filterBy, category: category})
        }
    }

    return (
        <>
            <h2 className="text-2xl underline"> Categories: </h2>
            {categories === null ? (
                <Spinner/>
            ) : (
                categories.map(category =>
                    <CategoryButton
                        key={category}
                        category={category}
                        filterOnCategory={filterOnCategory}
                        isActive={filterBy.category === category}
                    />
                )
            )}
        </>
    )
}

function CategoryButton({ category, filterOnCategory, isActive}) {
    let text = category === "jewelery" ? "Jewelry" : category
    text = text
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ")

    return (
        <button
            className={`${isActive ? "font-bold" : "none"}`}
            onClick={filterOnCategory(category)}
        >
            {text}
        </button>
    )
}

Categories.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string),
    filterBy: PropTypes.exact({
        category: PropTypes.string.isRequired,
        minPrice: PropTypes.number.isRequired,
        maxPrice: PropTypes.number.isRequired,
    }),
    setFilter: PropTypes.func.isRequired,
}

CategoryButton.propTypes = {
    category: PropTypes.string.isRequired,
    filterOnCategory: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
}